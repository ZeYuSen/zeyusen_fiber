import type { ReactNode } from "react";

// A night "shot" of the fiber world that opens a page: transparent over the
// persistent world (components/fx/world/FiberWorld.tsx), headline card at the
// lower left. All text stays server-rendered. `world` is a data-world value:
// a preset name, "a>b", or "route" for the page's own shot.
export function WorldStage({
  world = "route",
  breadcrumbs,
  title,
  description,
  children,
  size = "tall",
}: {
  world?: string;
  breadcrumbs?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  size?: "tall" | "short";
}) {
  return (
    <section
      data-tone="night"
      data-world={world}
      className={`relative flex flex-col ${size === "tall" ? "min-h-[78svh]" : "min-h-[58svh]"}`}
    >
      {breadcrumbs ? (
        <div className="container-wide w-full pt-28 sm:pt-32">
          <div className="fx-rise text-sm text-white/55 [&_a]:transition-colors [&_a:hover]:text-white">
            {breadcrumbs}
          </div>
        </div>
      ) : null}
      <div className="container-wide flex w-full flex-1 flex-col justify-end pb-14 pt-24 sm:pb-20">
        <h1 className="fx-rise stage-title max-w-[18ch] [--fx-delay:80ms]">{title}</h1>
        {description ? (
          <div className="fx-rise stage-lede mt-6 [--fx-delay:200ms]">{description}</div>
        ) : null}
        {children ? <div className="fx-rise mt-9 [--fx-delay:320ms]">{children}</div> : null}
      </div>
    </section>
  );
}
