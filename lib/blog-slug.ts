// Shared heading-slug logic for blog posts.
//
// Both the table-of-contents builder (data/blog.ts) and the article body
// renderer (BlogPostPage.tsx) must derive IDENTICAL id sequences from the same
// markdown, otherwise TOC anchors would point at the wrong section. They share
// the pure slugify() below and a stateful createSlugger() that guarantees
// uniqueness by suffixing repeats (-2, -3, ...).

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[*_`~]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Returns a function that slugifies while tracking how many times each base
// slug has been produced, appending -2, -3, ... to keep every id unique.
export function createSlugger(): (text: string) => string {
  const counts = new Map<string, number>();
  return (text: string) => {
    const base = slugify(text) || "section";
    const n = counts.get(base) ?? 0;
    counts.set(base, n + 1);
    return n === 0 ? base : `${base}-${n + 1}`;
  };
}
