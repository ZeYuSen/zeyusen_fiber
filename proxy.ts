import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/config";
import { divisionRoot } from "@/lib/i18n/routes";

// Old products-path segments per locale (removed when routes were flattened).
const oldProductsSegments: Record<Locale, string> = {
  en: "products",
  zh: "产品",
  ko: "제품",
  es: "productos",
  pt: "produtos",
};

// Build reverse lookup: division-root string → division name, for every locale.
const divisionRootReverse = new Map<string, "carbon" | "glass">();
for (const div of ["carbon", "glass"] as const) {
  for (const locale of locales) {
    divisionRootReverse.set(divisionRoot[div][locale], div);
  }
}

// Parse an Accept-Language header and return the best-matching supported
// locale, or null if none match. Honors q-values and region subtags
// (e.g. "pt-BR" → "pt", "zh-Hans-CN" → "zh").
function matchLocale(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? parseFloat(qParam.trim().slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), q: Number.isNaN(q) ? 0 : q };
    })
    .filter((entry) => entry.tag && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag === "*") return null; // wildcard → fall back to default
    const primary = tag.split("-")[0];
    if (locales.includes(primary as Locale)) {
      return primary as Locale;
    }
  }
  return null;
}

function redirectStrippingSegment(
  request: NextRequest,
  locale: string,
  keepSegments: string[],
  segmentsAfterStrip: string[],
) {
  const newPath = `/${locale}/${keepSegments.join("/")}${
    segmentsAfterStrip.length ? "/" + segmentsAfterStrip.join("/") : ""
  }`;
  const url = request.nextUrl.clone();
  url.pathname = newPath;
  return NextResponse.redirect(url, 301);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  // Detect locale from first segment.
  const firstSegment = segments[0];
  const hasLocale =
    firstSegment && locales.includes(firstSegment as Locale);

  if (hasLocale) {
    const locale = firstSegment as Locale;

    // Redirect old /:division/:products/... → /:division/...
    if (segments.length >= 3) {
      const maybeDivision = segments[1];
      const maybeProducts = segments[2];
      if (
        divisionRootReverse.has(maybeDivision) &&
        maybeProducts === oldProductsSegments[locale]
      ) {
        return redirectStrippingSegment(
          request,
          locale,
          [segments[1]],
          segments.slice(3),
        );
      }
    }

    return NextResponse.next();
  }

  // Root → locale resolution.
  //  1. Baidu spider is indexed on the Chinese site → permanent 301 to /zh.
  //  2. Real users: negotiate via Accept-Language; matched locale wins,
  //     otherwise fall back to the default (English).
  if (pathname === "/") {
    const ua = request.headers.get("user-agent") || "";
    const url = request.nextUrl.clone();

    if (/Baiduspider/i.test(ua)) {
      url.pathname = "/zh";
      return NextResponse.redirect(url, 301);
    }

    const matched = matchLocale(request.headers.get("accept-language"));
    url.pathname = `/${matched ?? defaultLocale}`;
    // Result depends on the request headers, so this must NOT be cached as a
    // permanent redirect. Use a temporary 307 and signal cache variance.
    const response = NextResponse.redirect(url, 307);
    response.headers.set("Vary", "Accept-Language, User-Agent");
    return response;
  }

  // Legacy un-prefixed URL → /en/* (301 permanent, preserves SEO equity).
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url, 301);
}

export const config = {
  // Exclude API, Next internals, metadata files, images, and any file with an
  // extension so they are never prefixed/redirected (avoids 404 + loops).
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|images|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
