import type { Locale } from "@/lib/i18n/config";
import type { ProductCategory } from "@/types/product";
import { allCarbonFiberCategories } from "@/data/carbon-fiber";
import { allGlassFiberCategories } from "@/data/glass-fiber";
import { applicationGroups, type ApplicationGroup } from "@/data/applications";
import {
  getProductContent as getProductContentBase,
  type ProductContent,
} from "@/data/product-content";
import {
  getApplicationDetail as getApplicationDetailBase,
  type ApplicationDetail,
} from "@/data/application-details";

// Locale-aware data accessors. For `en` these return the English base verbatim.
// Stage 5 plugs the ko/es/pt translation-merge here without touching renderers.

export function getCarbonCategories(_locale: Locale): ProductCategory[] {
  return allCarbonFiberCategories;
}

export function getGlassCategories(_locale: Locale): ProductCategory[] {
  return allGlassFiberCategories;
}

export function getCategories(
  division: "carbon" | "glass",
  locale: Locale,
): ProductCategory[] {
  return division === "carbon"
    ? getCarbonCategories(locale)
    : getGlassCategories(locale);
}

export function getApplicationGroups(_locale: Locale): ApplicationGroup[] {
  return applicationGroups;
}

export function getProductContent(
  _locale: Locale,
  division: "carbon" | "glass",
  category: string,
  product: string,
): ProductContent | undefined {
  return getProductContentBase(division, category, product);
}

export function getApplicationDetail(
  _locale: Locale,
  division: "carbon" | "glass",
  slug: string,
): ApplicationDetail | undefined {
  return getApplicationDetailBase(division, slug);
}
