import { NextRequest, NextResponse } from "next/server";
import type { ChatRequest } from "@/types/chat";
import { getSupabaseClient } from "@/lib/supabase";
import { allCarbonFiberCategories } from "@/data/carbon-fiber";
import { allGlassFiberCategories } from "@/data/glass-fiber";
import { localizedHref } from "@/lib/i18n/routes";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { ProductCategory } from "@/types/product";

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;
const MAX_ENTRIES = 10000;
const ipRequests = new Map<string, { count: number; resetAt: number }>();

// Per-conversation cap: max user turns before we hand off to a human.
const MAX_USER_TURNS = 20;

// Per-IP daily quota: total user messages allowed per calendar day (best-effort
// in-memory; resets on cold start, same trade-off as the burst rate limiter).
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_DAILY_MESSAGES = 50;
const ipDaily = new Map<string, { count: number; resetAt: number }>();

// Returns true if this IP has hit its daily message quota (also increments).
function isDailyQuotaExceeded(ip: string): boolean {
  const now = Date.now();
  const entry = ipDaily.get(ip);

  if (!entry || now > entry.resetAt) {
    if (ipDaily.size > MAX_ENTRIES) {
      for (const [k, v] of ipDaily) {
        if (now > v.resetAt) ipDaily.delete(k);
      }
    }
    ipDaily.set(ip, { count: 1, resetAt: now + DAILY_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_DAILY_MESSAGES) return true;
  entry.count += 1;
  return false;
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry || now > entry.resetAt) {
    if (ipRequests.size > MAX_ENTRIES) {
      for (const [k, v] of ipRequests) {
        if (now > v.resetAt) ipRequests.delete(k);
      }
    }
    ipRequests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS;
}

const SYSTEM_PROMPT = `You are the AI assistant for ZeYuSen Fiber (Jiangsu Zeyusen Carbon Fiber Technology Co., Ltd.), a professional manufacturer focused on carbon fiber mats, fiberglass mats and veils, and desiccant rotor forming paper, based in Nantong, Jiangsu, China.

Your role is to help potential customers with product inquiries, specifications, pricing guidance, and general company information. Be helpful, professional, and concise. You are strictly a sales and product assistant for this company — you must stay on topic and only discuss ZeYuSen Fiber and its composite materials business. You are not a general-purpose assistant and must not answer off-topic questions (math problems, coding, trivia, current events, etc.).

Key company facts:
- Founded: September 17, 2015, Nantong City, Jiangsu Province, China
- Registered capital: 10,000,000 RMB
- Employees: 47
- Production bases: Nantong and Taizhou
- Factory area: ~8,000 m² across two production bases
- Annual output: Carbon fiber 10M sqm, Fiberglass 80M sqm
- Certifications: ISO 9001:2015, ISO 14001, ISO 45001:2018
- Third-party verification: SGS Audited Supplier (Report No. QIP-ASI264784), verifiable at auditedsupplier.sgsgroup.com.cn
- Patents: 13+ utility model patents
- Export markets: North America, Southeast Asia, the Middle East, Japan/South Korea (80%+ repeat buyers)
- Trade terms: FOB, CIF, CFR, EXW; payment via LC, T/T, D/P, PayPal, Western Union
- Minimum order quantity: 10 meters
- Nearest port: Shanghai Port (240 km)
- Lead time: within 15 workdays

Current product lines:
1. Carbon Fiber Mats: surface mat (10g-30g/m²), nickel-plated mat, composite mat, needled mat, and fuel-cell GDL mat
2. Fiberglass Mats and Veils: surface tissue, colored and black tissue, roofing tissue, wall covering, pipe-wrapping mat, and battery separator
3. Desiccant Rotor Forming Paper: glass-fiber forming paper for desiccant and molecular-sieve rotors

Do not offer or recommend woven carbon cloth, carbon yarn/powder/chopped fiber, woven fiberglass cloth, stitched composite mats, chopped strand mat, or basalt mat. These formats are no longer part of the public product range.

Contact: zys@jsfiberglass.com | +86-18012885770 | WhatsApp available

Guidelines:
- SCOPE: Only answer questions related to ZeYuSen Fiber and its business — our products, composite materials (carbon fiber and fiberglass), specifications, applications, industries we serve, quotes, orders, shipping, certifications, and company information. If a question is clearly off-topic (e.g. math puzzles, coding, general trivia, news, politics, personal advice, or anything unrelated to our composite materials business), do NOT answer it. Instead, politely decline in one short sentence and steer the conversation back, for example: "I can only help with questions about ZeYuSen Fiber's carbon fiber and fiberglass products. Is there anything about our materials I can help you with?" Always give this redirect in the same language the customer used. Do not solve the off-topic request even partially.
- Answer in the same language the customer uses
- For specific pricing, suggest they contact sales for a formal quote
- Be knowledgeable about composite material applications
- When a customer asks about a product, product type, or application, recommend the most relevant product(s) from the Product catalog below and include their page link as a Markdown link, e.g. [Carbon Fiber Surface Mat 10g](/en/carbon-fiber/carbon-fiber-mat/surface-mat-10g). Only use links exactly as given in the catalog — never invent or guess URLs. Recommend at most 2-3 products so the reply stays focused.
- When a customer questions our credibility or asks whether we are a legitimate/reliable supplier, mention that we are an SGS Audited Supplier (Report No. QIP-ASI264784) and the details can be independently verified on SGS's site
- If unsure, recommend contacting the sales team directly`;

// Localized notice shown when a conversation reaches the per-chat turn cap.
function turnLimitMessage(locale?: string): string {
  const messages: Record<string, string> = {
    en: "Thanks for the great conversation! To give you the best help from here, please reach our team directly on WhatsApp (+86-18012885770) or at zys@jsfiberglass.com. They can provide quotes, samples, and detailed technical support.",
    zh: "感谢您的咨询!为了给您更好的服务,建议您直接联系我们的团队:WhatsApp(+86-18012885770)或邮箱 zys@jsfiberglass.com。我们可以为您提供报价、样品和详细的技术支持。",
    ko: "문의해 주셔서 감사합니다! 더 나은 도움을 위해 WhatsApp(+86-18012885770) 또는 zys@jsfiberglass.com으로 저희 팀에 직접 문의해 주세요. 견적, 샘플 및 상세한 기술 지원을 제공해 드립니다.",
    es: "¡Gracias por la conversación! Para brindarle la mejor ayuda, contacte a nuestro equipo directamente por WhatsApp (+86-18012885770) o en zys@jsfiberglass.com. Pueden ofrecerle cotizaciones, muestras y soporte técnico detallado.",
    pt: "Obrigado pela conversa! Para oferecer a melhor ajuda, entre em contato com nossa equipe diretamente pelo WhatsApp (+86-18012885770) ou em zys@jsfiberglass.com. Eles podem fornecer orçamentos, amostras e suporte técnico detalhado.",
  };
  return messages[locale ?? "en"] ?? messages.en;
}

// Localized notice shown when an IP exceeds the daily message quota.
function dailyLimitMessage(locale?: string): string {
  const messages: Record<string, string> = {
    en: "You've reached today's message limit. Please contact us on WhatsApp (+86-18012885770) or at zys@jsfiberglass.com, or come back tomorrow.",
    zh: "您已达到今日的消息上限。请通过 WhatsApp(+86-18012885770)或邮箱 zys@jsfiberglass.com 联系我们,或明天再来。",
    ko: "오늘의 메시지 한도에 도달했습니다. WhatsApp(+86-18012885770) 또는 zys@jsfiberglass.com으로 문의하시거나 내일 다시 방문해 주세요.",
    es: "Ha alcanzado el límite de mensajes de hoy. Contáctenos por WhatsApp (+86-18012885770) o en zys@jsfiberglass.com, o vuelva mañana.",
    pt: "Você atingiu o limite de mensagens de hoje. Contate-nos pelo WhatsApp (+86-18012885770) ou em zys@jsfiberglass.com, ou volte amanhã.",
  };
  return messages[locale ?? "en"] ?? messages.en;
}

// Build a compact product catalog (name + link) for the given locale so the
// assistant can recommend products with correct, localized, in-site URLs.
// Sourced from the product data files, so it stays in sync automatically.
function buildProductCatalog(locale: Locale): string {
  const sections: { division: "carbon" | "glass"; label: string; categories: ProductCategory[] }[] = [
    { division: "carbon", label: "Carbon Fiber", categories: allCarbonFiberCategories },
    { division: "glass", label: "Glass Fiber", categories: allGlassFiberCategories },
  ];

  const lines: string[] = [];
  for (const section of sections) {
    lines.push(`\n${section.label}:`);
    for (const category of section.categories) {
      const categoryKey = section.division === "carbon" ? "carbon-category" : "glass-category";
      const categoryHref = localizedHref(categoryKey, locale, { category: category.slug });
      lines.push(`- ${category.name} (category): ${categoryHref}`);
      for (const product of category.products) {
        const productKey = section.division === "carbon" ? "carbon-product" : "glass-product";
        const productHref = localizedHref(productKey, locale, {
          category: category.slug,
          product: product.slug,
        });
        lines.push(`  - ${product.name}: ${productHref}`);
      }
    }
  }
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body: ChatRequest = await request.json();

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Per-IP daily quota (429 so the client shows a limit notice).
    if (isDailyQuotaExceeded(ip)) {
      return NextResponse.json(
        { error: dailyLimitMessage(body.locale) },
        { status: 429 }
      );
    }

    // Per-conversation turn cap: return a normal assistant message (200) that
    // gently hands the visitor off to a human, instead of an error.
    const userTurns = body.messages.filter((m) => m.role === "user").length;
    if (userTurns > MAX_USER_TURNS) {
      return NextResponse.json({ message: turnLimitMessage(body.locale) });
    }

    const sessionId = body.sessionId;

    const supabase = getSupabaseClient();

    // Ensure session exists in Supabase when analytics storage is configured.
    if (sessionId) {
      const userAgent = request.headers.get("user-agent") || "";
      if (supabase) {
        await supabase
          .from("chat_sessions")
          .upsert(
            { session_id: sessionId, ip, user_agent: userAgent, message_count: body.messages.length },
            { onConflict: "session_id" }
          )
          .then(() => {});
      }
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 503 }
      );
    }

    const languageNames: Record<string, string> = {
      en: "English",
      zh: "Chinese",
      ko: "Korean",
      es: "Spanish",
      pt: "Portuguese",
    };
    const catalogLocale: Locale = isLocale(body.locale ?? "") ? (body.locale as Locale) : "en";
    const replyLanguage = languageNames[body.locale ?? "en"] ?? "English";
    const productCatalog = `\n\nProduct catalog (recommend from these and use the exact links):\n${buildProductCatalog(catalogLocale)}`;
    const basePrompt = `${SYSTEM_PROMPT}${productCatalog}`;
    const systemContent =
      body.locale && body.locale !== "en"
        ? `${basePrompt}\n\nIMPORTANT: Reply to the user in ${replyLanguage}. Keep product names, model numbers, and technical units unchanged.`
        : basePrompt;

    const messages = [
      { role: "system", content: systemContent },
      ...body.messages.slice(-20),
    ];

    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("DeepSeek API error:", res.status, errText);
      return NextResponse.json(
        { error: "AI service temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I could not generate a response.";

    // Write user message and AI reply to Supabase (non-blocking)
    if (sessionId && supabase) {
      const lastUserMsg = body.messages[body.messages.length - 1];
      supabase
        .from("chat_messages")
        .insert([
          { session_id: sessionId, role: lastUserMsg.role, content: lastUserMsg.content },
          { session_id: sessionId, role: "assistant", content: reply },
        ])
        .then(() => {});
    }

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
