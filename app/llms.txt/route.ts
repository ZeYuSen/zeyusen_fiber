import { absoluteUrl, siteConfig } from "@/lib/seo";
import { contactInfo } from "@/lib/contact";
import { defaultLocale, locales, localeMeta } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import { allCarbonFiberCategories } from "@/data/carbon-fiber";
import { allGlassFiberCategories } from "@/data/glass-fiber";
import { getBlogPosts } from "@/data/blog";

// llms.txt — guidance for AI crawlers / answer engines (https://llmstxt.org)
export const dynamic = "force-static";

function categoryLines(
  categoryKey: "carbon-category" | "glass-category",
  categories: typeof allCarbonFiberCategories,
) {
  return categories
    .map(
      (c) =>
        `- [${c.name}](${absoluteUrl(localizedHref(categoryKey, defaultLocale, { category: c.slug }))}): ${c.description}`,
    )
    .join("\n");
}

export function GET() {
  const posts = getBlogPosts(defaultLocale);
  const languageList = locales.map((l) => localeMeta[l].label).join(", ");

  const body = `# ZeYuSen Fiber

> ${siteConfig.description} Operated by ${contactInfo.company}, a manufacturer integrating R&D, production, and global export of carbon fiber and fiberglass composite materials since ${contactInfo.foundingDate}.

ZeYuSen Fiber supplies carbon fiber surface mats, woven cloth, raw materials, fiberglass tissue mats, composite mats, and reinforcement fabrics to B2B buyers worldwide. Quotes are request-based. Certifications: ISO 9001, ISO 14001, ISO 45001.

Available languages: ${languageList}. Localized versions live under /ko, /es, and /pt; English under /en.

## Carbon Fiber
${categoryLines("carbon-category", allCarbonFiberCategories)}
- [Carbon Fiber Division Overview](${absoluteUrl(localizedHref("carbon-fiber", defaultLocale))})

## Glass Fiber
${categoryLines("glass-category", allGlassFiberCategories)}
- [Glass Fiber Division Overview](${absoluteUrl(localizedHref("glass-fiber", defaultLocale))})

## Company
- [About ZeYuSen Fiber](${absoluteUrl(localizedHref("about", defaultLocale))}): Company background, manufacturing facilities, and certifications.
- [Services](${absoluteUrl(localizedHref("services", defaultLocale))}): OEM/ODM customization, R&D support, quality assurance, and logistics.
- [Applications](${absoluteUrl(localizedHref("applications", defaultLocale))}): Industry use cases across aerospace, wind energy, construction, and new energy.
- [Contact](${absoluteUrl(localizedHref("contact", defaultLocale))}): Request a quote or technical consultation.

## Articles
${posts.map((p) => `- [${p.title}](${absoluteUrl(localizedHref("blog-post", defaultLocale, { slug: p.slug }))})`).join("\n")}

## Contact
- Email: ${contactInfo.emails[0]}
- Phone: ${contactInfo.phones[0]}
- Address: ${contactInfo.address}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
