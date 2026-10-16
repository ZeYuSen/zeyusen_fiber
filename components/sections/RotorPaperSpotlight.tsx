import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import { getHomeContent } from "@/lib/i18n/home-content";
import { getBlogPost } from "@/data/blog";

// Lead product line on the homepage: desiccant rotor forming paper. Server
// component so the localized guide titles come straight from the blog files.
const rotorImage =
  "/images/glass-fiber/01-fiberglass-tissue-mat/04-rotor-paper/desiccant-rotor-paper-white-rolls-packaging.jpg";

const rotorGuideSlugs = [
  "desiccant-rotor-substrate-paper-selection-guide",
  "desiccant-rotor-paper-vs-enthalpy-wheel-media",
  "desiccant-rotor-paper-corrugation-trial-checklist",
];

const titleClass =
  "text-[clamp(2rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[#E6EAEE] text-balance [&:lang(ko)]:tracking-normal [&:lang(zh)]:tracking-normal";

export function RotorPaperSpotlight({ locale }: { locale: Locale }) {
  const c = getHomeContent(locale).rotor;
  const guides = rotorGuideSlugs
    .map((slug) => getBlogPost(locale, slug))
    .filter((post) => post !== undefined);

  return (
    <section data-tone="night" data-world="still" className="relative py-28 lg:py-40">
      <div className="container-wide grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <p data-reveal="up" className="type-caption text-white/50">
            {c.eyebrow}
          </p>
          <h2 data-reveal="text" className={`mt-4 ${titleClass}`}>
            {c.title}
          </h2>
          <p data-reveal="up" className="stage-lede mt-6 max-w-xl">
            {c.lede}
          </p>
          <ul data-reveal="up" className="mt-10 space-y-4">
            {c.points.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-white/80">
                <Check className="mt-1 h-4 w-4 shrink-0 text-glass-accent" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div data-reveal="up" className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href={localizedHref("glass-product", locale, { category: "tissue-mat", product: "rotor-paper" })}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-medium text-black transition-colors hover:bg-white/90"
            >
              {c.ctaProduct}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={localizedHref("glass-application", locale, { slug: "desiccant-rotors" })}
              className="inline-flex items-center rounded-full border border-white/30 px-7 py-3 font-medium text-white/90 transition-colors hover:border-white/70 hover:text-white"
            >
              {c.ctaApplication}
            </Link>
            <Link
              href={localizedHref("contact", locale)}
              className="inline-flex items-center gap-2 border-b border-white/25 pb-1 text-sm font-medium text-white/80 transition-all hover:gap-3 hover:border-white/70 hover:text-white"
            >
              {c.ctaSample}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div data-reveal="image" className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white/[0.03]">
            <Image
              src={rotorImage}
              alt={c.imageAlt}
              fill
              className="fx-grade object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          {guides.length > 0 && (
            <div data-reveal="up" className="mt-10">
              <h3 className="type-caption text-white/50">{c.guidesHeading}</h3>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {guides.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={localizedHref("blog-post", locale, { slug: post.slug })}
                      className="group flex items-center justify-between gap-4 py-4 text-sm text-white/75 transition-colors hover:text-white"
                    >
                      <span>{post.title}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
