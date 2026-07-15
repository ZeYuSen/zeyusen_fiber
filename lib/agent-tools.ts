import type { Locale } from "@/lib/i18n/config";
import { getCategories } from "@/lib/data-i18n";
import { localizedHref } from "@/lib/i18n/routes";

// Compact, serializable product index handed to the WebMCP client component so
// its read-only tools can search/browse without shipping the full data layer.
export type AgentProduct = {
  name: string;
  description: string;
  division: "carbon" | "glass";
  category: string;
  href: string;
};

export type AgentCategory = {
  name: string;
  division: "carbon" | "glass";
  href: string;
};

export type AgentIndex = {
  products: AgentProduct[];
  categories: AgentCategory[];
};

export function buildAgentIndex(locale: Locale): AgentIndex {
  const products: AgentProduct[] = [];
  const categories: AgentCategory[] = [];

  for (const division of ["carbon", "glass"] as const) {
    const categoryKey = division === "carbon" ? "carbon-category" : "glass-category";
    const productKey = division === "carbon" ? "carbon-product" : "glass-product";
    for (const category of getCategories(division, locale)) {
      categories.push({
        name: category.name,
        division,
        href: localizedHref(categoryKey, locale, { category: category.slug }),
      });
      for (const product of category.products) {
        products.push({
          name: product.name,
          description: product.description,
          division,
          category: category.name,
          href: localizedHref(productKey, locale, {
            category: category.slug,
            product: product.slug,
          }),
        });
      }
    }
  }

  return { products, categories };
}
