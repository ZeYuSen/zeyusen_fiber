import { NextRequest, NextResponse } from "next/server";
import type { ChatRequest } from "@/types/chat";
import { getSupabaseClient } from "@/lib/supabase";

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;
const MAX_ENTRIES = 10000;
const ipRequests = new Map<string, { count: number; resetAt: number }>();

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

const SYSTEM_PROMPT = `You are the AI assistant for ZeYuSen Fiber (Jiangsu Zeyusen Carbon Fiber Technology Co., Ltd.), a professional manufacturer of carbon fiber and fiberglass composite materials based in Nantong, Jiangsu, China.

Your role is to help potential customers with product inquiries, specifications, pricing guidance, and general company information. Be helpful, professional, and concise.

Key company facts:
- Founded: 2015, Nantong City, Jiangsu Province, China
- Production bases: Nantong and Taizhou
- Factory area: 80,000 m²
- Annual output: Carbon fiber 10M sqm, Fiberglass 80M sqm
- Certifications: ISO 9001, ISO 14001, ISO 45001, IP Management System
- Patents: 13+ utility model patents
- Export: 50+ countries
- Distance to Shanghai Port: 240 km

Product lines:
1. Carbon Fiber Surface Mat (10g-30g/m²)
2. Carbon Fiber Composite Mat
3. Carbon Fiber Needle Mat
4. Carbon Fiber Cloth (plain weave, twill weave)
5. Carbon Fiber Raw Materials (chopped strands, powder, yarn)
6. Fiberglass Tissue Mat / Surface Veil
7. Fiberglass Cloth (multiaxial, unidirectional, standard)
8. Fiberglass Composite Mat (for wind energy, construction)
9. Chopped Strand Mat
10. Other: Basalt fiber, Polyester felt

Contact: zys@jsfiberglass.com | +86-18012885770 | WhatsApp available

Guidelines:
- Answer in the same language the customer uses
- For specific pricing, suggest they contact sales for a formal quote
- Be knowledgeable about composite material applications
- If unsure, recommend contacting the sales team directly`;

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
      ko: "Korean",
      es: "Spanish",
      pt: "Portuguese",
    };
    const replyLanguage = languageNames[body.locale ?? "en"] ?? "English";
    const systemContent =
      body.locale && body.locale !== "en"
        ? `${SYSTEM_PROMPT}\n\nIMPORTANT: Reply to the user in ${replyLanguage}. Keep product names, model numbers, and technical units unchanged.`
        : SYSTEM_PROMPT;

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
