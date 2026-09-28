"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref, type PageKey, type RouteParams } from "@/lib/i18n/routes";
import { getHomeContent } from "@/lib/i18n/home-content";
import { getApplicationImage } from "@/lib/site-images";

const industryMeta: Array<{
  pageKey: PageKey;
  params: RouteParams;
  division: "carbon" | "glass";
  image: string;
}> = [
  {
    pageKey: "carbon-product",
    params: { category: "carbon-fiber-mat", product: "surface-mat-10g" },
    division: "carbon",
    image: "/images/carbon-fiber/05-carbon-fiber-mat/01-carbon-surface-mat-10g/carbon-fiber-surface-mat-10gsm-sheet.jpg",
  },
  {
    pageKey: "glass-product",
    params: { category: "tissue-mat", product: "rotor-paper" },
    division: "glass",
    image: "/images/glass-fiber/01-fiberglass-tissue-mat/04-rotor-paper/desiccant-rotor-substrate-paper-white-roll.jpg",
  },
  { pageKey: "glass-application", params: { slug: "construction" }, division: "glass", image: getApplicationImage("construction", "glass") },
  { pageKey: "carbon-application", params: { slug: "military-defense" }, division: "carbon", image: getApplicationImage("military-defense", "carbon") },
  { pageKey: "carbon-application", params: { slug: "new-energy" }, division: "carbon", image: getApplicationImage("new-energy", "carbon") },
];

const easing = [0.22, 1, 0.36, 1] as const;

const titleClass =
  "text-[clamp(2rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[#E6EAEE] text-balance [&:lang(ko)]:tracking-normal [&:lang(zh)]:tracking-normal";

export function IndustriesGrid() {
  const locale = useLocale();
  const home = getHomeContent(locale);
  const industries = industryMeta.map((m, i) => ({ ...m, ...home.industries.items[i] }));

  const [active, setActive] = useState<number>(0);

  return (
    <section data-tone="night" data-world="survey" className="relative py-28 lg:py-40">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-14 text-center lg:mb-20">
          <h2 data-reveal="text" className={titleClass}>
            {home.industries.heading}
          </h2>
          <p data-reveal="up" className="stage-lede mx-auto mt-5 max-w-2xl">
            {home.industries.subtitle}
          </p>
        </div>

        {/* Desktop horizontal accordion — each strip is its industry's own
            frame, held in the dark until it opens. */}
        <div
          data-reveal="up"
          className="hidden h-[540px] overflow-hidden rounded-sm bg-[#080A0D] ring-1 ring-white/10 md:flex lg:h-[580px]"
        >
          {industries.map((industry, index) => {
            const isActive = index === active;
            const labelText = industry.division === "carbon"
              ? home.divisions.carbon.label
              : home.divisions.glass.label;

            return (
              <motion.div
                key={`${industry.pageKey}-${index}`}
                className={`relative overflow-hidden ${isActive ? "" : "cursor-pointer"} ${index > 0 ? "border-l border-white/10" : ""}`}
                animate={{ flex: isActive ? 6 : 0.5 }}
                transition={{ duration: 1.1, ease: easing }}
                onClick={() => setActive(index)}
              >
                {/* The frame: a fixed-width plate the strip opens over, so it
                    is uncovered like a curtain instead of being rescaled. */}
                <div
                  className={`absolute inset-y-0 left-1/2 w-[78vw] max-w-[1000px] -translate-x-1/2 transition-[filter] duration-1000 ${
                    isActive ? "grayscale-0" : "grayscale"
                  }`}
                >
                  <Image
                    src={industry.image}
                    alt={`${industry.title} — ${home.industries.imageNote}`}
                    fill
                    sizes="(max-width: 1024px) 78vw, 1000px"
                    quality={75}
                    className="fx-grade object-cover"
                  />
                </div>
                <div
                  className={`absolute inset-0 bg-[#080A0D] transition-opacity duration-1000 ${
                    isActive ? "opacity-0" : "opacity-[0.86]"
                  }`}
                />

                {/* Collapsed strip */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center py-10">
                    <span
                      className="whitespace-nowrap text-[13px] font-medium tracking-wide text-[#8FA3B5]"
                      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                    >
                      {industry.title}
                    </span>
                  </div>
                )}

                {/* Expanded panel */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={`ind-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="absolute inset-0"
                    >
                      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#080A0D] via-[#080A0D]/75 to-transparent lg:w-3/4" />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#080A0D]/70 to-transparent" />
                      <div className="relative flex h-full max-w-md flex-col justify-end px-8 pb-12 lg:max-w-lg lg:px-12 lg:pb-14">
                        <span className="self-start rounded-full border border-white/15 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#8FA3B5]">
                          {labelText}
                        </span>
                        <h3 className="mt-5 text-2xl font-medium leading-tight tracking-[-0.01em] text-[#E6EAEE] lg:text-[2rem]">
                          {industry.title}
                        </h3>
                        <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                          {industry.description}
                        </p>
                        <Link
                          href={localizedHref(industry.pageKey, locale, industry.params)}
                          className="group mt-8 inline-flex items-center gap-2 self-start border-b border-white/25 pb-1 text-sm font-medium text-white/85 transition-colors hover:border-white/70 hover:text-white"
                          onClick={e => e.stopPropagation()}
                        >
                          {home.exploreProducts}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile vertical accordion */}
        <div className="flex flex-col border-b border-white/10 md:hidden">
          {industries.map((industry, index) => {
            const isActive = index === (active === -1 ? 0 : active);
            return (
              <div key={`${industry.pageKey}-${index}`} className="border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-expanded={isActive}
                  className={`w-full py-5 text-left text-base font-medium transition-colors ${
                    isActive ? "text-[#E6EAEE]" : "text-white/55 hover:text-white/80"
                  }`}
                >
                  {industry.title}
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: easing }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7">
                        <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-sm bg-white/[0.03]">
                          <Image
                            src={industry.image}
                            alt={`${industry.title} — ${home.industries.imageNote}`}
                            fill sizes="100vw" quality={75} className="fx-grade object-cover"
                          />
                        </div>
                        <p className="text-sm leading-relaxed text-white/70">{industry.description}</p>
                        <Link
                          href={localizedHref(industry.pageKey, locale, industry.params)}
                          className="mt-5 inline-flex items-center gap-1.5 border-b border-white/25 pb-1 text-sm font-medium text-white/85"
                        >
                          {home.exploreProducts} <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
