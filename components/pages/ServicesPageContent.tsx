"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref } from "@/lib/i18n/routes";
import { getPagesContent } from "@/lib/i18n/pages-content";
import { PageMediaHero } from "@/components/ui/PageMediaHero";
import { pageHeroImages } from "@/lib/site-images";
import { ServiceFlowAccordion } from "@/components/sections/ServiceFlowAccordion";

export default function ServicesPageContent() {
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
      />

      <section className="pt-20 pb-12">
        <div className="container-wide">
          <p className="max-w-3xl text-neutral-500 leading-relaxed">
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
      </section>

      <ServiceFlowAccordion
        heading={c.flowHeading}
        subtitle={c.flowSubtitle}
        services={c.services}
      />

      {/* CTA */}
      <section className="py-24">
        <div className="container-wide text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            {c.ctaTitle}
          </h2>
          <p className="text-neutral-500 mt-4 leading-relaxed">
            {c.ctaBody}
          </p>
          <Link
            href={localizedHref("contact", locale)}
            className="group inline-flex items-center gap-2 mt-8 px-7 py-3 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
          >
            {c.ctaButton}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
