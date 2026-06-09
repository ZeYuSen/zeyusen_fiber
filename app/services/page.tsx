import type { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Composite Material Services & OEM Support",
  description:
    "Explore OEM and ODM customization, technical support, quality assurance, export logistics, and after-sales support for composite material projects.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
