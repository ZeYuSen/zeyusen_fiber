import { glassFiberCategories } from "./products";
import { ProductCategory } from "@/types/product";
import { isActiveProduct, isActiveProductCategory } from "@/lib/product-scope";

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

export const allGlassFiberCategories: ProductCategory[] = glassFiberCategories
  .filter((category) => isActiveProductCategory("glass", category.slug))
  .map((category) => ({
    ...category,
    products: category.products
      .filter((product) => isActiveProduct("glass", category.slug, product.slug))
      .sort(
        (a, b) =>
          productPriority.indexOf(a.slug) - productPriority.indexOf(b.slug),
      ),
  }));
