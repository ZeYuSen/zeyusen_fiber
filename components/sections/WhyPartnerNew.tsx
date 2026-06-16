"use client";

import { useLocale } from "@/lib/i18n/use-locale";
import { getHomeContent } from "@/lib/i18n/home-content";

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
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              className="bg-neutral-50 p-8 sm:p-10"
            >
              <span className="font-mono text-xs text-neutral-400 block mb-4">
                {cap.number}
              </span>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                {cap.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
