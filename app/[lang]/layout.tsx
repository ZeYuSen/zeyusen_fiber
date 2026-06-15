import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIChatWidget } from "@/components/layout/AIChatWidget";
import { NewTabLinkBehavior } from "@/components/layout/NewTabLinkBehavior";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { locales, isLocale, localeMeta, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { allLocaleHrefs } from "@/lib/i18n/routes";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | ZeYuSen Fiber",
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "carbon fiber",
    "glass fiber",
    "fiberglass",
    "composite materials",
    "carbon fiber manufacturer",
    "fiberglass supplier",
  ],
};

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const homeAlternates = allLocaleHrefs("home");

  return (
    <html lang={localeMeta[locale].htmlLang} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd(absoluteUrl(homeAlternates[locale]), localeMeta[locale].hreflang)),
          }}
        />
        <SmoothScrollProvider>
          <Header dict={dict} />
          <NewTabLinkBehavior />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} dict={dict} />
          <AIChatWidget locale={locale} dict={dict} />
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
