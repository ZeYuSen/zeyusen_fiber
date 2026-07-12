import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ProductCategory } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import { PageMediaHero } from "@/components/ui/PageMediaHero";

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
      <PageMediaHero
        eyebrow={breadcrumbDivision}
        title={category.name}
        description={category.description}
        image={category.image}
        imageAlt={category.name}
        accent={division}
        breadcrumbs={
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
            <Link href={localizedHref("home", locale)}>{dict.nav.home}</Link>
            <span>/</span>
            <Link href={localizedHref(divisionKey, locale)}>{breadcrumbDivision}</Link>
            <span>/</span>
            <span className="text-white/90">{category.name}</span>
          </nav>
        }
      />

      <section className="py-24">
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
