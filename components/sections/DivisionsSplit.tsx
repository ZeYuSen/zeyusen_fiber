"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedHref, type PageKey } from "@/lib/i18n/routes";
import { getHomeContent } from "@/lib/i18n/home-content";

// "The Unweave": the woven fabric from the hero pulls apart as this section
// rises (data-world="split") — carbon warp slides left, glass weft slides
// right — so the two divisions sit on the side their fibers went to.
const divisionMeta: Array<{
  id: "carbon" | "glass";
  image: string;
  pageKey: PageKey;
}> = [
  {
    id: "carbon",
    image: "/images/carbon-fiber/carbon_division.webp",
    pageKey: "carbon-fiber",
  },
  {
    id: "glass",
    image: "/images/glass-fiber/glass_division.webp",
    pageKey: "glass-fiber",
  },
];

export function DivisionsSplit() {
  const locale = useLocale();
  const home = getHomeContent(locale);
  const divisions = divisionMeta.map((m) => ({ ...m, ...home.divisions[m.id] }));

  return (
    <section
      data-tone="night"
      data-world="split"
      className="relative pb-28 pt-32 sm:pb-36 sm:pt-44 lg:min-h-[120svh] lg:pb-40 lg:pt-[34svh]"
    >
      <div className="container-wide">
        {/* Two columns sharing one row grid (subgrid), so the names, ledes and
            photos of carbon and glass line up exactly side by side. */}
        <div className="grid grid-cols-1 gap-24 sm:gap-32 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-20 lg:gap-y-0 xl:gap-x-28">
          {divisions.map((div) => (
            <article key={div.id} className="flex flex-col lg:row-span-2 lg:grid lg:grid-rows-subgrid">
              <div>
                <h3
                  data-reveal="text"
                  className="text-[clamp(2.25rem,4vw,3.75rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[#E6EAEE] [&:lang(ko)]:tracking-normal [&:lang(zh)]:tracking-normal"
                >
                  {div.label}
                </h3>
                <p data-reveal="up" className="stage-lede mt-5 max-w-md">
                  {div.headline}
                </p>
                <div data-reveal="up">
                  <Link
                    href={localizedHref(div.pageKey, locale)}
                    className="mt-8 inline-flex items-center gap-2 border-b border-white/25 pb-1 text-sm font-medium text-white/85 transition-all duration-300 hover:gap-3 hover:border-white/70 hover:text-white"
                  >
                    {home.exploreProducts}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Evidence plate — the division's own floor, below its name. */}
              <div
                data-reveal="image"
                className="relative mt-12 aspect-[4/3] overflow-hidden rounded-sm bg-white/[0.03] sm:mt-14"
              >
                <div data-parallax="5" className="absolute inset-x-0 -inset-y-[8%]">
                  <Image
                    src={div.image}
                    alt={div.label}
                    fill
                    className="fx-grade object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
