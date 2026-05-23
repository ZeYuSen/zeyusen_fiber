"use client";

import { useEffect, useState } from "react";

export type TocHeading = { id: string; text: string; level: 2 | 3 };

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="text-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-neutral-200">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block py-0.5 text-xs leading-relaxed transition-colors hover:text-neutral-900 ${
                h.level === 3 ? "pl-4" : "pl-3"
              } ${
                activeId === h.id
                  ? "text-carbon-accent border-l-2 border-carbon-accent -ml-px"
                  : "text-neutral-400 border-l-2 border-transparent -ml-px"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
