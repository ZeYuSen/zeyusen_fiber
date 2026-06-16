import type { Locale } from "./config";
import { resolveRoute, localizedHref } from "./routes";
import { defaultLocale } from "./config";

// Convert an English (default-locale) internal path like "/carbon-fiber/products"
// or "/blog/foo" into the equivalent localized path for `locale`. Used to
// rewrite hardcoded links embedded in blog markdown and legacy copy.
export function localizePath(enPath: string, locale: Locale): string {
  if (!enPath.startsWith("/")) return enPath;
  // Strip query/hash to resolve, re-append afterward.
  const [pathPart, rest] = splitSuffix(enPath);
  const slug = pathPart.split("/").filter(Boolean);
  const resolved = resolveRoute(defaultLocale, slug);
  if (!resolved) {
    // Unknown path: at least add the locale prefix so it stays in-locale.
    return `/${locale}${pathPart}${rest}`;
  }
  return `${localizedHref(resolved.pageKey, locale, resolved.params)}${rest}`;
}

function splitSuffix(path: string): [string, string] {
  const hashIdx = path.indexOf("#");
  const queryIdx = path.indexOf("?");
  const cut = [hashIdx, queryIdx].filter((i) => i >= 0).sort((a, b) => a - b)[0];
  if (cut === undefined) return [path, ""];
  return [path.slice(0, cut), path.slice(cut)];
}
