import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ApplicationDetail } from "@/data/application-details";

export function ApplicationDetailPage({
  division,
  locale,
  dict,
  detail,
}: {
  division: "carbon" | "glass";
  locale: Locale;
  dict: Dictionary;
  detail: ApplicationDetail;
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
      <section className="pt-36 pb-16">
        <div className="container-wide">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-700 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> {dict.actions.backToApplications}
          </Link>
          <p className={`type-caption text-${accent} mb-3`}>{detail.title}</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 max-w-[700px]">
            {detail.headline}
          </h1>
          <p className="text-neutral-500 max-w-[600px] mt-6 leading-relaxed">
            {detail.description}
          </p>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
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
          <h2 className="text-xl font-semibold text-neutral-900 mb-10">
            {dict.sections.recommendedProducts}
          </h2>
          <div className="space-y-3">
            {detail.products.map((product) => (
              <Link
                key={product.name}
                href={productHref(product.key)}
                className="group flex items-center justify-between p-5 border border-neutral-100 rounded-lg hover:border-neutral-200 transition-colors"
              >
                <span className="text-neutral-700 group-hover:text-neutral-900 transition-colors text-sm">
                  {product.name}
                </span>
                <ArrowRight className={`w-4 h-4 text-neutral-400 group-hover:text-${accent} transition-colors`} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container-wide text-center">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            {dict.cta.customTitle}
          </h2>
          <p className="text-neutral-500 mb-8 max-w-[500px] mx-auto leading-relaxed">
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
