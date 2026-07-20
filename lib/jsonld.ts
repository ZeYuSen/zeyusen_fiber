import { absoluteUrl, siteConfig } from "./seo";
import { contactInfo } from "./contact";

const logoSrc = "/logo.png?v=logo-20260626";

export function websiteJsonLd(url: string = absoluteUrl("/"), inLanguage?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url,
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

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Manufacturer"],
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    legalName: contactInfo.company,
    url: absoluteUrl("/"),
    logo: absoluteUrl(logoSrc),
    description:
      "Carbon fiber and glass fiber composite materials manufacturer for aerospace, wind energy, construction, transportation, and advanced manufacturing.",
    foundingDate: contactInfo.foundingDate,
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
}: {
  name: string;
  description: string;
  image: string;
  category: string;
  path: string;
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
      name: "ZeYuSen Fiber",
    },
    manufacturer: {
      "@type": "Organization",
      name: "ZeYuSen Fiber",
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
      name: "ZeYuSen Fiber",
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: "ZeYuSen Fiber",
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
