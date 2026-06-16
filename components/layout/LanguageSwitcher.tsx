"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import { useState } from "react";
import { locales, localeMeta, isLocale, defaultLocale } from "@/lib/i18n/config";
import { resolveRoute, localizedHref } from "@/lib/i18n/routes";

// Maps the current page to its equivalent in every locale via the route
// manifest, so localized slugs map correctly across languages.
export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const current = segments[0] && isLocale(segments[0]) ? segments[0] : defaultLocale;
  const slug = segments.slice(1);
  const resolved = resolveRoute(current, slug);

  const hrefFor = (target: (typeof locales)[number]) =>
    resolved ? localizedHref(resolved.pageKey, target, resolved.params) : `/${target}`;

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
          light ? "text-white/80 hover:text-white" : "text-text-secondary hover:text-text-primary"
        }`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Globe className="w-4 h-4" />
        <span>{localeMeta[current].label}</span>
      </button>
      <div
        className={`absolute top-full right-0 pt-3 w-40 transition-all duration-200 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white border border-black/[0.06] p-2 shadow-lg rounded-lg">
          {locales.map((target) => (
            <Link
              key={target}
              href={hrefFor(target)}
              hrefLang={localeMeta[target].hreflang}
              className={`block px-3 py-2 text-sm rounded transition-colors ${
                target === current
                  ? "bg-black/[0.04] text-text-primary font-medium"
                  : "text-text-secondary hover:text-text-primary hover:bg-black/[0.03]"
              }`}
            >
              {localeMeta[target].label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
