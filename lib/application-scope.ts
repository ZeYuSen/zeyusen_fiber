import type { ProductDivision } from "@/lib/product-scope";

export const ACTIVE_APPLICATION_SLUGS: Record<ProductDivision, readonly string[]> = {
  carbon: ["new-energy", "military-defense"],
  glass: ["construction"],
};

export const RETIRED_APPLICATION_SLUGS: Record<ProductDivision, readonly string[]> = {
  carbon: ["aerospace", "motorsport", "manufacturing"],
  glass: ["wind-energy", "industrial-filtration", "transportation", "marine"],
};

export function isActiveApplication(
  division: ProductDivision,
  slug: string,
): boolean {
  return ACTIVE_APPLICATION_SLUGS[division].includes(slug);
}

export function isRetiredApplication(
  division: ProductDivision,
  slug: string,
): boolean {
  return RETIRED_APPLICATION_SLUGS[division].includes(slug);
}
