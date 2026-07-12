"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref, type PageKey } from "@/lib/i18n/routes";
import { getHomeContent } from "@/lib/i18n/home-content";
import { getApplicationImage } from "@/lib/site-images";

const industryMeta: Array<{ pageKey: PageKey; slug: string; division: "carbon" | "glass" }> = [
  { pageKey: "carbon-application", slug: "aerospace", division: "carbon" },
  { pageKey: "glass-application", slug: "wind-energy", division: "glass" },
  { pageKey: "glass-application", slug: "construction", division: "glass" },
  { pageKey: "carbon-application", slug: "military-defense", division: "carbon" },
  { pageKey: "carbon-application", slug: "new-energy", division: "carbon" },
];

const STRIP_BG = ["#2563EB", "#1D4ED8", "#1E40AF", "#1E3A8A", "#0F172A"];
const easing = [0.22, 1, 0.36, 1] as const;

export function IndustriesGrid() {
  const locale = useLocale();
  const home = getHomeContent(locale);
  const industries = industryMeta.map((m, i) => ({ ...m, ...home.industries.items[i] }));

  const [active, setActive] = useState<number>(0);

  return (
    <section className="py-20 lg:py-28 bg-neutral-50">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easing }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            {home.industries.heading}
          </h2>
          <p className="mt-4 text-neutral-500 max-w-2xl mx-auto text-[15px]">
            {home.industries.subtitle}
          </p>
        </motion.div>

        {/* Desktop horizontal accordion */}
        <div className="hidden md:flex h-[540px] lg:h-[580px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          {industries.map((industry, index) => {
            const isActive = index === active;
            const bgColor = STRIP_BG[Math.min(index, STRIP_BG.length - 1)];
            const accentClass = industry.division === "carbon"
              ? "text-cyan-400 border-cyan-400/40"
              : "text-emerald-400 border-emerald-400/40";
            const labelText = industry.division === "carbon"
              ? home.divisions.carbon.label
              : home.divisions.glass.label;

            return (
              <motion.div
                key={industry.slug}
                className="relative cursor-pointer overflow-hidden"
                style={{ backgroundColor: isActive ? "#EFF6FF" : bgColor }}
                animate={{ flex: isActive ? 6 : 0.5 }}
                transition={{ duration: 0.55, ease: easing }}
                onClick={() => setActive(index)}
              >
                {/* Collapsed strip */}
                {!isActive && (
                  <div className="absolute inset-0 flex flex-col items-center pt-8 pb-8 border-l border-white/10">
                    <span className="text-white/50 text-xs font-bold tracking-widest">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-6 flex-1 flex items-center">
                      <span
                        className="text-white/90 font-semibold text-[13px] whitespace-nowrap"
                        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                      >
                        {industry.title}
                      </span>
                    </div>
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
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2"
                    >
                      {/* Text side */}
                      <div className="flex flex-col justify-center px-8 lg:px-12 py-10">
                        <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border px-2.5 py-1 rounded-full self-start ${accentClass}`}>
                          {labelText}
                        </span>
                        <h3 className="text-2xl lg:text-[2rem] font-bold text-neutral-900 mt-4 leading-tight">
                          {industry.title}
                        </h3>
                        <p className="text-neutral-600 mt-4 leading-relaxed text-[15px] max-w-sm">
                          {industry.description}
                        </p>
                        <Link
                          href={localizedHref(industry.pageKey, locale, { slug: industry.slug })}
                          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-blue-600 transition-colors group"
                          onClick={e => e.stopPropagation()}
                        >
                          {home.exploreProducts}
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                      {/* Image side */}
                      <div className="relative hidden lg:block">
                        <Image
                          src={getApplicationImage(industry.slug, industry.division)}
                          alt={`${industry.title} — ${home.industries.imageNote}`}
                          fill sizes="45vw"
                          quality={75}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#EFF6FF] via-[#EFF6FF]/30 to-transparent w-2/5" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile vertical accordion */}
        <div className="md:hidden flex flex-col gap-3">
          {industries.map((industry, index) => {
            const isActive = index === (active === -1 ? 0 : active);
            const accentClass = industry.division === "carbon" ? "bg-cyan-500" : "bg-emerald-500";
            return (
              <div key={industry.slug} className="rounded-xl overflow-hidden border border-neutral-200">
                <button
                  onClick={() => setActive(index)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors ${
                    isActive ? "bg-blue-600 text-white" : "bg-white text-neutral-800 hover:bg-neutral-50"
                  }`}
                >
                  <span className={`text-xs font-bold ${isActive ? "text-white/60" : "text-neutral-400"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${accentClass}`} />
                  <span className="font-medium text-sm">{industry.title}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easing }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 bg-white">
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                          <Image
                            src={getApplicationImage(industry.slug, industry.division)}
                            alt={`${industry.title} — ${home.industries.imageNote}`}
                            fill sizes="100vw" quality={75} className="object-cover"
                          />
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">{industry.description}</p>
                        <Link
                          href={localizedHref(industry.pageKey, locale, { slug: industry.slug })}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
                        >
                          {home.exploreProducts} <ArrowUpRight className="w-3.5 h-3.5" />
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
