"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { getHomeContent } from "@/lib/i18n/home-content";

const certificates = [
  { src: "/images/certificates/cert_14.jpg", alt: "ISO 9001 Quality Management System", label: "ISO 9001" },
  { src: "/images/certificates/cert_15.jpg", alt: "ISO 9001 Quality Management System (EN)", label: "ISO 9001 EN" },
  { src: "/images/certificates/cert_16.jpg", alt: "ISO 14001 Environmental Management System", label: "ISO 14001" },
  { src: "/images/certificates/cert_17.jpg", alt: "ISO 14001 Environmental Management System (EN)", label: "ISO 14001 EN" },
  { src: "/images/certificates/cert_18.jpg", alt: "ISO 45001 Occupational Health & Safety", label: "ISO 45001" },
  { src: "/images/certificates/cert_19.jpg", alt: "ISO 45001 Occupational Health & Safety (EN)", label: "ISO 45001 EN" },
  { src: "/images/certificates/cert_20.jpg", alt: "Intellectual Property Management System", label: "IP System" },
  { src: "/images/certificates/cert_01.jpg", alt: "Patent Certificate 1", label: "Patent" },
  { src: "/images/certificates/cert_02.jpg", alt: "Patent Certificate 2", label: "Patent" },
  { src: "/images/certificates/cert_03.jpg", alt: "Utility Model Patent", label: "Patent" },
  { src: "/images/certificates/cert_04.jpg", alt: "Utility Model Patent", label: "Patent" },
  { src: "/images/certificates/cert_05.jpg", alt: "Utility Model Patent", label: "Patent" },
  { src: "/images/certificates/cert_06.jpg", alt: "Utility Model Patent", label: "Patent" },
  { src: "/images/certificates/cert_07.jpg", alt: "Utility Model Patent", label: "Patent" },
  { src: "/images/certificates/cert_08.jpg", alt: "Utility Model Patent", label: "Patent" },
  { src: "/images/certificates/cert_09.jpg", alt: "Utility Model Patent", label: "Patent" },
  { src: "/images/certificates/cert_10.jpg", alt: "Utility Model Patent", label: "Patent" },
  { src: "/images/certificates/cert_11.jpg", alt: "Utility Model Patent", label: "Patent" },
  { src: "/images/certificates/cert_12.jpg", alt: "Utility Model Patent", label: "Patent" },
  { src: "/images/certificates/cert_13.jpg", alt: "Utility Model Patent", label: "Patent" },
];

function CertificateCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const total = certificates.length;

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  // Auto-rotate every 3.5s, pause on hover or when lightbox is open
  useEffect(() => {
    if (paused || lightboxImg) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % total);
    }, 3500);
    return () => clearInterval(id);
  }, [paused, lightboxImg, total]);

  const openLightbox = (src: string) => {
    setLightboxImg(src);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxImg(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.5, 4));
  const zoomOut = () => {
    setScale((s) => {
      const n = Math.max(s - 0.5, 0.5);
      if (n <= 1) setPosition({ x: 0, y: 0 });
      return n;
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setPosition({
      x: posStart.current.x + (e.clientX - dragStart.current.x),
      y: posStart.current.y + (e.clientY - dragStart.current.y),
    });
  };

  const handlePointerUp = () => setDragging(false);

  // Render a 5-wide window (offsets -2..2) around the current card. Each card
  // is absolutely centered and animated purely via transform, so nothing ever
  // reflows — the browser only tweens GPU-friendly x / scale / opacity.
  const visible = [-2, -1, 0, 1, 2].map((offset) => {
    const idx = (currentIndex + offset + total) % total;
    return { offset, idx, cert: certificates[idx] };
  });

  const layoutFor = (offset: number) => {
    const abs = Math.abs(offset);
    if (abs === 0) return { x: "0%", scale: 1, opacity: 1 };
    if (abs === 1) return { x: `${offset * 95}%`, scale: 0.66, opacity: 0.5 };
    return { x: `${offset * 175}%`, scale: 0.5, opacity: 0 };
  };

  const zFor = (offset: number) => (offset === 0 ? 30 : Math.abs(offset) === 1 ? 20 : 10);

  return (
    <>
      <div
        className="relative w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative flex justify-center overflow-hidden py-6">
          {/* Invisible spacer establishes the height from the center card */}
          <div className="w-[38%] aspect-[3/4] invisible" aria-hidden />

          {visible.map(({ offset, idx, cert }) => {
            const isCenter = offset === 0;
            const target = layoutFor(offset);
            return (
              <motion.div
                key={idx}
                initial={false}
                animate={target}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                style={{ zIndex: zFor(offset) }}
                className="absolute top-6 left-1/2 w-[38%] -ml-[19%] cursor-pointer group/cert"
                onClick={isCenter ? () => openLightbox(cert.src) : offset < 0 ? prev : next}
              >
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-lg bg-white ring-1 ${
                    isCenter ? "ring-neutral-200 shadow-xl" : "ring-neutral-100"
                  }`}
                >
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    fill
                    sizes={isCenter ? "30vw" : "20vw"}
                    quality={isCenter ? 70 : 45}
                    className={`object-contain p-2 transition-transform duration-500 ${
                      isCenter ? "group-hover/cert:scale-[1.03]" : ""
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}

          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white ring-1 ring-neutral-200 shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors z-40"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-700" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white ring-1 ring-neutral-200 shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors z-40"
          >
            <ChevronRight className="w-4 h-4 text-neutral-700" />
          </button>
        </div>

        {/* Center card label — crossfades with the active certificate */}
        <div className="relative h-4 mt-3">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 text-xs font-medium text-neutral-700 text-center truncate"
            >
              {certificates[currentIndex].label}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {certificates.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to certificate ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-5 bg-brand-600" : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      </div>

      {lightboxImg && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <div className="relative w-full h-full flex items-center justify-center p-8" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxImg}
              alt="Certificate"
              width={1200}
              height={1600}
              sizes="90vw"
              unoptimized
              className={`max-h-[85vh] max-w-[90vw] object-contain transition-transform ${dragging ? "duration-0 cursor-grabbing" : "duration-200 cursor-grab"}`}
              style={{ transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)` }}
              draggable={false}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/70 backdrop-blur-md rounded-full px-4 py-2">
            <button onClick={(e) => { e.stopPropagation(); zoomOut(); }} className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 text-lg font-bold" aria-label="Zoom out">−</button>
            <span className="text-white text-sm min-w-[4rem] text-center">{Math.round(scale * 100)}%</span>
            <button onClick={(e) => { e.stopPropagation(); zoomIn(); }} className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 text-lg font-bold" aria-label="Zoom in">+</button>
          </div>
          <button onClick={closeLightbox} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20" aria-label="Close">
            <span className="text-white text-xl">✕</span>
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

export function TrustEvidence() {
  const { trust, stats } = getHomeContent(useLocale());

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#060D1F" }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">

          {/* Left — editorial stats on dark */}
          <div className="lg:col-span-4 flex flex-col">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-5">
              <span className="w-6 h-px bg-blue-400" />
              Verified &amp; Certified
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.1] tracking-tight">
              {trust.title}
            </h2>
            <p className="text-white/40 leading-relaxed mt-5 text-[15px]">
              {trust.intro}
            </p>

            {/* Stats axis */}
            <div className="mt-10 border-t border-white/10 flex-1 flex flex-col">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-5 py-5 border-b border-white/10 flex-1"
                >
                  <div className="flex items-baseline gap-0.5 w-28 shrink-0">
                    <span className="text-3xl sm:text-[2.5rem] font-bold text-white tabular-nums tracking-tight leading-none">
                      {s.value}
                    </span>
                    <span className="text-lg font-bold text-blue-400 leading-none">{s.suffix}</span>
                  </div>
                  <p className="text-sm font-medium text-white/60 min-w-0 pt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — light inset certificate panel (暗底亮框) */}
          <div className="lg:col-span-8 flex">
            <div className="flex flex-col w-full rounded-2xl bg-[#EFF6FF] p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-medium text-neutral-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  {trust.certHeading}
                </h3>
                <span className="text-xs text-neutral-400">
                  {certificates.length} {trust.certCount}
                </span>
              </div>

              <div className="flex-1 flex items-start">
                <CertificateCarousel />
              </div>

              <p className="text-xs text-neutral-400 mt-6 leading-relaxed">
                {trust.certNote}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
