import { absoluteUrl } from "@/lib/seo";

// API catalog (RFC 9727) — application/linkset+json describing the site's
// public APIs. Served at /.well-known/api-catalog via a next.config rewrite.
export const dynamic = "force-static";

export function GET() {
  const linkset = {
    linkset: [
      {
        anchor: absoluteUrl("/api/inquiry"),
        "service-desc": [
          { href: absoluteUrl("/openapi.json"), type: "application/json" },
        ],
        "service-doc": [
          { href: absoluteUrl("/.well-known/api-docs"), type: "text/markdown" },
        ],
        status: [
          { href: absoluteUrl("/.well-known/health"), type: "application/json" },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(linkset, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
