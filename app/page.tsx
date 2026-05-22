import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroImmersive } from "@/components/sections/HeroImmersive";
import { DivisionsSplit } from "@/components/sections/DivisionsSplit";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ZeYuSen Fiber | Carbon Fiber & Glass Fiber Composite Materials Manufacturer",
  description:
    "Leading manufacturer of carbon fiber mats, glass fiber fabrics, and composite reinforcements for aerospace, wind energy, construction, and advanced manufacturing. Custom solutions from 10g/m² to 600g/m².",
  path: "/",
});

const StatsBar = dynamic(() => import("@/components/sections/StatsBar").then(m => m.StatsBar));
const IndustriesGrid = dynamic(() => import("@/components/sections/IndustriesGrid").then(m => m.IndustriesGrid));
const WhyPartnerNew = dynamic(() => import("@/components/sections/WhyPartnerNew").then(m => m.WhyPartnerNew));
const TrustEvidence = dynamic(() => import("@/components/sections/TrustEvidence").then(m => m.TrustEvidence));
const CTAFinal = dynamic(() => import("@/components/sections/CTAFinal").then(m => m.CTAFinal));

export default function Home() {
  return (
    <>
      <HeroImmersive />
      <DivisionsSplit />
      <StatsBar />
      <IndustriesGrid />
      <WhyPartnerNew />
      <TrustEvidence />
      <CTAFinal />
    </>
  );
}
