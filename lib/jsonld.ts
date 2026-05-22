import { absoluteUrl } from "./seo";
import { contactInfo } from "./contact";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZeYuSen Fiber",
    legalName: contactInfo.company,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    description:
      "Carbon fiber and glass fiber composite materials manufacturer for aerospace, wind energy, construction, transportation, and advanced manufacturing.",
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address,
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contactInfo.phones[0],
      email: contactInfo.emails[0],
      contactType: "sales",
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
    manufacturer: {
      "@type": "Organization",
      name: "ZeYuSen Fiber",
      url: absoluteUrl("/"),
    },
  };
}

export function articleJsonLd({
  title,
  description,
  image,
  datePublished,
  path,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: absoluteUrl(image),
    datePublished,
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
        url: absoluteUrl("/logo.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(path),
  };
}
