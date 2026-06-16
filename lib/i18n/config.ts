export const locales = ["en", "zh", "ko", "es", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// hreflang / OG / <html lang> / switcher label metadata. Single source of truth.
export const localeMeta: Record<
  Locale,
  { hreflang: string; ogLocale: string; label: string; htmlLang: string }
> = {
  en: { hreflang: "en", ogLocale: "en_US", label: "English", htmlLang: "en" },
  zh: { hreflang: "zh", ogLocale: "zh_CN", label: "中文", htmlLang: "zh" },
  ko: { hreflang: "ko", ogLocale: "ko_KR", label: "한국어", htmlLang: "ko" },
  es: { hreflang: "es", ogLocale: "es_ES", label: "Español", htmlLang: "es" },
  pt: { hreflang: "pt", ogLocale: "pt_BR", label: "Português", htmlLang: "pt" },
};
