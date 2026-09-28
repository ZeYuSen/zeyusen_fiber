"use client";

import { useSyncExternalStore } from "react";

// Capability checks that gate the WebGL / GSAP interaction layer. Every effect
// in components/fx degrades to the plain static UI when these return false, so
// content and navigation never depend on them.

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION).matches;
}

export function hasFinePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia(FINE_POINTER).matches;
}

let webglSupport: boolean | null = null;

export function supportsWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    webglSupport = !!gl;
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

function saveData(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData === true;
}

/** Rich (WebGL) effects are allowed: motion is welcome, WebGL works, data saver is off. */
export function canUseRichFx(): boolean {
  return !prefersReducedMotion() && !saveData() && supportsWebGL();
}

export type FxMode = "pending" | "rich" | "basic";

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

/**
 * Hydration-safe FX mode: "pending" on the server and during hydration, then
 * "rich" (WebGL allowed) or "basic" (static fallback) on the client.
 */
export function useFxMode(): FxMode {
  return useSyncExternalStore<FxMode>(
    subscribeReducedMotion,
    () => (canUseRichFx() ? "rich" : "basic"),
    () => "pending",
  );
}

/** Hydration-safe media query: `serverValue` until the client has rendered. */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (callback) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", callback);
      return () => list.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
