"use client";

import { Wrench, Globe2, ShieldCheck } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { getHomeContent } from "@/lib/i18n/home-content";

const capIcons = [Wrench, Globe2, ShieldCheck];

export function WhyPartnerNew() {
  const { whyPartner } = getHomeContent(useLocale());
  const capabilities = whyPartner.capabilities;
  return (
    <section className="bg-neutral-50 section-padding">
      <div className="container-wide">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-24">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            {whyPartner.title}
          </h2>
          <p className="text-neutral-500 leading-relaxed self-end">
            {whyPartner.intro}
          </p>
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
          {capabilities.map((cap, i) => {
            const Icon = capIcons[i] ?? Wrench;
            return (
              <div key={cap.number} className="bg-neutral-50 p-8 sm:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-neutral-900 text-white">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="font-mono text-xs text-neutral-400">{cap.number}</span>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">{cap.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{cap.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
