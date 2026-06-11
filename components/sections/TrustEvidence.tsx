"use client";

import { useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  Handshake,
  MapPin,
  Ship,
  Truck,
} from "lucide-react";

const trustMetrics = [
  {
    number: "01",
    metric: "15",
    suffix: "+",
    unit: "Years",
    title: "Composite Experience",
    text: "Focused exclusively on fiberglass and carbon fiber since 2008, serving demanding industrial applications worldwide.",
  },
  {
    number: "02",
    metric: "2",
    suffix: "",
    unit: "R&D Centers",
    title: "Engineering Backbone",
    text: "Dedicated R&D staff guide you from material selection through production — engineers who understand your process.",
  },
  {
    number: "03",
    metric: "50",
    suffix: "+",
    unit: "Countries",
    title: "Export Footprint",
    text: "Stable global delivery from dual production bases, 240 km to Shanghai Port. FOB, CIF, DDP — coordinated to your terms.",
  },
];

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
  { src: "/images/certificates/cert_03.jpg", alt: "Utility Model Patent - Wear-resistant fiberglass surface mat", label: "Patent" },
  { src: "/images/certificates/cert_04.jpg", alt: "Utility Model Patent - Embedded bonding carbon fiber surface mat", label: "Patent" },
  { src: "/images/certificates/cert_05.jpg", alt: "Utility Model Patent - Composite fiberglass flame retardant felt", label: "Patent" },
  { src: "/images/certificates/cert_06.jpg", alt: "Utility Model Patent - Wear-resistant fiberglass surface mat", label: "Patent" },
  { src: "/images/certificates/cert_07.jpg", alt: "Utility Model Patent - Polyester nonwoven fiberglass composite felt", label: "Patent" },
  { src: "/images/certificates/cert_08.jpg", alt: "Utility Model Patent - High-strength fiberglass surface mat", label: "Patent" },
  { src: "/images/certificates/cert_09.jpg", alt: "Utility Model Patent - High tensile PET skeleton cloth", label: "Patent" },
  { src: "/images/certificates/cert_10.jpg", alt: "Utility Model Patent - PVA carbon fiber mat prepreg device", label: "Patent" },
  { src: "/images/certificates/cert_11.jpg", alt: "Utility Model Patent - Fiberglass surface mat cutting equipment", label: "Patent" },
  { src: "/images/certificates/cert_12.jpg", alt: "Utility Model Patent - Carbon fiber surface mat oven", label: "Patent" },
  { src: "/images/certificates/cert_13.jpg", alt: "Utility Model Patent - High tear strength fiberglass roofing mat", label: "Patent" },
];

const logistics = [
  {
    icon: MapPin,
    label: "Dual Production Base",
    text: "Manufacturing in Nantong and Taizhou — stable, scalable output.",
  },
  {
    icon: Ship,
    label: "240 km to Shanghai Port",
    text: "Export-ready logistics hub with efficient sea freight worldwide.",
  },
  {
    icon: Truck,
    label: "Flexible Trade Terms",
    text: "FOB, CIF, DDP — sample shipments to bulk orders.",
  },
];

const supportSteps = ["Inquiry", "Production", "Inspection", "Shipment"];

function CertificateCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const visibleCount = 3;
  const maxIndex = certificates.length - visibleCount;

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

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
      const next = Math.max(s - 0.5, 0.5);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
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

  const handlePointerUp = () => {
    setDragging(false);
  };

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex gap-3 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          >
            {certificates.map((cert, i) => (
              <div
                key={i}
                className="flex-shrink-0 cursor-pointer group/cert"
                style={{ width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * 12 / visibleCount}px)` }}
                onClick={() => openLightbox(cert.src)}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-neutral-50 border border-neutral-100">
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    quality={55}
                    className="object-contain p-1 group-hover/cert:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {currentIndex > 0 && (
          <button
            onClick={prev}
            aria-label="Previous certificates"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-600" />
          </button>
        )}
        {currentIndex < maxIndex && (
          <button
            onClick={next}
            aria-label="Next certificates"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          </button>
        )}
      </div>

      {/* Lightbox - rendered via portal to body */}
      {lightboxImg && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full h-full flex items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
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

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/70 backdrop-blur-md rounded-full px-4 py-2">
            <button
              onClick={(e) => { e.stopPropagation(); zoomOut(); }}
              className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors text-lg font-bold"
              aria-label="Zoom out"
            >
              −
            </button>
            <span className="text-white text-sm min-w-[4rem] text-center">{Math.round(scale * 100)}%</span>
            <button
              onClick={(e) => { e.stopPropagation(); zoomIn(); }}
              className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors text-lg font-bold"
              aria-label="Zoom in"
            >
              +
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <span className="text-white text-xl">✕</span>
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

function AnimatedMetric({ metric, suffix }: { metric: string; suffix: string }) {
  return (
    <span className="tabular-nums">
      {metric}
      {suffix}
    </span>
  );
}

export function TrustEvidence() {
  return (
    <section className="bg-white section-padding">
      <div className="container-wide">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-24">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-neutral-900"
          >
            Every claim,
            <br />
            verifiable.
          </h2>
          <p
            className="text-neutral-500 leading-relaxed self-end"
          >
            Certifications, R&D capability, logistics infrastructure, and order
            support — documented and ready for your review before you place a
            single order.
          </p>
        </div>

        {/* Metrics row */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 mb-px"
        >
          {trustMetrics.map((item) => (
            <div
              key={item.number}
              className="bg-white p-8 sm:p-10"
            >
              <span className="font-mono text-xs text-neutral-400 block mb-6">
                {item.number}
              </span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl sm:text-5xl font-semibold text-neutral-900">
                  <AnimatedMetric metric={item.metric} suffix={item.suffix} />
                </span>
                <span className="text-sm text-neutral-500">{item.unit}</span>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Detail panels */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-neutral-200"
        >
          {/* Certificates Carousel */}
          <div
            className="bg-white p-8 sm:p-10"
          >
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <span className="font-mono text-xs text-neutral-400 block mb-3">
                  04
                </span>
                <h3 className="text-lg font-medium text-neutral-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-neutral-400" />
                  Certified Quality & Patents
                </h3>
              </div>
              <span className="type-caption text-neutral-400">
                {certificates.length} Certificates
              </span>
            </div>

            <CertificateCarousel />

            <p className="text-xs text-neutral-400 mt-6 leading-relaxed">
              ISO 9001 / ISO 14001 / ISO 45001 certified. 13+ utility model patents.
            </p>
          </div>

          {/* Logistics + Support */}
          <div
            className="bg-white p-8 sm:p-10"
          >
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <span className="font-mono text-xs text-neutral-400 block mb-3">
                  05
                </span>
                <h3 className="text-lg font-medium text-neutral-900 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-neutral-400" />
                  Delivery & Support
                </h3>
              </div>
              <span className="type-caption text-neutral-400">
                Inquiry → Shipment
              </span>
            </div>

            <ul className="space-y-5 mb-8">
              {logistics.map((item) => (
                <li key={item.label} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md border border-neutral-200 flex items-center justify-center mt-0.5">
                    <item.icon className="w-4 h-4 text-neutral-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {item.label}
                    </p>
                    <p className="text-sm text-neutral-500 leading-relaxed mt-1">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-neutral-100 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Handshake className="w-4 h-4 text-neutral-400" />
                <span className="type-caption text-neutral-500">
                  End-to-end follow-up
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {supportSteps.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="text-xs font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-full">
                      {step}
                    </span>
                    {i < supportSteps.length - 1 && (
                      <span className="w-3 h-px bg-neutral-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
