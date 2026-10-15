import type { Metadata } from "next";
import type { Locale } from "./i18n/config";
import { localeMeta } from "./i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "ZeYuSen Fiber",
  legalName: "Jiangsu Zeyusen Carbon Fiber Technology Co., Ltd.",
  // Chinese brand names. Kept on every locale (JSON-LD alternateName, footer)
  // so search engines tie "泽宇森" queries to this site.
  zhName: "泽宇森碳纤维",
  zhShortName: "泽宇森",
  zhLegalName: "江苏泽宇森碳纤维科技股份有限公司",
  url: siteUrl,
  title: "ZeYuSen Fiber | Engineered Fiber Solutions",
  description:
    "Manufacturer of carbon fiber mats, fiberglass mats and veils, and desiccant rotor forming paper for industrial composite and dehumidification applications.",
  ogImage: "/images/hero/banner4.jpg",
  ogImageWidth: 1740,
  ogImageHeight: 650,
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

// Brand name shown in titles, OG siteName and image alt for a locale.
export function siteNameFor(locale: Locale) {
  return locale === "zh" ? siteConfig.zhName : siteConfig.name;
}

// Locale-aware page metadata. `path` is the current locale's full localized
// path (with language prefix). `alternates` maps every locale to its localized
// path so we can emit a complete, bidirectional hreflang set + x-default.
export function createPageMetadata({
  locale,
  title,
  description,
  path,
  alternates,
  image = siteConfig.ogImage,
  type = "website",
  absoluteTitle = false,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  alternates: Record<Locale, string>;
  image?: string;
  type?: "website" | "article";
  // Skip the layout's "%s | brand" template (for titles that already lead
  // with the brand name).
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const siteName = siteNameFor(locale);
  const imageUrl = absoluteUrl(image);
  // Only declare dimensions for the default OG image; product/article images
  // vary in size, so let platforms read their actual dimensions.
  const isDefaultImage = image === siteConfig.ogImage;
  const ogImage = isDefaultImage
    ? {
        url: imageUrl,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: `${siteName} - ${title}`,
      }
    : { url: imageUrl, alt: `${siteName} - ${title}` };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "x-default": absoluteUrl(alternates.en),
        en: absoluteUrl(alternates.en),
        zh: absoluteUrl(alternates.zh),
        ko: absoluteUrl(alternates.ko),
        es: absoluteUrl(alternates.es),
        pt: absoluteUrl(alternates.pt),
      },
    },
    openGraph: {
      title,
      description,
      url,
      type,
      locale: localeMeta[locale].ogLocale,
      siteName: locale === "zh" ? siteConfig.zhName : siteConfig.legalName,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
