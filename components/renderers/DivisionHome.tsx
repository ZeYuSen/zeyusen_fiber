import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getCategories } from "@/lib/data-i18n";

// Carbon/Glass division home page renderer.
export function DivisionHome({
  division,
  locale,
  dict,
  copy,
}: {
  division: "carbon" | "glass";
  locale: Locale;
  dict: Dictionary;
  copy: {
    eyebrow: string;
    title: string;
    intro: string;
    categoriesLabel: string;
    chooseTitle: string;
    chooseParagraphs: string[];
    ctaTitle: string;
    ctaBody: string;
  };
}) {
  const categories = getCategories(division, locale);
  const accent = division === "carbon" ? "carbon-accent" : "glass-accent";
  const productsKey = division === "carbon" ? "carbon-category" : "glass-category";

  return (
    <>
      <section className="pt-36 pb-16">
        <div className="container-wide">
          <div>
            <p className={`type-caption text-${accent}`}>{copy.eyebrow}</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mt-3">
              {copy.title}
            </h1>
            <p className="text-neutral-500 mt-4 max-w-2xl leading-relaxed">
              {copy.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-wide">
          <h2 className="type-caption text-neutral-400 mb-8">
            {copy.categoriesLabel}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <div key={category.slug}>
                <Link
                  href={localizedHref(productsKey, locale, {
                    category: category.slug,
                  })}
                  className="group block h-full"
                >
                  <div className="h-full bg-white border border-neutral-100 rounded-lg hover:border-neutral-200 overflow-hidden transition-colors cursor-pointer">
                    <div className="relative h-48 bg-neutral-100 overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3
                        className={`text-sm font-medium text-neutral-900 group-hover:text-${accent} transition-colors`}
                      >
                        {category.name}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1 mt-4 text-xs font-medium text-${accent}`}
                      >
                        {dict.actions.viewAll}{" "}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-wide">
        <div className="h-px bg-neutral-100" />
      </div>

      <section className="py-20">
        <div className="container-wide max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            {copy.chooseTitle}
          </h2>
          {copy.chooseParagraphs.map((paragraph, i) => (
            <p key={i} className="mt-4 text-neutral-500 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-wide text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            {copy.ctaTitle}
          </h2>
          <p className="text-neutral-500 mt-4 leading-relaxed">{copy.ctaBody}</p>
          <Link
            href={localizedHref("contact", locale)}
            className="group inline-flex items-center gap-2 mt-8 px-7 py-3 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
          >
            {dict.actions.getQuote}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
