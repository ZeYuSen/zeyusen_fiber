import { absoluteUrl, siteConfig } from "@/lib/seo";
import { contactInfo } from "@/lib/contact";
import { allCarbonFiberCategories } from "@/data/carbon-fiber";
import { allGlassFiberCategories } from "@/data/glass-fiber";
import { blogPosts } from "@/data/blog";

// llms.txt — guidance for AI crawlers / answer engines (https://llmstxt.org)
export const dynamic = "force-static";

function categoryLines(basePath: string, categories: typeof allCarbonFiberCategories) {
  return categories
    .map((c) => `- [${c.name}](${absoluteUrl(`${basePath}/products/${c.slug}`)}): ${c.description}`)
    .join("\n");
}

export function GET() {
  const body = `# ZeYuSen Fiber

> ${siteConfig.description} Operated by ${contactInfo.company}, a manufacturer integrating R&D, production, and global export of carbon fiber and fiberglass composite materials since ${contactInfo.foundingDate}.

ZeYuSen Fiber supplies carbon fiber surface mats, woven cloth, raw materials, fiberglass tissue mats, composite mats, and reinforcement fabrics to B2B buyers worldwide. Quotes are request-based. Certifications: ISO 9001, ISO 14001, ISO 45001.

## Carbon Fiber
${categoryLines("/carbon-fiber", allCarbonFiberCategories)}
- [Carbon Fiber Division Overview](${absoluteUrl("/carbon-fiber")})

## Glass Fiber
${categoryLines("/glass-fiber", allGlassFiberCategories)}
- [Glass Fiber Division Overview](${absoluteUrl("/glass-fiber")})

## Company
- [About ZeYuSen Fiber](${absoluteUrl("/about")}): Company background, manufacturing facilities, and certifications.
- [Services](${absoluteUrl("/services")}): OEM/ODM customization, R&D support, quality assurance, and logistics.
- [Applications](${absoluteUrl("/applications")}): Industry use cases across aerospace, wind energy, construction, and new energy.
- [Contact](${absoluteUrl("/contact")}): Request a quote or technical consultation.

## Articles
${blogPosts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)})`).join("\n")}

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
