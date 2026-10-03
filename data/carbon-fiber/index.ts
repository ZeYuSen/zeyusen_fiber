import { carbonFiberCategories } from "./products";
import { ProductCategory } from "@/types/product";
import {
  isActiveProduct,
  isActiveProductCategory,
  isKnownProduct,
  isKnownProductCategory,
} from "@/lib/product-scope";

// Full catalog: stocked products plus those supplied on request (flagged).
export const catalogCarbonFiberCategories: ProductCategory[] = carbonFiberCategories
  .filter((category) => isKnownProductCategory("carbon", category.slug))
  .map((category) => ({
    ...category,
    onRequest: !isActiveProductCategory("carbon", category.slug),
    products: category.products
      .filter((product) => isKnownProduct("carbon", category.slug, product.slug))
      .map((product) => ({
        ...product,
        onRequest: !isActiveProduct("carbon", category.slug, product.slug),
      }))
      // Stocked products first; on-request ones close the list.
      .sort((a, b) => Number(a.onRequest) - Number(b.onRequest)),
  }));

// Stocked catalog only: navigation, catalog grids, applications, agents.
export const allCarbonFiberCategories: ProductCategory[] = catalogCarbonFiberCategories
  .filter((category) => !category.onRequest)
  .map((category) => ({
    ...category,
    products: category.products.filter((product) => !product.onRequest),
  }));
