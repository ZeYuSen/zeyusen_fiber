"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref, type PageKey } from "@/lib/i18n/routes";
import { getHomeContent } from "@/lib/i18n/home-content";

const divisionMeta: Array<{
  id: "carbon" | "glass";
  image: string;
  pageKey: PageKey;
  accentColor: string;
}> = [
  {
    id: "carbon",
    image: "/images/carbon-fiber/carbon_bg.webp",
    pageKey: "carbon-fiber",
    accentColor: "cyan",
  },
  {
    id: "glass",
    image: "/images/glass-fiber/glass_bg.webp",
    pageKey: "glass-fiber",
    accentColor: "emerald",
  },
];

export function DivisionsSplit() {
  const locale = useLocale();
  const home = getHomeContent(locale);
  const divisions = divisionMeta.map((m) => ({ ...m, ...home.divisions[m.id] }));
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {divisions.map((div) => (
            <Link
              key={div.id}
              href={localizedHref(div.pageKey, locale)}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
            >
              {/* Background image */}
              <Image
                src={div.image}
                alt={div.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                <p className={`text-xs font-medium uppercase tracking-wider ${
                  div.accentColor === "cyan" ? "text-cyan-400" : "text-emerald-400"
                } mb-3`}>
                  {div.label}
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                  {div.headline}
                </h2>
                <p className="text-sm text-white/70 leading-relaxed max-w-md mb-5">
                  {div.description}
                </p>
                <span className={`inline-flex items-center gap-2 text-sm font-medium ${
                  div.accentColor === "cyan" ? "text-cyan-400" : "text-emerald-400"
                } group-hover:gap-3 transition-all duration-300`}>
                  {home.exploreProducts} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
