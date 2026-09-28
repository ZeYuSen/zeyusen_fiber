import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getCategories } from "@/lib/data-i18n";
import { WorldStage } from "@/components/fx/world/WorldStage";

// Carbon/Glass full catalog page: a night shot of the division's own material
// (the world's route shot), then the catalog laid out on the light table.
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
  const categoryKey = division === "carbon" ? "carbon-category" : "glass-category";
  const productKey = division === "carbon" ? "carbon-product" : "glass-product";

  return (
    <>
      <WorldStage
        world="route"
        title={copy.title}
        description={copy.intro}
        breadcrumbs={
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href={localizedHref("home", locale)}>{dict.nav.home}</Link>
            <span>/</span>
            <span className="text-white/90">{copy.breadcrumbDivision}</span>
          </nav>
        }
      />

      <section data-tone="night" data-world="route" className="relative pb-28 pt-32 sm:pb-40 sm:pt-40">
        <div className="container-wide">
          <p
            data-reveal="up"
            className="max-w-4xl text-2xl font-light leading-[1.45] tracking-tight text-(--ink-night)/85 text-pretty sm:text-3xl lg:text-[2.5rem] lg:leading-[1.3]"
          >
            {copy.body}
          </p>
        </div>
      </section>

      <section data-tone="paper" className="relative pb-28 pt-20 sm:pb-36 sm:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-full h-10 bg-linear-to-b from-transparent to-(--stage-paper)/10 sm:h-24"
        />
        <div className="container-wide space-y-24">
          {categories.map((category) => (
            <div key={category.slug}>
              <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
                <h2 data-reveal="up" className="paper-title">
                  {category.name}
                </h2>
                <Link
                  href={localizedHref(categoryKey, locale, { category: category.slug })}
                  className="inline-flex shrink-0 items-center gap-1.5 pb-1 text-sm font-medium text-(--ink-paper)/70 transition-colors hover:text-(--ink-paper)"
                >
                  {dict.actions.viewAll}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div
                data-reveal="stagger"
                className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
              >
                {category.products.map((product) => (
                  <Link
                    key={product.slug}
                    href={localizedHref(productKey, locale, {
                      category: category.slug,
                      product: product.slug,
                    })}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    </div>
                    <h3 className="mt-5 line-clamp-1 text-base font-medium text-(--ink-paper)/75 transition-colors group-hover:text-(--ink-paper)">
                      {product.name}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-sm text-(--ink-paper)/70">
                      {product.specs[0]?.value}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-full h-10 bg-linear-to-t from-transparent to-(--stage-paper)/10 sm:h-24"
        />
      </section>

      <section data-tone="warm" data-world="warm" className="relative py-32 sm:py-44">
        <div className="container-wide text-center">
          <h2
            data-reveal="text"
            className="mx-auto max-w-[22ch] text-3xl font-medium leading-[1.1] tracking-tight text-(--ink-night) text-balance sm:text-5xl"
          >
            {copy.closingTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-(--ink-night)/75 text-pretty">
            {copy.closingBody}
          </p>
          <Link
            href={localizedHref("contact", locale)}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            {dict.actions.getQuote} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-(--stage-night) sm:h-40"
        />
      </section>
    </>
  );
}
