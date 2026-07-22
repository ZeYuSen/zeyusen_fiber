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
  // Optional per-locale SEO overrides (set via product translations).
  // Fall back to name/description when absent.
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  image: string;
  products: Product[];
}

export type Division = "carbon" | "glass";
