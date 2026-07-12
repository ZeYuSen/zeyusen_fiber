import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getApplicationGroups } from "@/lib/data-i18n";
import {
  getApplicationGroup,
  type ApplicationMaterial,
} from "@/data/applications";
import { PageMediaHero } from "@/components/ui/PageMediaHero";
import { getApplicationImage, getApplicationCardImage } from "@/lib/site-images";

// Detail slug for an application item, derived from its English detailHref.
// Every application must resolve to a detail page — a missing or malformed
// detailHref is a data error, never a silent redirect to Contact.
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
      <PageMediaHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.intro}
        image={getApplicationImage(selectedGroup.applications[0].slug, selectedMaterial)}
        imageAlt={`${selectedGroup.label} — ${copy.imageNote}`}
        accent={selectedMaterial}
        breadcrumbs={
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
            <Link href={localizedHref("home", locale)}>{dict.nav.home}</Link>
            <span>/</span>
            <span className="text-white/90">{dict.nav.applications}</span>
          </nav>
        }
      />

      <section className="border-b border-neutral-100 py-14">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-3xl">
            {groups.map((group) => {
              const isActive = group.material === selectedMaterial;
              return (
                <Link
                  key={group.material}
                  href={materialHref(group.material)}
                  className={`group rounded-2xl border p-8 transition-colors ${
                    isActive
                      ? `${group.borderClass} ${group.bgClass} ${
                          group.material === "carbon" ? "ring-1 ring-carbon-accent" : "ring-1 ring-glass-accent"
                        }`
                      : "border-neutral-200 bg-white hover:border-neutral-400"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`text-xl sm:text-2xl font-semibold ${group.accentClass}`}>
                      {group.label}
                    </span>
                    {isActive && (
                      <ArrowRight className={`w-5 h-5 ${group.accentClass}`} />
                    )}
                  </div>
                  <span
                    className={`mt-5 flex items-baseline gap-2 ${
                      isActive ? "text-neutral-700" : "text-neutral-500"
                    }`}
                  >
                    <span className="text-4xl font-semibold tabular-nums tracking-tight leading-none text-neutral-900">
                      {group.applications.length}
                    </span>
                    <span className="text-sm">{copy.fieldsSuffix}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className={`type-caption ${selectedGroup.accentClass}`}>
                {selectedGroup.eyebrow}
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 mt-4 tracking-tight leading-[1.05]">
                {selectedGroup.label}
              </h2>
              <p className="text-neutral-500 mt-6 max-w-xl leading-relaxed text-lg">
                {selectedGroup.summary}
              </p>
            </div>
            <Link
              href={
                selectedMaterial === "carbon"
                  ? localizedHref("carbon-fiber", locale)
                  : localizedHref("glass-fiber", locale)
              }
              className={`inline-flex items-center gap-2 text-sm font-medium ${selectedGroup.accentClass} hover:text-neutral-900 transition-colors`}
            >
              {dict.actions.browseRelated} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {selectedGroup.applications.map((application) => {
              const detail = detailSlug(application.detailHref, application.slug);
              const href = localizedHref(
                detail.division === "carbon" ? "carbon-application" : "glass-application",
                locale,
                { slug: detail.slug },
              );
              return (
                <Link
                  key={application.slug}
                  href={href}
                  className="group block overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-all hover:border-neutral-300 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                    <Image
                      src={getApplicationCardImage(application.slug, selectedMaterial)}
                      alt={`${application.title} — ${copy.imageNote}`}
                      fill
                      quality={72}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
                  </div>
                  <div className="p-8">
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold text-neutral-900">
                        {application.title}
                      </h3>
                      <p className="mt-3 text-base text-neutral-500 leading-relaxed">
                        {application.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {application.products.map((product) => (
                          <span
                            key={product}
                            className="rounded-full border border-neutral-100 bg-neutral-50 px-3 py-1 text-xs text-neutral-600"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                      <span
                        className={`mt-6 inline-flex items-center gap-1 text-xs font-medium ${selectedGroup.accentClass} group-hover:text-neutral-900 transition-colors`}
                      >
                        {copy.viewDetails}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-neutral-100">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <h2 className="lg:col-span-5 text-4xl sm:text-5xl font-semibold text-neutral-900 tracking-tight leading-[1.05]">
              {copy.hubTitle}
            </h2>
            <div className="lg:col-span-7 lg:pt-2">
              {copy.hubParagraphs.map((paragraph, i) => (
                <p key={i} className="text-lg text-neutral-500 leading-relaxed [&:not(:first-child)]:mt-5">
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
