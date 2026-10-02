"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useLocale } from "@/lib/i18n/use-locale";
import { getHomeContent } from "@/lib/i18n/home-content";
import { trackLead } from "@/lib/analytics";

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
        trackLead("quick_inquiry");
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
    <section data-tone="warm" data-world="warm" className="relative section-padding">
      {/* The world settles into the solid night of the footer below. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#080A0D]" />

      <div className="relative z-10 container-wide">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 data-reveal="text" className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.02em] text-[#E6EAEE] text-balance [&:lang(ko)]:tracking-normal [&:lang(zh)]:tracking-normal">
            {cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/65">
            {cta.intro}
          </p>

          {/* No card: the fields sit right in the warm pool of light, so the
              orange send button is the brightest thing on screen. */}
          <div className="mx-auto mt-14 max-w-[640px] text-left">
            {status === "sent" ? (
              <p className="py-10 text-center font-medium text-[#E6EAEE]">
                {cta.successInline}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
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
                    className="w-full rounded-sm border border-white/[0.16] bg-[#080A0D]/45 px-5 py-4 text-[#E6EAEE] placeholder:text-white/35 transition-colors focus:border-[#F0B36A]/55 focus:bg-[#080A0D]/65 focus:outline-none [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#15130F] [&:-webkit-autofill]:[-webkit-text-fill-color:#E6EAEE]"
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
                    rows={4}
                    className="w-full rounded-sm border border-white/[0.16] bg-[#080A0D]/45 px-5 py-4 text-[#E6EAEE] placeholder:text-white/35 transition-colors focus:border-[#F0B36A]/55 focus:bg-[#080A0D]/65 focus:outline-none [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#15130F] [&:-webkit-autofill]:[-webkit-text-fill-color:#E6EAEE] resize-none"
                  />
                </div>
                <div className="flex flex-col items-center gap-4 pt-7">
                  {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                      options={{ theme: "dark" }}
                      onSuccess={setTurnstileToken}
                      onExpire={() => setTurnstileToken(null)}
                    />
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
                  <p className="text-center text-sm text-[#F4A68C]">{cta.error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
