"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

const divisions = [
  {
    id: "carbon",
    label: "Carbon Fiber",
    headline: "High Performance, Lightweight Solutions",
    description:
      "Ultra-lightweight carbon fiber composites for aerospace, motorsport, and advanced manufacturing. From 10g/m² surface mats to complex hybrid structures.",
    image: "/images/carbon-fiber/carbon_bg.webp",
    href: "/carbon-fiber",
    accentColor: "cyan",
  },
  {
    id: "glass",
    label: "Glass Fiber",
    headline: "Reliable, Cost-Effective Reinforcements",
    description:
      "Corrosion-resistant materials for wind energy, construction, and industrial filtration. Tissue mats, woven cloth, and composite reinforcements.",
    image: "/images/glass-fiber/glass_bg.webp",
    href: "/glass-fiber",
    accentColor: "emerald",
  },
];

export function DivisionsSplit() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll("[data-division-card]");

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {divisions.map((div) => (
            <Link
              key={div.id}
              href={div.href}
              data-division-card
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] opacity-0 block"
            >
              {/* Background image */}
              <Image
                src={div.image}
                alt={div.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                <p className={`text-xs font-medium uppercase tracking-wider ${
                  div.accentColor === "cyan" ? "text-cyan-400" : "text-emerald-400"
                } mb-3`}>
                  {div.label}
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                  {div.headline}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed max-w-md mb-5">
                  {div.description}
                </p>
                <span className={`inline-flex items-center gap-2 text-sm font-medium ${
                  div.accentColor === "cyan" ? "text-cyan-400" : "text-emerald-400"
                } group-hover:gap-3 transition-all duration-300`}>
                  Explore Products <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}