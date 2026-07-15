import { siteConfig } from "@/lib/seo";
import { contactInfo } from "@/lib/contact";

// OpenAPI description of the public inquiry API, advertised by the API catalog
// (rel="service-desc"). Served at /openapi.json.
export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(spec(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

function spec() {
  return {
    openapi: "3.1.0",
    info: {
      title: "ZeYuSen Fiber Inquiry API",
      version: "1.0.0",
      description:
        "Submit a sales/technical inquiry (request for quote) to ZeYuSen Fiber. " +
        "The endpoint is protected by Cloudflare Turnstile: a valid `turnstileToken` " +
        "obtained from an interactive human challenge is required, so automated agents " +
        "cannot complete a submission unattended. Rate limited to 5 requests/min per IP.",
      contact: { name: contactInfo.company, email: contactInfo.emails[0] },
    },
    servers: [{ url: siteConfig.url }],
    paths: {
      "/api/inquiry": {
        post: {
          summary: "Submit an inquiry / request for quote",
          operationId: "submitInquiry",
          description:
            "Requires a Cloudflare Turnstile token from an interactive challenge. " +
            "Intended for human-operated submissions; unattended agents will be rejected.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Inquiry" },
              },
            },
          },
          responses: {
            "200": { description: "Inquiry accepted", content: { "application/json": { schema: { $ref: "#/components/schemas/SuccessResponse" } } } },
            "400": { description: "Missing required fields or verification token" },
            "403": { description: "Turnstile verification failed" },
            "429": { description: "Rate limit exceeded (5/min per IP)" },
            "500": { description: "Internal server error" },
          },
        },
      },
    },
    components: {
      schemas: {
        Inquiry: {
          type: "object",
          required: ["name", "email", "message", "turnstileToken"],
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            company: { type: "string" },
            country: { type: "string" },
            phone: { type: "string" },
            division: { type: "string", enum: ["carbon", "glass"] },
            product_interest: { type: "string" },
            message: { type: "string" },
            source_page: { type: "string" },
            turnstileToken: {
              type: "string",
              description: "Cloudflare Turnstile token from an interactive human challenge.",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: { success: { type: "boolean", enum: [true] } },
        },
      },
    },
  };
}
