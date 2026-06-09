import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Our Composite Materials Team",
  description:
    "Contact ZeYuSen Fiber for product inquiries, samples, quotations, technical support, and custom carbon fiber or fiberglass solutions.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
