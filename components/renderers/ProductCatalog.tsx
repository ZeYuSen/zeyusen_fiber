import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getCategories } from "@/lib/data-i18n";
import { PageMediaHero } from "@/components/ui/PageMediaHero";
import { divisionHeroImages } from "@/lib/site-images";

// Carbon/Glass full catalog page.
export function ProductCatalog({
  division,
  locale,
  dict,
  copy,
}: {
  division: "carbon" | "glass";
  locale: Locale;
  dict: Dictionary;
  copy: {
    breadcrumbDivision: string;
    title: string;
    intro: string;
    body: string;
    closingTitle: string;
    closingBody: string;
  };
}) {
  const categories = getCategories(division, locale);
  const accent = division === "carbon" ? "carbon-accent" : "glass-accent";
  const categoryKey = division === "carbon" ? "carbon-category" : "glass-category";
  const productKey = division === "carbon" ? "carbon-product" : "glass-product";

  return (
    <>
      <PageMediaHero
        eyebrow={copy.breadcrumbDivision}
        title={copy.title}
        description={copy.intro}
        image={divisionHeroImages[division]}
        imageAlt={copy.title}
        accent={division}
        breadcrumbs={
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href={localizedHref("home", locale)}>{dict.nav.home}</Link>
            <span>/</span>
            <span className="text-white/90">{copy.breadcrumbDivision}</span>
          </nav>
        }
      />

      <section className="border-b border-neutral-100 py-14">
        <div className="container-wide">
          <p className="max-w-3xl text-neutral-600 leading-relaxed">{copy.body}</p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-wide space-y-16">
          {categories.map((category, i) => (
            <div key={category.slug}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center gap-3 text-lg sm:text-xl font-semibold text-neutral-900">
                  <span className="text-lg font-bold tabular-nums text-neutral-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {category.name}
                </h2>
                <Link
                  href={localizedHref(categoryKey, locale, { category: category.slug })}
                  className={`text-xs font-medium text-${accent} hover:text-neutral-900 transition-colors`}
                >
                  {dict.actions.viewAll}
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.products.slice(0, 4).map((product) => (
                  <Link
                    key={product.slug}
                    href={localizedHref(productKey, locale, {
                      category: category.slug,
                      product: product.slug,
                    })}
                    className="group block bg-white border border-neutral-100 rounded-xl hover:border-neutral-200 shadow-sm hover:shadow-md overflow-hidden transition-all cursor-pointer"
                  >
                    <div className="relative h-48 bg-neutral-100 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className={`text-sm font-medium text-neutral-900 group-hover:text-${accent} transition-colors line-clamp-1`}>
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-500 line-clamp-1">
                        {product.specs[0]?.value}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-wide max-w-3xl">
          <h2 className="text-2xl font-semibold text-neutral-900">{copy.closingTitle}</h2>
          <p className="mt-4 text-neutral-500 leading-relaxed">{copy.closingBody}</p>
        </div>
      </section>
    </>
  );
}
