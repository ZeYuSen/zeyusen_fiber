import Image from "next/image";
import type { ReactNode } from "react";

export function PageMediaHero({
  title,
  description,
  image,
  imageAlt,
  breadcrumbs,
  children,
  compact = false,
  objectPosition = "center",
}: {
  // `eyebrow` / `accent` are still accepted from callers for compatibility but
  // are no longer rendered (the eyebrow strip was removed in favor of a
  // centered layout).
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  image: string;
  imageAlt: string;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
  accent?: "neutral" | "carbon" | "glass";
  compact?: boolean;
  objectPosition?: string;
}) {
  return (
    <section
      className={`relative isolate flex flex-col overflow-hidden bg-neutral-950 ${
        compact ? "min-h-[320px] sm:min-h-[360px]" : "min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]"
      }`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        preload
        sizes="100vw"
        quality={78}
        className="object-cover"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.55)_0%,rgba(2,6,23,0.22)_38%,rgba(2,6,23,0.4)_100%)]" />

      {/* Breadcrumbs pinned to the top (absolute), clear of the fixed navbar */}
      {breadcrumbs ? (
        <div className="container-wide absolute inset-x-0 top-0 z-10 pt-24 sm:pt-28">
          <div className="flex justify-start text-sm text-white/65 [&_a]:transition-colors [&_a:hover]:text-white">
            {breadcrumbs}
          </div>
        </div>
      ) : null}

      {/* Title + description centered in the full hero */}
      <div className="container-wide relative z-10 flex w-full flex-1 flex-col items-center justify-center px-4 pb-10 pt-32 text-center sm:pt-36">
        <h1 className="max-w-[24ch] text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <div className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/80 sm:text-base">
            {description}
          </div>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
