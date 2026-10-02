// GA4 event helpers. gtag is only present when NEXT_PUBLIC_GA_MEASUREMENT_ID is
// configured (see app/[lang]/layout.tsx); every call is a safe no-op otherwise.

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: GtagParams) => void;
  }
}

export function trackEvent(name: string, params: GtagParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, {
    page_path: window.location.pathname,
    ...params,
  });
}

/** A successful inquiry: the site's primary conversion (mark `generate_lead` as a key event in GA). */
export function trackLead(formId: "quick_inquiry" | "contact_form", params: GtagParams = {}) {
  trackEvent("generate_lead", { form_id: formId, ...params });
}
