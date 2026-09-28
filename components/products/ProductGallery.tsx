"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut } from "lucide-react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const zoomFactor = 3;
  const lensSize = 50;
  const lensPercent = lensSize / zoomFactor;
  const lensLeft = Math.min(
    Math.max(zoomPosition.x - lensPercent / 2, 0),
    100 - lensPercent,
  );
  const lensTop = Math.min(
    Math.max(zoomPosition.y - lensPercent / 2, 0),
    100 - lensPercent,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomEnabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-4">
      <div
        className="relative"
        onMouseLeave={() => { if (zoomEnabled) setZoomEnabled(false); }}
      >
        <div
          ref={containerRef}
          className={`relative aspect-square overflow-hidden rounded-sm bg-[#E2DFD8] ${
            zoomEnabled ? "cursor-crosshair" : "cursor-default"
          }`}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIndex]}
                alt={`${name} - Image ${activeIndex + 1}`}
                fill
                quality={68}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover"
                preload={activeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {zoomEnabled && (
            <div
              className="absolute border border-[#15181C]/70 bg-white/10 pointer-events-none will-change-transform"
              style={{
                width: `${lensPercent}%`,
                height: `${lensPercent}%`,
                left: `${lensLeft}%`,
                top: `${lensTop}%`,
              }}
            />
          )}
        </div>

        <button
          onClick={() => setZoomEnabled(!zoomEnabled)}
          className={`absolute top-3 right-3 z-20 p-2.5 rounded-full transition-colors ${
            zoomEnabled
              ? "bg-[#15181C] text-white"
              : "bg-[#EEECE6]/85 text-[#15181C] hover:bg-[#EEECE6]"
          }`}
          aria-label={zoomEnabled ? "Disable zoom" : "Enable zoom"}
        >
          {zoomEnabled ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
        </button>

        {zoomEnabled && (
          <div className="absolute top-0 left-[calc(100%+16px)] w-72 h-72 rounded-sm overflow-hidden border border-[#15181C]/15 shadow-[0_18px_40px_-12px_rgba(21,24,28,0.35)] bg-[#E2DFD8] hidden lg:block">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${images[activeIndex]})`,
                backgroundSize: `${zoomFactor * 100}%`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-[#15181C]/70 text-white text-xs rounded-sm">
              {zoomFactor}x Zoom
            </div>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="-m-1 flex gap-3 overflow-x-auto p-1 pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 bg-[#E2DFD8] ring-offset-2 ring-offset-[#EEECE6] transition-shadow cursor-pointer ${
                i === activeIndex ? "ring-1 ring-[#15181C]" : "ring-0 hover:ring-1 hover:ring-[#15181C]/25"
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
