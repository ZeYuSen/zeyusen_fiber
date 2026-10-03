import { glassFiberCategories } from "./products";
import { glassFiberCategories2 } from "./products2";
import { ProductCategory } from "@/types/product";
import {
  isActiveProduct,
  isActiveProductCategory,
  isKnownProduct,
  isKnownProductCategory,
} from "@/lib/product-scope";

const productPriority = [
  "rotor-paper",
  "surface-tissue",
  "roofing-tissue",
  "black-tissue",
  "colored-tissue",
  "wall-covering",
  "pipe-wrapping",
  "battery-separator",
];

const byPriority = (a: { slug: string }, b: { slug: string }) => {
  const ia = productPriority.indexOf(a.slug);
  const ib = productPriority.indexOf(b.slug);
  return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
};

// Full catalog: stocked products plus those supplied on request (flagged).
export const catalogGlassFiberCategories: ProductCategory[] = [...glassFiberCategories, ...glassFiberCategories2]
  .filter((category) => isKnownProductCategory("glass", category.slug))
  .map((category) => ({
    ...category,
    onRequest: !isActiveProductCategory("glass", category.slug),
    products: category.products
      .filter((product) => isKnownProduct("glass", category.slug, product.slug))
      .map((product) => ({
        ...product,
        onRequest: !isActiveProduct("glass", category.slug, product.slug),
      }))
      .sort((a, b) => Number(a.onRequest) - Number(b.onRequest) || byPriority(a, b)),
  }));

// Stocked catalog only: navigation, catalog grids, applications, agents.
export const allGlassFiberCategories: ProductCategory[] = catalogGlassFiberCategories
  .filter((category) => !category.onRequest)
  .map((category) => ({
    ...category,
    products: category.products.filter((product) => !product.onRequest),
  }));
