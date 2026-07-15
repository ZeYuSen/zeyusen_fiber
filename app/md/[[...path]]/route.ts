import { isLocale } from "@/lib/i18n/config";
import { resolveRoute } from "@/lib/i18n/routes";
import { renderMarkdownPage, estimateTokens } from "@/lib/markdown-page";

// Serves markdown representations of pages for AI agents. The proxy rewrites
// requests carrying `Accept: text/markdown` to `/md/<locale>/<slug...>`.
// Not linked publicly; reached only via that internal rewrite.
export const dynamic = "force-static";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/md/[[...path]]">,
) {
  const { path } = await ctx.params;
  const segments = path ?? [];
  const [lang, ...slug] = segments;

  if (!lang || !isLocale(lang)) {
    return new Response("Not found", { status: 404 });
  }

  const resolved = resolveRoute(lang, slug);
  if (!resolved) {
    return new Response("Not found", { status: 404 });
  }

  const markdown = renderMarkdownPage(lang, resolved.pageKey, resolved.params);
  if (markdown == null) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(estimateTokens(markdown)),
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      Vary: "Accept",
    },
  });
}
