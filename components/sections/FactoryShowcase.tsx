"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n/use-locale";
import { getHomeContent } from "@/lib/i18n/home-content";

const galleries = {
  production: [
    { src: "/images/factory/production/0_0006_productionprocesses5-1.webp", alt: "Fiber laying production line" },
    { src: "/images/showcase/equipment-slitting.webp", alt: "Slitting equipment in operation" },
    { src: "/images/showcase/equipment-winding.webp", alt: "Winding equipment in operation" },
  ],
  testing: [
    { src: "/images/factory/inspection/0_0012_inspectionequipment8-1.webp", alt: "Tensile strength testing" },
    { src: "/images/factory/inspection/0_0014_inspectionequipment5-1.webp", alt: "Weight measurement" },
    { src: "/images/factory/testing/0_0018_processtesting4-1.webp", alt: "Sample preparation" },
  ],
  warehouse: [
    { src: "/images/showcase/shipment-ready.webp", alt: "Export shipment ready" },
    { src: "/images/showcase/warehouse-rolls.webp", alt: "Warehouse fiber rolls" },
    { src: "/images/showcase/warehouse-stock.webp", alt: "Warehouse stock inventory" },
  ],
} as const;

const tabKeys = ["production", "testing", "warehouse"] as const;

export function FactoryShowcase() {
  const { factory } = getHomeContent(useLocale());
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = tabKeys[activeIndex];
  const images = galleries[active];

  // Auto-rotate tabs every 4s, pause on hover
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % tabKeys.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="bg-white section-padding">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-cyan-600 mb-3">
              {factory.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
              {factory.title}
            </h2>
          </div>
          <p className="text-neutral-500 leading-relaxed self-end">{factory.intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Feature: warehouse + shipment */}
          <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group lg:col-span-5">
            <Image
              src="/images/hero/banner4.jpg"
              alt={factory.featureTitle}
              fill
              quality={70}
              className="object-cover object-[72%_25%] transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
              <p className="text-xs font-medium uppercase tracking-wider text-cyan-400 mb-3">
                {factory.featureCaption}
              </p>
              <h3 className="text-xl font-semibold text-white mb-3">{factory.featureTitle}</h3>
              <p className="text-sm text-white/75 leading-relaxed max-w-md">{factory.featureText}</p>
            </div>
          </div>

          {/* Tabbed gallery */}
          <div
            className="bg-white rounded-2xl px-6 sm:px-8 flex flex-col h-full lg:col-span-7"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative flex w-full p-1 bg-neutral-100 rounded-lg mb-6">
              {/* Sliding white indicator */}
              <div
                className="absolute top-1 bottom-1 rounded-md bg-white shadow-sm transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  width: `calc((100% - 0.5rem) / ${tabKeys.length})`,
                  transform: `translateX(${activeIndex * 100}%)`,
                }}
              />
              {tabKeys.map((key, i) => (
                <button
                  key={key}
                  onClick={() => setActiveIndex(i)}
                  className={`relative z-10 flex-1 text-center px-4 py-2 text-sm font-medium transition-colors duration-[600ms] ${
                    activeIndex === i
                      ? "text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {factory.tabs[key]}
                </button>
              ))}
            </div>

            <div className="flex-1 min-h-0">
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="grid gap-3 grid-cols-3 w-full h-full"
                  >
                    {images.map((img) => (
                      <div
                        key={img.src}
                        className="relative overflow-hidden rounded-lg bg-neutral-100 h-full min-h-[220px]"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          quality={70}
                          className="object-cover"
                          sizes="(max-width: 1024px) 30vw, 19vw"
                        />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <p className="text-xs text-neutral-400 mt-6 leading-relaxed">{factory.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
