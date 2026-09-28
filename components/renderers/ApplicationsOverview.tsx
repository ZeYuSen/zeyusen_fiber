import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getApplicationGroups } from "@/lib/data-i18n";
import {
  getApplicationGroup,
  type ApplicationMaterial,
} from "@/data/applications";
import { WorldStage } from "@/components/fx/world/WorldStage";
import { getApplicationCardImage } from "@/lib/site-images";

// Detail slug for an application item, derived from its English detailHref.
// Every application must resolve to a detail page — a missing or malformed
// detailHref is a data error, never a silent redirect to Contact.
const divisionImages: Record<ApplicationMaterial, string> = {
  carbon: "/images/carbon-fiber/carbon_division.webp",
  glass: "/images/glass-fiber/glass_division.webp",
};

function detailSlug(detailHref: string | undefined, slug: string): { division: "carbon" | "glass"; slug: string } {
  if (!detailHref) {
    throw new Error(`Application "${slug}" is missing detailHref — add its detail data instead of falling back to Contact.`);
  }
  const m = detailHref.match(/^\/(carbon|glass)-fiber\/applications\/(.+)$/);
  if (!m) {
    throw new Error(`Application "${slug}" has malformed detailHref "${detailHref}".`);
  }
  return { division: m[1] as "carbon" | "glass", slug: m[2] };
}

// Applications hub. The fiber world behind the stage is pulled apart — carbon
// to the left, glass to the right — and the two materials are the two sides of
// the stage; switching between them pans the camera across (lib/fx/world/state.ts).
export function ApplicationsOverview({
  selectedMaterial,
  locale,
  dict,
  copy,
}: {
  selectedMaterial: ApplicationMaterial;
  locale: Locale;
  dict: Dictionary;
  copy: {
    eyebrow: string;
    title: string;
    intro: string;
    fieldsSuffix: string;
    hubTitle: string;
    hubParagraphs: string[];
    viewDetails: string;
    requestGuidance: string;
    imageNote: string;
  };
}) {
  const groups = getApplicationGroups(locale);
  const selectedGroup =
    groups.find((group) => group.material === selectedMaterial) ??
    getApplicationGroup(selectedMaterial);

  const materialHref = (material: ApplicationMaterial) =>
    material === "carbon"
      ? localizedHref("applications", locale)
      : localizedHref("applications-glass", locale);

  return (
    <>
      <WorldStage
        breadcrumbs={
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
            <Link href={localizedHref("home", locale)}>{dict.nav.home}</Link>
            <span>/</span>
            <span className="text-white/90">{dict.nav.applications}</span>
          </nav>
        }
        title={copy.title}
        description={copy.intro}
      >
        {/* The two materials as two large panels, one on each side of the
            parted fabric: the current one lit, the other held in shadow. */}
        <nav aria-label={dict.nav.applications} className="grid grid-cols-2 gap-3 sm:gap-5 lg:max-w-5xl">
          {groups.map((group) => {
            const isActive = group.material === selectedMaterial;
            return (
              <Link
                key={group.material}
                href={materialHref(group.material)}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex min-h-[9.5rem] flex-col justify-end overflow-hidden rounded-sm p-5 ring-1 transition-[box-shadow] duration-500 sm:min-h-[12rem] sm:p-7 ${
                  isActive ? "ring-white/70" : "ring-white/10 hover:ring-white/35"
                }`}
              >
                <Image
                  src={divisionImages[group.material]}
                  alt=""
                  fill
                  quality={60}
                  sizes="(min-width: 1024px) 480px, 50vw"
                  className={`fx-grade object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.03] ${
                    isActive ? "opacity-70" : "opacity-25 group-hover:opacity-50"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/55 to-[#080A0D]/10" />
                <div className="relative flex items-end justify-between gap-4">
                  <div>
                    <span
                      className={`block text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-tight tracking-[-0.02em] transition-colors [&:lang(zh)]:tracking-normal ${
                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
                      }`}
                    >
                      {group.label}
                    </span>
                    <span className={`mt-1.5 block text-sm ${isActive ? "text-white/75" : "text-white/45"}`}>
                      <span className="tabular-nums">{group.applications.length}</span> {copy.fieldsSuffix}
                    </span>
                  </div>
                  <ArrowRight
                    className={`mb-1 h-5 w-5 shrink-0 transition-all duration-300 ${
                      isActive ? "rotate-90 text-white" : "text-white/40 group-hover:translate-x-1 group-hover:text-white"
                    }`}
                  />
                </div>
              </Link>
            );
          })}
        </nav>
      </WorldStage>

      <section data-tone="night" data-world="still" className="relative pb-28 pt-20 sm:pb-36 sm:pt-28">
        <div className="container-wide">
          <div className="mb-14 flex flex-col gap-6 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="stage-label">{selectedGroup.eyebrow}</p>
              <h2
                data-reveal="text"
                className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.025em] text-[#E6EAEE] [&:lang(ko)]:tracking-normal [&:lang(zh)]:tracking-normal"
              >
                {selectedGroup.label}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">{selectedGroup.summary}</p>
            </div>
            <Link
              href={
                selectedMaterial === "carbon"
                  ? localizedHref("carbon-fiber", locale)
                  : localizedHref("glass-fiber", locale)
              }
              className="inline-flex shrink-0 items-center gap-2 border-b border-white/25 pb-1 text-sm font-medium text-white/85 transition-all duration-300 hover:gap-3 hover:border-white/70 hover:text-white"
            >
              {dict.actions.browseRelated} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div data-reveal="stagger" className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:gap-x-12">
            {selectedGroup.applications.map((application) => {
              const detail = detailSlug(application.detailHref, application.slug);
              const href = localizedHref(
                detail.division === "carbon" ? "carbon-application" : "glass-application",
                locale,
                { slug: detail.slug },
              );
              return (
                <Link key={application.slug} href={href} className="group block">
                  {/* Evidence plate: the industry itself, graded into the night. */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white/[0.03]">
                    <Image
                      src={getApplicationCardImage(application.slug, selectedMaterial)}
                      alt={`${application.title} — ${copy.imageNote}`}
                      fill
                      quality={72}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="fx-grade object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-7 flex items-start justify-between gap-6">
                    <h3 className="text-2xl font-medium tracking-[-0.01em] text-[#E6EAEE] sm:text-[1.75rem]">
                      {application.title}
                    </h3>
                    <ArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  <p className="mt-3 max-w-lg leading-relaxed text-white/55">{application.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {application.products.map((product) => (
                      <span
                        key={product}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-white/75 transition-colors group-hover:text-white">
                    {copy.viewDetails}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section data-tone="paper" className="relative py-24 sm:py-32">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <h2 data-reveal="text" className="paper-title lg:col-span-5">
              {copy.hubTitle}
            </h2>
            <div className="lg:col-span-7 lg:pt-2">
              {copy.hubParagraphs.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-[#15181C]/70 [&:not(:first-child)]:mt-5">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
