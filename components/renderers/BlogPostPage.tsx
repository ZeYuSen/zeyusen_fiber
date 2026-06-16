import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import { localizePath } from "@/lib/i18n/localize-path";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { BlogPost } from "@/data/blog";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { FAQAccordion } from "@/components/blog/FAQAccordion";
import { AuthorSignature } from "@/components/blog/AuthorSignature";
import { PrintButton } from "@/components/blog/PrintButton";
import { VideoEmbed } from "@/components/blog/VideoEmbed";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[*_`~]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderInline(text: string, locale: Locale) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = link[2];
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-carbon-accent hover:text-neutral-900 transition-colors"
          >
            {link[1]}
          </a>
        );
      }
      return (
        <Link
          key={index}
          href={localizePath(href, locale)}
          className="text-carbon-accent hover:text-neutral-900 transition-colors"
        >
          {link[1]}
        </Link>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} className="rounded bg-neutral-100 px-1 py-0.5 text-xs">{part.slice(1, -1)}</code>;
    }

    return part;
  });
}

function renderMarkdown(content: string, locale: Locale) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let listOrdered = false;
  let table: string[] = [];
  let blockquote: string[] = [];
  let codeBlock: string[] = [];
  let inCodeBlock = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    elements.push(
      <p key={`p-${elements.length}`} className="leading-relaxed text-neutral-600">
        {renderInline(paragraph.join(" "), locale)}
      </p>,
    );
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    const Tag = listOrdered ? "ol" : "ul";
    const listClass = listOrdered ? "list-decimal" : "list-disc";
    elements.push(
      <Tag key={`list-${elements.length}`} className={`${listClass} space-y-2 pl-5 text-neutral-600`}>
        {list.map((item, i) => (
          <li key={i}>{renderInline(item, locale)}</li>
        ))}
      </Tag>,
    );
    list = [];
    listOrdered = false;
  };

  const flushBlockquote = () => {
    if (!blockquote.length) return;
    elements.push(
      <blockquote key={`bq-${elements.length}`} className="border-l-4 border-neutral-200 pl-4 italic text-neutral-500">
        {blockquote.map((line, i) => (
          <p key={i} className="leading-relaxed">{renderInline(line, locale)}</p>
        ))}
      </blockquote>,
    );
    blockquote = [];
  };

  const flushCodeBlock = () => {
    if (!codeBlock.length) return;
    elements.push(
      <pre key={`code-${elements.length}`} className="overflow-x-auto rounded-xl bg-neutral-900 p-4 text-sm text-neutral-100">
        <code>{codeBlock.join("\n")}</code>
      </pre>,
    );
    codeBlock = [];
  };

  const flushTable = () => {
    if (table.length < 2) {
      table = [];
      return;
    }

    const rows = table
      .filter((row) => !/^\|?\s*:?-{3,}:?/.test(row.replace(/\|/g, "").trim()))
      .map((row) => row.split("|").map((cell) => cell.trim()).filter(Boolean));
    const [head, ...body] = rows;

    elements.push(
      <div key={`table-${elements.length}`} className="overflow-x-auto rounded-xl border border-neutral-100">
        <table className="w-full text-left text-sm" aria-label={`Data table: ${head.join(", ")}`}>
          <thead className="bg-neutral-50 text-neutral-900">
            <tr>{head.map((cell, i) => <th key={i} className="px-4 py-3 font-medium">{renderInline(cell, locale)}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {body.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 text-neutral-600">{renderInline(cell, locale)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
    table = [];
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
    flushBlockquote();
    flushTable();
  };

  lines.forEach((line, lineIndex) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushAll();
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlock.push(line);
      return;
    }

    if (!trimmed) {
      flushAll();
      return;
    }

    if (trimmed.startsWith("|")) {
      flushParagraph();
      flushList();
      flushBlockquote();
      table.push(trimmed);
      return;
    }

    flushTable();

    if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      blockquote.push(trimmed.slice(2));
      return;
    }

    flushBlockquote();

    const videoMatch = trimmed.match(/^::video\[([^\]]+)\]$/);
    if (videoMatch) {
      flushParagraph();
      flushList();
      const src = videoMatch[1];
      const nextCaption = lines[lineIndex + 1]?.trim();
      const title = nextCaption && !nextCaption.startsWith("#") && !nextCaption.startsWith("|") ? nextCaption : undefined;
      elements.push(<VideoEmbed key={`video-${elements.length}`} src={src} title={title} />);
      return;
    }

    const image = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flushParagraph();
      flushList();
      elements.push(
        <figure key={`img-${elements.length}`} className="my-8 overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50 max-w-2xl mx-auto">
          <div className="relative aspect-[16/10]">
            <Image src={image[2]} alt={image[1]} fill sizes="(max-width: 768px) 100vw, 672px" className="object-contain" />
          </div>
          {image[1] && <figcaption className="px-4 py-3 text-xs text-neutral-400">{image[1]}</figcaption>}
        </figure>,
      );
      return;
    }

    if (trimmed.startsWith("# ")) return;

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      const text = trimmed.slice(3);
      elements.push(
        <h2 key={`h2-${elements.length}`} id={slugify(text)} className="mt-10 scroll-mt-28 text-2xl font-semibold text-neutral-900">
          {renderInline(text, locale)}
        </h2>,
      );
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      const text = trimmed.slice(4);
      elements.push(
        <h3 key={`h3-${elements.length}`} id={slugify(text)} className="mt-7 scroll-mt-28 text-lg font-semibold text-neutral-900">
          {renderInline(text, locale)}
        </h3>,
      );
      return;
    }

    if (trimmed.startsWith("#### ")) {
      flushParagraph();
      flushList();
      const text = trimmed.slice(5);
      elements.push(
        <h4 key={`h4-${elements.length}`} id={slugify(text)} className="mt-5 scroll-mt-28 text-base font-semibold text-neutral-900">
          {renderInline(text, locale)}
        </h4>,
      );
      return;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph();
      if (listOrdered) flushList();
      list.push(trimmed.slice(2));
      return;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      flushParagraph();
      if (!listOrdered && list.length) flushList();
      listOrdered = true;
      list.push(trimmed.replace(/^\d+\.\s/, ""));
      return;
    }

    paragraph.push(trimmed);
  });

  flushAll();
  if (inCodeBlock) flushCodeBlock();
  return elements;
}

export function BlogPostPage({
  locale,
  dict,
  post,
  relatedPosts,
}: {
  locale: Locale;
  dict: Dictionary;
  post: BlogPost;
  relatedPosts: BlogPost[];
}) {
  return (
    <article className="pt-36 pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12 lg:gap-16">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28 pt-4">
              <TableOfContents headings={post.headings} />
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <PrintButton />
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1 max-w-3xl">
            <div className="flex items-center justify-between lg:hidden mb-6">
              <PrintButton />
            </div>

            <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
              <Link href={localizedHref("home", locale)} className="hover:text-neutral-700 transition-colors">
                {dict.nav.home}
              </Link>
              <span>/</span>
              <Link href={localizedHref("blog-index", locale)} className="hover:text-neutral-700 transition-colors">
                {dict.nav.blog}
              </Link>
              <span>/</span>
              <span className="text-neutral-600">{post.title}</span>
            </nav>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-neutral-50 text-neutral-500 border border-neutral-200 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 leading-tight">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400">
              <span>{dict.blog.publishedBy}</span>
              <time dateTime={post.date}>{dict.blog.published} {post.date}</time>
              {post.dateModified && post.dateModified !== post.date && (
                <time dateTime={post.dateModified}>{dict.blog.updated} {post.dateModified}</time>
              )}
            </div>
            <p className="mt-6 text-lg leading-relaxed text-neutral-500">{post.excerpt}</p>

            <div className="mt-10 space-y-5 text-sm">
              {renderMarkdown(post.content, locale)}
            </div>

            {relatedPosts.length > 0 && (
              <section className="mt-12 rounded-2xl border border-neutral-100 bg-white p-6">
                <h2 className="text-lg font-semibold text-neutral-900">{dict.sections.relatedGuides}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={localizedHref("blog-post", locale, { slug: relatedPost.slug })}
                      className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 transition-colors hover:border-neutral-200"
                    >
                      <p className="text-xs uppercase tracking-[0.12em] text-neutral-400">
                        {relatedPost.tags[0] ?? dict.nav.blog}
                      </p>
                      <h3 className="mt-2 text-sm font-medium leading-snug text-neutral-900">
                        {relatedPost.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <FAQAccordion items={post.faq} />

            <AuthorSignature />

            <div className="mt-12 rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
              <h2 className="text-lg font-semibold text-neutral-900">{dict.blog.needHelpTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {dict.blog.needHelpBody}
              </p>
              <Link href={localizedHref("contact", locale)} className="inline-flex mt-5 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors">
                {dict.blog.needHelpCta}
              </Link>
            </div>

            {post.headings.length > 0 && (
              <details className="mt-8 lg:hidden rounded-xl border border-neutral-100 bg-neutral-50 p-4">
                <summary className="text-sm font-medium text-neutral-700 cursor-pointer">{dict.sections.tableOfContents}</summary>
                <div className="mt-3">
                  <ul className="space-y-1.5">
                    {post.headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className={`block text-xs text-neutral-500 hover:text-neutral-900 transition-colors ${h.level === 3 ? "pl-4" : ""}`}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
