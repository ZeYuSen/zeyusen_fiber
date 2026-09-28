import { isLocale, defaultLocale } from "@/lib/i18n/config";
import { resolveRoute, type PageKey, type RouteParams } from "@/lib/i18n/routes";

// The fiber world is one persistent scene; every page and section is a
// different "shot" of it. A shot is a plain vector of numbers so shots can be
// blended by scroll and eased by navigation.

export type WorldState = {
  /** 0 = random non-woven mat, 1 = plain weave. */
  form: number;
  /** 1 = every filament gathered into a carbon tow and a glass roving. */
  bundle: number;
  /** 0..1: carbon warp slides left, glass weft slides right. */
  split: number;
  /** Visibility of carbon (warp) filaments, 0..1. */
  carbon: number;
  /** Visibility of glass (weft) filaments, 0..1. */
  glass: number;
  /** Share of filaments shown (areal weight), 0..1. */
  density: number;
  /** Overall exposure of the fibers, 0..1. */
  intensity: number;
  /** Fabric tilt away from the camera, radians (negative). */
  tilt: number;
  /** Camera distance factor: <1 dollies in, >1 pulls back. */
  dolly: number;
  /** Camera sideways offset, in visible widths. */
  pan: number;
  /** Warm sodium-light grade, 0..1. */
  warm: number;
  /** Idle drift / sheen motion, 0..1 (0 = static, nothing re-renders). */
  drift: number;
  /** Warm-silver finish on carbon (nickel plated), 0..1. */
  silver: number;
  /** Near-black finish on glass (black tissue), 0..1. */
  ink: number;
  /** Dims fibers on the left of the screen, behind stage headlines, 0..1. */
  scrim: number;
  /** Recolours every filament as one material: -1 all carbon, 0 as woven, 1 all glass. */
  tint: number;
  /** The fabric travels with page scroll at this fraction of the scroll speed (depth). */
  parallax: number;
  /** Continuous sideways run of the fabric, world units per second (a production line). */
  flow: number;
  /** Speed of the slow light sweeping over the fibers when nothing else moves, 0..1. */
  glow: number;
};

export const WORLD_KEYS = [
  "form", "bundle", "split", "carbon", "glass", "density", "intensity", "tilt",
  "dolly", "pan", "warm", "drift", "silver", "ink", "scrim", "tint", "parallax", "flow", "glow",
] as const satisfies readonly (keyof WorldState)[];

const BASE: WorldState = {
  form: 0, bundle: 0, split: 0, carbon: 1, glass: 1, density: 1, intensity: 1, tilt: -0.3,
  dolly: 1, pan: 0, warm: 0, drift: 1, silver: 0, ink: 0, scrim: 1, tint: 0,
  parallax: 0, flow: 0, glow: 0,
};

export const PRESETS = {
  /** The opening shot: a carbon tow and a glass roving crossing under the light. */
  tow: { ...BASE, bundle: 1, drift: 0.8 },
  /** Loose non-woven mat. */
  mat: { ...BASE },
  /** The finished plain weave. */
  weave: { ...BASE, form: 1, drift: 0.7 },
  /** Carbon and glass pulled apart into the two divisions. */
  split: { ...BASE, form: 1, split: 1, intensity: 0.5, tilt: -0.55, drift: 0.4, scrim: 0 },
  /** Settled weave behind night content: travels with the scroll, a slow light over it. */
  still: { ...BASE, form: 1, intensity: 0.22, drift: 0, scrim: 0, parallax: 0.3, glow: 0.5 },
  /** Industries: pulled back and tilted, looking over a whole roll of material. */
  survey: { ...BASE, form: 1, intensity: 0.3, tilt: -0.6, dolly: 1.08, drift: 0, scrim: 0, parallax: 0.3, glow: 0.5 },
  /** Factory: the fabric runs sideways like the web on a production line. */
  line: { ...BASE, form: 1, intensity: 0.28, tilt: -0.45, drift: 0, scrim: 0, parallax: 0.15, flow: 0.35, glow: 0.4 },
  /** Certificates: the run slows and settles behind the documents. */
  settle: { ...BASE, form: 1, intensity: 0.2, drift: 0, scrim: 0, parallax: 0.15, glow: 0.25 },
  /** Warm pool of light at the inquiry. */
  warm: { ...BASE, form: 1, intensity: 0.22, warm: 1, drift: 0, scrim: 0, parallax: 0.1, glow: 0.2 },
  /** Carbon division: every filament becomes graphite — a dense carbon mat. */
  carbon: { ...BASE, form: 0.08, tint: -1, intensity: 0.95, dolly: 0.92, pan: -0.08, drift: 0.6 },
  /** Glass division: every filament becomes pale glass — a backlit veil. */
  glass: { ...BASE, form: 0.05, tint: 1, intensity: 0.9, dolly: 0.92, pan: 0.08, drift: 0.6 },
} satisfies Record<string, WorldState>;

export type PresetName = keyof typeof PRESETS;

export function isPresetName(value: string): value is PresetName {
  return value in PRESETS;
}

/** A product's own material: true areal weight and finish, one step closer. */
export function productState(division: "carbon" | "glass", slug: string): WorldState {
  const base = division === "carbon" ? PRESETS.carbon : PRESETS.glass;
  const grams = /(\d+)g/.exec(slug);
  let density = division === "carbon" ? 0.7 : 0.6;
  if (grams) density = Math.min(1, 0.2 + Number(grams[1]) / 40);
  if (slug.includes("composite") || slug.includes("needled") || slug.includes("gdl")) density = 0.95;
  if (slug.includes("roofing") || slug.includes("wall") || slug.includes("pipe")) density = 0.8;
  if (slug.includes("battery")) density = 0.45;
  return {
    ...base,
    form: slug.includes("composite") ? 0.5 : base.form,
    density,
    dolly: 0.8,
    intensity: 1,
    silver: slug.includes("nickel") ? 1 : 0,
    ink: slug.includes("black") ? 1 : 0,
  };
}

export function stateForRoute(pageKey: PageKey | null, params: RouteParams): WorldState {
  switch (pageKey) {
    case "home":
      return PRESETS.tow;
    case "carbon-fiber":
      return PRESETS.carbon;
    case "glass-fiber":
      return PRESETS.glass;
    case "carbon-category":
      return { ...PRESETS.carbon, dolly: 0.86 };
    case "glass-category":
      return { ...PRESETS.glass, dolly: 0.86 };
    case "carbon-product":
      return productState("carbon", params.product ?? "");
    case "glass-product":
      return productState("glass", params.product ?? "");
    case "applications":
      // The parted fabric, the camera leaning toward the carbon side…
      return { ...PRESETS.split, intensity: 0.6, pan: -0.14, scrim: 0.6 };
    case "applications-glass":
      // …or toward the glass side: switching material pans across.
      return { ...PRESETS.split, intensity: 0.6, pan: 0.14, scrim: 0.6 };
    case "contact":
      return PRESETS.warm;
    default:
      return PRESETS.still;
  }
}

export function stateForPath(pathname: string): WorldState {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] && isLocale(segments[0]) ? segments[0] : defaultLocale;
  const resolved = segments.length <= 1 ? { pageKey: "home" as PageKey, params: {} } : resolveRoute(locale, segments.slice(1));
  return stateForRoute(resolved?.pageKey ?? null, resolved?.params ?? {});
}

/**
 * Parse a section's `data-world` value into its stops: a preset ("weave"), a
 * scrub across a tall section ("tow>mat>weave"), or "route" for the page's own
 * shot (a product's true areal weight, the division's material).
 */
export function parseWorldAttr(value: string | undefined, route: WorldState): WorldState[] | null {
  if (!value) return null;
  const pick = (name: string) => (name === "route" ? route : isPresetName(name) ? PRESETS[name] : null);
  const stops = value.split(">").map(pick);
  return stops.length && stops.every((stop): stop is WorldState => stop !== null) ? stops : null;
}

/** Position along a scrubbed section (0..1) → the blended shot across its stops. */
export function sampleStops(stops: WorldState[], t: number): WorldState {
  if (stops.length === 1) return stops[0];
  const x = Math.min(1, Math.max(0, t)) * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(x));
  return mixState(stops[i], stops[i + 1], x - i);
}

export function mixState(a: WorldState, b: WorldState, t: number, out: WorldState = { ...a }): WorldState {
  for (const key of WORLD_KEYS) out[key] = a[key] + (b[key] - a[key]) * t;
  return out;
}
