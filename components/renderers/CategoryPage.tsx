import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ProductCategory } from "@/types/product";
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

      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="type-caption text-neutral-400">{breadcrumbDivision}</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-neutral-900 mt-4 tracking-tight leading-[1.05]">
              {dict.sections.productsInCategory}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {category.products.map((product) => (
              <Link
                key={product.slug}
                href={localizedHref(productKey, locale, {
                  category: category.slug,
                  product: product.slug,
                })}
                className="group block h-full"
              >
                <div className="h-full bg-white border border-neutral-100 rounded-xl hover:border-neutral-200 overflow-hidden transition-colors">
                  <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      quality={68}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className={`text-base font-medium text-neutral-900 group-hover:text-${accent} transition-colors`}>
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.specs.slice(0, 2).map((spec) => (
                        <span
                          key={spec.label}
                          className="text-xs px-2 py-0.5 bg-neutral-50 text-neutral-500 border border-neutral-100 rounded-full"
                        >
                          {spec.label}: {spec.value}
                        </span>
                      ))}
                    </div>
                    <span className={`inline-flex items-center gap-1 mt-5 text-xs font-medium text-${accent}`}>
                      {dict.actions.viewDetails} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
