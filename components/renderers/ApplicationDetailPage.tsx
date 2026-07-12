import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ApplicationDetail } from "@/data/application-details";
import { PageMediaHero } from "@/components/ui/PageMediaHero";
import { getApplicationImage } from "@/lib/site-images";
import { getCategories } from "@/lib/data-i18n";

// Resolve a representative thumbnail for a recommended-product reference.
function getProductRefImage(
  ref: ApplicationDetail["products"][number]["key"],
  locale: Locale,
): string | undefined {
  const cats = getCategories(ref.division, locale);
  const cat = cats.find((c) => c.slug === ref.category);
  if ("product" in ref) {
    const p = cat?.products.find((pr) => pr.slug === ref.product);
    return p?.images?.[0] ?? cat?.products[0]?.images?.[0];
  }
  return cat?.products[0]?.images?.[0];
}

export function ApplicationDetailPage({
  division,
  locale,
  dict,
  detail,
  slug,
  imageNote,
}: {
  division: "carbon" | "glass";
  locale: Locale;
  dict: Dictionary;
  detail: ApplicationDetail;
  slug: string;
  imageNote: string;
}) {
  const accent = division === "carbon" ? "carbon-accent" : "glass-accent";
  const backHref =
    division === "carbon"
      ? localizedHref("applications", locale)
      : localizedHref("applications-glass", locale);

  const productHref = (ref: ApplicationDetail["products"][number]["key"]) => {
    const key = ref.division === "carbon" ? "carbon" : "glass";
    if ("product" in ref) {
      return localizedHref(key === "carbon" ? "carbon-product" : "glass-product", locale, {
        category: ref.category,
        product: ref.product,
      });
    }
    return localizedHref(key === "carbon" ? "carbon-category" : "glass-category", locale, {
      category: ref.category,
    });
  };

  return (
    <>
      <PageMediaHero
        eyebrow={detail.title}
        title={detail.headline}
        description={detail.description}
        image={getApplicationImage(slug, division)}
        imageAlt={`${detail.title} — ${imageNote}`}
        accent={division}
        breadcrumbs={
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
            <Link href={localizedHref("home", locale)}>{dict.nav.home}</Link>
            <span>/</span>
            <Link href={backHref}>{dict.nav.applications}</Link>
            <span>/</span>
            <span className="text-white/90">{detail.title}</span>
          </nav>
        }
      />

      <section className="section-padding">
        <div className="container-wide grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <p className="type-caption text-neutral-400">01</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 mt-4 tracking-tight leading-[1.05]">
              {dict.sections.industryChallenge}
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl mt-8">
              {detail.challenge}
            </p>
          </div>
          <div className="lg:border-l lg:border-neutral-100 lg:pl-12">
            <p className="type-caption text-neutral-400">02</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 mt-4 tracking-tight leading-[1.05]">
              {dict.sections.typicalComponents}
            </h2>
            <ul className="space-y-4 mt-8">
              {detail.components.map((component, i) => (
                <li key={i} className="flex items-start gap-4 text-base text-neutral-600">
                  <span className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-${accent}`} aria-hidden />
                  <span className="leading-relaxed">{component}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="type-caption text-neutral-400">03</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 mt-4 tracking-tight leading-[1.05]">
              {dict.sections.keyBenefits}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 mt-16 border border-neutral-200 rounded-2xl overflow-hidden">
            {detail.benefits.map((benefit, i) => (
              <div key={i} className="p-8 lg:p-10 bg-white hover:bg-neutral-50 transition-colors">
                <span className="block text-5xl font-semibold text-neutral-200 tabular-nums leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-neutral-700 text-base leading-relaxed mt-6">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="type-caption text-neutral-400">04</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 mt-4 tracking-tight leading-[1.05]">
              {dict.sections.selectionCriteria}
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg mt-6 leading-relaxed">
              {dict.sections.selectionCriteriaIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0 mt-16 border-t border-neutral-100">
            {detail.selectionCriteria.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-6 py-8 border-b border-neutral-100 sm:odd:border-r sm:odd:pr-12"
              >
                <span className="font-mono text-sm text-neutral-400 mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-neutral-700 text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="type-caption text-neutral-400">05</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 mt-4 tracking-tight leading-[1.05]">
              {dict.sections.recommendedProducts}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {detail.products.map((product) => {
              const thumb = getProductRefImage(product.key, locale);
              return (
                <Link
                  key={product.name}
                  href={productHref(product.key)}
                  className="group rounded-xl border border-neutral-100 overflow-hidden hover:border-neutral-300 hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt={product.name}
                        fill
                        quality={70}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : null}
                  </div>
                  <div className="p-5 flex items-center justify-between gap-3">
                    <span className="text-base sm:text-lg font-medium text-neutral-800 group-hover:text-neutral-900 transition-colors">
                      {product.name}
                    </span>
                    <ArrowRight className={`w-4 h-4 text-neutral-400 group-hover:text-${accent} transition-colors shrink-0`} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "#0C1128" }}>
        <div className="container-wide text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-6">
            {dict.cta.customTitle}
          </h2>
          <p className="text-white/50 mb-10 max-w-[560px] mx-auto leading-relaxed text-lg">
            {division === "carbon" ? dict.cta.customBodyCarbon : dict.cta.customBodyGlass}
          </p>
          <Link
            href={localizedHref("contact", locale)}
            className="inline-flex items-center gap-2 px-7 py-3 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold rounded-full transition-colors"
          >
            {dict.actions.getQuote} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
