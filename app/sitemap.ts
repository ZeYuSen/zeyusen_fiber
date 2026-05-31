import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { allCarbonFiberCategories } from "@/data/carbon-fiber";
import { allGlassFiberCategories } from "@/data/glass-fiber";
import { applicationGroups } from "@/data/applications";
import { blogPosts } from "@/data/blog";

type SitemapEntry = {
  route: string;
  lastModified: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const SITE_LAUNCH = "2025-05-09";
const LAST_UPDATE = "2026-05-31";

const staticRoutes: SitemapEntry[] = [
  { route: "", lastModified: LAST_UPDATE, changeFrequency: "weekly", priority: 1.0 },
  { route: "/about", lastModified: "2026-05-21", changeFrequency: "monthly", priority: 0.8 },
  { route: "/applications", lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.8 },
  { route: "/applications/glass", lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.7 },
  { route: "/blog", lastModified: LAST_UPDATE, changeFrequency: "weekly", priority: 0.8 },
  { route: "/carbon-fiber", lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.9 },
  { route: "/carbon-fiber/products", lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.8 },
  { route: "/contact", lastModified: "2026-05-13", changeFrequency: "monthly", priority: 0.7 },
  { route: "/glass-fiber", lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.9 },
  { route: "/glass-fiber/products", lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.8 },
  { route: "/privacy", lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.3 },
  { route: "/services", lastModified: "2026-05-21", changeFrequency: "monthly", priority: 0.8 },
  { route: "/terms", lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.3 },
];

function blogEntries(): SitemapEntry[] {
  return blogPosts.map((post) => ({
    route: `/blog/${post.slug}`,
    lastModified: post.dateModified ?? post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}

function productEntries(basePath: string, categories: typeof allCarbonFiberCategories): SitemapEntry[] {
  return categories.flatMap((category) => [
    {
      route: `${basePath}/products/${category.slug}`,
      lastModified: LAST_UPDATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...category.products.map((product) => ({
      route: `${basePath}/products/${category.slug}/${product.slug}`,
      lastModified: LAST_UPDATE,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);
}

function applicationEntries(): SitemapEntry[] {
  return applicationGroups.flatMap((group) =>
    group.applications
      .map((application) => application.detailHref)
      .filter((href): href is string => Boolean(href))
      .map((href) => ({
        route: href,
        lastModified: LAST_UPDATE,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = [
    ...staticRoutes,
    ...blogEntries(),
    ...productEntries("/carbon-fiber", allCarbonFiberCategories),
    ...productEntries("/glass-fiber", allGlassFiberCategories),
    ...applicationEntries(),
  ];

  return entries.map((entry) => ({
    url: absoluteUrl(entry.route || "/"),
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
