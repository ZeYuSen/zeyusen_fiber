"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref } from "@/lib/i18n/routes";
import { getPagesContent } from "@/lib/i18n/pages-content";
import { PageMediaHero } from "@/components/ui/PageMediaHero";
import { pageHeroImages } from "@/lib/site-images";
import { ServiceFlowAccordion } from "@/components/sections/ServiceFlowAccordion";

export default function ServicesPageContent({ nav }: { nav?: { home: string; current: string } }) {
  const locale = useLocale();
  const c = getPagesContent(locale).services;

  return (
    <>
      <PageMediaHero
        eyebrow={c.eyebrow}
        title={c.title}
        description={c.lead1}
        image={pageHeroImages.services}
        imageAlt={c.servicesHeading}
        objectPosition="center 42%"
        breadcrumbs={
          nav ? (
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
              <Link href={localizedHref("home", locale)}>{nav.home}</Link>
              <span>/</span>
              <span className="text-white/90">{nav.current}</span>
            </nav>
          ) : undefined
        }
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="type-caption text-neutral-400">{c.eyebrow}</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 mt-4 tracking-tight leading-[1.05]">
                {c.servicesHeading}
              </h2>
            </div>
            <div className="lg:col-span-7 lg:border-l lg:border-neutral-100 lg:pl-16">
              <p className="text-neutral-500 leading-relaxed text-lg">
                {c.lead2.pre}
                <Link
                  href={localizedHref("carbon-fiber", locale)}
                  className="text-carbon-accent hover:text-neutral-900 underline underline-offset-2 transition-colors"
                >
                  {c.lead2.carbonLink}
                </Link>
                {c.lead2.mid}
                <Link
                  href={localizedHref("glass-fiber", locale)}
                  className="text-glass-accent hover:text-neutral-900 underline underline-offset-2 transition-colors"
                >
                  {c.lead2.glassLink}
                </Link>
                {c.lead2.post}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceFlowAccordion
        heading={c.flowHeading}
        subtitle={c.flowSubtitle}
        services={c.services}
      />

      {/* CTA */}
      <section className="section-padding" style={{ backgroundColor: "#0C1128" }}>
        <div className="container-wide text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.05]">
            {c.ctaTitle}
          </h2>
          <p className="mt-5 text-white/50 leading-relaxed text-lg">
            {c.ctaBody}
          </p>
          <Link
            href={localizedHref("contact", locale)}
            className="group inline-flex items-center gap-2 mt-9 px-7 py-3 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
          >
            {c.ctaButton}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
