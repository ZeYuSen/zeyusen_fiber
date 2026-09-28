import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ProductCategory } from "@/types/product";
import { WorldStage } from "@/components/fx/world/WorldStage";

// Carbon/Glass product category page: the category's night shot, then the
// category plate and its products on the light table.
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
  const divisionKey = division === "carbon" ? "carbon-fiber" : "glass-fiber";
  const productKey = division === "carbon" ? "carbon-product" : "glass-product";

  return (
    <>
      <WorldStage
        world="route"
        title={category.name}
        description={category.description}
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

      {/* Hold the night shot a beat longer before the light table comes on. */}
      <div aria-hidden="true" data-tone="night" className="h-[22svh]" />

      <section data-tone="paper" className="relative pb-28 pt-20 sm:pb-36 sm:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-full h-10 bg-linear-to-b from-transparent to-(--stage-paper)/25 sm:h-16"
        />
        <div className="container-wide">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-paper)/60">
                {breadcrumbDivision}
              </p>
              <h2 data-reveal="text" className="paper-title mt-4">
                {dict.sections.productsInCategory}
              </h2>
            </div>
            {category.image ? (
              <div
                data-reveal="image"
                className="relative aspect-[21/9] overflow-hidden rounded-sm bg-white lg:col-span-7 lg:aspect-[3/2]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>

          <div
            data-reveal="stagger"
            className="mt-20 grid gap-x-8 gap-y-14 sm:mt-28 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-20"
          >
            {category.products.map((product) => (
              <Link
                key={product.slug}
                href={localizedHref(productKey, locale, {
                  category: category.slug,
                  product: product.slug,
                })}
                className="group block h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    quality={68}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="mt-5 text-base font-medium text-(--ink-paper)/75 transition-colors group-hover:text-(--ink-paper)">
                  {product.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-(--ink-paper)/65">
                  {product.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {product.specs.slice(0, 2).map((spec) => (
                    <span
                      key={spec.label}
                      className="rounded-full border border-(--ink-paper)/15 px-2.5 py-0.5 text-xs text-(--ink-paper)/70"
                    >
                      {spec.label}: {spec.value}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-(--ink-paper)/80 transition-colors group-hover:text-(--ink-paper)">
                  {dict.actions.viewDetails} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
