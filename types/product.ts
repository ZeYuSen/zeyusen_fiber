export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  applications: string[];
  images: string[];
  category: string;
  // Blog post slugs to cross-link as "Related Guides" on the product page.
  relatedPosts?: string[];
  // Optional per-locale SEO overrides (set via product translations).
  // Fall back to name/description when absent.
  seoTitle?: string;
  seoDescription?: string;
  // Not part of the stocked catalog: supplied on request (see lib/product-scope.ts).
  onRequest?: boolean;
}

export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  image: string;
  products: Product[];
  // Optional SEO overrides for the category page title/meta.
  seoTitle?: string;
  seoDescription?: string;
  // Every product in this category is supplied on request.
  onRequest?: boolean;
}

export type Division = "carbon" | "glass";
