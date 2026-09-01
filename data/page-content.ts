import type { Locale } from "@/lib/i18n/config";
import { defaultLocale } from "@/lib/i18n/config";

// Page-level copy + SEO metadata that is NOT part of the reusable UI dictionary
// and NOT data-driven (products/blog). One English base; ko/es/pt overrides are
// merged on top (missing keys fall back to English).

export type SeoMeta = { title: string; description: string };

export type PageContent = {
  seo: Record<string, SeoMeta>;
  divisionHome: {
    carbon: DivisionHomeCopy;
    glass: DivisionHomeCopy;
  };
  catalog: {
    carbon: CatalogCopy;
    glass: CatalogCopy;
  };
  applications: {
    eyebrow: string;
    title: string;
    intro: string;
    fieldsSuffix: string;
    hubTitle: string;
    hubParagraphs: string[];
    viewDetails: string;
    requestGuidance: string;
    imageNote: string;
  };
  divisionFaq: {
    carbon: { question: string; answer: string }[];
    glass: { question: string; answer: string }[];
  };
  legal: {
    privacy: LegalCopy;
    terms: LegalCopy;
  };
};

type DivisionHomeCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  categoriesLabel: string;
  chooseTitle: string;
  chooseParagraphs: string[];
  ctaTitle: string;
  ctaBody: string;
};

type CatalogCopy = {
  breadcrumbDivision: string;
  title: string;
  intro: string;
  body: string;
  closingTitle: string;
  closingBody: string;
};

type LegalCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  contactHeading: string;
  contactPrefix: string;
};

const en: PageContent = {
  seo: {
    home: {
      title: "Carbon Fiber Mat, Fiberglass Mat & Rotor Paper Manufacturer",
      description:
        "OEM manufacturer of carbon fiber mats, fiberglass tissue mats and veils, and desiccant rotor forming paper for composite, battery and dehumidification applications.",
    },
    about: {
      title: "About Our Composite Manufacturing",
      description:
        "Learn about ZeYuSen Fiber's manufacturing footprint, composite material capabilities, quality systems, and global supply support.",
    },
    services: {
      title: "Composite Material Services & OEM Support",
      description:
        "Explore OEM and ODM customization, technical support, quality assurance, export logistics, and after-sales support for composite material projects.",
    },
    contact: {
      title: "Contact Our Composite Materials Team",
      description:
        "Contact ZeYuSen Fiber for product inquiries, samples, quotations, technical support, and custom carbon fiber or fiberglass solutions.",
    },
    "blog-index": {
      title: "Carbon Mat, Fiberglass Mat & Rotor Paper Guides",
      description:
        "Read practical guides on carbon fiber mats, fiberglass tissue mats, desiccant rotor forming paper, material selection, receiving and industrial applications.",
    },
    "carbon-fiber": {
      title: "Carbon Fiber Mat Manufacturer",
      description:
        "Source carbon fiber surface mats, nickel-plated mats, composite mats, needled mats and fuel-cell GDL mats for functional and industrial composite applications.",
    },
    "carbon-products": {
      title: "Carbon Fiber Mat Catalog",
      description:
        "Compare carbon fiber surface, conductive, composite, needled and fuel-cell GDL mats with technical data for industrial sourcing.",
    },
    "glass-fiber": {
      title: "Fiberglass Mat and Rotor Paper Manufacturer",
      description:
        "Source fiberglass tissue mats and veils, application-specific glass mats, and desiccant rotor forming paper for construction, battery and dehumidification use.",
    },
    "glass-products": {
      title: "Fiberglass Mat and Specialty Paper Catalog",
      description:
        "Browse fiberglass surface, colored, roofing, wall-covering, pipe-wrapping and battery mats plus desiccant rotor forming paper.",
    },
    applications: {
      title: "Carbon Fiber Mat Application Guide",
      description:
        "Explore carbon fiber mat use cases across surface finishing, EMI shielding, fuel cells, pultrusion and advanced manufacturing.",
    },
    "applications-glass": {
      title: "Fiberglass Mat and Rotor Paper Applications",
      description:
        "Explore fiberglass mat applications in surface finishing, roofing, wall covering, pipe wrapping, battery separators and desiccant rotors.",
    },
    privacy: {
      title: "Privacy Policy",
      description:
        "Read how ZeYuSen Fiber handles inquiry information, contact details, and business communication data submitted through this website.",
    },
    terms: {
      title: "Website Terms of Service",
      description:
        "Review the website terms covering product information, quotation requests, business communication, and acceptable use of ZeYuSen Fiber content.",
    },
  },
  divisionHome: {
    carbon: {
      eyebrow: "Carbon Fiber Division",
      title: "Carbon Fiber Mats for Functional Composite Layers",
      intro:
        "Carbon fiber surface, conductive, composite, needled and fuel-cell GDL mats for functional layers and industrial composite processes.",
      categoriesLabel: "Product Categories",
      chooseTitle: "How to Choose the Right Carbon Fiber Format",
      chooseParagraphs: [
        "Buyers usually narrow carbon mat selection by process first, then by functional target. Surface mats support conductivity, finish quality and thin functional layers, while composite and needled mats suit heavier reinforcement or process-specific builds.",
        "If you are sourcing for fuel cells, EMI shielding, pultrusion, or lightweight structural parts, the fastest path is to match the target process, required GSM, and resin compatibility before comparing sample rolls.",
        "Share the target areal weight, width, resin system, electrical requirement and validation method so sampling can answer both technical fit and supply feasibility.",
      ],
      ctaTitle: "Need a Custom Carbon Fiber Solution?",
      ctaBody: "Our engineers can recommend the optimal material for your application.",
    },
    glass: {
      eyebrow: "Glass Fiber Division",
      title: "Fiberglass Mats and Desiccant Rotor Forming Paper",
      intro:
        "Wet-laid fiberglass mats and veils for surface, roofing, wall, pipe and battery applications, plus forming paper for desiccant rotors.",
      categoriesLabel: "Product Categories",
      chooseTitle: "How to Choose the Right Fiberglass Material",
      chooseParagraphs: [
        "Fiberglass mat selection is driven by the substrate, surface or barrier role, target basis weight, binder system, porosity and downstream forming process.",
        "For desiccant rotor forming paper, include the rotor process, target thickness and basis weight, impregnation or coating stage, width, roll format and validation requirements.",
      ],
      ctaTitle: "Looking for Custom Glass Fiber Solutions?",
      ctaBody:
        "We offer custom weights, widths, and binder formulations to match your process.",
    },
  },
  catalog: {
    carbon: {
      breadcrumbDivision: "Carbon Fiber",
      title: "Carbon Fiber Products",
      intro:
        "Carbon fiber mats for surface, conductive, composite, needled and fuel-cell applications.",
      body: "Use this catalog to compare carbon fiber mats by basis weight, construction and functional role before opening individual product pages for specifications and inquiry context.",
      closingTitle: "Use This Catalog to Shortlist the Right Carbon Fiber Mat",
      closingBody:
        "Start with the functional layer and manufacturing process, then confirm target GSM, width, resin compatibility, conductivity or diffusion requirements, and the validation method on the detailed product page.",
    },
    glass: {
      breadcrumbDivision: "Glass Fiber",
      title: "Fiberglass Mats and Desiccant Rotor Paper",
      intro:
        "Fiberglass tissue mats, application-specific veils and desiccant rotor forming paper for industrial buyers.",
      body: "Compare fiberglass surface, colored, roofing, wall-covering, pipe-wrapping and battery mats alongside desiccant rotor forming paper before opening a product page.",
      closingTitle: "Use This Catalog to Shortlist the Right Fiberglass Mat or Paper",
      closingBody:
        "Start with the end-use layer and downstream process, then confirm basis weight, thickness, width, binder, porosity and roll requirements with our team.",
    },
  },
  applications: {
    eyebrow: "Applications",
    title: "Applications by Industry",
    intro:
      "Carbon fiber and glass fiber solve different engineering problems. Start with the material family, then review the industries, recommended products, and available solution paths.",
    fieldsSuffix: "application fields",
    hubTitle: "Use This Hub to Match Material, Process, and End Use",
    hubParagraphs: [
      "These application pages are designed for procurement teams, engineers, and composite manufacturers comparing material families before requesting samples. Start with the use case, then move into the matching product category so your quote request is grounded in a real process requirement rather than a generic material name.",
      "If your project spans multiple processes or you are deciding between carbon fiber and fiberglass, open the product catalog from the selected material family and compare weights, constructions, and likely application fit before contacting the team.",
    ],
    viewDetails: "View application details",
    requestGuidance: "Request application guidance",
    imageNote: "industry application reference image",
  },
  divisionFaq: {
    carbon: [
      {
        question: "What types of carbon fiber materials does ZeYuSen offer?",
        answer:
          "ZeYuSen focuses on carbon fiber surface mats (10g-30g/m²), nickel-plated mats, composite mats, needled mats and carbon fiber mats for fuel-cell gas diffusion layers.",
      },
      {
        question: "What industries use ZeYuSen carbon fiber products?",
        answer:
          "Our carbon fiber mats are evaluated for fuel-cell gas diffusion layers, EMI/RFI shielding, electric heating, pultrusion, and composite surface layers.",
      },
      {
        question: "Can ZeYuSen provide custom carbon fiber specifications?",
        answer:
          "Published carbon mat grades span 10g/m² to 350g/m². Width, binder, roll format, and other project-specific requirements are subject to technical review and sample validation.",
      },
    ],
    glass: [
      {
        question: "What types of glass fiber materials does ZeYuSen offer?",
        answer:
          "ZeYuSen focuses on wet-laid fiberglass tissue mats and veils for surface, roofing, wall covering, pipe wrapping and battery applications, plus desiccant rotor forming paper.",
      },
      {
        question: "What applications are glass fiber materials used for?",
        answer:
          "Our fiberglass mats are used in composite surface layers, roofing membranes, wall coverings, pipe wrapping and battery separators. Our specialty glass-fiber paper is used to form desiccant and molecular-sieve rotors.",
      },
      {
        question: "What resin systems are compatible with ZeYuSen glass fiber?",
        answer:
          "Our glass fiber materials are compatible with epoxy, polyester, vinyl ester, and phenolic resin systems, with optimized sizing for each resin type.",
      },
    ],
  },
  legal: {
    privacy: {
      eyebrow: "Legal",
      title: "Privacy Policy",
      intro:
        "ZeYuSen Fiber collects only the information needed to respond to product inquiries, quotation requests, technical questions, and business communication submitted through this website.",
      sections: [
        {
          heading: "Information We Collect",
          body: "Inquiry forms may ask for your name, email address, company, country, phone number, product interests, and project requirements. We use this information to provide relevant material recommendations and follow-up support.",
        },
        {
          heading: "How We Use Information",
          body: "Submitted information is used for customer service, quotation handling, technical communication, and order-related follow-up. We do not sell personal information to third parties.",
        },
        {
          heading: "Retention and Protection",
          body: "Inquiry records are retained only as long as needed for ongoing business communication, quotation follow-up, sample coordination, or compliance with ordinary commercial record-keeping. We use reasonable administrative and technical measures to protect submitted data.",
        },
        {
          heading: "Cookies and Analytics",
          body: "The website may use standard analytics and performance tools to understand page usage, inquiry flow, and technical reliability. These tools are used to improve website performance and business communication rather than to build unrelated consumer advertising profiles.",
        },
      ],
      contactHeading: "Contact",
      contactPrefix: "For privacy questions or data requests, contact us at",
    },
    terms: {
      eyebrow: "Legal",
      title: "Terms of Service",
      intro:
        "This website provides general information about ZeYuSen Fiber products, applications, and services. By using the website, you agree to use the content for lawful business and informational purposes.",
      sections: [
        {
          heading: "Product Information",
          body: "Product descriptions, specifications, and application notes are provided for preliminary reference. Final suitability, technical requirements, and commercial terms should be confirmed with our team before purchase or production use.",
        },
        {
          heading: "Inquiries and Communication",
          body: "Submitting an inquiry does not create a binding order. Quotations, lead times, samples, and supply terms are confirmed separately through direct business communication.",
        },
        {
          heading: "Intellectual Property",
          body: "Website text, product photography, diagrams, and downloadable materials are provided for business evaluation and reference. Reuse, republication, or redistribution should be agreed in advance unless otherwise stated.",
        },
        {
          heading: "Commercial Confirmation",
          body: "Final pricing, shipping terms, lead times, technical tolerances, and inspection standards are confirmed in quotation documents, samples, or commercial agreements rather than inferred from website summaries alone.",
        },
      ],
      contactHeading: "Contact",
      contactPrefix: "For questions about these terms, contact us at",
    },
  },
};

// Per-locale overrides. English is the base/fallback.
import { zh } from "./page-content.zh";
import { ko } from "./page-content.ko";
import { es } from "./page-content.es";
import { pt } from "./page-content.pt";

const overrides: Partial<Record<Locale, PageContent>> = { zh, ko, es, pt };

export function getPageContent(locale: Locale): PageContent {
  if (locale === defaultLocale) return en;
  return overrides[locale] ?? en;
}

export { en as enPageContent };
