import type { ProductContent } from "@/data/product-content";

// Long-form product overview + FAQ translations, keyed by
// `${division}/${category}/${product}`. Per-entry fallback to English when a key
// is absent. Populated incrementally; missing entries simply render in English.

export type ProductContentTranslation = Partial<ProductContent>;
export type ProductContentTranslations = Record<string, ProductContentTranslation>;

export { productContentZh } from "./product-content.zh";
export { productContentKo } from "./product-content.ko";
export { productContentEs } from "./product-content.es";
export { productContentPt } from "./product-content.pt";
