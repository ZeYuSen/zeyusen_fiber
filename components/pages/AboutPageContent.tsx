"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { contactInfo } from "@/lib/contact";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref } from "@/lib/i18n/routes";
import { getPagesContent } from "@/lib/i18n/pages-content";
import { PageMediaHero } from "@/components/ui/PageMediaHero";
import { pageHeroImages } from "@/lib/site-images";

const valueAccents = ["bg-carbon-accent", "bg-accent-500", "bg-glass-accent", "bg-carbon-accent"];



const factoryGallery = {
  production: [
    { src: "/images/factory/production/0_0006_productionprocesses5-1.jpg", alt: "Production line - fiber laying" },
    { src: "/images/factory/production/0_0007_productionprocesses4-1.jpg", alt: "Production line - mat forming" },
    { src: "/images/factory/production/0_0008_productionprocesses3-1.jpg", alt: "Production line - rolling" },
    { src: "/images/factory/production/0_0009_productionprocesses2-1.jpg", alt: "Production line - cutting" },
    { src: "/images/factory/production/0_0010_productionprocesses-1.jpg", alt: "Production line - packaging" },
  ],
  inspection: [
    { src: "/images/factory/inspection/0_0012_inspectionequipment8-1.jpg", alt: "Testing equipment - tensile strength" },
    { src: "/images/factory/inspection/0_0013_inspectionequipment6-1.jpg", alt: "Testing equipment - thickness gauge" },
    { src: "/images/factory/inspection/0_0014_inspectionequipment5-1.jpg", alt: "Testing equipment - weight measurement" },
    { src: "/images/factory/inspection/0_0015_inspectionequipment3-1.jpg", alt: "Testing equipment - microscope" },
    { src: "/images/factory/inspection/0_0016_inspectionequipment2-1.jpg", alt: "Testing equipment - lab overview" },
  ],
  testing: [
    { src: "/images/factory/testing/0_0018_processtesting4-1.jpg", alt: "Process testing - sample preparation" },
    { src: "/images/factory/testing/0_0019_processtesting3-1.jpg", alt: "Process testing - quality check" },
    { src: "/images/factory/testing/0_0020_processtesting2-1.jpg", alt: "Process testing - material analysis" },
  ],
  exhibition: [
    { src: "/images/factory/exhibition/0_0001_2023exhibitions.jpg", alt: "2023 International Exhibition" },
    { src: "/images/factory/exhibition/0_0002_2019exhibitions-1.jpg", alt: "2019 Trade Show" },
    { src: "/images/factory/exhibition/0_0003_2018exhibitions-1.jpg", alt: "2018 Industry Exhibition" },
  ],
};

const factoryTabKeys = ["production", "inspection", "testing", "exhibition"] as const;

const easing = [0.22, 1, 0.36, 1] as const;

function FactorySection() {
  const [activeTab, setActiveTab] = useState<keyof typeof factoryGallery>("production");
  const images = factoryGallery[activeTab];
  const f = getPagesContent(useLocale()).about.factory;
  const factoryTabs = factoryTabKeys.map((key) => ({ key, label: f.tabs[key] }));

  return (
    <section className="section-padding" style={{ backgroundColor: "#0C1128" }}>
      <div className="container-wide">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-5">
            <span className="w-8 h-px bg-cyan-400" />
            {f.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            {f.title}
          </h2>
          <p className="text-white/50 mt-6 max-w-2xl leading-relaxed text-lg">
            {f.intro}
          </p>
        </div>

        {/* Underline tab strip */}
        <div className="flex flex-wrap gap-8 border-b border-white/10 mt-14">
          {factoryTabs.map((tab, i) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative flex items-center gap-3 py-4 text-left transition-colors"
              >
                <span className={`text-xs font-bold tabular-nums shrink-0 ${isActive ? "text-cyan-400" : "text-white/30"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-sm font-semibold ${isActive ? "text-white" : "text-white/50 hover:text-white/80"}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="about-factory-tab-underline"
                    className="absolute -bottom-px left-0 right-0 h-0.5 bg-cyan-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Image gallery — floats directly on the section background */}
        <div className="pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: easing }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {images.map((img, i) => (
                <div
                  key={`${activeTab}-${i}`}
                  className="relative aspect-[4/3] overflow-hidden bg-[#0C1128] group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={72}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Factory Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mt-16 border-t border-white/10 pt-12">
          {f.stats.map((stat) => (
            <div key={stat.label}>
              <span className="block text-4xl sm:text-5xl font-semibold text-white tabular-nums tracking-tight leading-none">
                {stat.num}
                {stat.unit && <span className="text-lg text-white/40 ml-1 font-normal">{stat.unit}</span>}
              </span>
              <p className="text-xs uppercase tracking-[0.15em] text-white/40 mt-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSection({
  eyebrow,
  title,
  milestones,
}: {
  eyebrow: string;
  title: string;
  milestones: { year: string; event: string }[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  // Track scroll progress through the rail so the gradient fills as you scroll.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 55%"],
  });
  const fillScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="type-caption text-neutral-400">{eyebrow}</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-neutral-900 mt-4 tracking-tight leading-[1.05] lg:sticky lg:top-32">
              {title}
            </h2>
          </div>

          <div className="lg:col-span-8">
            {/* The marker column is a fixed 40px wide; the rail lives at its
                horizontal center (left-5 = 1.25rem) so dots + line always align. */}
            <div ref={railRef} className="relative">
              {/* Static track */}
              <div className="absolute left-5 top-3 bottom-3 w-px -translate-x-1/2 bg-neutral-200/70" />
              {/* Animated gradient fill, scaled by scroll progress */}
              <motion.div
                aria-hidden
                style={{ scaleY: fillScale }}
                className="absolute left-5 top-3 bottom-3 w-[2px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-carbon-accent via-glass-accent to-glass-accent"
              />

              <ul>
                {milestones.map((item) => (
                  <motion.li
                    key={item.year}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
                    transition={{ duration: 0.6, ease: easing, delay: 0.04 }}
                    className="group relative grid grid-cols-[2.5rem_1fr] gap-6 pb-11 last:pb-0"
                  >
                    {/* Marker */}
                    <div className="relative flex justify-center pt-1">
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
                        transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.12 }}
                        className="relative z-10 mt-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white ring-1 ring-neutral-200 shadow-sm"
                      >
                        <span className="h-2 w-2 rounded-full bg-gradient-to-br from-carbon-accent to-glass-accent transition-transform duration-300 group-hover:scale-125" />
                        {/* Soft glow halo on hover */}
                        <span className="absolute inset-0 rounded-full bg-carbon-accent/25 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.span>
                    </div>

                    {/* Content */}
                    <div className="pt-0.5 -mt-0.5">
                      <span className="inline-block font-mono text-xs font-semibold tracking-[0.15em] text-carbon-accent tabular-nums">
                        {item.year}
                      </span>
                      <p className="mt-1.5 text-neutral-600 leading-relaxed transition-colors duration-300 group-hover:text-neutral-900">
                        {item.event}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPageContent({ nav }: { nav?: { home: string; current: string } }) {
  const locale = useLocale();
  const c = getPagesContent(locale).about;
  const values = c.values.map((v, i) => ({ ...v, accent: valueAccents[i] }));
  const milestones = c.milestones;
  return (
    <>
      <PageMediaHero
        eyebrow={c.eyebrow}
        title={c.title}
        description={<>{contactInfo.company} {c.lead}</>}
        image={pageHeroImages.about}
        imageAlt={c.factory.title}
        objectPosition="center 45%"
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

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <p className="type-caption text-neutral-400 mb-6">{c.eyebrow}</p>
              <p className="text-2xl sm:text-3xl text-neutral-900 leading-[1.4] font-light tracking-tight">
                {c.story1}
              </p>
              <p className="text-neutral-500 leading-relaxed mt-8 text-lg">
                {c.story2.pre}
                <Link
                  href={localizedHref("carbon-fiber", locale)}
                  className="text-carbon-accent hover:text-neutral-900 underline underline-offset-2 transition-colors"
                >
                  {c.story2.carbonLink}
                </Link>
                {c.story2.mid}
                <Link
                  href={localizedHref("glass-fiber", locale)}
                  className="text-glass-accent hover:text-neutral-900 underline underline-offset-2 transition-colors"
                >
                  {c.story2.glassLink}
                </Link>
                {c.story2.post}
              </p>
              <p className="text-neutral-500 leading-relaxed mt-5 text-lg">
                {c.story3.pre}
                <Link
                  href={localizedHref("services", locale)}
                  className="text-neutral-700 hover:text-neutral-900 underline underline-offset-2 transition-colors"
                >
                  {c.story3.servicesLink}
                </Link>
                {c.story3.post}
              </p>
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-neutral-100 lg:pl-12">
              <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                {c.quickStats.map((stat) => (
                  <div key={stat.label}>
                    <span className="block text-5xl sm:text-6xl font-semibold text-neutral-900 tabular-nums tracking-tight leading-none">
                      {stat.num}
                    </span>
                    <p className="text-xs uppercase tracking-[0.15em] text-neutral-400 mt-3">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Tour */}
      <FactorySection />

      {/* Values */}
      <section className="section-padding bg-neutral-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="type-caption text-neutral-400">{c.whyEyebrow}</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 mt-4 tracking-tight leading-[1.05]">
              {c.whyTitle}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 mt-16 border border-neutral-200 rounded-2xl overflow-hidden">
            {values.map((item, i) => (
              <div
                key={item.title}
                className="group relative p-8 lg:p-10 bg-neutral-50 hover:bg-white transition-colors"
              >
                <span
                  className={`absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${item.accent}`}
                />
                <span className="block text-6xl font-semibold text-neutral-200 tabular-nums leading-none group-hover:text-neutral-300 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-neutral-900 font-semibold mt-6 text-lg">
                  {item.title}
                </h3>
                <p className="text-neutral-500 mt-3 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <TimelineSection
        eyebrow={c.journeyEyebrow}
        title={c.journeyTitle}
        milestones={milestones}
      />
    </>
  );
}
