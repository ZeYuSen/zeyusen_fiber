"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { BlogPost } from "@/data/blog";

const POSTS_PER_PAGE = 9;
const MAX_SUGGESTIONS = 6;
type SortKey = "date-desc" | "date-asc" | "title-asc" | "title-desc";

/* ------------------------------------------------------------------ */
/*  Tiny inline icons                                                  */
/* ------------------------------------------------------------------ */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function pageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

function sortPosts(list: BlogPost[], key: SortKey): BlogPost[] {
  const sorted = [...list];
  switch (key) {
    case "date-desc": return sorted.sort((a, b) => b.date.localeCompare(a.date));
    case "date-asc":  return sorted.sort((a, b) => a.date.localeCompare(b.date));
    case "title-asc": return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:          return sorted;
  }
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-amber-200/80 text-inherit rounded-sm px-0.5">{part}</mark>
      : part,
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function BlogIndex({
  locale,
  dict,
  posts,
}: {
  locale: Locale;
  dict: Dictionary;
  posts: BlogPost[];
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("date-desc");
  const [page, setPage] = useState(1);
  const [jumpInput, setJumpInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ---- suggestions ---- */
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return posts
      .filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)))
      .slice(0, MAX_SUGGESTIONS);
  }, [posts, query]);

  /* ---- full filtered list ---- */
  const filtered = useMemo(() => {
    if (!query.trim()) return sortPosts(posts, sort);
    const q = query.toLowerCase();
    const matched = posts.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    return sortPosts(matched, sort);
  }, [posts, query, sort]);

  /* ---- click-outside closes dropdown ---- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current?.contains(e.target as Node)) return;
      if (dropdownRef.current?.contains(e.target as Node)) return;
      setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---- keyboard ---- */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    switch (e.key) {
      case "ArrowDown": e.preventDefault(); setHighlightIdx(i => Math.min(i + 1, suggestions.length - 1)); break;
      case "ArrowUp":   e.preventDefault(); setHighlightIdx(i => Math.max(i - 1, -1)); break;
      case "Enter":
        if (highlightIdx >= 0 && highlightIdx < suggestions.length) {
          e.preventDefault();
          window.location.href = localizedHref("blog-post", locale, { slug: suggestions[highlightIdx].slug });
        }
        break;
      case "Escape": setShowSuggestions(false); setHighlightIdx(-1); break;
    }
  }, [showSuggestions, suggestions, highlightIdx, locale]);

  const handleSuggestionClick = useCallback((slug: string) => {
    setShowSuggestions(false);
    setHighlightIdx(-1);
    window.location.href = localizedHref("blog-post", locale, { slug });
  }, [locale]);

  /* ---- pagination ---- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);
  const pages = pageNumbers(safePage, totalPages);

  const handleJump = useCallback(() => {
    const n = parseInt(jumpInput, 10);
    if (n >= 1 && n <= totalPages) { setPage(n); setJumpInput(""); }
  }, [jumpInput, totalPages]);

  const sortOptions: { value: SortKey; label: string }[] = [
    { value: "date-desc",  label: dict.blog.sortDateDesc },
    { value: "date-asc",   label: dict.blog.sortDateAsc },
    { value: "title-asc",  label: dict.blog.sortTitleAsc },
    { value: "title-desc", label: dict.blog.sortTitleDesc },
  ];

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */
  return (
    <>
      {/* ---- Breadcrumb (offset to clear the fixed header) ---- */}
      <div className="container-wide pt-24 sm:pt-28">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-neutral-500">
          <Link href={localizedHref("home", locale)} className="hover:text-neutral-800 transition-colors">{dict.nav.home}</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-800 font-medium">{dict.nav.blog}</span>
        </nav>
      </div>

      {/* ---- Search hero + entire body in one continuous section ---- */}
      <section className="pt-8 pb-20 sm:pt-10 sm:pb-24">
        <div className="container-wide">
          {/* Search header */}
          <div className="max-w-xl mx-auto text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
              {dict.blog.eyebrow}
            </h1>
            <p className="mt-2 text-neutral-500 text-sm sm:text-base leading-relaxed">
              {dict.blog.intro}
            </p>

            {/* Search input */}
            <div className="relative mt-6">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={e => { setQuery(e.target.value); setShowSuggestions(true); setHighlightIdx(-1); setPage(1); }}
                onFocus={() => { if (query.trim()) setShowSuggestions(true); }}
                onKeyDown={handleKeyDown}
                placeholder={dict.blog.searchPlaceholder}
                autoComplete="off"
                aria-label={dict.blog.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3.5 text-base bg-neutral-50 border border-neutral-200 rounded-xl
                           focus:outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 focus:bg-white
                           placeholder:text-neutral-400 transition-all shadow-sm"
              />

              {/* Autocomplete dropdown */}
              {showSuggestions && query.trim() && (
                <div ref={dropdownRef} className="absolute z-20 left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg text-left overflow-hidden">
                  {suggestions.length > 0 ? (
                    <ul role="listbox" className="py-1">
                      {suggestions.map((post, i) => (
                        <li key={post.slug} role="option" aria-selected={i === highlightIdx}>
                          <button
                            type="button"
                            onClick={() => handleSuggestionClick(post.slug)}
                            onMouseEnter={() => setHighlightIdx(i)}
                            onMouseLeave={() => setHighlightIdx(-1)}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors ${i === highlightIdx ? "bg-neutral-100" : "hover:bg-neutral-50"}`}
                          >
                            <span className="block font-medium text-neutral-800 truncate">{highlightMatch(post.title, query)}</span>
                            <span className="block mt-0.5 text-xs text-neutral-400 truncate">
                              {highlightMatch(post.excerpt.length > 80 ? post.excerpt.slice(0, 80) + "…" : post.excerpt, query)}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-neutral-400">{dict.blog.noResults}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Toolbar: sort + count */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <p className="text-sm text-neutral-500">
              {query.trim()
                ? `${filtered.length} result${filtered.length === 1 ? "" : "s"}`
                : `${posts.length} articles`}
            </p>
            <div className="relative">
              <select
                value={sort}
                onChange={e => { setSort(e.target.value as SortKey); setPage(1); }}
                aria-label={dict.blog.sortLabel}
                className="appearance-none pl-3.5 pr-9 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg text-neutral-700 cursor-pointer focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-colors"
              >
                {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <ChevronIcon className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
            </div>
          </div>

          {/* Grid */}
          {paged.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paged.map(post => (
                <Link key={post.slug} href={localizedHref("blog-post", locale, { slug: post.slug })} className="group block">
                  <article className="h-full overflow-hidden bg-neutral-50 border border-neutral-100 rounded-xl hover:border-neutral-200 transition-colors cursor-pointer">
                    <div className="relative h-44 bg-neutral-100 overflow-hidden">
                      <Image src={post.image} alt={post.title} fill quality={70}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-white text-neutral-500 border border-neutral-200 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <h2 className="text-base font-medium text-neutral-900 group-hover:text-carbon-accent transition-colors leading-snug">{post.title}</h2>
                      <p className="mt-3 text-sm text-neutral-500 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      <p className="mt-4 font-mono text-xs text-neutral-400">{post.date}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <SearchIcon className="w-8 h-8 text-neutral-300" />
              <p className="text-neutral-500 text-sm">{dict.blog.noResults}</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label={dict.blog.pageLabel} className="flex flex-wrap items-center justify-center gap-x-1 gap-y-3 mt-12">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1}
                className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 disabled:text-neutral-300 disabled:cursor-not-allowed transition-colors">
                ← {dict.blog.previous}
              </button>

              <div className="flex items-center gap-0.5 mx-1">
                {pages.map((p, i) =>
                  p === "ellipsis"
                    ? <span key={`e-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-neutral-400">…</span>
                    : <button key={p} onClick={() => setPage(p)}
                        className={`w-9 h-9 flex items-center justify-center text-sm rounded-md transition-colors ${p === safePage ? "bg-neutral-900 text-white font-medium" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"}`}>
                        {p}
                      </button>
                )}
              </div>

              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
                className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 disabled:text-neutral-300 disabled:cursor-not-allowed transition-colors">
                {dict.blog.next} →
              </button>

              <span className="hidden sm:flex items-center gap-1.5 ml-4 text-sm text-neutral-500">
                <label htmlFor="jump-page" className="whitespace-nowrap">{dict.blog.jumpTo}</label>
                <input id="jump-page" type="number" min={1} max={totalPages} value={jumpInput}
                  onChange={e => setJumpInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleJump(); }}
                  placeholder={`1-${totalPages}`}
                  className="w-14 px-2 py-1.5 text-sm text-center border border-neutral-200 rounded-md focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 placeholder:text-neutral-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                <button onClick={handleJump} disabled={!jumpInput.trim()}
                  className="px-2.5 py-1.5 text-sm bg-neutral-100 text-neutral-600 rounded-md hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  Go
                </button>
              </span>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
