import { absoluteUrl, siteConfig } from "@/lib/seo";
import { contactInfo } from "@/lib/contact";
import type { Locale } from "@/lib/i18n/config";
import {
  localizedHref,
  type PageKey,
  type RouteParams,
} from "@/lib/i18n/routes";
import { getPageContent } from "@/data/page-content";
import { getCategories, getApplicationDetail } from "@/lib/data-i18n";
import { getBlogPost, getBlogPosts } from "@/data/blog";

// Renders a plain-text/markdown representation of a resolved page for AI agents
// that request `Accept: text/markdown`. Returns null when the page type is not
// supported (caller falls back to HTML).

function abs(key: PageKey, locale: Locale, params?: RouteParams): string {
  return absoluteUrl(localizedHref(key, locale, params));
}

// Canonical URL + contact block appended to every generated page.
function footer(locale: Locale, key: PageKey, params?: RouteParams): string {
  return `
---

Canonical: ${abs(key, locale, params)}

## Contact
- Company: ${contactInfo.company}
- Email: ${contactInfo.emails[0]}
- Phone: ${contactInfo.phones[0]}
- Address: ${contactInfo.address}
`;
}

function categoryLinks(division: "carbon" | "glass", locale: Locale): string {
  const key = division === "carbon" ? "carbon-category" : "glass-category";
  return getCategories(division, locale)
    .map((c) => `- [${c.name}](${abs(key, locale, { category: c.slug })}): ${c.description}`)
    .join("\n");
}

function buildHome(locale: Locale): string {
  const content = getPageContent(locale);
  const seo = content.seo.home;
  return `# ${siteConfig.name}

> ${seo.description}

${siteConfig.description}

## Carbon Fiber
${categoryLinks("carbon", locale)}
- [Carbon Fiber Division](${abs("carbon-fiber", locale)})

## Glass Fiber
${categoryLinks("glass", locale)}
- [Glass Fiber Division](${abs("glass-fiber", locale)})

## Company
- [About](${abs("about", locale)})
- [Services](${abs("services", locale)})
- [Applications](${abs("applications", locale)})
- [Contact](${abs("contact", locale)})
- [Blog](${abs("blog-index", locale)})
${footer(locale, "home")}`;
}

function buildBlogPost(locale: Locale, slug: string): string | null {
  const post = getBlogPost(locale, slug);
  if (!post) return null;
  const faq = post.faq.length
    ? `\n\n## FAQ\n${post.faq.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}`
    : "";
  // The body already opens with an H1 matching the title; drop it so we don't
  // emit the heading twice.
  const body = post.content.trim().replace(/^#\s+.*(\r?\n)+/, "");
  return `# ${post.title}

> ${post.excerpt}

Published: ${post.date}${post.dateModified ? ` · Updated: ${post.dateModified}` : ""}
${post.tags.length ? `Tags: ${post.tags.join(", ")}` : ""}

${body}${faq}
${footer(locale, "blog-post", { slug })}`;
}

function buildBlogIndex(locale: Locale): string {
  const posts = getBlogPosts(locale);
  const list = posts
    .map((p) => `- [${p.title}](${abs("blog-post", locale, { slug: p.slug })}): ${p.excerpt}`)
    .join("\n");
  return `# Blog — ${siteConfig.name}

${list}
${footer(locale, "blog-index")}`;
}

function buildLegal(locale: Locale, key: "privacy" | "terms"): string {
  const copy = getPageContent(locale).legal[key];
  const sections = copy.sections
    .map((s) => `## ${s.heading}\n${s.body}`)
    .join("\n\n");
  return `# ${copy.title}

> ${copy.intro}

${sections}
${footer(locale, key)}`;
}

function buildCatalog(locale: Locale, division: "carbon" | "glass"): string {
  const content = getPageContent(locale);
  const copy = content.catalog[division];
  const key = division === "carbon" ? "carbon-fiber" : "glass-fiber";
  return `# ${copy.title}

> ${copy.intro}

${copy.body}

## Product Categories
${categoryLinks(division, locale)}

## ${copy.closingTitle}
${copy.closingBody}
${footer(locale, key)}`;
}

function buildApplications(locale: Locale, key: "applications" | "applications-glass"): string {
  const app = getPageContent(locale).applications;
  const hub = app.hubParagraphs.join("\n\n");
  return `# ${app.title}

> ${app.intro}

${hub}
${footer(locale, key)}`;
}

// SEO-metadata fallback for pages whose body lives in React components
// (about/services/contact) or is out of the enriched scope (products, etc.).
function buildFromSeo(locale: Locale, key: PageKey, params?: RouteParams): string | null {
  const seo = getPageContent(locale).seo[key];
  if (!seo) return null;
  return `# ${seo.title}

> ${seo.description}
${footer(locale, key, params)}`;
}

function buildCategory(locale: Locale, division: "carbon" | "glass", params: RouteParams): string | null {
  const category = getCategories(division, locale).find((c) => c.slug === params.category);
  if (!category) return null;
  const products = category.products
    .map((p) => `- [${p.name}](${abs(division === "carbon" ? "carbon-product" : "glass-product", locale, { category: category.slug, product: p.slug })}): ${p.description}`)
    .join("\n");
  const key = division === "carbon" ? "carbon-category" : "glass-category";
  return `# ${category.name}

> ${category.description}

## Products
${products}
${footer(locale, key, params)}`;
}

function buildProduct(locale: Locale, division: "carbon" | "glass", params: RouteParams): string | null {
  const category = getCategories(division, locale).find((c) => c.slug === params.category);
  const product = category?.products.find((p) => p.slug === params.product);
  if (!category || !product) return null;
  const key = division === "carbon" ? "carbon-product" : "glass-product";
  return `# ${product.name}

> ${product.description}

Category: [${category.name}](${abs(division === "carbon" ? "carbon-category" : "glass-category", locale, { category: category.slug })})
${footer(locale, key, params)}`;
}

function buildApplicationDetail(locale: Locale, division: "carbon" | "glass", params: RouteParams): string | null {
  const detail = getApplicationDetail(locale, division, params.slug);
  if (!detail) return null;
  const key = division === "carbon" ? "carbon-application" : "glass-application";
  return `# ${detail.title}

> ${detail.metaDescription}
${footer(locale, key, params)}`;
}

export function renderMarkdownPage(
  locale: Locale,
  pageKey: PageKey,
  params: RouteParams,
): string | null {
  switch (pageKey) {
    case "home":
      return buildHome(locale);
    case "blog-index":
      return buildBlogIndex(locale);
    case "blog-post":
      return buildBlogPost(locale, params.slug);
    case "privacy":
    case "terms":
      return buildLegal(locale, pageKey);
    case "carbon-fiber":
      return buildCatalog(locale, "carbon");
    case "glass-fiber":
      return buildCatalog(locale, "glass");
    case "applications":
    case "applications-glass":
      return buildApplications(locale, pageKey);
    case "carbon-category":
      return buildCategory(locale, "carbon", params);
    case "glass-category":
      return buildCategory(locale, "glass", params);
    case "carbon-product":
      return buildProduct(locale, "carbon", params);
    case "glass-product":
      return buildProduct(locale, "glass", params);
    case "carbon-application":
      return buildApplicationDetail(locale, "carbon", params);
    case "glass-application":
      return buildApplicationDetail(locale, "glass", params);
    case "about":
    case "services":
    case "contact":
      return buildFromSeo(locale, pageKey, params);
    default:
      return null;
  }
}

// Rough token estimate for the x-markdown-tokens response header.
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
