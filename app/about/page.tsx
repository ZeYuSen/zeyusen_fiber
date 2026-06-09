import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Our Composite Manufacturing",
  description:
    "Learn about ZeYuSen Fiber's manufacturing footprint, composite material capabilities, quality systems, and global supply support.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageContent />;
}
