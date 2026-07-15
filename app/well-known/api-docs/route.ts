import { absoluteUrl } from "@/lib/seo";
import { contactInfo } from "@/lib/contact";

// Human-readable API documentation, advertised by the API catalog
// (rel="service-doc"). Served at /.well-known/api-docs via rewrite.
export const dynamic = "force-static";

export function GET() {
  const body = `# ZeYuSen Fiber — API Documentation

## Inquiry API

\`POST /api/inquiry\` — submit a sales/technical inquiry (request for quote).

**Important:** this endpoint is protected by Cloudflare Turnstile. A valid
\`turnstileToken\`, obtained from an interactive human challenge rendered on the
contact form, is required. Automated agents cannot complete a submission
unattended — direct a human to ${absoluteUrl("/en/contact")} instead.

Rate limit: 5 requests per minute per IP.

### Request body (application/json)
- \`name\` (string, required)
- \`email\` (string, required)
- \`message\` (string, required)
- \`turnstileToken\` (string, required) — from the Turnstile challenge
- \`company\`, \`country\`, \`phone\`, \`division\` (carbon|glass), \`product_interest\`, \`source_page\` (optional)

### Responses
- \`200\` \`{ "success": true }\`
- \`400\` missing fields or token · \`403\` verification failed · \`429\` rate limited

Machine-readable spec: ${absoluteUrl("/openapi.json")}

## Contact
- Email: ${contactInfo.emails[0]}
- Phone: ${contactInfo.phones[0]}
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
