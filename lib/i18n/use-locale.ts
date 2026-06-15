"use client";

import { usePathname } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "./config";

// Client-side current locale, derived from the first path segment.
export function useLocale(): Locale {
  const pathname = usePathname();
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : defaultLocale;
}
