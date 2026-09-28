"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { canUseRichFx, hasFinePointer } from "@/lib/fx/capabilities";
import { mixState, parseWorldAttr, sampleStops, stateForPath, type WorldState } from "@/lib/fx/world/state";
import { endWorldTransit, worldBridge } from "@/lib/fx/world/bridge";
import type { WorldRuntime, WorldSample } from "./runtime";

// The persistent fiber world, mounted once in the locale layout behind all
// page content. Pages opt in with tone/world attributes on their sections:
//   data-tone="night" | "warm"   transparent section, the world shows through
//   data-tone="paper"            opaque light-table surface (world may sleep)
//   data-world="weave"           the shot to hold while this section leads
//   data-world="tow>mat>weave"   scrubbed through its shots across a
//                                tall (sticky) section
//   data-world="route"           the page's own shot (lib/fx/world/state.ts)
// Pages without night/warm sections keep the world hidden.

const LIVE_ATTR = "data-world-live";
const STAGE_SELECTOR = '[data-world], [data-tone="night"], [data-tone="warm"]';
const ease = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

function isLite() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (
    !hasFinePointer() ||
    window.innerWidth < 1024 ||
    (nav.deviceMemory ?? 8) <= 4 ||
    (navigator.hardwareConcurrency ?? 8) <= 4
  );
}

export function FiberWorld() {
  const pathname = usePathname();
  const hostRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<WorldRuntime | null>(null);
  const baseRef = useRef<WorldState>(stateForPath(pathname));
  const sectionsRef = useRef<HTMLElement[]>([]);
  const papersRef = useRef<HTMLElement[]>([]);
  const bootedRef = useRef(false);
  const unmountedRef = useRef(false);

  // The shot the world should hold right now, read from the page's sections.
  const sample = useCallback((): WorldSample => {
    const vh = window.innerHeight;
    if (worldBridge.pendingPath) return { state: stateForPath(worldBridge.pendingPath), covered: false };
    let covered = false;
    for (const el of papersRef.current) {
      const r = el.getBoundingClientRect();
      if (r.top <= vh * 0.05 && r.bottom >= vh * 0.95) covered = true;
    }
    const shots = sectionsRef.current
      .map((el) => {
        const stops = parseWorldAttr(el.dataset.world, baseRef.current);
        if (!stops) return null;
        const r = el.getBoundingClientRect();
        const progress = clamp01(-r.top / Math.max(1, r.height - vh));
        return { top: r.top, state: sampleStops(stops, ease(clamp01(progress / 0.85))) };
      })
      .filter((shot): shot is { top: number; state: WorldState } => shot !== null);
    if (!shots.length) return { state: baseRef.current, covered };
    // The shot whose section has reached the upper third leads; the next one
    // takes over as its section rises from the bottom of the screen.
    const line = vh * 0.35;
    let lead = -1;
    shots.forEach((shot, i) => {
      if (shot.top <= line) lead = i;
    });
    if (lead === -1) {
      const t = ease(clamp01((vh - shots[0].top) / (vh - line)));
      return { state: mixState(baseRef.current, shots[0].state, t), covered };
    }
    const next = shots[lead + 1];
    if (!next) return { state: shots[lead].state, covered };
    const t = ease(clamp01((vh - next.top) / (vh - line)));
    return { state: mixState(shots[lead].state, next.state, t), covered };
  }, []);

  // three.js loads only once a page actually has a stage. The runtime is a
  // module singleton, so a locale switch (which remounts this layout)
  // re-attaches the same canvas to the new host without a blink.
  const ensureRuntime = useCallback(() => {
    if (bootedRef.current || !hostRef.current) return;
    bootedRef.current = true;
    const host = hostRef.current;
    import("./runtime")
      .then(({ getWorldRuntime }) => {
        if (unmountedRef.current) return;
        const runtime = getWorldRuntime({
          lite: isLite(),
          onContextLost: () => document.documentElement.removeAttribute(LIVE_ATTR),
        });
        runtime.attach(host);
        runtime.setSampler(sample);
        runtime.setActive(document.documentElement.hasAttribute(LIVE_ATTR));
        runtimeRef.current = runtime;
        worldBridge.runtime = runtime;
      })
      .catch(() => {});
  }, [sample]);

  useEffect(() => {
    unmountedRef.current = false;
    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement && event.target.matches("input, textarea, select")) {
        runtimeRef.current?.setPaused(true);
      }
    };
    const onFocusOut = () => runtimeRef.current?.setPaused(false);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      unmountedRef.current = true;
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // Each route: collect its stage sections, decide whether the world shows, and
  // let the camera ease from wherever it was to this page's shot. (No unmount
  // cleanup of the live flag: after a locale switch the old instance would
  // otherwise clear the flag the new instance just set.)
  useLayoutEffect(() => {
    baseRef.current = stateForPath(pathname);
    sectionsRef.current = Array.from(document.querySelectorAll<HTMLElement>("[data-world]"));
    papersRef.current = Array.from(document.querySelectorAll<HTMLElement>('[data-tone="paper"]'));
    const live = canUseRichFx() && document.querySelector(STAGE_SELECTOR) !== null;
    document.documentElement.toggleAttribute(LIVE_ATTR, live);
    if (live) ensureRuntime();
    runtimeRef.current?.setActive(live);
    endWorldTransit();
  }, [pathname, ensureRuntime]);

  return <div ref={hostRef} aria-hidden="true" className="fx-world" />;
}
