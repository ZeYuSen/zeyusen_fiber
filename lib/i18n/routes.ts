import type { Locale } from "./config";
import { locales } from "./config";

// Every renderable page type. The catch-all dispatcher switches on these.
export type PageKey =
  | "home"
  | "about"
  | "services"
  | "contact"
  | "privacy"
  | "terms"
  | "blog-index"
  | "blog-post"
  | "applications" // carbon applications overview (legacy /applications)
  | "applications-glass" // glass applications overview
  | "carbon-fiber" // carbon division home
  | "carbon-products" // carbon catalog
  | "carbon-category" // carbon product category
  | "carbon-product" // carbon product detail
  | "carbon-application" // carbon application detail
  | "glass-fiber" // glass division home
  | "glass-products" // glass catalog
  | "glass-category" // glass product category
  | "glass-product" // glass product detail
  | "glass-application"; // glass application detail

export type RouteParams = Record<string, string>;

// Division root segment is localized; leaf product/blog slugs stay English.
const divisionRoot: Record<"carbon" | "glass", Record<Locale, string>> = {
  carbon: {
    en: "carbon-fiber",
    zh: "碳纤维",
    ko: "탄소섬유",
    es: "fibra-de-carbono",
    pt: "fibra-de-carbono",
  },
  glass: {
    en: "glass-fiber",
    zh: "玻璃纤维",
    ko: "유리섬유",
    es: "fibra-de-vidrio",
    pt: "fibra-de-vidro",
  },
};

// Reusable localized path segments (column-level localization).
export const segmentLabels: Record<string, Record<Locale, string>> = {
  products: { en: "products", zh: "产品", ko: "제품", es: "productos", pt: "produtos" },
  applications: {
    en: "applications",
    zh: "应用",
    ko: "응용분야",
    es: "aplicaciones",
    pt: "aplicacoes",
  },
  blog: { en: "blog", zh: "博客", ko: "블로그", es: "blog", pt: "blog" },
  glass: { en: "glass", zh: "玻璃", ko: "유리", es: "vidrio", pt: "vidro" },
};

// Localized standalone static-page segments.
const staticSegment: Record<string, Record<Locale, string>> = {
  about: { en: "about", zh: "关于我们", ko: "회사소개", es: "sobre-nosotros", pt: "sobre-nos" },
  services: { en: "services", zh: "服务", ko: "서비스", es: "servicios", pt: "servicos" },
  contact: { en: "contact", zh: "联系我们", ko: "문의", es: "contacto", pt: "contato" },
  privacy: {
    en: "privacy",
    zh: "隐私政策",
    ko: "개인정보처리방침",
    es: "privacidad",
    pt: "privacidade",
  },
  terms: { en: "terms", zh: "服务条款", ko: "이용약관", es: "terminos", pt: "termos" },
};

// Segment spec primitives that compose a route path.
type SegSpec =
  | { t: "root"; div: "carbon" | "glass" } // localized division root
  | { t: "label"; key: keyof typeof segmentLabels } // localized reusable label
  | { t: "static"; key: keyof typeof staticSegment } // localized static segment
  | { t: "param"; name: string }; // dynamic English slug, captured verbatim

type RouteDef = { key: PageKey; segments: SegSpec[] };

// Ordered route table. Static (paramless) routes are listed before dynamic
// ones so resolveRoute prefers exact matches.
const ROUTES: RouteDef[] = [
  { key: "home", segments: [] },
  { key: "about", segments: [{ t: "static", key: "about" }] },
  { key: "services", segments: [{ t: "static", key: "services" }] },
  { key: "contact", segments: [{ t: "static", key: "contact" }] },
  { key: "privacy", segments: [{ t: "static", key: "privacy" }] },
  { key: "terms", segments: [{ t: "static", key: "terms" }] },
  { key: "blog-index", segments: [{ t: "label", key: "blog" }] },
  {
    key: "applications-glass",
    segments: [
      { t: "label", key: "applications" },
      { t: "label", key: "glass" },
    ],
  },
  { key: "applications", segments: [{ t: "label", key: "applications" }] },
  { key: "carbon-fiber", segments: [{ t: "root", div: "carbon" }] },
  {
    key: "carbon-products",
    segments: [
      { t: "root", div: "carbon" },
      { t: "label", key: "products" },
    ],
  },
  { key: "glass-fiber", segments: [{ t: "root", div: "glass" }] },
  {
    key: "glass-products",
    segments: [
      { t: "root", div: "glass" },
      { t: "label", key: "products" },
    ],
  },
  // Dynamic routes (longest first within each family to avoid prefix shadowing).
  {
    key: "carbon-product",
    segments: [
      { t: "root", div: "carbon" },
      { t: "label", key: "products" },
      { t: "param", name: "category" },
      { t: "param", name: "product" },
    ],
  },
  {
    key: "carbon-category",
    segments: [
      { t: "root", div: "carbon" },
      { t: "label", key: "products" },
      { t: "param", name: "category" },
    ],
  },
  {
    key: "carbon-application",
    segments: [
      { t: "root", div: "carbon" },
      { t: "label", key: "applications" },
      { t: "param", name: "slug" },
    ],
  },
  {
    key: "glass-product",
    segments: [
      { t: "root", div: "glass" },
      { t: "label", key: "products" },
      { t: "param", name: "category" },
      { t: "param", name: "product" },
    ],
  },
  {
    key: "glass-category",
    segments: [
      { t: "root", div: "glass" },
      { t: "label", key: "products" },
      { t: "param", name: "category" },
    ],
  },
  {
    key: "glass-application",
    segments: [
      { t: "root", div: "glass" },
      { t: "label", key: "applications" },
      { t: "param", name: "slug" },
    ],
  },
  {
    key: "blog-post",
    segments: [
      { t: "label", key: "blog" },
      { t: "param", name: "slug" },
    ],
  },
];

const routeByKey: Record<PageKey, RouteDef> = ROUTES.reduce(
  (acc, route) => {
    acc[route.key] = route;
    return acc;
  },
  {} as Record<PageKey, RouteDef>,
);

function segmentValue(spec: SegSpec, locale: Locale, params: RouteParams): string {
  switch (spec.t) {
    case "root":
      return divisionRoot[spec.div][locale];
    case "label":
      return segmentLabels[spec.key][locale];
    case "static":
      return staticSegment[spec.key][locale];
    case "param": {
      const value = params[spec.name];
      if (value == null) {
        throw new Error(`Missing route param "${spec.name}" for localizedHref`);
      }
      return value;
    }
  }
}

// Forward: pageKey + locale + params -> full path with language prefix.
export function localizedHref(
  key: PageKey,
  locale: Locale,
  params: RouteParams = {},
): string {
  const route = routeByKey[key];
  if (!route) throw new Error(`Unknown page key: ${key}`);
  const parts = route.segments.map((spec) => segmentValue(spec, locale, params));
  const suffix = parts.join("/");
  return suffix ? `/${locale}/${suffix}` : `/${locale}`;
}

// Normalize a path segment for comparison: percent-decode if needed, then
// apply Unicode NFC so non-ASCII slugs (e.g. Korean 회사소개) match regardless
// of the normalization form the runtime delivers.
function normalizeSegment(value: string): string {
  let decoded = value;
  if (/%[0-9a-fA-F]{2}/.test(value)) {
    try {
      decoded = decodeURIComponent(value);
    } catch {
      decoded = value;
    }
  }
  return decoded.normalize("NFC");
}

// Reverse: locale + catch-all slug array -> { pageKey, params } or null.
export function resolveRoute(
  locale: Locale,
  slug: string[],
): { pageKey: PageKey; params: RouteParams } | null {
  const normalizedSlug = slug.map(normalizeSegment);
  for (const route of ROUTES) {
    if (route.segments.length !== normalizedSlug.length) continue;
    const params: RouteParams = {};
    let matched = true;
    for (let i = 0; i < route.segments.length; i++) {
      const spec = route.segments[i];
      const incoming = normalizedSlug[i];
      if (spec.t === "param") {
        params[spec.name] = incoming;
      } else if (segmentValue(spec, locale, {}).normalize("NFC") !== incoming) {
        matched = false;
        break;
      }
    }
    if (matched) return { pageKey: route.key, params };
  }
  return null;
}

// All locales' localized URLs for a given page (for hreflang / sitemap alternates).
export function allLocaleHrefs(
  key: PageKey,
  params: RouteParams = {},
): Record<Locale, string> {
  return locales.reduce(
    (acc, locale) => {
      acc[locale] = localizedHref(key, locale, params);
      return acc;
    },
    {} as Record<Locale, string>,
  );
}
