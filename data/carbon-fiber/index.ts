import { carbonFiberCategories } from "./products";
import { ProductCategory } from "@/types/product";
import { isActiveProduct, isActiveProductCategory } from "@/lib/product-scope";

export const allCarbonFiberCategories: ProductCategory[] = carbonFiberCategories
  .filter((category) => isActiveProductCategory("carbon", category.slug))
  .map((category) => ({
    ...category,
    products: category.products.filter((product) =>
      isActiveProduct("carbon", category.slug, product.slug),
    ),
  }));
