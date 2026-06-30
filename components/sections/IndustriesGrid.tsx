"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref, type PageKey } from "@/lib/i18n/routes";
import { getHomeContent } from "@/lib/i18n/home-content";

const industryMeta: Array<{
  pageKey: PageKey;
  slug: string;
  division: string;
  image: string;
}> = [
  { pageKey: "carbon-application", slug: "aerospace", division: "carbon", image: "/images/industries/aerospace.webp" },
  { pageKey: "glass-application", slug: "wind-energy", division: "glass", image: "/images/industries/wind-energy.webp" },
  { pageKey: "glass-application", slug: "construction", division: "glass", image: "/images/industries/construction.webp" },
  { pageKey: "carbon-application", slug: "military-defense", division: "carbon", image: "/images/industries/military-defense.webp" },
  { pageKey: "carbon-application", slug: "new-energy", division: "carbon", image: "/images/industries/new-energy.webp" },
];

export function IndustriesGrid() {
  const locale = useLocale();
  const home = getHomeContent(locale);
  const industries = industryMeta.map((m, i) => ({ ...m, ...home.industries.items[i] }));
  return (
    <section className="bg-white section-padding">
      <div className="container-wide">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-12">
          {home.industries.heading}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {industries.map((industry, i) => (
            <Link
              key={industry.title}
              href={localizedHref(industry.pageKey, locale, { slug: industry.slug })}
              className={`group relative overflow-hidden rounded-xl block aspect-[16/9] ${
                i < 2 ? "col-span-2 lg:col-span-3" : "col-span-2 lg:col-span-2"
              }`}
            >
              <Image
                src={industry.image}
                alt={industry.title}
                fill
                quality={75}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span
                      className={`text-[11px] uppercase tracking-wider ${
                        industry.division === "carbon" ? "text-cyan-300" : "text-emerald-300"
                      }`}
                    >
                      {industry.division === "carbon"
                        ? home.divisions.carbon.label
                        : home.divisions.glass.label}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-white mt-1">
                      {industry.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-2 hidden sm:block">
                  {industry.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
