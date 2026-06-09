import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { primaryEmail } from "@/lib/contact";

export const metadata: Metadata = createPageMetadata({
  title: "Website Terms of Service",
  description:
    "Review the website terms covering product information, quotation requests, business communication, and acceptable use of ZeYuSen Fiber content.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="pt-36 pb-24">
      <div className="container-wide max-w-3xl">
        <p className="type-caption text-neutral-400">Legal</p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mt-3">
          Terms of Service
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-600">
          <p>
            This website provides general information about ZeYuSen Fiber products,
            applications, and services. By using the website, you agree to use the
            content for lawful business and informational purposes.
          </p>
          <h2 className="text-lg font-semibold text-neutral-900">Product Information</h2>
          <p>
            Product descriptions, specifications, and application notes are provided
            for preliminary reference. Final suitability, technical requirements,
            and commercial terms should be confirmed with our team before purchase
            or production use.
          </p>
          <h2 className="text-lg font-semibold text-neutral-900">Inquiries and Communication</h2>
          <p>
            Submitting an inquiry does not create a binding order. Quotations,
            lead times, samples, and supply terms are confirmed separately through
            direct business communication.
          </p>
          <h2 className="text-lg font-semibold text-neutral-900">Intellectual Property</h2>
          <p>
            Website text, product photography, diagrams, and downloadable materials
            are provided for business evaluation and reference. Reuse, republication,
            or redistribution should be agreed in advance unless otherwise stated.
          </p>
          <h2 className="text-lg font-semibold text-neutral-900">Commercial Confirmation</h2>
          <p>
            Final pricing, shipping terms, lead times, technical tolerances, and
            inspection standards are confirmed in quotation documents, samples, or
            commercial agreements rather than inferred from website summaries alone.
          </p>
          <h2 className="text-lg font-semibold text-neutral-900">Contact</h2>
          <p>
            For questions about these terms, contact us at
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
