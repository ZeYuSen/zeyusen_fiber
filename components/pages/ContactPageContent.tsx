"use client";

import { useState, useRef } from "react";
import { Send, MessageCircle, Mail, MapPin } from "lucide-react";
import { contactInfo, whatsappPhone } from "@/lib/contact";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useLocale } from "@/lib/i18n/use-locale";
import { getPagesContent } from "@/lib/i18n/pages-content";

export default function ContactPageContent() {
  const c = getPagesContent(useLocale()).contact;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    phone: "",
    division: "general",
    product_interest: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source_page: window.location.pathname,
          turnstileToken,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          country: "",
          phone: "",
          division: "general",
          product_interest: "",
          message: "",
        });
        setTurnstileToken(null);
        turnstileRef.current?.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors text-sm rounded-lg";

  return (
    <>
      {/* Page Header */}
      <section className="pt-28 pb-6">
        <div className="container-wide">
          <div>
            <p className="type-caption text-neutral-400">{c.eyebrow}</p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-2">
              {c.title}
            </h1>
            <p className="text-sm text-neutral-500 mt-2 max-w-xl leading-relaxed">
              {c.lead}
            </p>
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="pb-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="p-6 bg-white border border-neutral-100 rounded-xl shadow-sm"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-neutral-600 mb-1.5">
                      {c.labels.name}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={inputClass}
                      placeholder={c.placeholders.name}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-neutral-600 mb-1.5">
                      {c.labels.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={inputClass}
                      placeholder={c.placeholders.email}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-medium text-neutral-600 mb-1.5">
                      {c.labels.company}
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className={inputClass}
                      placeholder={c.placeholders.company}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-xs font-medium text-neutral-600 mb-1.5">
                      {c.labels.country}
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className={inputClass}
                      placeholder={c.placeholders.country}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-neutral-600 mb-1.5">
                      {c.labels.phone}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={inputClass}
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div>
                    <label htmlFor="division" className="block text-xs font-medium text-neutral-600 mb-1.5">
                      {c.labels.interestedIn}
                    </label>
                    <select
                      id="division"
                      name="division"
                      value={formData.division}
                      onChange={(e) =>
                        setFormData({ ...formData, division: e.target.value })
                      }
                      className={inputClass}
                    >
                      <option value="general">{c.divisionOptions.general}</option>
                      <option value="carbon">{c.divisionOptions.carbon}</option>
                      <option value="glass">{c.divisionOptions.glass}</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label htmlFor="product_interest" className="block text-xs font-medium text-neutral-600 mb-1.5">
                    {c.labels.productInterest}
                  </label>
                  <input
                    id="product_interest"
                    name="product_interest"
                    type="text"
                    value={formData.product_interest}
                    onChange={(e) =>
                      setFormData({ ...formData, product_interest: e.target.value })
                    }
                    className={inputClass}
                    placeholder={c.placeholders.productInterest}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="message" className="block text-xs font-medium text-neutral-600 mb-1.5">
                    {c.labels.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`${inputClass} resize-none`}
                    placeholder={c.placeholders.message}
                  />
                </div>
                {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                  <div className="mt-3">
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
                  className="mt-5 inline-flex items-center gap-2 px-7 py-3 bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {status === "sending" ? c.sending : c.submit}
                </button>
                {status === "success" && (
                  <p className="mt-4 text-sm text-green-600">
                    {c.success}
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-4 text-sm text-red-600">
                    {c.error}
                  </p>
                )}
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="p-6 bg-white border border-neutral-100 rounded-xl shadow-sm">
                <h2 className="text-sm font-medium text-neutral-900 mb-4">
                  {c.contactInfoHeading}
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400">{c.companyLabel}</p>
                    <p className="text-sm text-neutral-700 mt-1">
                      {contactInfo.company}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-carbon-accent mt-0.5" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400">{c.emailLabel}</p>
                      <div className="space-y-1">
                        {contactInfo.emails.map((email) => (
                          <a
                            key={email}
                            href={`mailto:${email}`}
                            className="block text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
                          >
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-4 h-4 text-[#25D366] mt-0.5" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400">{c.phoneLabel}</p>
                      <a
                        href={`https://wa.me/${whatsappPhone}`}
                        className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
                      >
                        {contactInfo.phones[1]}
                      </a>
                      <a
                        href={`tel:${contactInfo.phones[0]}`}
                        className="block text-sm text-neutral-700 hover:text-neutral-900 transition-colors mt-1"
                      >
                        {contactInfo.phones[0]}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-glass-accent mt-0.5" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400">{c.addressLabel}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}&hl=en`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
                      >
                        {contactInfo.address}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border border-neutral-100 rounded-xl shadow-sm">
                <h2 className="text-sm font-medium text-neutral-900 mb-4">
                  {c.faqHeading}
                </h2>
                <div className="space-y-4">
                  {c.faqs.map((faq) => (
                    <div key={faq.q}>
                      <p className="text-sm text-neutral-800">{faq.q}</p>
                      <p className="text-sm text-neutral-500 mt-1">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white border border-neutral-100 rounded-xl shadow-sm">
                <h2 className="text-sm font-medium text-neutral-900 mb-4">
                  {c.fasterHeading}
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {c.fasterIntro}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  {c.fasterList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-neutral-500 leading-relaxed">
                  {c.fasterOutro}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
