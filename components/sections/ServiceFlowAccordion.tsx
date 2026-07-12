"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type ServiceItem = {
  title: string;
  description: string;
  features: string[];
};

type Props = {
  heading: string;
  subtitle: string;
  services: ServiceItem[];
};

const IMAGES = [
  "/images/factory/production/0_0006_productionprocesses5-1.webp",
  "/images/factory/testing/0_0018_processtesting4-1.webp",
  "/images/factory/inspection/0_0012_inspectionequipment8-1.webp",
  "/images/showcase/warehouse-rolls.webp",
  "/images/showcase/shipment-ready.webp",
  "/images/showcase/equipment-winding.webp",
];

const STRIP_BG = [
  "#2563EB",
  "#1D4ED8",
  "#1E40AF",
  "#1E3A8A",
  "#172554",
  "#0F172A",
];

const easing = [0.22, 1, 0.36, 1] as const;

export function ServiceFlowAccordion({ heading, subtitle, services }: Props) {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 lg:py-28">
      <div className="container-wide">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            {heading}
          </h2>
          <p className="mt-4 text-neutral-500 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Desktop horizontal accordion */}
        <div className="hidden md:flex h-[560px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          {services.map((service, index) => {
            const isActive = index === active;
            const bgColor = STRIP_BG[Math.min(index, STRIP_BG.length - 1)];

            return (
              <motion.div
                key={index}
                className="relative cursor-pointer overflow-hidden"
                style={{ backgroundColor: isActive ? "#EFF6FF" : bgColor }}
                animate={{ flex: isActive ? 6 : 0.5 }}
                transition={{ duration: 0.5, ease: easing }}
                onClick={() => setActive(index)}
              >
                {/* Collapsed strip */}
                {!isActive && (
                  <div className="absolute inset-0 flex flex-col items-center pt-8 pb-8 border-l border-white/10">
                    <span className="text-white/60 text-xs font-bold tracking-wider">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-6 flex-1 flex items-center">
                      <span
                        className="text-white/90 font-semibold text-[13px] whitespace-nowrap tracking-wide"
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                        }}
                      >
                        {service.title}
                      </span>
                    </div>
                  </div>
                )}

                {/* Expanded panel */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={`content-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2"
                    >
                      <div className="flex flex-col justify-center px-8 lg:px-12 py-10">
                        <span className="inline-flex items-center gap-2 text-sm text-blue-600 font-semibold">
                          <span className="w-6 h-px bg-blue-600" />
                          Step {index + 1}
                        </span>
                        <h3 className="text-2xl lg:text-[2rem] font-bold text-neutral-900 mt-3 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-neutral-600 mt-4 leading-relaxed text-[15px] max-w-md">
                          {service.description}
                        </p>
                        <ul className="mt-6 space-y-2.5">
                          {service.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-start gap-2.5 text-sm text-neutral-700"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-[7px] flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative hidden lg:block">
                        <Image
                          src={IMAGES[index] || IMAGES[0]}
                          alt={service.title}
                          fill
                          sizes="45vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#EFF6FF] via-[#EFF6FF]/40 to-transparent w-1/3" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile vertical accordion */}
        <div className="md:hidden flex flex-col gap-3">
          {services.map((service, index) => {
            const isActive = index === active;
            return (
              <div
                key={index}
                className="rounded-xl overflow-hidden border border-neutral-200"
              >
                <button
                  onClick={() => setActive(index)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      isActive ? "text-white/60" : "text-neutral-400"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-sm">{service.title}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easing }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 bg-white">
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                          <Image
                            src={IMAGES[index] || IMAGES[0]}
                            alt={service.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="mt-3 space-y-1.5">
                          {service.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-start gap-2 text-xs text-neutral-500"
                            >
                              <span className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
