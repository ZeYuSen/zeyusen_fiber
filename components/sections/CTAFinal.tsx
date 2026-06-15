"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useLocale } from "@/lib/i18n/use-locale";
import { getHomeContent } from "@/lib/i18n/home-content";

export function CTAFinal() {
  const cta = getHomeContent(useLocale()).cta;
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Quick Inquiry",
          email,
          message,
          division: "general",
          turnstileToken,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setEmail("");
        setMessage("");
        setTurnstileToken(null);
        turnstileRef.current?.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative bg-neutral-50 section-padding overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-500/20 animate-[gradient-rotate_20s_linear_infinite]" />
      </div>

      <div className="relative z-10 container-wide max-w-[800px] text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
          {cta.title}
        </h2>
        <p className="text-neutral-500 mt-6 leading-relaxed">
          {cta.intro}
        </p>

        {status === "sent" ? (
          <div className="mt-12 p-6 border border-emerald-500/30 rounded-lg">
            <p className="text-emerald-600 font-medium">
              {cta.successInline}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-4">
            <div>
              <label htmlFor="quick-inquiry-email" className="sr-only">
                Email address
              </label>
              <input
                id="quick-inquiry-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={cta.emailPlaceholder}
                required
                className="w-full px-5 py-4 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="quick-inquiry-message" className="sr-only">
                Project requirements
              </label>
              <textarea
                id="quick-inquiry-message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={cta.messagePlaceholder}
                required
                rows={3}
                className="w-full px-5 py-4 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors resize-none"
              />
            </div>
            <div>
              {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                <div className="flex justify-center mb-4">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    onSuccess={setTurnstileToken}
                    onExpire={() => setTurnstileToken(null)}
                  />
                </div>
              )}
              <button
                type="submit"
                disabled={status === "sending" || (!!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors disabled:opacity-50"
              >
                {status === "sending" ? cta.sending : cta.submit}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {status === "error" && (
              <p className="text-red-500 text-sm">{cta.error}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
