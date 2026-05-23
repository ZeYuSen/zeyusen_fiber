"use client";

import { useState } from "react";

type FAQItem = { question: string; answer: string };

function FAQItemRow({ item, open, onToggle }: { item: FAQItem; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-neutral-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-neutral-900 hover:text-carbon-accent transition-colors"
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <svg
          className={`ml-4 h-4 w-4 flex-shrink-0 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm leading-relaxed text-neutral-600">{item.answer}</p>
      </div>
    </div>
  );
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">Frequently Asked Questions</h2>
      <div className="rounded-xl border border-neutral-100 bg-white px-5">
        {items.map((item, i) => (
          <FAQItemRow
            key={i}
            item={item}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
