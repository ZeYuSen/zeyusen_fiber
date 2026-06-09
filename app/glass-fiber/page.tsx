import type { Metadata } from "next";
import GlassFiberPageContent from "./GlassFiberPageContent";
import { createPageMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = createPageMetadata({
  title: "Fiberglass Materials Supplier",
  description:
    "Source fiberglass tissue mats, woven fabrics, stitched reinforcements, and specialty glass fiber materials for wind energy, construction, and industrial use.",
  path: "/glass-fiber",
});

const glassFiberFaq = [
  {
    question: "What types of glass fiber materials does ZeYuSen offer?",
    answer: "ZeYuSen offers fiberglass tissue mats, chopped strand mats, woven roving, multiaxial fabrics, stitched composite mats, and specialty surface veils for various industrial applications.",
  },
  {
    question: "What applications are glass fiber materials used for?",
    answer: "Our glass fiber products are used in wind turbine blades, construction waterproofing, pipe insulation, marine hulls, automotive panels, and industrial corrosion-resistant linings.",
  },
  {
    question: "What resin systems are compatible with ZeYuSen glass fiber?",
    answer: "Our glass fiber materials are compatible with epoxy, polyester, vinyl ester, and phenolic resin systems, with optimized sizing for each resin type.",
  },
];

export default function GlassFiberPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(glassFiberFaq)) }}
      />
      <GlassFiberPageContent />
    </>
  );
}
