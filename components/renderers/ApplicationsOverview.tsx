import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  Building2,
  Car,
  Factory,
  Filter,
  Plane,
  Shield,
  Train,
  Wind,
  Zap,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getApplicationGroups } from "@/lib/data-i18n";
import {
  getApplicationGroup,
  type ApplicationIcon,
  type ApplicationMaterial,
} from "@/data/applications";

const icons: Record<ApplicationIcon, React.ComponentType<{ className?: string }>> = {
  anchor: Anchor,
  building: Building2,
  car: Car,
  factory: Factory,
  filter: Filter,
  plane: Plane,
  shield: Shield,
  train: Train,
  wind: Wind,
  zap: Zap,
};

// Detail slug for an application item, derived from its English detailHref.
function detailSlug(detailHref?: string): { division: "carbon" | "glass"; slug: string } | null {
  if (!detailHref) return null;
  const m = detailHref.match(/^\/(carbon|glass)-fiber\/applications\/(.+)$/);
  if (!m) return null;
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
  };
}) {
  void getApplicationGroups(locale); // locale-aware data hook (en passthrough for now)
  const selectedGroup = getApplicationGroup(selectedMaterial);
  const groups = getApplicationGroups(locale);

  const materialHref = (material: ApplicationMaterial) =>
    material === "carbon"
      ? localizedHref("applications", locale)
      : localizedHref("applications-glass", locale);

  return (
    <>
      <section className="pt-36 pb-12">
        <div className="container-wide">
          <p className="type-caption text-neutral-400">{copy.eyebrow}</p>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-10 lg:gap-16 items-end">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 max-w-3xl">
                {copy.title}
              </h1>
              <p className="text-neutral-500 mt-5 max-w-2xl leading-relaxed">
                {copy.intro}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {groups.map((group) => {
                const isActive = group.material === selectedMaterial;
                return (
                  <Link
                    key={group.material}
                    href={materialHref(group.material)}
                    className={`rounded-lg border p-4 transition-colors ${
                      isActive
                        ? `${group.borderClass} ${group.bgClass}`
                        : "border-neutral-100 bg-white hover:border-neutral-200"
                    }`}
                  >
                    <span className={`type-caption ${group.accentClass}`}>
                      {group.label}
                    </span>
                    <span className="mt-3 block text-sm text-neutral-500 leading-relaxed">
                      {group.applications.length} {copy.fieldsSuffix}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-wide">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className={`type-caption ${selectedGroup.accentClass}`}>
                {selectedGroup.eyebrow}
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-3">
                {selectedGroup.label}
              </h2>
              <p className="text-neutral-500 mt-3 max-w-xl leading-relaxed">
                {selectedGroup.summary}
              </p>
            </div>
            <Link
              href={
                selectedMaterial === "carbon"
                  ? localizedHref("carbon-products", locale)
                  : localizedHref("glass-products", locale)
              }
              className={`inline-flex items-center gap-2 text-sm font-medium ${selectedGroup.accentClass} hover:text-neutral-900 transition-colors`}
            >
              {dict.actions.browseRelated} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {selectedGroup.applications.map((application) => {
              const Icon = icons[application.icon];
              const detail = detailSlug(application.detailHref);
              const href = detail
                ? localizedHref(
                    detail.division === "carbon" ? "carbon-application" : "glass-application",
                    locale,
                    { slug: detail.slug },
                  )
                : localizedHref("contact", locale);
              return (
                <Link
                  key={application.slug}
                  href={href}
                  className="group block rounded-lg border border-neutral-100 bg-white p-6 sm:p-7 hover:border-neutral-200 transition-colors"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-lg border border-neutral-100 bg-neutral-50 flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-5 h-5 ${selectedGroup.accentClass}`} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-neutral-900">
                        {application.title}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                        {application.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
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
                        className={`mt-5 inline-flex items-center gap-1 text-xs font-medium ${selectedGroup.accentClass} group-hover:text-neutral-900 transition-colors`}
                      >
                        {application.detailHref ? copy.viewDetails : copy.requestGuidance}
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

      <section className="pb-24">
        <div className="container-wide max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            {copy.hubTitle}
          </h2>
          {copy.hubParagraphs.map((paragraph, i) => (
            <p key={i} className="mt-4 text-neutral-500 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
