import Image from "next/image";
import type { ReactNode } from "react";

const accentClasses = {
  neutral: "bg-white/70",
  carbon: "bg-cyan-400",
  glass: "bg-emerald-400",
} as const;

export function PageMediaHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  breadcrumbs,
  children,
  accent = "neutral",
  compact = false,
  objectPosition = "center",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  image: string;
  imageAlt: string;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
  accent?: keyof typeof accentClasses;
  compact?: boolean;
  objectPosition?: string;
}) {
  return (
    <section
      className={`relative isolate flex items-end overflow-hidden bg-neutral-950 ${
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
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.72)_48%,rgba(2,6,23,0.16)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,rgba(2,6,23,0.48),transparent)]" />

      <div className="container-wide relative z-10 w-full pb-10 pt-28 sm:pb-12 sm:pt-32">
        {breadcrumbs ? (
          <div className="mb-5 text-sm text-white/60 [&_a]:transition-colors [&_a:hover]:text-white">
            {breadcrumbs}
          </div>
        ) : null}

        <div className="max-w-4xl">
          {eyebrow ? (
            <div className="mb-4 flex items-center gap-3">
              <span className={`h-px w-10 ${accentClasses[accent]}`} aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                {eyebrow}
              </p>
            </div>
          ) : null}
          <h1 className="max-w-[18ch] text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <div className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              {description}
            </div>
          ) : null}
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
