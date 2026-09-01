import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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

      <section className="py-16 sm:py-20 border-b border-neutral-100">
        <div className="container-wide">
          <p className="max-w-3xl text-xl sm:text-2xl text-neutral-700 leading-relaxed font-light tracking-tight">{copy.body}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide space-y-24">
          {categories.map((category, i) => (
            <div key={category.slug}>
              <div className="flex items-end justify-between gap-6 mb-10">
                <h2 className="flex items-center gap-5">
                  <span className="text-5xl sm:text-6xl font-semibold tabular-nums text-neutral-200 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                    {category.name}
                  </span>
                </h2>
                <Link
                  href={localizedHref(categoryKey, locale, { category: category.slug })}
                  className={`inline-flex items-center gap-1 text-sm font-medium text-${accent} hover:text-neutral-900 transition-colors shrink-0`}
                >
                  {dict.actions.viewAll}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product) => (
                  <Link
                    key={product.slug}
                    href={localizedHref(productKey, locale, {
                      category: category.slug,
                      product: product.slug,
                    })}
                    className="group block bg-white border border-neutral-100 rounded-xl hover:border-neutral-200 shadow-sm hover:shadow-md overflow-hidden transition-all cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className={`text-base font-medium text-neutral-900 group-hover:text-${accent} transition-colors line-clamp-1`}>
                        {product.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-neutral-500 line-clamp-1">
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

      <section className="section-padding" style={{ backgroundColor: "#0C1128" }}>
        <div className="container-wide text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.05]">
            {copy.closingTitle}
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-white/50 leading-relaxed text-lg">
            {copy.closingBody}
          </p>
          <Link
            href={localizedHref("contact", locale)}
            className="inline-flex items-center gap-2 mt-9 px-7 py-3 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold rounded-full transition-colors"
          >
            {dict.actions.getQuote} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
