// Health/status endpoint advertised by the API catalog (rel="status").
// Reached publicly at /.well-known/health via a next.config rewrite.
export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify({ status: "ok", service: "zeyusen-fiber-inquiry" }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=60",
    },
  });
}
