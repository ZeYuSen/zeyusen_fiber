"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/fx/capabilities";
import { beginWorldTransit, endWorldTransit } from "@/lib/fx/world/bridge";

const STORAGE_KEY = "fx-transit";
const FAILSAFE_MS = 3000;
const ROOTS = "[data-page-root]";

// Module scope so a remounted instance (locale switch) can still cancel a
// failsafe armed by the previous one.
let failsafeTimer = 0;

// Navigation as a camera move: on an internal link click the page text softens
// out, the fiber world immediately starts moving to the destination's shot,
// and the new page's text rises in once the route has rendered. The header
// never leaves the screen. Routes and links are untouched — this only delays
// the same client-side navigation by the 180ms fade.
export function WorldTransit() {
  const router = useRouter();
  const pathname = usePathname();
  const busyRef = useRef(false);
  const pushedRef = useRef(false);
  const latestHrefRef = useRef("");
  const shownPathRef = useRef(pathname);

  const reveal = () => {
    window.clearTimeout(failsafeTimer);
    busyRef.current = false;
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
    const roots = document.querySelectorAll<HTMLElement>(ROOTS);
    gsap.killTweensOf(roots);
    gsap.fromTo(
      roots,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: "opacity,transform" },
    );
  };
  const revealRef = useRef(reveal);
  useLayoutEffect(() => {
    revealRef.current = reveal;
  });

  // New route committed (or the layout remounted mid-transit after a locale
  // switch): hide before paint, then rise in.
  useLayoutEffect(() => {
    let resumed = false;
    try {
      resumed = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    if (shownPathRef.current === pathname && !resumed) return;
    shownPathRef.current = pathname;
    if (prefersReducedMotion()) return;
    gsap.set(document.querySelectorAll(ROOTS), { opacity: 0 });
    const frame = requestAnimationFrame(() => revealRef.current());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || "noTransition" in anchor.dataset) return;
      if (anchor.target && anchor.target !== "_self") return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      if (url.pathname.startsWith("/api/") || /\.[a-z0-9]+$/i.test(url.pathname)) return;

      event.preventDefault();
      const href = url.pathname + url.search + url.hash;
      latestHrefRef.current = href;
      if (busyRef.current) {
        // Mid-fade: the fade will take the latest link. Already pushed: go now.
        beginWorldTransit(url.pathname);
        if (pushedRef.current) router.push(href);
        return;
      }
      busyRef.current = true;
      pushedRef.current = false;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      beginWorldTransit(url.pathname);
      gsap.to(document.querySelectorAll(ROOTS), {
        opacity: 0,
        y: -10,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          pushedRef.current = true;
          router.push(latestHrefRef.current);
          window.clearTimeout(failsafeTimer);
          failsafeTimer = window.setTimeout(() => {
            endWorldTransit();
            revealRef.current();
          }, FAILSAFE_MS);
        },
      });
    };

    // Capture phase so this runs before next/link's own click handler.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => () => window.clearTimeout(failsafeTimer), []);

  return null;
}
