import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { primaryEmail } from "@/lib/contact";
import { supabase } from "@/lib/supabase";

// Dedup: only send one email per session
const sentSessions = new Set<string>();
const MAX_SESSIONS = 5000;

// IP rate limit: max 3 summaries per hour per IP
const SUMMARY_WINDOW_MS = 60 * 60 * 1000;
const MAX_SUMMARIES_PER_IP = 3;
const ipSummaryCount = new Map<string, { count: number; resetAt: number }>();

function isSummaryRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipSummaryCount.get(ip);

  if (!entry || now > entry.resetAt) {
    if (ipSummaryCount.size > 5000) {
      for (const [k, v] of ipSummaryCount) {
        if (now > v.resetAt) ipSummaryCount.delete(k);
      }
    }
    ipSummaryCount.set(ip, { count: 1, resetAt: now + SUMMARY_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > MAX_SUMMARIES_PER_IP;
}

const SUMMARY_PROMPT = `Analyze the following customer chat conversation and return a JSON response with two fields:

1. "intent": either "high" or "low"
2. "summary": a brief summary for the sales team (2-4 sentences)

HIGH intent criteria (any one is enough):
- Asked for a price quote or pricing
- Requested samples
- Asked about MOQ / minimum order quantity
- Asked about delivery time / lead time
- Provided company name or contact details
- Discussed specific customization requirements (weight, width, size, etc.)
- Asked about trade terms (FOB, CIF, DDP)
- Mentioned a specific quantity or order size
- Asked about payment terms

LOW intent (all of the below):
- General product knowledge questions
- Casual chatting or testing
- Only asked 1-2 simple questions without follow-up
- No buying signals whatsoever

IMPORTANT: Return ONLY valid JSON, no markdown, no code blocks. Example:
{"intent": "high", "summary": "Customer from Germany inquired about carbon fiber surface mat 20g/m², asked for MOQ and sample. Interested in wind energy application."}`;

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isSummaryRateLimited(ip)) {
      return NextResponse.json({ ok: true });
    }

    const body = await request.json();
    const { sessionId, messages } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ ok: true });
    }

    // Dedup by sessionId
    if (sessionId && sentSessions.has(sessionId)) {
      return NextResponse.json({ ok: true });
    }
    if (sessionId) {
      if (sentSessions.size > MAX_SESSIONS) sentSessions.clear();
      sentSessions.add(sessionId);
    }

    const userMessages = messages.filter((m: { role: string }) => m.role === "user");
    if (userMessages.length < 2) {
      return NextResponse.json({ ok: true });
    }

    const transcript = messages
      .map((m: { role: string; content: string }) => `${m.role === "user" ? "Customer" : "AI"}: ${m.content}`)
      .join("\n");

    let summary = transcript;
    let intent: "high" | "low" = "low";
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (apiKey) {
      try {
        const res = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: SUMMARY_PROMPT },
              { role: "user", content: transcript },
            ],
            max_tokens: 512,
            temperature: 0.1,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const raw = data.choices?.[0]?.message?.content || "";
          try {
            const parsed = JSON.parse(raw);
            intent = parsed.intent === "high" ? "high" : "low";
            summary = parsed.summary || transcript;
          } catch {
            summary = raw || transcript;
          }
        }
      } catch (e) {
        console.error("Summary generation failed, using raw transcript:", e);
      }
    }

    // Only send email for high-intent conversations
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const notifyEmail = process.env.NOTIFY_EMAIL || primaryEmail;

    if (intent === "high" && emailUser && emailPass) {
      const transporter = nodemailer.createTransport({
        host: "smtp.qiye.163.com",
        port: 465,
        secure: true,
        auth: { user: emailUser, pass: emailPass },
      });

      const timestamp = new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });

      await transporter.sendMail({
        from: `ZeYuSen AI Chat <${emailUser}>`,
        to: notifyEmail,
        subject: `[High Intent] Sales Lead - ${timestamp}`,
        html: `
          <h2>🔥 High-Intent Customer Conversation</h2>
          <p><strong>Session:</strong> ${sessionId || "unknown"}</p>
          <p><strong>Time:</strong> ${timestamp}</p>
          <p><strong>Messages:</strong> ${messages.length} (${userMessages.length} from customer)</p>
          <hr />
          <h3>AI Summary</h3>
          <div style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap;font-size:14px;">${summary}</div>
          <hr />
          <h3>Full Transcript</h3>
          <div style="background:#fafafa;padding:16px;border-radius:8px;font-size:13px;white-space:pre-wrap;">${transcript}</div>
        `,
      });
    }

    // Update session in Supabase with summary, intent, and ended_at
    if (sessionId) {
      await supabase
        .from("chat_sessions")
        .update({ summary, intent, ended_at: new Date().toISOString(), message_count: messages.length })
        .eq("session_id", sessionId);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Chat summary error:", error);
    return NextResponse.json({ ok: true });
  }
}