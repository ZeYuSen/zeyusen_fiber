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
      title: "ZeYuSen Fiber | Carbon Fiber & Glass Fiber Manufacturer",
      description:
        "Jiangsu Zeyusen Carbon Fiber Technology Co., Ltd. manufactures carbon fiber mats, fiberglass fabrics, composite reinforcements, and custom material solutions for aerospace, wind energy, construction, and manufacturing.",
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
      title: "Fiber Materials Blog",
      description:
        "Read practical guides on carbon fiber, fiberglass, composite material selection, wind energy, construction, and advanced manufacturing applications.",
    },
    "carbon-fiber": {
      title: "Carbon Fiber Materials Supplier",
      description:
        "Source carbon fiber mats, woven cloth, hybrid reinforcements, and raw fiber materials for aerospace, energy, defense, and industrial composite applications.",
    },
    "carbon-products": {
      title: "Carbon Fiber Catalog",
      description:
        "Browse carbon fiber mats, cloth, hybrid reinforcements, yarns, and raw material formats with technical data for composite manufacturing.",
    },
    "glass-fiber": {
      title: "Fiberglass Materials Supplier",
      description:
        "Source fiberglass tissue mats, woven fabrics, stitched reinforcements, and specialty glass fiber materials for wind energy, construction, and industrial use.",
    },
    "glass-products": {
      title: "Fiberglass Catalog",
      description:
        "Browse fiberglass tissue mats, woven cloth, composite mats, chopped strand mat, and specialty reinforcements with technical data.",
    },
    applications: {
      title: "Carbon Fiber Application Guide",
      description:
        "Explore carbon fiber use cases across aerospace, defense, new energy, motorsport, and advanced manufacturing with recommended material paths.",
    },
    "applications-glass": {
      title: "Glass Fiber Applications",
      description:
        "Explore glass fiber applications in wind energy, construction, marine, filtration, transportation, and industrial composite uses.",
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
      title: "High-Performance Carbon Fiber Materials",
      intro:
        "Lightweight, ultra-strong carbon fiber solutions for aerospace, motorsport, military defense, and advanced manufacturing industries.",
      categoriesLabel: "Product Categories",
      chooseTitle: "How to Choose the Right Carbon Fiber Format",
      chooseParagraphs: [
        "Buyers usually narrow carbon fiber selection by process first, then by performance target. Surface mats and veils support conductivity, finish quality, or thin functional layers, while woven cloth and heavier mats are more relevant when structural load, drape, and laminate buildup matter.",
        "If you are sourcing for fuel cells, EMI shielding, pultrusion, or lightweight structural parts, the fastest path is to match the target process, required GSM, and resin compatibility before comparing sample rolls.",
        "Teams evaluating multiple formats typically shortlist a functional surface layer, a structural reinforcement option, and a fallback commercial alternative so sampling can answer both technical fit and supply feasibility.",
      ],
      ctaTitle: "Need a Custom Carbon Fiber Solution?",
      ctaBody: "Our engineers can recommend the optimal material for your application.",
    },
    glass: {
      eyebrow: "Glass Fiber Division",
      title: "Reliable Glass Fiber Materials",
      intro:
        "Cost-effective, corrosion-resistant fiberglass solutions for wind energy, construction, transportation, and industrial filtration.",
      categoriesLabel: "Product Categories",
      chooseTitle: "How to Choose the Right Fiberglass Material",
      chooseParagraphs: [
        "Fiberglass selection is usually driven by laminate process, surface requirement, and target load path. Tissue mats are useful for finish and barrier layers, woven cloth supports balanced reinforcement, and stitched composite mats are better suited to structural shells, wind energy parts, and transportation panels.",
        "When requesting a quote, include the target GSM, resin system, width, and end-use environment. That narrows the material family quickly and reduces back-and-forth during sampling.",
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
        "High-performance carbon fiber materials for aerospace, motorsport, military, and advanced manufacturing.",
      body: "Use this catalog to compare carbon fiber mats, woven cloth, and raw material formats by product family before moving into individual product pages for specifications, applications, and inquiry flow.",
      closingTitle: "Use This Catalog to Shortlist the Right Carbon Fiber Format",
      closingBody:
        "Start with the product family that matches your manufacturing process, then open the detailed product page for target GSM, application fit, and inquiry context. Surface mats are usually evaluated for conductivity and finish layers, woven cloth for directional reinforcement, and raw materials for weaving, winding, and compounding workflows.",
    },
    glass: {
      breadcrumbDivision: "Glass Fiber",
      title: "Fiberglass Products",
      intro:
        "Cost-effective, corrosion-resistant fiberglass reinforcements for wind energy, construction, transportation, and industrial applications.",
      body: "Compare fiberglass tissue mats, woven cloth, stitched composite mats, and chopped strand formats by product family before opening individual product pages for specifications and inquiry flow.",
      closingTitle: "Use This Catalog to Shortlist the Right Fiberglass Material",
      closingBody:
        "Start from the product family that matches your laminate process, then open the detailed product page for target GSM, resin compatibility, and application fit. Tissue mats are evaluated for surface and barrier layers, woven cloth for balanced reinforcement, and stitched mats for structural shells.",
    },
  },
  applications: {
    eyebrow: "Applications",
    title: "Choose a Material, Then Explore the Right Industrial Use Cases",
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
  },
  divisionFaq: {
    carbon: [
      {
        question: "What types of carbon fiber materials does ZeYuSen offer?",
        answer:
          "ZeYuSen offers carbon fiber surface mats (10g-50g/m²), needled mats, nickel-plated mats for EMI shielding, woven carbon fiber cloth, carbon-glass hybrid cloth, and raw carbon fiber tow.",
      },
      {
        question: "What industries use ZeYuSen carbon fiber products?",
        answer:
          "Our carbon fiber materials serve aerospace, military defense, new energy (fuel cells), automotive, marine, and sporting goods industries.",
      },
      {
        question: "Can ZeYuSen provide custom carbon fiber specifications?",
        answer:
          "Yes, we offer custom weight specifications from 10g/m² to 600g/m², custom widths, and specialized surface treatments tailored to your application requirements.",
      },
    ],
    glass: [
      {
        question: "What types of glass fiber materials does ZeYuSen offer?",
        answer:
          "ZeYuSen offers fiberglass tissue mats, chopped strand mats, woven roving, multiaxial fabrics, stitched composite mats, and specialty surface veils for various industrial applications.",
      },
      {
        question: "What applications are glass fiber materials used for?",
        answer:
          "Our glass fiber products are used in wind turbine blades, construction waterproofing, pipe insulation, marine hulls, automotive panels, and industrial corrosion-resistant linings.",
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
