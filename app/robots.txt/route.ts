import { absoluteUrl, siteConfig } from "@/lib/seo";

// robots.txt is served from a custom Route Handler (not the MetadataRoute.Robots
// convention) because we emit Content-Signal directives (contentsignals.org),
// which the built-in metadata type does not support.
export const dynamic = "force-static";

// Search engine crawlers.
const searchBots = ["Googlebot", "Bingbot", "Baiduspider", "Sogou web spider", "360Spider"];

// AI / answer-engine crawlers we explicitly welcome so our content is eligible
// for citation across international and domestic model channels.
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Baiduspider-render",
  "PetalBot",
];

// Content usage preferences (draft-romm-aipref-contentsignals). We permit
// search indexing, AI answer input, and AI training — consistent with the
// allow rules above.
const contentSignal = "Content-Signal: search=yes, ai-input=yes, ai-train=yes";

// A robots group: User-agent + Content-Signal + Allow/Disallow. The signal is
// repeated per group so bots matching a named group (which ignore the wildcard
// group) still receive it.
function group(userAgent: string): string {
  return [
    `User-agent: ${userAgent}`,
    contentSignal,
    "Allow: /",
    "Disallow: /api/",
  ].join("\n");
}

export function GET() {
  const groups = [...searchBots, ...aiBots, "*"].map(group).join("\n\n");

  const body = `${groups}

Sitemap: ${absoluteUrl("/sitemap.xml")}
Host: ${siteConfig.url}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
