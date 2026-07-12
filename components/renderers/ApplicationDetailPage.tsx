import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
          <Link
            href={backHref}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> {dict.actions.backToApplications}
          </Link>
        }
      />

      <section className="py-16">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {dict.sections.industryChallenge}
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed max-w-2xl">
              {detail.challenge}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {dict.sections.typicalComponents}
            </h2>
            <ul className="space-y-2.5">
              {detail.components.map((component, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                  <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-${accent}`} aria-hidden />
                  <span className="leading-relaxed">{component}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="container-wide">
          <h2 className="text-xl font-semibold text-neutral-900 mb-10">
            {dict.sections.keyBenefits}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {detail.benefits.map((benefit, i) => (
              <div key={i} className="p-6 border border-neutral-100 bg-white rounded-lg">
                <span className="font-mono text-xs text-neutral-400 block mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-neutral-700 text-sm leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide">
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            {dict.sections.selectionCriteria}
          </h2>
          <p className="text-neutral-500 text-sm mb-10 max-w-2xl leading-relaxed">
            {dict.sections.selectionCriteriaIntro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {detail.selectionCriteria.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 border border-neutral-100 rounded-lg">
                <span className="font-mono text-xs text-neutral-400 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-neutral-700 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide">
          <h2 className="text-xl font-semibold text-neutral-900 mb-10">
            {dict.sections.recommendedProducts}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {detail.products.map((product) => {
              const thumb = getProductRefImage(product.key, locale);
              return (
                <Link
                  key={product.name}
                  href={productHref(product.key)}
                  className="group rounded-xl border border-neutral-100 overflow-hidden hover:border-neutral-300 hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[16/10] bg-neutral-100">
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt={product.name}
                        fill
                        quality={70}
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : null}
                  </div>
                  <div className="p-4 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-neutral-800 group-hover:text-neutral-900 transition-colors">
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

      <section className="py-20" style={{ backgroundColor: "#0C1128" }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {dict.cta.customTitle}
          </h2>
          <p className="text-white/50 mb-8 max-w-[520px] mx-auto leading-relaxed">
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
