import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/data/blog";
import { createPageMetadata } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return createPageMetadata({
      title: "Article Not Found",
      description: "The requested ZeYuSen Fiber article could not be found.",
      path: `/blog/${slug}`,
    });
  }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
  });
}

function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <Link key={index} href={link[2]} className="text-carbon-accent hover:text-neutral-900 transition-colors">
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

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let listOrdered = false;
  let table: string[] = [];
  let blockquote: string[] = [];
  let codeBlock: string[] = [];
  let inCodeBlock = false;
  let codeLang = "";

  const flushParagraph = () => {
    if (!paragraph.length) return;
    elements.push(
      <p key={`p-${elements.length}`} className="leading-relaxed text-neutral-600">
        {renderInline(paragraph.join(" "))}
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
          <li key={i}>{renderInline(item)}</li>
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
          <p key={i} className="leading-relaxed">{renderInline(line)}</p>
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
    codeLang = "";
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
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-900">
            <tr>{head.map((cell, i) => <th key={i} className="px-4 py-3 font-medium">{renderInline(cell)}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {body.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 text-neutral-600">{renderInline(cell)}</td>)}
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

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushAll();
        inCodeBlock = true;
        codeLang = trimmed.slice(3).trim();
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

    const image = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flushParagraph();
      flushList();
      elements.push(
        <figure key={`img-${elements.length}`} className="my-8 overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50">
          <Image src={image[2]} alt={image[1]} width={1200} height={720} sizes="(max-width: 768px) 100vw, 720px" className="h-auto w-full object-cover" />
          {image[1] && <figcaption className="px-4 py-3 text-xs text-neutral-400">{image[1]}</figcaption>}
        </figure>,
      );
      return;
    }

    if (trimmed.startsWith("# ")) return;

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(<h2 key={`h2-${elements.length}`} className="mt-10 text-2xl font-semibold text-neutral-900">{renderInline(trimmed.slice(3))}</h2>);
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(<h3 key={`h3-${elements.length}`} className="mt-7 text-lg font-semibold text-neutral-900">{renderInline(trimmed.slice(4))}</h3>);
      return;
    }

    if (trimmed.startsWith("#### ")) {
      flushParagraph();
      flushList();
      elements.push(<h4 key={`h4-${elements.length}`} className="mt-5 text-base font-semibold text-neutral-900">{renderInline(trimmed.slice(5))}</h4>);
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

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="pt-36 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd({
            title: post.title,
            description: post.excerpt,
            image: post.image,
            datePublished: post.date,
            dateModified: post.dateModified,
            path: `/blog/${post.slug}`,
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ])),
        }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-neutral-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-neutral-700 transition-colors">Blog</Link>
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
        <p className="mt-4 font-mono text-xs text-neutral-400">{post.date}</p>
        <p className="mt-6 text-lg leading-relaxed text-neutral-500">{post.excerpt}</p>

        <div className="mt-10 space-y-5 text-sm">
          {renderMarkdown(post.content)}
        </div>

        <div className="mt-12 rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
          <h2 className="text-lg font-semibold text-neutral-900">Need help choosing a material?</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            Send your target application, process, and required specifications. ZeYuSen Fiber can help compare carbon fiber and glass fiber material options for your project.
          </p>
          <Link href="/contact" className="inline-flex mt-5 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors">
            Contact ZeYuSen Fiber
          </Link>
        </div>
      </div>
    </article>
  );
}
