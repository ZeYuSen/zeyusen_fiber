"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

const slides = [
  {
    image: "/images/hero/banner4.jpg",
    title: "ZeYuSen R&D Center",
    subtitle: "Dedicated research facility driving innovation in carbon fiber and fiberglass composite materials",
  },
  {
    image: "/images/hero/banner1.jpg",
    title: "Advanced Composite Materials",
    subtitle: "From carbon fiber to fiberglass — engineered for the world's most demanding industries",
  },
  {
    image: "/images/hero/banner2.jpg",
    title: "State-of-the-Art Manufacturing",
    subtitle: "80,000 m² production facility with automated production lines and strict quality control",
  },
];

export function HeroImmersive() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [current, isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }, el);
    return () => ctx.revert();
  }, [current]);

  const currentSlide = slides[current];

  return (
    <section
      ref={sectionRef}
      className="relative h-svh w-full overflow-hidden"
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-800 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            quality={65}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div ref={contentRef} className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mt-6 max-w-xl">
              {currentSlide.subtitle}
            </p>
            <div className="flex gap-4 mt-10">
              <Link
                href="/contact"
                className="px-8 py-3 bg-white text-black font-medium rounded-sm hover:bg-white/90 transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 border border-white/60 text-white font-medium rounded-sm hover:bg-white/10 transition-colors"
              >
                About Our Manufacturing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
        <div className="flex w-5 h-9 border border-white/30 rounded-full justify-center items-start overflow-hidden">
          <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
