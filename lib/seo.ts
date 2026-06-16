import type { Metadata } from "next";
import type { Locale } from "./i18n/config";
import { localeMeta } from "./i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "ZeYuSen Fiber",
  legalName: "Jiangsu Zeyusen Carbon Fiber Technology Co., Ltd.",
  url: siteUrl,
  title: "ZeYuSen Fiber | Engineered Fiber Solutions",
  description:
    "Carbon fiber and glass fiber composite materials for aerospace, wind energy, construction, transportation, and advanced manufacturing applications.",
  ogImage: "/images/hero/banner4.jpg",
  ogImageWidth: 1740,
  ogImageHeight: 650,
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
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
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  alternates: Record<Locale, string>;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  // Only declare dimensions for the default OG image; product/article images
  // vary in size, so let platforms read their actual dimensions.
  const isDefaultImage = image === siteConfig.ogImage;
  const ogImage = isDefaultImage
    ? {
        url: imageUrl,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: `${siteConfig.name} - ${title}`,
      }
    : { url: imageUrl, alt: `${siteConfig.name} - ${title}` };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "x-default": absoluteUrl(alternates.en),
        en: absoluteUrl(alternates.en),
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
      siteName: siteConfig.legalName,
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
