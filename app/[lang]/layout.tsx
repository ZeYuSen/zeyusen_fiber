import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Bebas_Neue } from "next/font/google";
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
import { absoluteUrl, siteConfig, siteNameFor } from "@/lib/seo";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { locales, isLocale, localeMeta, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { allLocaleHrefs } from "@/lib/i18n/routes";
import { getCategories } from "@/lib/data-i18n";
import { localizedHref } from "@/lib/i18n/routes";
import { contactInfo, companyNameFor, addressFor } from "@/lib/contact";
import { buildAgentIndex } from "@/lib/agent-tools";
import { WebMCPProvider } from "@/components/providers/WebMCPProvider";
import { MotionLayer } from "@/components/fx/MotionLayer";
import { FiberWorld } from "@/components/fx/world/FiberWorld";
import { WorldTransit } from "@/components/fx/world/WorldTransit";
import { AnalyticsEvents } from "@/components/layout/AnalyticsEvents";

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

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  return {
    ...baseMetadata,
    title: {
      default: locale === "zh" ? `${siteConfig.zhName} | 碳毡、玻纤毡与除湿转轮成型纸制造商` : siteConfig.title,
      template: `%s | ${siteNameFor(locale)}`,
    },
  };
}

const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
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
    "carbon fiber mat",
    "fiberglass mat",
    "fiberglass tissue mat",
    "fiberglass veil",
    "desiccant rotor forming paper",
    "molecular sieve rotor paper",
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
  const carbonCategories = getCategories("carbon", locale).map(({ slug, name }) => ({ slug, name }));
  const glassCategories = getCategories("glass", locale).map(({ slug, name }) => ({ slug, name }));
  const agentIndex = buildAgentIndex(locale);

  return (
    <html lang={localeMeta[locale].htmlLang} className={`${inter.variable} ${jetbrainsMono.variable} ${bebasNeue.variable}`}>
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd(absoluteUrl(homeAlternates[locale]), localeMeta[locale].hreflang)),
          }}
        />
        <SmoothScrollProvider>
          <FiberWorld />
          <Header dict={dict} carbonCategories={carbonCategories} glassCategories={glassCategories} />
          <NewTabLinkBehavior />
          <main data-page-root className="relative z-10 flex-1">{children}</main>
          <Footer locale={locale} dict={dict} />
          <AIChatWidget locale={locale} dict={dict} />
          <MotionLayer />
          <WorldTransit />
          <AnalyticsEvents />
        </SmoothScrollProvider>
        <WebMCPProvider
          index={agentIndex}
          contact={{
            company: companyNameFor(locale),
            email: contactInfo.emails[0],
            phone: contactInfo.phones[0],
            address: addressFor(locale),
          }}
          contactHref={localizedHref("contact", locale)}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
