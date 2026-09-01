"use client";

import { useEffect } from "react";
import type { AgentIndex } from "@/lib/agent-tools";

type ContactInfo = {
  company: string;
  email: string;
  phone: string;
  address: string;
};

type Props = {
  index: AgentIndex;
  contact: ContactInfo;
  contactHref: string;
};

function text(payload: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(payload) }] };
}

// Registers read-only / navigation tools with the browser via WebMCP so an
// in-browser agent can help users find products and reach the quote form.
// No-ops in browsers without navigator.modelContext. Submitting an inquiry is
// intentionally NOT exposed: the form is gated by Cloudflare Turnstile.
export function WebMCPProvider({ index, contact, contactHref }: Props) {
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.modelContext) return;

    navigator.modelContext.provideContext({
      tools: [
        {
          name: "search_products",
          description:
            "Search ZeYuSen Fiber's carbon fiber and glass fiber products by keyword. Returns matching product names, descriptions, and page URLs.",
          inputSchema: {
            type: "object",
            properties: {
              query: { type: "string", description: "Keyword, e.g. 'surface mat' or 'rotor paper'." },
            },
            required: ["query"],
          },
          execute: (args) => {
            const q = String(args.query ?? "").toLowerCase().trim();
            const matches = !q
              ? index.products
              : index.products.filter(
                  (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q),
                );
            return text({ count: matches.length, products: matches.slice(0, 20) });
          },
        },
        {
          name: "list_product_categories",
          description:
            "List ZeYuSen Fiber product categories, optionally filtered by division (carbon or glass).",
          inputSchema: {
            type: "object",
            properties: {
              division: { type: "string", enum: ["carbon", "glass"] },
            },
          },
          execute: (args) => {
            const div = args.division ? String(args.division) : null;
            const cats = div
              ? index.categories.filter((c) => c.division === div)
              : index.categories;
            return text({ count: cats.length, categories: cats });
          },
        },
        {
          name: "get_company_contact",
          description:
            "Get ZeYuSen Fiber's company contact details and the URL of the quote/contact request page.",
          inputSchema: { type: "object", properties: {} },
          execute: () => text({ ...contact, contactPage: contactHref }),
        },
      ],
    });
  }, [index, contact, contactHref]);

  return null;
}
