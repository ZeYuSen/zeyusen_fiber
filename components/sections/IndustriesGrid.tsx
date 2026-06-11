"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

const industries = [
  {
    title: "Aerospace & Aviation",
    description: "Structural components, interior panels, and lightweight composites",
    href: "/carbon-fiber/applications/aerospace",
    division: "carbon",
  },
  {
    title: "Wind Energy",
    description: "Turbine blades, nacelle covers, and structural reinforcements",
    href: "/glass-fiber/applications/wind-energy",
    division: "glass",
  },
  {
    title: "Construction",
    description: "Insulation, waterproofing, and structural reinforcement materials",
    href: "/glass-fiber/applications/construction",
    division: "glass",
  },
  {
    title: "Military & Defense",
    description: "Ballistic protection, stealth applications, and armored composites",
    href: "/carbon-fiber/applications/military-defense",
    division: "carbon",
  },
  {
    title: "New Energy",
    description: "Fuel cells, battery separators, and energy storage systems",
    href: "/carbon-fiber/applications/new-energy",
    division: "carbon",
  },
];

export function IndustriesGrid() {
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
              href={industry.href}
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
