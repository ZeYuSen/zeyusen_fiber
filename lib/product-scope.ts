export type ProductDivision = "carbon" | "glass";

// Public catalog scope approved in August 2026. The original source records
// remain in the repository as a reversible archive, but only these categories
// and products are published, indexed, recommended, or exposed to agents.
const ACTIVE_PRODUCT_SLUGS: Record<ProductDivision, Record<string, readonly string[]>> = {
  carbon: {
    "carbon-fiber-mat": [
      "surface-mat-10g",
      "surface-mat-20g",
      "nickel-plated-mat",
      "composite-mat",
      "needled-mat",
      "surface-mat-30g",
      "fuel-cell-gdl",
    ],
  },
  glass: {
    "tissue-mat": [
      "surface-tissue",
      "black-tissue",
      "colored-tissue",
      "rotor-paper",
      "roofing-tissue",
      "wall-covering",
      "pipe-wrapping",
      "battery-separator",
    ],
  },
};

export const ALL_PRODUCT_CATEGORIES: Record<ProductDivision, readonly string[]> = {
  carbon: ["carbon-fiber-mat", "carbon-fiber-cloth", "carbon-fiber-raw"],
  glass: [
    "tissue-mat",
    "fiberglass-cloth",
    "composite-mat",
    "chopped-strand-mat",
    "other-materials",
  ],
};

const ALL_PRODUCT_SLUGS: Record<ProductDivision, Record<string, readonly string[]>> = {
  carbon: {
    "carbon-fiber-mat": [
      "surface-mat-10g",
      "surface-mat-20g",
      "nickel-plated-mat",
      "carbon-glass-hybrid",
      "composite-mat",
      "needled-mat",
      "surface-mat-30g",
      "fuel-cell-gdl",
    ],
    "carbon-fiber-cloth": ["hybrid-woven-cloth", "twill-cloth", "plain-cloth"],
    "carbon-fiber-raw": ["short-cut-fiber", "carbon-powder", "carbon-yarn"],
  },
  glass: {
    "tissue-mat": [
      "surface-tissue",
      "black-tissue",
      "colored-tissue",
      "rotor-paper",
      "roofing-tissue",
      "wall-covering",
      "pipe-wrapping",
      "battery-separator",
    ],
    "fiberglass-cloth": [
      "plain-weave",
      "twill-weave",
      "colored-cloth",
      "unidirectional",
      "multiaxial",
      "woven-roving",
    ],
    "composite-mat": [
      "biaxial-45",
      "biaxial-0-90",
      "multiaxial-1200",
      "grid-stitched",
      "unidirectional-450",
      "pp-core",
      "mesh-composite",
      "knitted-mat",
    ],
    "chopped-strand-mat": ["chopped-strand-mat"],
    "other-materials": ["basalt-mat"],
  },
};

// Articles remain publishable even when they discuss product families that are
// no longer in the public catalog. Their links to retired inventory are reduced
// to plain text at read time, preserving the article URL and useful editorial
// content without sending readers or crawlers to retired product pages.
export const RETIRED_BLOG_SLUGS: readonly string[] = [];

const retiredBlogSlugs = new Set<string>(RETIRED_BLOG_SLUGS);

export function isKnownProductCategory(
  division: ProductDivision,
  category: string,
): boolean {
  return ALL_PRODUCT_CATEGORIES[division].includes(category);
}

export function isActiveProductCategory(
  division: ProductDivision,
  category: string,
): boolean {
  return Object.hasOwn(ACTIVE_PRODUCT_SLUGS[division], category);
}

export function isActiveProduct(
  division: ProductDivision,
  category: string,
  product: string,
): boolean {
  return ACTIVE_PRODUCT_SLUGS[division][category]?.includes(product) ?? false;
}

export function isKnownProduct(
  division: ProductDivision,
  category: string,
  product: string,
): boolean {
  return ALL_PRODUCT_SLUGS[division][category]?.includes(product) ?? false;
}

export function isRetiredBlogSlug(slug: string): boolean {
  return retiredBlogSlugs.has(slug);
}

// Blog content is authored in five locales and contains both prefixed and
// unprefixed internal links. Strip links to retired inventory at read time so
// the rendered HTML and text/markdown alternates cannot emit dead links.
export function isRetiredInternalHref(href: string): boolean {
  if (!href.startsWith("/")) return false;

  let pathname = href.split(/[?#]/, 1)[0];
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    // Keep the original path when a malformed escape sequence is encountered.
  }

  const segments = pathname.split("/").filter(Boolean);
  const possibleLocale = segments[0];
  const offset = ["en", "zh", "ko", "es", "pt"].includes(possibleLocale) ? 1 : 0;
  const body = segments.slice(offset);

  if (body.length >= 2 && ["blog", "博客", "블로그"].includes(body[0])) {
    return isRetiredBlogSlug(body[1]);
  }

  const carbonRoots = new Set(["carbon-fiber", "碳纤维", "탄소섬유", "fibra-de-carbono"]);
  const glassRoots = new Set(["glass-fiber", "玻璃纤维", "유리섬유", "fibra-de-vidrio", "fibra-de-vidro"]);
  const division: ProductDivision | null = carbonRoots.has(body[0])
    ? "carbon"
    : glassRoots.has(body[0])
      ? "glass"
      : null;
  if (!division) return false;

  const rest = body[1] === "products" || ["产品", "제품", "productos", "produtos"].includes(body[1])
    ? body.slice(2)
    : body.slice(1);
  const category = rest[0];
  if (!category || !isKnownProductCategory(division, category)) return false;
  if (!isActiveProductCategory(division, category)) return true;
  return Boolean(
    rest[1] &&
    isKnownProduct(division, category, rest[1]) &&
    !isActiveProduct(division, category, rest[1]),
  );
}
