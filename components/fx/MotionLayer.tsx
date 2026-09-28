"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/fx/capabilities";

// Declarative GSAP scroll motion, applied per page via data attributes:
//   data-reveal="text"     headline rises word by word (character by character for CJK)
//   data-reveal="up"       block fades up
//   data-reveal="stagger"  direct children fade up in batches as they enter
//   data-reveal="image"    container unmasks from the bottom, image settles from a zoom
//   data-parallax="8"      element drifts ±8% over its scroll range
//   data-count             integer counts up from 0 (SSR text stays the real value)
// Elements already on screen when a page loads are left alone so nothing flashes.

const START = "top bottom-=8%";

function belowFold(el: Element) {
  return el.getBoundingClientRect().top > window.innerHeight * 0.92;
}

export function MotionLayer() {
  const pathname = usePathname();

  // Keep trigger positions right when the page height changes (images,
  // accordions, filters, sticky stages switching on).
  useEffect(() => {
    let timer = 0;
    let lastHeight = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    observer.observe(document.body);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const cleanups: Array<() => void> = [];
    let ctx: gsap.Context | null = null;

    const frame = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const cjk = /^(zh|ja)/i.test(document.documentElement.lang);

        gsap.utils.toArray<HTMLElement>('[data-reveal="text"]').filter(belowFold).forEach((el) => {
          const split = SplitText.create(el, {
            type: cjk ? "chars" : "words",
            mask: cjk ? "chars" : "words",
            tag: "span",
          });
          gsap.from(cjk ? split.chars : split.words, {
            yPercent: 110,
            duration: 0.9,
            ease: "power4.out",
            stagger: cjk ? 0.025 : 0.06,
            scrollTrigger: { trigger: el, start: START, once: true },
            // Restore the original markup so masks can never clip descenders.
            onComplete: () => split.revert(),
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="up"]').filter(belowFold).forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: START, once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]').forEach((el) => {
          const items = Array.from(el.children).filter(belowFold);
          if (!items.length) return;
          gsap.set(items, { y: 48, opacity: 0 });
          ScrollTrigger.batch(items, {
            start: START,
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="image"]').filter(belowFold).forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: START, once: true } });
          tl.fromTo(
            el,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut", clearProps: "clipPath" },
          );
          const img = el.querySelector("img");
          if (img) tl.from(img, { scale: 1.25, duration: 1.6, ease: "power3.out", clearProps: "scale" }, 0);
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = parseFloat(el.dataset.parallax ?? "") || 8;
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").filter(belowFold).forEach((el) => {
          const node = el.firstChild;
          const fromAttr = Number(el.dataset.count);
          const target = Number.isFinite(fromAttr) && el.dataset.count !== "" ? fromAttr : parseFloat(el.textContent || "");
          if (!(node instanceof Text) || !Number.isFinite(target)) return;
          const counter = { value: 0 };
          node.nodeValue = "0";
          gsap.to(counter, {
            value: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: START, once: true },
            onUpdate: () => {
              node.nodeValue = String(Math.round(counter.value));
            },
          });
          cleanups.push(() => {
            node.nodeValue = String(target);
          });
        });

      }, document.body);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
      cleanups.forEach((cleanup) => cleanup());
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
