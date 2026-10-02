"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Site-wide contact-intent tracking by event delegation, so every WhatsApp,
// email and phone link (header, footer, product pages, chat) is covered
// without touching each component. Mark these as key events in GA4.
export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const location = anchor.closest("footer")
        ? "footer"
        : anchor.closest("header")
          ? "header"
          : anchor.closest("[data-chat-widget]")
            ? "chat"
            : "page";
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href)) {
        trackEvent("whatsapp_click", { link_location: location });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { link_location: location });
      } else if (href.startsWith("tel:")) {
        trackEvent("phone_click", { link_location: location });
      }
    };
    // Capture phase: NewTabLinkBehavior handles external links in capture too.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
