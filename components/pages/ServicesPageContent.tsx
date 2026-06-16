"use client";

import Link from "next/link";
import {
  ArrowRight,
  Palette,
  FlaskConical,
  ShieldCheck,
  Users,
  Truck,
  Headphones,
} from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref } from "@/lib/i18n/routes";
import { getPagesContent } from "@/lib/i18n/pages-content";

const serviceIcons = [Palette, FlaskConical, ShieldCheck, Users, Truck, Headphones];
const serviceIconColors = [
  "text-carbon-accent",
  "text-glass-accent",
  "text-accent-500",
  "text-carbon-accent",
  "text-glass-accent",
  "text-accent-500",
];
const stepNumbers = ["01", "02", "03", "04"];

export default function ServicesPageContent() {
  const locale = useLocale();
  const c = getPagesContent(locale).services;
  const services = c.services.map((s, i) => ({ ...s, icon: serviceIcons[i], iconColor: serviceIconColors[i] }));
  const steps = c.steps.map((s, i) => ({ ...s, step: stepNumbers[i] }));
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
              {c.lead1}
            </p>
            <p className="text-neutral-500 mt-4 max-w-2xl leading-relaxed">
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
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="container-wide">
          <h2 className="sr-only">{c.servicesHeading}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 bg-neutral-50 border border-neutral-100 rounded-lg hover:border-neutral-200 transition-colors"
              >
                <service.icon className={`w-5 h-5 ${service.iconColor}`} />
                <h3 className="text-neutral-900 font-medium mt-4 text-sm">
                  {service.title}
                </h3>
                <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-neutral-600"
                    >
                      <span className="w-1 h-1 rounded-full bg-neutral-300 mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-wide"><div className="h-px bg-neutral-100" /></div>

      {/* Process */}
      <section className="py-24">
        <div className="container-wide">
          <div>
            <p className="type-caption text-neutral-400">{c.processEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-3">
              {c.processTitle}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {steps.map((item) => (
              <div
                key={item.step}
                className="p-6 bg-neutral-50 border border-neutral-100 rounded-lg"
              >
                <span className="text-3xl font-light text-neutral-200">
                  {item.step}
                </span>
                <h3 className="text-neutral-900 font-medium mt-3 text-sm">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-wide"><div className="h-px bg-neutral-100" /></div>

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
