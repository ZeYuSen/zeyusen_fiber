import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo";

// Search engine crawlers.
const searchBots = ["Googlebot", "Bingbot", "Baiduspider", "Sogou web spider", "360Spider"];

// AI / answer-engine crawlers we explicitly welcome so our content is eligible
// for citation in both international and domestic model data channels.
// International: OpenAI, Anthropic, Google Gemini, Perplexity, Apple, Common Crawl, Meta, Amazon.
// Domestic (CN): ByteDance (Doubao), Baidu Wenxin, PetalBot (Huawei).
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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...searchBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
