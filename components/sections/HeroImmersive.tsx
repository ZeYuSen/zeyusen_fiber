"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref } from "@/lib/i18n/routes";
import { getHomeContent } from "@/lib/i18n/home-content";
import { prefersReducedMotion, useFxMode } from "@/lib/fx/capabilities";

// The opening shot of the fiber world (components/fx/world). In rich mode the
// section is a tall sticky stage: scroll opens a carbon tow and a glass roving into a mat, then weaves it
// (data-world="tow>weave") and steps through the three hero messages.
// Basic mode (reduced motion / no WebGL): a still, dark hero with the first message.
export function HeroImmersive() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shownRef = useRef(0);
  const locale = useLocale();
  const home = getHomeContent(locale);
  const slides = home.hero;
  const rich = useFxMode() === "rich";
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!rich) return;
    const section = sectionRef.current;
    if (!section) return;
    const steps = slides.length;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setCurrent(Math.min(steps - 1, Math.floor(self.progress * steps))),
    });
    return () => trigger.kill();
  }, [rich, slides.length]);

  // Message changes dissolve in; the first paint uses the CSS entrance instead,
  // so the server-rendered headline never flashes out and back in.
  useEffect(() => {
    if (shownRef.current === current) return;
    shownRef.current = current;
    const el = contentRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, filter: "blur(10px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.1, ease: "power2.out", clearProps: "filter" }
      );
    }, el);
    return () => ctx.revert();
  }, [current]);

  const currentSlide = slides[rich ? current : 0];

  return (
    <section
      ref={sectionRef}
      data-hero
      data-tone="night"
      data-world="tow>weave"
      className={`relative w-full ${rich ? "h-[230svh]" : "h-svh"}`}
    >
      <div className={`${rich ? "sticky top-0" : "relative"} h-svh w-full overflow-hidden`}>
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full px-6 sm:px-10 lg:px-16">
            <div ref={contentRef} className="max-w-2xl">
              <h1 className="fx-rise text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance [text-shadow:0_2px_24px_rgba(8,10,13,0.85)]">
                {currentSlide.title}
              </h1>
              <p className="fx-rise text-lg md:text-xl text-white/85 mt-6 max-w-xl [--fx-delay:120ms] [text-shadow:0_1px_16px_rgba(8,10,13,0.95)]">
                {currentSlide.subtitle}
              </p>
              <div className="fx-rise flex flex-wrap gap-4 mt-10 [--fx-delay:240ms]">
                <Link
                  href={localizedHref("contact", locale)}
                  className="group inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
                >
                  {home.heroCta.quote}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href={localizedHref("about", locale)}
                  className="inline-flex items-center px-8 py-3 border border-white/60 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                >
                  {home.heroCta.about}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
