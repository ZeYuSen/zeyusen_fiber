import type { Metadata } from "next";
import CarbonFiberPageContent from "./CarbonFiberPageContent";
import { createPageMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = createPageMetadata({
  title: "Carbon Fiber Materials",
  description:
    "Browse carbon fiber mats, woven cloth, hybrid cloth, and raw fiber materials for aerospace, motorsport, defense, and energy applications.",
  path: "/carbon-fiber",
});

const carbonFiberFaq = [
  {
    question: "What types of carbon fiber materials does ZeYuSen offer?",
    answer: "ZeYuSen offers carbon fiber surface mats (10g-50g/m²), needled mats, nickel-plated mats for EMI shielding, woven carbon fiber cloth, carbon-glass hybrid cloth, and raw carbon fiber tow.",
  },
  {
    question: "What industries use ZeYuSen carbon fiber products?",
    answer: "Our carbon fiber materials serve aerospace, military defense, new energy (fuel cells), automotive, marine, and sporting goods industries.",
  },
  {
    question: "Can ZeYuSen provide custom carbon fiber specifications?",
    answer: "Yes, we offer custom weight specifications from 10g/m² to 600g/m², custom widths, and specialized surface treatments tailored to your application requirements.",
  },
];

export default function CarbonFiberPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(carbonFiberFaq)) }}
      />
      <CarbonFiberPageContent />
    </>
  );
}
