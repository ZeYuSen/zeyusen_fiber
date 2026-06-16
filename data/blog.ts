import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n/config";
import { defaultLocale } from "@/lib/i18n/config";

export type FAQItem = { question: string; answer: string };
export type TocHeading = { id: string; text: string; level: 2 | 3 };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateModified?: string;
  tags: string[];
  image: string;
  content: string;
  faq: FAQItem[];
  headings: TocHeading[];
};

const blogRoot = path.join(process.cwd(), "content", "blog");

function localeDir(locale: Locale): string {
  return path.join(blogRoot, locale);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[*_`~]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseFAQ(content: string): FAQItem[] {
  const faqStart = content.indexOf("\n## FAQ\n");
  if (faqStart === -1) return [];

  const faqSection = content.slice(faqStart + 1);
  const items: FAQItem[] = [];
  const parts = faqSection.split(/\n### /);

  for (let i = 1; i < parts.length; i++) {
    const questionEnd = parts[i].indexOf("\n");
    if (questionEnd === -1) continue;
    const question = parts[i].slice(0, questionEnd).trim();
    let answer = parts[i].slice(questionEnd + 1).trim();
    // Stop at next ## header (e.g. "## Next Step")
    const nextHeader = answer.search(/\n## /);
    if (nextHeader !== -1) {
      answer = answer.slice(0, nextHeader).trim();
    }
    if (question && answer) {
      items.push({ question, answer });
    }
  }
  return items;
}

function stripFAQSection(content: string): string {
  const lines = content.split("\n");
  const result: string[] = [];
  let inFAQ = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "## FAQ") {
      inFAQ = true;
      continue;
    }
    if (inFAQ && /^## (?!##)/.test(trimmed)) {
      // Exit FAQ on next top-level heading
      inFAQ = false;
      result.push(line);
      continue;
    }
    if (!inFAQ) {
      result.push(line);
    }
  }
  return result.join("\n");
}

function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);
    if (h2) {
      const text = h2[1].trim();
      if (text.toLowerCase() === "faq") continue;
      headings.push({ id: slugify(text), text, level: 2 });
    } else if (h3) {
      const text = h3[1].trim();
      headings.push({ id: slugify(text), text, level: 3 });
    }
  }
  return headings;
}

function readBlogPost(dir: string, fileName: string): BlogPost {
  const fullPath = path.join(dir, fileName);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);

  const faq = parseFAQ(content);
  const cleanContent = stripFAQSection(content);
  const headings = extractHeadings(cleanContent);

  return {
    slug: String(data.slug ?? fileName.replace(/\.md$/, "")),
    title: String(data.title ?? "Untitled Article"),
    excerpt: String(data.description ?? ""),
    date: String(data.date ?? ""),
    dateModified: data.dateModified ? String(data.dateModified) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    image: String(data.image ?? "/logo.png"),
    content: cleanContent,
    faq,
    headings,
  };
}

// Read every English post (the canonical slug set) for a given locale, falling
// back to the English file whenever a translation is missing.
export function getBlogPosts(locale: Locale): BlogPost[] {
  const enDir = localeDir(defaultLocale);
  if (!fs.existsSync(enDir)) return [];
  const localizedDir = localeDir(locale);

  return fs
    .readdirSync(enDir)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const dir =
        locale !== defaultLocale && fs.existsSync(path.join(localizedDir, fileName))
          ? localizedDir
          : enDir;
      return readBlogPost(dir, fileName);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(locale: Locale, slug: string) {
  return getBlogPosts(locale).find((post) => post.slug === slug);
}

// Canonical slug list (English) for generateStaticParams and sitemap.
export function getBlogSlugs(): string[] {
  return getBlogPosts(defaultLocale).map((post) => post.slug);
}
