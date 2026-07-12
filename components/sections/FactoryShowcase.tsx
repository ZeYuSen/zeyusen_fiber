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

const easing = [0.22, 1, 0.36, 1] as const;

export function FactoryShowcase() {
  const { factory } = getHomeContent(useLocale());
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = tabKeys[activeIndex];
  const images = galleries[active];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % tabKeys.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#0C1128" }}>
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">
            <span className="w-6 h-px bg-cyan-400" />
            {factory.eyebrow}
            <span className="w-6 h-px bg-cyan-400" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{factory.title}</h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto text-[15px]">{factory.intro}</p>
        </div>

        {/* Underline tab strip */}
        <div
          className="flex gap-8 border-b border-white/10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {tabKeys.map((key, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={key}
                onClick={() => setActiveIndex(i)}
                className="relative flex items-center gap-3 py-4 text-left transition-colors"
              >
                <span className={`text-xs font-bold tabular-nums shrink-0 ${isActive ? "text-cyan-400" : "text-white/30"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-sm font-semibold ${isActive ? "text-white" : "text-white/50 hover:text-white/80"}`}>
                  {factory.tabs[key]}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="factory-tab-underline"
                    className="absolute -bottom-px left-0 right-0 h-0.5 bg-cyan-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Image gallery — floats directly on the section background */}
        <div
          className="pt-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: easing }}
              className="grid grid-cols-3 gap-4"
            >
              {images.map((img) => (
                <div
                  key={img.src}
                  className="relative overflow-hidden bg-[#0C1128] aspect-[4/3]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={70}
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                    sizes="(max-width: 1024px) 33vw, 28vw"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="text-xs text-white/30 mt-5 leading-relaxed">{factory.note}</p>
        </div>
      </div>
    </section>
  );
}
