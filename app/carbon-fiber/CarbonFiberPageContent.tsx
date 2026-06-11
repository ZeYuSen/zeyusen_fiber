"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { allCarbonFiberCategories } from "@/data/carbon-fiber";

export default function CarbonFiberPageContent() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-36 pb-16">
        <div className="container-wide">
          <div>
            <p className="type-caption text-carbon-accent">
              Carbon Fiber Division
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mt-3">
              High-Performance Carbon Fiber Materials
            </h1>
            <p className="text-neutral-500 mt-4 max-w-2xl leading-relaxed">
              Lightweight, ultra-strong carbon fiber solutions for aerospace,
              motorsport, military defense, and advanced manufacturing industries.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="pb-24">
        <div className="container-wide">
          <h2 className="type-caption text-neutral-400 mb-8">Product Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allCarbonFiberCategories.map((category) => (
              <div key={category.slug}>
                <Link
                  href={`/carbon-fiber/products/${category.slug}`}
                  className="group block h-full"
                >
                  <div className="h-full bg-white border border-neutral-100 rounded-lg hover:border-neutral-200 overflow-hidden transition-colors cursor-pointer">
                    <div className="relative h-48 bg-neutral-100 overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm font-medium text-neutral-900 group-hover:text-carbon-accent transition-colors">
                        {category.name}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-carbon-accent">
                        Browse {category.name}{" "}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-wide"><div className="h-px bg-neutral-100" /></div>

      <section className="py-20">
        <div className="container-wide max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            How to Choose the Right Carbon Fiber Format
          </h2>
          <p className="mt-4 text-neutral-500 leading-relaxed">
            Buyers usually narrow carbon fiber selection by process first, then by performance target. Surface mats and veils support conductivity, finish quality, or thin functional layers, while woven cloth and heavier mats are more relevant when structural load, drape, and laminate buildup matter.
          </p>
          <p className="mt-4 text-neutral-500 leading-relaxed">
            If you are sourcing for fuel cells, EMI shielding, pultrusion, or lightweight structural parts, the fastest path is to match the target process, required GSM, and resin compatibility before comparing sample rolls.
          </p>
          <p className="mt-4 text-neutral-500 leading-relaxed">
            Teams evaluating multiple formats typically shortlist a functional surface layer, a structural reinforcement option, and a fallback commercial alternative so sampling can answer both technical fit and supply feasibility.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-wide text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            Need a Custom Carbon Fiber Solution?
          </h2>
          <p className="text-neutral-500 mt-4 leading-relaxed">
            Our engineers can recommend the optimal material for your application.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 mt-8 px-7 py-3 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
          >
            Get a Quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
