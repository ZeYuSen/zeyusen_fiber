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
  productKey: "carbon-product" | "glass-product",
  categories: typeof allCarbonFiberCategories,
) {
  return categories
    .map(
      (c) => {
        const products = c.products
          .map(
            (product) =>
              `  - [${product.name}](${absoluteUrl(localizedHref(productKey, defaultLocale, { category: c.slug, product: product.slug }))}): ${product.description}`,
          )
          .join("\n");
        return `- [${c.name}](${absoluteUrl(localizedHref(categoryKey, defaultLocale, { category: c.slug }))}): ${c.description}\n${products}`;
      },
    )
    .join("\n");
}

export function GET() {
  const posts = getBlogPosts(defaultLocale);
  const languageList = locales.map((l) => localeMeta[l].label).join(", ");

  const body = `# ZeYuSen Fiber

> ${siteConfig.description} Operated by ${contactInfo.company}, a manufacturer integrating R&D, production, and global export of carbon fiber and fiberglass composite materials since ${contactInfo.foundingYear}.

ZeYuSen Fiber supplies carbon fiber mats, fiberglass mats and veils, and desiccant rotor forming paper to B2B buyers worldwide. Quotes are request-based. Certifications: ISO 9001, ISO 14001, ISO 45001.

Available languages: ${languageList}. Localized versions live under /en, /zh, /ko, /es, and /pt.

## Carbon Fiber
${categoryLines("carbon-category", "carbon-product", allCarbonFiberCategories)}
- [Carbon Fiber Division Overview](${absoluteUrl(localizedHref("carbon-fiber", defaultLocale))})

## Glass Fiber
${categoryLines("glass-category", "glass-product", allGlassFiberCategories)}
- [Glass Fiber Division Overview](${absoluteUrl(localizedHref("glass-fiber", defaultLocale))})

## Company
- [About ZeYuSen Fiber](${absoluteUrl(localizedHref("about", defaultLocale))}): Company background, manufacturing facilities, and certifications.
- [Services](${absoluteUrl(localizedHref("services", defaultLocale))}): OEM/ODM customization, R&D support, quality assurance, and logistics.
- [Applications](${absoluteUrl(localizedHref("applications", defaultLocale))}): Focused use cases for fuel cells, EMI/RFI shielding evaluation, and construction materials.
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
