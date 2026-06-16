"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Factory, Globe, Users } from "lucide-react";
import { contactInfo } from "@/lib/contact";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref } from "@/lib/i18n/routes";
import { getPagesContent } from "@/lib/i18n/pages-content";

const valueIcons = [Factory, Award, Globe, Users];
const valueIconColors = ["text-carbon-accent", "text-accent-500", "text-glass-accent", "text-carbon-accent"];



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

function FactorySection() {
  const [activeTab, setActiveTab] = useState<keyof typeof factoryGallery>("production");
  const images = factoryGallery[activeTab];
  const f = getPagesContent(useLocale()).about.factory;
  const factoryTabs = factoryTabKeys.map((key) => ({ key, label: f.tabs[key] }));

  return (
    <section className="py-24">
      <div className="container-wide">
        <div>
          <p className="type-caption text-neutral-400">{f.eyebrow}</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-3">
            {f.title}
          </h2>
          <p className="text-neutral-500 mt-4 max-w-2xl leading-relaxed">
            {f.intro}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mt-10 mb-8">
          {factoryTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                activeTab === tab.key
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {images.map((img, i) => (
            <div
              key={`${activeTab}-${i}`}
              className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100 group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Factory Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {f.stats.map((stat) => (
            <div key={stat.label} className="p-5 bg-neutral-50 border border-neutral-100 rounded-lg text-center">
              <span className="text-2xl font-light text-neutral-900">
                {stat.num}
                {stat.unit && <span className="text-sm text-neutral-400 ml-1">{stat.unit}</span>}
              </span>
              <p className="text-xs uppercase tracking-wider text-neutral-400 mt-2">{stat.label}</p>
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
  const values = c.values.map((v, i) => ({ ...v, icon: valueIcons[i], iconColor: valueIconColors[i] }));
  const milestones = c.milestones;
  return (
    <>
      {/* Page Header */}
      <section className="pt-36 pb-16">
        <div className="container-wide">
          <div>
            <p className="type-caption text-neutral-400">{c.eyebrow}</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mt-3">
              {c.title}
            </h1>
	            <p className="text-neutral-500 mt-4 max-w-2xl leading-relaxed">
	              {contactInfo.company} {c.lead}
	            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="pb-24">
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
            {values.map((item) => (
              <div
                key={item.title}
                className="p-6 bg-neutral-50 border border-neutral-100 rounded-lg hover:border-neutral-200 transition-colors"
              >
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
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
