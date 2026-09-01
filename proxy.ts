import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/config";
import { divisionRoot, segmentLabels } from "@/lib/i18n/routes";
import {
  isActiveProduct,
  isActiveProductCategory,
  isKnownProductCategory,
  isKnownProduct,
  isRetiredBlogSlug,
  type ProductDivision,
} from "@/lib/product-scope";
import { isRetiredApplication } from "@/lib/application-scope";

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

// True when the client explicitly asks for markdown. Browsers never send this
// token in Accept, so a substring test avoids false positives.
function wantsMarkdown(request: NextRequest): boolean {
  const method = request.method;
  if (method !== "GET" && method !== "HEAD") return false;
  const accept = request.headers.get("accept") || "";
  return accept.includes("text/markdown");
}

// Rewrite (not redirect) to the internal /md handler so agents that do not
// follow redirects still receive markdown on the requested URL.
function rewriteToMarkdown(request: NextRequest, mdPathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = mdPathname;
  const response = NextResponse.rewrite(url);
  response.headers.set("Vary", "Accept, Accept-Language, User-Agent");
  return response;
}

// Static discovery links present on every page (RFC 8288). Point agents at the
// LLM overview, sitemap, and API catalog. Per-page links (e.g. the markdown
// alternate) are appended in attachLinkHeader.
const STATIC_LINKS = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
];

// Advertise the markdown representation of the current page as an alternate.
function attachLinkHeader(response: NextResponse, pathname: string) {
  const links = [
    ...STATIC_LINKS,
    `<${pathname}>; rel="alternate"; type="text/markdown"`,
  ];
  response.headers.set("Link", links.join(", "));
  return response;
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

function normalizePathSegment(segment: string): string {
  try {
    return decodeURIComponent(segment).normalize("NFC");
  } catch {
    return segment.normalize("NFC");
  }
}

const goneCopy: Record<
  Locale,
  { title: string; body: string; action: string }
> = {
  en: {
    title: "This page has been retired",
    body: "ZeYuSen Fiber now focuses on fiberglass mats and veils, carbon fiber mats, and desiccant rotor forming paper.",
    action: "View the current product range",
  },
  zh: {
    title: "此页面已停止发布",
    body: "泽宇森现聚焦玻纤毡、碳毡和除湿转轮成型纸。",
    action: "查看当前产品系列",
  },
  ko: {
    title: "이 페이지는 게시가 종료되었습니다",
    body: "ZeYuSen Fiber는 유리섬유 매트와 베일, 탄소섬유 매트, 제습 로터 성형지에 집중합니다.",
    action: "현재 제품군 보기",
  },
  es: {
    title: "Esta página ha sido retirada",
    body: "ZeYuSen Fiber se centra ahora en mantas y velos de fibra de vidrio, mantas de fibra de carbono y papel conformable para rotores desecantes.",
    action: "Ver la gama actual",
  },
  pt: {
    title: "Esta página foi descontinuada",
    body: "A ZeYuSen Fiber agora se concentra em mantas e véus de fibra de vidro, mantas de fibra de carbono e papel formador para rotores dessecantes.",
    action: "Ver a linha atual",
  },
};

function goneResponse(
  locale: Locale,
  division?: ProductDivision,
) {
  const copy = goneCopy[locale];
  const destination = division
    ? `/${locale}/${divisionRoot[division][locale]}`
    : `/${locale}/${segmentLabels.blog[locale]}`;
  const body = `<!doctype html>
<html lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${copy.title} | ZeYuSen Fiber</title></head>
<body style="margin:0;background:#f5f5f4;color:#171717;font:16px/1.6 system-ui,sans-serif"><main style="max-width:680px;margin:12vh auto;padding:32px"><p style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#737373">410 · Gone</p><h1 style="font-size:38px;line-height:1.1;margin:12px 0 18px">${copy.title}</h1><p style="color:#525252">${copy.body}</p><a href="${destination}" style="display:inline-block;margin-top:20px;color:#064e3b;font-weight:700">${copy.action} →</a></main></body>
</html>`;
  const response = new NextResponse(body, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Language": locale,
      "X-Robots-Tag": "noindex, follow",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
  response.headers.set("Link", STATIC_LINKS.join(", "));
  return response;
}

function retiredDivisionForPath(
  locale: Locale,
  segments: string[],
): ProductDivision | undefined {
  const division = divisionRootReverse.get(segments[1]);
  if (!division) return undefined;

  const afterDivision = segments.slice(2);
  const productSegments = afterDivision[0] === oldProductsSegments[locale]
    ? afterDivision.slice(1)
    : afterDivision;
  if (productSegments.length < 1 || productSegments.length > 2) return undefined;
  const category = productSegments[0];
  if (!category || !isKnownProductCategory(division, category)) return undefined;
  const product = productSegments[1];
  if (!isActiveProductCategory(division, category)) {
    if (!product || isKnownProduct(division, category, product)) return division;
    return undefined;
  }
  if (
    product &&
    isKnownProduct(division, category, product) &&
    !isActiveProduct(division, category, product)
  ) {
    return division;
  }
  return undefined;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map(normalizePathSegment);

  // Detect locale from first segment.
  const firstSegment = segments[0];
  const hasLocale =
    firstSegment && locales.includes(firstSegment as Locale);

  // Retired catalog and article URLs must return 410 before markdown content
  // negotiation or legacy-path redirects. This keeps HTML and GEO crawlers in
  // agreement and avoids redirect chains to an eventual 404.
  if (hasLocale) {
    const locale = firstSegment as Locale;
    const retiredDivision = retiredDivisionForPath(locale, segments);
    if (retiredDivision) {
      return goneResponse(locale, retiredDivision);
    }
    const division = divisionRootReverse.get(segments[1]);
    if (
      division &&
      segments.length === 4 &&
      segments[2] === segmentLabels.applications[locale] &&
      isRetiredApplication(division, segments[3])
    ) {
      return goneResponse(locale, division);
    }
    if (
      segments.length === 3 &&
      segments[1] === segmentLabels.blog[locale] &&
      isRetiredBlogSlug(segments[2])
    ) {
      return goneResponse(locale);
    }
  }

  // Markdown content negotiation. Intercept before locale/redirect logic so a
  // markdown request on any canonical URL is served directly.
  if (wantsMarkdown(request)) {
    if (pathname === "/") {
      const locale = matchLocale(request.headers.get("accept-language")) ?? defaultLocale;
      return rewriteToMarkdown(request, `/md/${locale}`);
    }
    if (hasLocale) {
      return rewriteToMarkdown(request, `/md${pathname}`);
    }
    // Un-prefixed paths fall through to the normal 301 → /en/* redirect below.
  }

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

    return attachLinkHeader(NextResponse.next(), pathname);
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
    // Carry discovery links on the redirect too, so agents that inspect "/"
    // without following the 307 still see them.
    return attachLinkHeader(response, url.pathname);
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
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|md/|\\.well-known|well-known|images|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
