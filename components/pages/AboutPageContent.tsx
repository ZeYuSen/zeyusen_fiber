"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

const FACTORY_TAB_INACTIVE = ["#1E3A8A", "#172554", "#0F172A", "#0F172A"];
const FACTORY_TAB_ACTIVE = "#1D4ED8";
const easing = [0.22, 1, 0.36, 1] as const;

function FactorySection() {
  const [activeTab, setActiveTab] = useState<keyof typeof factoryGallery>("production");
  const images = factoryGallery[activeTab];
  const f = getPagesContent(useLocale()).about.factory;
  const factoryTabs = factoryTabKeys.map((key) => ({ key, label: f.tabs[key] }));

  return (
    <section className="py-24" style={{ backgroundColor: "#0C1128" }}>
      <div className="container-wide">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">
            <span className="w-6 h-px bg-cyan-400" />
            {f.eyebrow}
            <span className="w-6 h-px bg-cyan-400" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-3">
            {f.title}
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl leading-relaxed">
            {f.intro}
          </p>
        </div>

        {/* Numbered tab strip */}
        <div className="flex rounded-t-2xl overflow-hidden mt-10">
          {factoryTabs.map((tab, i) => {
            const isActive = activeTab === tab.key;
            const bg = isActive ? FACTORY_TAB_ACTIVE : FACTORY_TAB_INACTIVE[i] ?? "#0F172A";
            return (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-1 flex items-center gap-3 px-6 py-4 text-left transition-colors"
                style={{ backgroundColor: bg }}
                animate={{ backgroundColor: bg }}
                transition={{ duration: 0.4, ease: easing }}
              >
                <span className={`text-xs font-bold tabular-nums shrink-0 ${isActive ? "text-white/60" : "text-white/30"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-sm font-semibold ${isActive ? "text-white" : "text-white/50"}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="factory-tab-dot"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Gallery Panel */}
        <div className="rounded-b-2xl overflow-hidden p-6 sm:p-8" style={{ backgroundColor: "#162042" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: easing }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
            >
              {images.map((img, i) => (
                <div
                  key={`${activeTab}-${i}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#0C1128] group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Factory Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {f.stats.map((stat) => (
            <div key={stat.label} className="p-5 bg-white/5 border border-white/10 rounded-lg text-center">
              <span className="text-2xl font-light text-white">
                {stat.num}
                {stat.unit && <span className="text-sm text-white/40 ml-1">{stat.unit}</span>}
              </span>
              <p className="text-xs uppercase tracking-wider text-white/40 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPageContent() {
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
      />

      {/* Company Story */}
      <section className="py-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="text-lg text-neutral-700 leading-relaxed">
                {c.story1}
              </p>
              <p className="text-neutral-500 leading-relaxed mt-5">
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
              <p className="text-neutral-500 leading-relaxed mt-5">
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
            <div
              className="grid grid-cols-2 gap-4"
            >
              {c.quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-5 bg-neutral-50 border border-neutral-100 rounded-lg"
                >
                  <span className="text-2xl font-light text-neutral-900">
                    {stat.num}
                  </span>
                  <p className="text-xs uppercase tracking-wider text-neutral-400 mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide"><div className="h-px bg-neutral-100" /></div>

      {/* Factory Tour */}
      <FactorySection />

      <div className="container-wide"><div className="h-px bg-neutral-100" /></div>

      {/* Values */}
      <section className="py-24">
        <div className="container-wide">
          <div>
            <p className="type-caption text-neutral-400">{c.whyEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-3">
              {c.whyTitle}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {values.map((item, i) => (
              <div
                key={item.title}
                className="group relative p-7 bg-white border border-neutral-100 rounded-xl overflow-hidden hover:border-neutral-200 transition-colors"
              >
                <span
                  className={`absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${item.accent}`}
                />
                <span className="text-4xl font-bold text-neutral-200 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-neutral-900 font-medium mt-4 text-sm">
                  {item.title}
                </h3>
                <p className="text-neutral-500 mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-wide"><div className="h-px bg-neutral-100" /></div>

      {/* Timeline */}
      <section className="py-24">
        <div className="container-wide">
          <div>
            <p className="type-caption text-neutral-400">{c.journeyEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-3">
              {c.journeyTitle}
            </h2>
          </div>

          <div className="mt-12 max-w-xl">
            {milestones.map((item, i) => (
              <div
                key={item.year}
                className="flex items-start gap-6 pb-8 last:pb-0 relative"
              >
                {i < milestones.length - 1 && (
                  <div className="absolute left-[2.35rem] top-7 bottom-0 w-px bg-neutral-100" />
                )}
                <span className="font-mono text-xs text-carbon-accent w-10 pt-0.5 flex-shrink-0 text-right">
                  {item.year}
                </span>
                <div className="mt-2 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-br from-carbon-accent to-glass-accent" />
                </div>
                <p className="text-neutral-600 text-sm pt-0.5">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
