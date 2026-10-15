import { absoluteUrl, siteConfig, siteNameFor } from "./seo";
import { contactInfo, companyNameFor } from "./contact";
import type { Locale } from "./i18n/config";

const logoSrc = "/logo.png?v=logo-20260626";

// One company entity shared by every page and locale, so search engines merge
// the English and Chinese names into the same knowledge-graph entry.
const organizationId = absoluteUrl("/#organization");

// Every name the company is searched by, English and Chinese.
const brandNames = [
  siteConfig.legalName,
  contactInfo.company,
  siteConfig.name,
  "ZEYUSEN",
  siteConfig.zhLegalName,
  siteConfig.zhName,
  siteConfig.zhShortName,
  "泽宇森纤维",
  contactInfo.zhFormerCompany,
];

function alternateNamesExcept(...primary: string[]) {
  return brandNames.filter((name) => !primary.includes(name));
}

export function websiteJsonLd(url: string = absoluteUrl("/"), inLanguage?: string) {
  const name = inLanguage === "zh" ? siteConfig.zhName : siteConfig.legalName;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    name,
    alternateName: alternateNamesExcept(name),
    url,
    publisher: { "@id": organizationId },
    ...(inLanguage ? { inLanguage } : {}),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function organizationJsonLd(locale: Locale = "en") {
  const isZh = locale === "zh";
  const name = isZh ? siteConfig.zhLegalName : siteConfig.legalName;
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Manufacturer"],
    "@id": organizationId,
    name,
    alternateName: alternateNamesExcept(name, companyNameFor(locale)),
    legalName: companyNameFor(locale),
    url: absoluteUrl("/"),
    logo: absoluteUrl(logoSrc),
    description: isZh
      ? `${siteConfig.zhLegalName}（简称泽宇森，新三板证券代码${contactInfo.neeq.code}）成立于2015年，专业生产玻纤毡与面纱、碳纤维毡和除湿转轮成型纸，服务复合材料与工业除湿应用。`
      : "Manufacturer of fiberglass mats and veils, carbon fiber mats, and desiccant rotor forming paper for industrial composite and dehumidification applications.",
    foundingDate: contactInfo.foundingDate,
    taxID: contactInfo.creditCode,
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "Unified Social Credit Code (统一社会信用代码)",
        value: contactInfo.creditCode,
      },
      {
        "@type": "PropertyValue",
        propertyID: "NEEQ stock code (新三板证券代码)",
        value: contactInfo.neeq.code,
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.structuredAddress.streetAddress,
      addressLocality: contactInfo.structuredAddress.addressLocality,
      addressRegion: contactInfo.structuredAddress.addressRegion,
      postalCode: contactInfo.structuredAddress.postalCode,
      addressCountry: contactInfo.structuredAddress.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contactInfo.geo.latitude,
      longitude: contactInfo.geo.longitude,
    },
    areaServed: {
      "@type": "GeoShape",
      name: "Worldwide",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contactInfo.phones[0],
      email: contactInfo.emails[0],
      contactType: "sales",
      availableLanguage: ["English", "Korean", "Spanish", "Portuguese", "Chinese"],
    },
    hasCredential: [
      ...["ISO 9001:2015", "ISO 14001", "ISO 45001:2018"].map((name) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name,
      })),
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "audit",
        name: `SGS Audited Supplier (Report No. ${contactInfo.sgsAudit.reportNo})`,
        recognizedBy: {
          "@type": "Organization",
          name: "SGS",
          url: contactInfo.sgsAudit.verifyUrl,
        },
      },
    ],
    makesOffer: {
      "@type": "Offer",
      eligibleCustomerType: "http://purl.org/goodrelations/v1#Business",
      areaServed: [
        "North America",
        "Southeast Asia",
        "Middle East",
        "Japan",
        "South Korea",
      ],
      availableDeliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeFreight",
      acceptedPaymentMethod: ["FOB", "CIF", "CFR", "EXW"],
    },
    sameAs: contactInfo.sameAs,
  };
}

export function chinaCompositesExpo2026JsonLd(locale: "en" | "zh" | "ko" | "es" | "pt") {
  const officialUrl = locale === "zh"
    ? "https://www.chinacompositesexpo.com/cn/netshow-1759-81001720.html"
    : "https://www.chinacompositesexpo.com/en/netshow-1759-4500860.html";

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "China Composites Expo 2026",
    startDate: "2026-09-01",
    endDate: "2026-09-03",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: officialUrl,
    location: {
      "@type": "Place",
      name: "National Exhibition and Convention Center (Shanghai)",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Shanghai",
        addressCountry: "CN",
      },
    },
    performer: {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.legalName,
      url: absoluteUrl("/"),
      description: "Exhibitor at Booth 6R30",
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function productJsonLd({
  name,
  description,
  image,
  category,
  path,
  locale = "en",
}: {
  name: string;
  description: string;
  image: string;
  category: string;
  path: string;
  locale?: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: absoluteUrl(image),
    category,
    url: absoluteUrl(path),
    brand: {
      "@type": "Brand",
      name: siteNameFor(locale),
    },
    manufacturer: {
      "@type": "Organization",
      "@id": organizationId,
      name: siteNameFor(locale),
      url: absoluteUrl("/"),
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "B2B buyers, distributors, and composite manufacturers",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Sales model",
        value: "Request a quote",
      },
    ],
  };
}

export function articleJsonLd({
  title,
  description,
  image,
  datePublished,
  dateModified,
  path,
  inLanguage,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  path: string;
  inLanguage?: string;
}) {
  const url = absoluteUrl(path);
  const orgName = siteNameFor(inLanguage === "zh" ? "zh" : "en");
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: absoluteUrl(image),
    datePublished,
    dateModified: dateModified ?? datePublished,
    ...(inLanguage ? { inLanguage } : {}),
    author: {
      "@type": "Organization",
      "@id": organizationId,
      name: orgName,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      "@id": organizationId,
      name: orgName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(logoSrc),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
