"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref, type PageKey } from "@/lib/i18n/routes";

const industries: Array<{
  title: string;
  description: string;
  pageKey: PageKey;
  slug: string;
  division: string;
}> = [
  {
    title: "Aerospace & Aviation",
    description: "Structural components, interior panels, and lightweight composites",
    pageKey: "carbon-application",
    slug: "aerospace",
    division: "carbon",
  },
  {
    title: "Wind Energy",
    description: "Turbine blades, nacelle covers, and structural reinforcements",
    pageKey: "glass-application",
    slug: "wind-energy",
    division: "glass",
  },
  {
    title: "Construction",
    description: "Insulation, waterproofing, and structural reinforcement materials",
    pageKey: "glass-application",
    slug: "construction",
    division: "glass",
  },
  {
    title: "Military & Defense",
    description: "Ballistic protection, stealth applications, and armored composites",
    pageKey: "carbon-application",
    slug: "military-defense",
    division: "carbon",
  },
  {
    title: "New Energy",
    description: "Fuel cells, battery separators, and energy storage systems",
    pageKey: "carbon-application",
    slug: "new-energy",
    division: "carbon",
  },
];

export function IndustriesGrid() {
  const locale = useLocale();
  return (
    <section className="bg-white section-padding">
      <div className="container-wide">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-20">
          Industries We Serve
        </h2>

        <div data-industry-list>
          {industries.map((industry, i) => (
            <Link
              key={industry.title}
              href={localizedHref(industry.pageKey, locale, { slug: industry.slug })}
              className="group block border-t border-neutral-100 py-6 sm:py-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="font-mono text-xs text-neutral-400 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-light text-neutral-700 group-hover:text-neutral-900 transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1 hidden sm:block">
                      {industry.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs uppercase tracking-wider hidden sm:block ${
                      industry.division === "carbon" ? "text-cyan-600" : "text-emerald-600"
                    }`}
                  >
                    {industry.division === "carbon" ? "Carbon" : "Glass"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
          <div className="border-t border-neutral-100" />
        </div>
      </div>
    </section>
  );
}
