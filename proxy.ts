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

  // Root → language based on crawler detection.
  // Baidu spider gets Chinese; everyone else gets the default (English).
  if (pathname === "/") {
    const ua = request.headers.get("user-agent") || "";
    const isBaidu = /Baiduspider/i.test(ua);
    const targetLocale = isBaidu ? "zh" : defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLocale}`;
    return NextResponse.redirect(url, 301);
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
