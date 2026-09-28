"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/fx/capabilities";
import { useLocale } from "@/lib/i18n/use-locale";
import { getHomeContent } from "@/lib/i18n/home-content";

const certificates = [
  { src: "/images/certificates/cert_14.jpg", alt: "ISO 9001 Quality Management System", label: "ISO 9001" },
  { src: "/images/certificates/cert_15.jpg", alt: "ISO 9001 Quality Management System (EN)", label: "ISO 9001 EN" },
  { src: "/images/certificates/cert_16.jpg", alt: "ISO 9001 Quality Management System", label: "ISO 9001" },
  { src: "/images/certificates/cert_17.jpg", alt: "ISO 14001 Environmental Management System", label: "ISO 14001" },
  { src: "/images/certificates/cert_18.jpg", alt: "ISO 14001 Environmental Management System (EN)", label: "ISO 14001 EN" },
  { src: "/images/certificates/cert_19.jpg", alt: "ISO 45001 Occupational Health & Safety", label: "ISO 45001" },
  { src: "/images/certificates/cert_20.jpg", alt: "ISO 45001 Occupational Health & Safety (EN)", label: "ISO 45001 EN" },
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

type Certificate = (typeof certificates)[number];

const isoCertificates = certificates.filter((c) => c.label !== "Patent");
const patentCertificates = certificates.filter((c) => c.label === "Patent");

// Full-size viewer: zoom, drag when zoomed, Esc or click outside to close.
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080A0D]/95" onClick={onClose}>
      <div className="relative flex h-full w-full items-center justify-center p-8" onClick={(e) => e.stopPropagation()}>
        <Image
          src={src}
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
      <div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-sm bg-[#080A0D]/80 px-2 py-1.5 ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={zoomOut} className="flex h-8 w-8 items-center justify-center text-white/60 transition-colors hover:text-white" aria-label="Zoom out">
          <Minus className="h-4 w-4" />
        </button>
        <span className="min-w-[3.5rem] text-center text-xs tabular-nums text-white/60">{Math.round(scale * 100)}%</span>
        <button onClick={zoomIn} className="flex h-8 w-8 items-center justify-center text-white/60 transition-colors hover:text-white" aria-label="Zoom in">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <button
        onClick={onClose}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center text-white/60 transition-colors hover:text-white"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
    </div>,
    document.body,
  );
}

// One row of documents on the light table: paper held a little under the
// light, brought up to full light when looked at. Click opens the viewer.
function DocumentRow({
  items,
  size,
  showLabels,
  onOpen,
  rowRef,
}: {
  items: Certificate[];
  size: "large" | "small";
  showLabels: boolean;
  onOpen: (src: string) => void;
  rowRef: React.RefObject<HTMLUListElement | null>;
}) {
  const width = size === "large" ? "w-[150px] sm:w-[190px] lg:w-[210px]" : "w-[112px] sm:w-[140px] lg:w-[150px]";
  return (
    <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
      <ul
        ref={rowRef}
        className="flex w-max snap-x gap-5 px-6 pb-2 sm:gap-6 sm:px-10 lg:snap-none lg:px-[max(4rem,calc((100vw-1400px)/2+4rem))]"
      >
        {items.map((cert) => (
          <li key={cert.src} className={`${width} shrink-0 snap-start`}>
            <button type="button" onClick={() => onOpen(cert.src)} className="group block w-full text-left">
              <span className="relative block aspect-[3/4] overflow-hidden rounded-[2px] bg-[#DCD8CE] shadow-[0_28px_60px_-36px_rgba(255,236,200,0.3)] brightness-[0.62] transition-[filter] duration-500 group-hover:brightness-100 group-focus-visible:brightness-100">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  quality={45}
                  sizes={size === "large" ? "210px" : "150px"}
                  className="object-contain p-2"
                />
              </span>
              {showLabels ? (
                <span className="mt-3 block text-xs text-white/40 transition-colors group-hover:text-white/75">
                  {cert.label}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TrustEvidence() {
  const { trust, stats } = getHomeContent(useLocale());
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const isoRowRef = useRef<HTMLUListElement>(null);
  const patentRowRef = useRef<HTMLUListElement>(null);
  const drift = useMediaQuery("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

  // Desktop: the two rows slide past each other under the light as the page
  // scrolls (certifications one way, patents the other). Phones swipe instead.
  useEffect(() => {
    const table = tableRef.current;
    const iso = isoRowRef.current;
    const patents = patentRowRef.current;
    if (!drift || !table || !iso || !patents) return;
    const overflow = (row: HTMLElement) => Math.max(0, row.scrollWidth - window.innerWidth);
    const ctx = gsap.context(() => {
      const scrollTrigger = { trigger: table, start: "top bottom", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true };
      gsap.fromTo(iso, { x: 0 }, { x: () => -overflow(iso), ease: "none", scrollTrigger });
      gsap.fromTo(patents, { x: () => -overflow(patents) }, { x: 0, ease: "none", scrollTrigger: { ...scrollTrigger } });
    }, table);
    return () => ctx.revert();
  }, [drift]);

  return (
    <section data-tone="night" data-world="settle" className="relative pb-16 pt-28 lg:pb-24 lg:pt-40">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2
            data-reveal="text"
            className="text-[clamp(2.25rem,4.4vw,4rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[#E6EAEE] text-balance lg:col-span-7 [&:lang(ko)]:tracking-normal [&:lang(zh)]:tracking-normal"
          >
            {trust.title}
          </h2>
          <p data-reveal="up" className="text-[15px] leading-relaxed text-white/55 lg:col-span-4 lg:col-start-9">
            {trust.intro}
          </p>
        </div>

        <dl data-reveal="up" className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-3">
              <dt className="text-sm text-white/50">{s.label}</dt>
              <dd className="text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-none tracking-tight text-[#E6EAEE] tabular-nums">
                <span data-count={s.value}>{s.value}</span>
                <span className="text-white/30">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The light table: certifications and patents as paper documents. */}
      <div ref={tableRef} className="mt-24 lg:mt-32">
        <div className="container-wide flex items-baseline justify-between gap-6">
          <h3 className="text-base font-medium text-[#E6EAEE]">{trust.certHeading}</h3>
          <span className="text-sm tabular-nums text-white/40">
            {certificates.length} {trust.certCount}
          </span>
        </div>
        <div className="mt-10 space-y-8 overflow-hidden lg:[mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
          <DocumentRow items={isoCertificates} size="large" showLabels onOpen={setLightboxImg} rowRef={isoRowRef} />
          <DocumentRow items={patentCertificates} size="small" showLabels={false} onOpen={setLightboxImg} rowRef={patentRowRef} />
        </div>
        <p className="container-wide mt-10 text-xs leading-relaxed text-white/40">{trust.certNote}</p>
      </div>

      {lightboxImg ? <Lightbox src={lightboxImg} onClose={() => setLightboxImg(null)} /> : null}
    </section>
  );
}
