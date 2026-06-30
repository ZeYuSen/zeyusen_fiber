"use client";

import { useState } from "react";
import Image from "next/image";
import { Factory, FlaskConical, Warehouse } from "lucide-react";
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

const tabIcons = { production: Factory, testing: FlaskConical, warehouse: Warehouse };
const tabKeys = ["production", "testing", "warehouse"] as const;

export function FactoryShowcase() {
  const { factory } = getHomeContent(useLocale());
  const [active, setActive] = useState<keyof typeof galleries>("production");
  const images = galleries[active];

  return (
    <section className="bg-neutral-50 section-padding">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feature: warehouse + shipment */}
          <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group">
            <Image
              src="/images/hero/banner4.jpg"
              alt={factory.featureTitle}
              fill
              quality={70}
              className="object-cover object-[72%_25%] transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
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
          <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="flex gap-2 mb-6 flex-wrap">
              {tabKeys.map((key) => {
                const Icon = tabIcons[key];
                const on = active === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActive(key)}
                    className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                      on
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {factory.tabs[key]}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-3 flex-1 grid-cols-3">
              {images.map((img) => (
                <div
                  key={img.src}
                  className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[3/4]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={70}
                    className="object-cover"
                    sizes="(max-width: 1024px) 30vw, 15vw"
                  />
                </div>
              ))}
            </div>

            <p className="text-xs text-neutral-400 mt-6 leading-relaxed">{factory.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
