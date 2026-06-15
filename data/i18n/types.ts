import type { Locale } from "@/lib/i18n/config";
import type { ProductCategory, Product } from "@/types/product";

// Translatable slices of product data, keyed by slug. Only fields that contain
// human-readable text appear here; slug/image/numeric spec values stay in the
// English base and are never overwritten. Missing keys fall back to English.

export type ProductTranslation = {
  name?: string;
  description?: string;
  features?: string[];
  // Maps English spec label -> translated label.
  specLabels?: Record<string, string>;
  // Maps English spec value -> translated value. Numeric values (e.g. "10 g/m²")
  // are intentionally omitted so they render unchanged.
  specValues?: Record<string, string>;
  applications?: string[];
};

export type CategoryTranslation = {
  name?: string;
  description?: string;
  products?: Record<string, ProductTranslation>;
};

// One division's translation set for a single locale: categorySlug -> data.
export type DivisionTranslations = Record<string, CategoryTranslation>;

function mergeProduct(base: Product, t?: ProductTranslation): Product {
  if (!t) return base;
  return {
    ...base,
    name: t.name ?? base.name,
    description: t.description ?? base.description,
    features: t.features ?? base.features,
    applications: t.applications ?? base.applications,
    specs: base.specs.map((spec) => ({
      label: t.specLabels?.[spec.label] ?? spec.label,
      // Translate descriptive spec values; numeric values pass through.
      value: t.specValues?.[spec.value] ?? spec.value,
    })),
  };
}

export function mergeCategory(
  base: ProductCategory,
  t?: CategoryTranslation,
): ProductCategory {
  if (!t) return base;
  return {
    ...base,
    name: t.name ?? base.name,
    description: t.description ?? base.description,
    products: base.products.map((p) => mergeProduct(p, t.products?.[p.slug])),
  };
}

export function mergeCategories(
  base: ProductCategory[],
  translations: DivisionTranslations | undefined,
  locale: Locale,
): ProductCategory[] {
  if (locale === "en" || !translations) return base;
  return base.map((cat) => mergeCategory(cat, translations[cat.slug]));
}
