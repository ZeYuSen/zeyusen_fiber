import { primaryEmail } from "@/lib/contact";

// Legal pages (privacy / terms). Body copy is passed in already-translated as
// an array of { heading, paragraphs } sections plus an intro.
export type LegalSection = { heading: string; body: string };

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  contactHeading,
  contactPrefix,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
  contactHeading: string;
  contactPrefix: string;
}) {
  return (
    <section className="pt-36 pb-24">
      <div className="container-wide max-w-3xl">
        <p className="type-caption text-neutral-400">{eyebrow}</p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mt-3">{title}</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-600">
          <p>{intro}</p>
          {sections.map((section) => (
            <div key={section.heading} className="space-y-2">
              <h2 className="text-lg font-semibold text-neutral-900">{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          ))}
          <h2 className="text-lg font-semibold text-neutral-900">{contactHeading}</h2>
          <p>
            {contactPrefix}
            <a className="ml-1 text-carbon-accent hover:text-neutral-900" href={`mailto:${primaryEmail}`}>
              {primaryEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
