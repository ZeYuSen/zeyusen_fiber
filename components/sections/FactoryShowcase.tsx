"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n/use-locale";
import { getHomeContent } from "@/lib/i18n/home-content";
import { ScrollTrigger } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/fx/capabilities";
import { getLenis } from "@/components/providers/SmoothScroll";

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

// The night shift: each chapter has its own light spilling behind the photos —
// warm floor lamps on the line, cool lab light, sodium light in the warehouse.
const chapterLight: Record<(typeof tabKeys)[number], string> = {
  production: "rgba(243, 231, 208, 0.12)",
  testing: "rgba(221, 230, 238, 0.10)",
  warehouse: "rgba(240, 179, 106, 0.14)",
};

const easing = [0.22, 1, 0.36, 1] as const;

// Large screens with motion allowed: a sticky stage whose scroll progress steps
// through the three galleries. Otherwise: the timed tab carousel.
const PINNED_QUERY = "(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)";

export function FactoryShowcase() {
  const { factory } = getHomeContent(useLocale());
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pinned = useMediaQuery(PINNED_QUERY);
  const sectionRef = useRef<HTMLElement>(null);
  const active = tabKeys[activeIndex];
  const images = galleries[active];

  useEffect(() => {
    if (paused || pinned) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % tabKeys.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, pinned]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!pinned || !section) return;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setActiveIndex(Math.min(tabKeys.length - 1, Math.floor(self.progress * tabKeys.length)));
      },
    });
    return () => trigger.kill();
  }, [pinned]);

  const selectTab = (index: number) => {
    const section = sectionRef.current;
    if (!pinned || !section) {
      setActiveIndex(index);
      return;
    }
    const range = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const target = top + ((index + 0.5) / tabKeys.length) * range;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      data-tone="night"
      data-world="line"
      className={pinned ? "relative h-[260vh]" : "relative py-28 lg:py-36"}
      style={{ "--chapter-light": chapterLight[active] } as CSSProperties}
    >
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center pt-20" : "relative"}>
        {/* Chapter light: a soft pool behind the photos that eases between
            the three chapters' colours. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[58%] h-[80%] w-full max-w-[1600px] -translate-x-1/2 -translate-y-1/2 bg-[color:var(--chapter-light)] transition-[background-color] duration-[1400ms] ease-out [mask-image:radial-gradient(closest-side,#000_0%,rgba(0,0,0,0.7)_50%,transparent_100%)]"
        />

        <div className="container-wide relative w-full">
          {/* Header */}
          <div className={`text-center ${pinned ? "mb-8 xl:mb-10" : "mb-12 lg:mb-14"}`}>
            <span className="stage-label mb-5 block">{factory.eyebrow}</span>
            <h2
              data-reveal="text"
              className="text-[clamp(2rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[#E6EAEE] text-balance [&:lang(ko)]:tracking-normal [&:lang(zh)]:tracking-normal"
            >
              {factory.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60">{factory.intro}</p>
          </div>

          {/* Chapters */}
          <div
            className="flex flex-wrap justify-center gap-x-10 gap-y-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {tabKeys.map((key, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectTab(i)}
                  aria-current={isActive ? "true" : undefined}
                  className={`py-3 text-sm font-medium tracking-wide transition-colors duration-500 ${
                    isActive ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {factory.tabs[key]}
                </button>
              );
            })}
          </div>

          {/* Image gallery — floats directly in the night */}
          <div
            className="pt-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: easing }}
                className={`grid gap-3 sm:gap-4 ${pinned ? "grid-cols-3 mx-auto max-w-[min(100%,calc((100vh-22rem)*4))]" : "grid-cols-2 sm:grid-cols-3"}`}
              >
                {images.map((img, i) => (
                  <motion.div
                    key={img.src}
                    // Pinned (scroll-driven) chapters unveil like a curtain; the timed
                    // carousel on small screens only crossfades, so it never goes blank.
                    // Both props in both modes: the server renders the unpinned
                    // variant, and a prop missing from the pinned target would stay
                    // frozen at its initial value after hydration.
                    initial={pinned ? { clipPath: "inset(0% 0% 100% 0%)", opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", opacity: 0 }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
                    transition={{ duration: pinned ? 0.8 : 0.6, delay: pinned ? 0.1 + i * 0.08 : i * 0.06, ease: easing }}
                    className={`relative aspect-[4/3] overflow-hidden rounded-sm bg-white/[0.03] ${
                      !pinned && i === 0 ? "col-span-2 sm:col-span-1" : ""
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      quality={70}
                      className="fx-grade object-cover"
                      sizes={!pinned && i === 0 ? "(max-width: 640px) 100vw, 33vw" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 28vw"}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <p className="mt-6 text-center text-xs leading-relaxed text-white/45">{factory.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
