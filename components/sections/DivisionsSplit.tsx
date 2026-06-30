"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref, type PageKey } from "@/lib/i18n/routes";
import { getHomeContent } from "@/lib/i18n/home-content";

const divisionMeta: Array<{
  id: "carbon" | "glass";
  number: string;
  image: string;
  pageKey: PageKey;
}> = [
  {
    id: "carbon",
    number: "01",
    image: "/images/carbon-fiber/carbon_division.webp",
    pageKey: "carbon-fiber",
  },
  {
    id: "glass",
    number: "02",
    image: "/images/glass-fiber/glass_division.webp",
    pageKey: "glass-fiber",
  },
];

export function DivisionsSplit() {
  const locale = useLocale();
  const home = getHomeContent(locale);
  const divisions = divisionMeta.map((m) => ({ ...m, ...home.divisions[m.id] }));

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-wide">
        {/* Division features — editorial, numbered, asymmetric, edge-bleed */}
        <div className="flex flex-col gap-20 sm:gap-32">
          {divisions.map((div, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.article
                key={div.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* Text block */}
                <div
                  className={`lg:col-span-4 ${
                    reversed ? "lg:order-2 lg:col-start-9" : "lg:order-1"
                  }`}
                >
                  <span className="block text-6xl sm:text-7xl font-semibold text-neutral-200 tabular-nums leading-none select-none">
                    {div.number}
                  </span>
                  <h3 className="mt-5 text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight">
                    {div.label}
                  </h3>
                  <p className="mt-4 text-lg text-neutral-500 leading-relaxed max-w-md">
                    {div.headline}
                  </p>
                  <Link
                    href={localizedHref(div.pageKey, locale)}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 border-b border-neutral-300 pb-1 transition-all duration-300 hover:gap-3 hover:border-neutral-900"
                  >
                    {home.exploreProducts}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Image block — bleeds to the viewport edge */}
                <div
                  className={`lg:col-span-8 ${
                    reversed
                      ? "lg:order-1 lg:col-start-1 -ml-6 sm:-ml-10 lg:-ml-16"
                      : "lg:order-2 -mr-6 sm:-mr-10 lg:-mr-16"
                  }`}
                >
                  <div
                    className={`relative aspect-[5/2] overflow-hidden bg-neutral-100 ${
                      reversed ? "rounded-r-sm" : "rounded-l-sm"
                    }`}
                  >
                    <Image
                      src={div.image}
                      alt={div.label}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
