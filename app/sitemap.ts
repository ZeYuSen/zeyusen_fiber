import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { locales, defaultLocale } from "@/lib/i18n/config";
import { localizedHref, allLocaleHrefs, type PageKey, type RouteParams } from "@/lib/i18n/routes";
import { allCarbonFiberCategories } from "@/data/carbon-fiber";
import { allGlassFiberCategories } from "@/data/glass-fiber";
import { getBlogSlugs, getBlogPosts } from "@/data/blog";

type Freq = "daily" | "weekly" | "monthly";

type RouteEntry = {
  key: PageKey;
  params?: RouteParams;
  lastModified: string;
  changeFrequency: Freq;
  priority: number;
};

const SITE_LAUNCH = "2025-05-09";
const LAST_UPDATE = "2026-05-31";

function staticEntries(): RouteEntry[] {
  return [
    { key: "home", lastModified: LAST_UPDATE, changeFrequency: "weekly", priority: 1.0 },
    { key: "about", lastModified: "2026-05-21", changeFrequency: "monthly", priority: 0.8 },
    { key: "applications", lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { key: "applications-glass", lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { key: "blog-index", lastModified: LAST_UPDATE, changeFrequency: "weekly", priority: 0.8 },
    { key: "carbon-fiber", lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.9 },
    { key: "carbon-products", lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { key: "contact", lastModified: "2026-05-13", changeFrequency: "monthly", priority: 0.7 },
    { key: "glass-fiber", lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.9 },
    { key: "glass-products", lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { key: "privacy", lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.3 },
    { key: "services", lastModified: "2026-05-21", changeFrequency: "monthly", priority: 0.8 },
    { key: "terms", lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.3 },
  ];
}

function productEntries(): RouteEntry[] {
  const out: RouteEntry[] = [];
  const divisions = [
    { cats: allCarbonFiberCategories, categoryKey: "carbon-category" as const, productKey: "carbon-product" as const },
    { cats: allGlassFiberCategories, categoryKey: "glass-category" as const, productKey: "glass-product" as const },
  ];
  for (const { cats, categoryKey, productKey } of divisions) {
    for (const category of cats) {
      out.push({
        key: categoryKey,
        params: { category: category.slug },
        lastModified: LAST_UPDATE,
        changeFrequency: "monthly",
        priority: 0.7,
      });
      for (const product of category.products) {
        out.push({
          key: productKey,
          params: { category: category.slug, product: product.slug },
          lastModified: LAST_UPDATE,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }
  return out;
}

function applicationEntries(): RouteEntry[] {
  const carbon = ["aerospace", "military-defense", "new-energy"].map((slug) => ({
    key: "carbon-application" as const,
    params: { slug },
    lastModified: LAST_UPDATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const glass = ["wind-energy", "construction"].map((slug) => ({
    key: "glass-application" as const,
    params: { slug },
    lastModified: LAST_UPDATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...carbon, ...glass];
}

function blogEntries(): RouteEntry[] {
  const posts = getBlogPosts(defaultLocale);
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  return getBlogSlugs().map((slug) => {
    const post = bySlug.get(slug);
    return {
      key: "blog-post" as const,
      params: { slug },
      lastModified: post?.dateModified ?? post?.date ?? LAST_UPDATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: RouteEntry[] = [
    ...staticEntries(),
    ...productEntries(),
    ...applicationEntries(),
    ...blogEntries(),
  ];

  const result: MetadataRoute.Sitemap = [];
  for (const entry of entries) {
    const alternates = allLocaleHrefs(entry.key, entry.params);
    const languages: Record<string, string> = {
      "x-default": absoluteUrl(alternates[defaultLocale]),
    };
    for (const locale of locales) {
      languages[locale] = absoluteUrl(alternates[locale]);
    }
    // One <url> per locale; each carries the full hreflang alternates set.
    for (const locale of locales) {
      result.push({
        url: absoluteUrl(localizedHref(entry.key, locale, entry.params)),
        lastModified: entry.lastModified,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
        alternates: { languages },
      });
    }
  }
  return result;
}
