import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ProductCategory } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";

// Carbon/Glass product category page.
export function CategoryPage({
  division,
  locale,
  dict,
  category,
  breadcrumbDivision,
}: {
  division: "carbon" | "glass";
  locale: Locale;
  dict: Dictionary;
  category: ProductCategory;
  breadcrumbDivision: string;
}) {
  const accent = division === "carbon" ? "carbon-accent" : "glass-accent";
  const divisionKey = division === "carbon" ? "carbon-fiber" : "glass-fiber";
  const productKey = division === "carbon" ? "carbon-product" : "glass-product";

  return (
    <>
      <section className="pt-36 pb-16">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
            <Link href={localizedHref("home", locale)} className="hover:text-neutral-700 transition-colors">
              {dict.nav.home}
            </Link>
            <span>/</span>
            <Link href={localizedHref(divisionKey, locale)} className="hover:text-neutral-700 transition-colors">
              {breadcrumbDivision}
            </Link>
            <span>/</span>
            <span className="text-neutral-600">{category.name}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            {category.name}
          </h1>
          <p className="text-neutral-500 mt-3 max-w-2xl leading-relaxed">{category.description}</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-wide">
          <h2 className="sr-only">{dict.sections.productsInCategory}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                href={localizedHref(productKey, locale, {
                  category: category.slug,
                  product: product.slug,
                })}
                detailLabel={dict.actions.viewDetails}
                accentColor={accent}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
