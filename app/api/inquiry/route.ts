import { NextRequest, NextResponse } from "next/server";
import { primaryEmail } from "@/lib/contact";
import nodemailer from "nodemailer";

// Best-effort in-memory rate limiter. On serverless (Vercel), each instance
// has its own Map that resets on cold start — Turnstile is the primary
// abuse protection. For higher-traffic sites, replace with Upstash Redis
// or Vercel KV for distributed rate limiting.
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_ENTRIES = 10000;
const ipRequests = new Map<string, { count: number; resetAt: number }>();

function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [ip, entry] of ipRequests) {
    if (now > entry.resetAt) {
      ipRequests.delete(ip);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry || now > entry.resetAt) {
    // Periodically clean up when map grows large
    if (ipRequests.size > MAX_ENTRIES) {
      cleanupExpiredEntries();
    }
    ipRequests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS;
}

// --- HTML escape to prevent XSS in email templates ---
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
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

    const body = await request.json();
    const { name, email, company, country, phone, division, product_interest, message, source_page, turnstileToken } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Verify Turnstile token
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: "Please complete the verification" },
          { status: 400 }
        );
      }

      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
          remoteip: ip,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json(
          { error: "Verification failed. Please try again." },
          { status: 403 }
        );
      }
    }

    // Geo lookup via Cloudflare headers
    const cfCountry = request.headers.get("cf-ipcountry") || "Unknown";

    // Send notification email via nodemailer (163 enterprise)
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const notifyEmail = process.env.NOTIFY_EMAIL || primaryEmail;

    if (emailUser && emailPass) {
      const transporter = nodemailer.createTransport({
        host: "smtp.qiye.163.com",
        port: 465,
        secure: true,
        auth: { user: emailUser, pass: emailPass },
      });

      const safeName = escapeHtml(String(name));
      const safeEmail = escapeHtml(String(email));
      const safeCompany = escapeHtml(String(company || "N/A"));
      const safeCountry = escapeHtml(String(country || "N/A"));
      const safePhone = escapeHtml(String(phone || "N/A"));
      const safeDivision = escapeHtml(String(division || "General"));
      const safeProductInterest = escapeHtml(String(product_interest || "N/A"));
      const safeSourcePage = escapeHtml(String(source_page || "N/A"));
      const safeMessage = escapeHtml(String(message));

      await transporter.sendMail({
        from: `ZeYuSen Fiber <${emailUser}>`,
        to: notifyEmail,
        replyTo: String(email),
        subject: `New Inquiry from ${safeName} - ${safeDivision}`,
        html: `
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Country:</strong> ${safeCountry}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Division:</strong> ${safeDivision}</p>
          <p><strong>Product Interest:</strong> ${safeProductInterest}</p>
          <p><strong>Source Page:</strong> ${safeSourcePage}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
          <hr />
          <p style="color:#888;font-size:12px"><strong>Source Country:</strong> ${escapeHtml(cfCountry)}</p>
          <p style="color:#888;font-size:12px"><strong>IP:</strong> ${escapeHtml(ip)}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
