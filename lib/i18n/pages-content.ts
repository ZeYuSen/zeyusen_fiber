import type { Locale } from "./config";
import { defaultLocale } from "./config";

// Client-safe localized copy for the About / Services / Contact pages
// (these are "use client" components that read it via useLocale()).

export type AboutContent = {
  eyebrow: string;
  title: string;
  lead: string;
  story1: string;
  story2: { pre: string; carbonLink: string; mid: string; glassLink: string; post: string };
  story3: { pre: string; servicesLink: string; post: string };
  quickStats: { num: string; label: string }[];
  values: { title: string; description: string }[];
  whyEyebrow: string;
  whyTitle: string;
  journeyEyebrow: string;
  journeyTitle: string;
  milestones: { year: string; event: string }[];
  factory: {
    eyebrow: string;
    title: string;
    intro: string;
    tabs: { production: string; inspection: string; testing: string; exhibition: string };
    stats: { num: string; unit: string; label: string }[];
  };
};

export type ServicesContent = {
  eyebrow: string;
  title: string;
  lead1: string;
  lead2: { pre: string; carbonLink: string; mid: string; glassLink: string; post: string };
  servicesHeading: string;
  services: { title: string; description: string; features: string[] }[];
  processEyebrow: string;
  processTitle: string;
  steps: { title: string; desc: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  lead: string;
  labels: {
    name: string;
    email: string;
    company: string;
    country: string;
    phone: string;
    interestedIn: string;
    productInterest: string;
    message: string;
  };
  placeholders: {
    name: string;
    email: string;
    company: string;
    country: string;
    phone: string;
    productInterest: string;
    message: string;
  };
  divisionOptions: { general: string; carbon: string; glass: string };
  sending: string;
  submit: string;
  success: string;
  error: string;
  contactInfoHeading: string;
  companyLabel: string;
  emailLabel: string;
  phoneLabel: string;
  addressLabel: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  fasterHeading: string;
  fasterIntro: string;
  fasterList: string[];
  fasterOutro: string;
};

export type PagesContent = {
  about: AboutContent;
  services: ServicesContent;
  contact: ContactContent;
};

const en: PagesContent = {
  about: {
    eyebrow: "About Us",
    title: "Composite Materials Expert Since 2015",
    lead: "is a comprehensive enterprise integrating R&D, production, and sales of high-performance carbon fiber and fiberglass composite materials, based in Nantong, Jiangsu Province, China.",
    story1:
      "Founded in September 2015, ZeYuSen Fiber operates from dual production bases in Nantong and Taizhou, Jiangsu Province, with technical partnerships with the Chinese Academy of Sciences, China Southern Glass Institute, and multiple universities.",
    story2: {
      pre: "Our product portfolio spans from ultra-thin 10g/m² ",
      carbonLink: "carbon fiber surface mats",
      mid: " to heavy-duty 1200g/m² ",
      glassLink: "multiaxial composite reinforcements",
      post: ". We serve customers across wind energy, aerospace, construction, automotive, military, hydrogen fuel cells, and new energy sectors worldwide. Full customization of weight, width, binder type, and fiber orientation is available.",
    },
    story3: {
      pre: "With 10% of our staff dedicated to R&D and two research centers, we combine wet-laid, dry-laid, and weaving processes to deliver ",
      servicesLink: "diversified solutions and customization services",
      post: " for complex composite applications.",
    },
    quickStats: [
      { num: "15+", label: "Years Experience" },
      { num: "50+", label: "Export Countries" },
      { num: "7", label: "Product Lines" },
      { num: "100%", label: "Custom Support" },
    ],
    values: [
      { title: "R&D & Customization", description: "Two R&D centers with 10% technical staff. 7+ years of composite material development experience with 13 utility model patents." },
      { title: "Quality Certified", description: "ISO 9001, ISO 14001, ISO 45001 certified. Intellectual Property Management System certified. SGS testing reports available." },
      { title: "Reliable & Diversified", description: "Multiple production processes (wet-laid, dry-laid, weaving) across dual production bases for stable, scalable output." },
      { title: "Fast Delivery & Support", description: "240 km to Shanghai Port. Dedicated technical engineers for process consulting. FOB, CIF, DDP trade terms supported." },
    ],
    whyEyebrow: "Why Choose Us",
    whyTitle: "Built on Trust & Precision",
    journeyEyebrow: "Our Journey",
    journeyTitle: "Milestones",
    milestones: [
      { year: "2015", event: "Company founded in Nantong, Jiangsu Province" },
      { year: "2016", event: "First production line operational, fiberglass tissue mat" },
      { year: "2018", event: "Expanded into carbon fiber product line" },
      { year: "2019", event: "Achieved ISO 9001 / ISO 14001 / ISO 45001 certification" },
      { year: "2020", event: "Second production base established in Taizhou" },
      { year: "2022", event: "13 utility model patents granted" },
      { year: "2023", event: "Annual output: carbon fiber 10M sqm, fiberglass 80M sqm" },
      { year: "2024", event: "Reached 50+ export destinations worldwide" },
    ],
    factory: {
      eyebrow: "Factory Tour",
      title: "Our Manufacturing Facility",
      intro:
        "80,000 m² standardized factory across two production bases in Nantong and Taizhou, equipped with automated production lines, advanced testing equipment, and dedicated R&D centers.",
      tabs: {
        production: "Production Lines",
        inspection: "Inspection Equipment",
        testing: "Process Testing",
        exhibition: "Exhibitions",
      },
      stats: [
        { num: "80,000", unit: "m²", label: "Factory Area" },
        { num: "13,000", unit: "m²", label: "Land Area" },
        { num: "240", unit: "km", label: "To Shanghai Port" },
        { num: "2", unit: "", label: "Production Bases" },
      ],
    },
  },
  services: {
    eyebrow: "Services",
    title: "Our Services",
    lead1:
      "From custom R&D to fast global delivery — a complete service ecosystem built around your success.",
    lead2: {
      pre: "Whether you are validating a sample, qualifying a new supplier, or scaling a repeat order, the service workflow is built to reduce technical uncertainty and speed up procurement decisions across our ",
      carbonLink: "carbon fiber",
      mid: " and ",
      glassLink: "glass fiber",
      post: " product lines.",
    },
    servicesHeading: "Service Capabilities",
    services: [
      { title: "OEM/ODM Customization", description: "One-stop OEM/ODM solutions tailored to your exact specifications.", features: ["Custom color options (black, blue, yellow, green, etc.)", "Material composition customization", "Performance parameter tuning", "Custom width and roll length"] },
      { title: "R&D & Technical Support", description: "Expert technical guidance from material selection to process optimization.", features: ["Product consultation & material selection", "Technical solution recommendations", "Process optimization consulting", "On-site technical training available"] },
      { title: "Quality Assurance", description: "Rigorous quality control at every stage, certified to international standards.", features: ["ISO 9001 Quality Management", "ISO 14001 Environmental Management", "ISO 45001 Occupational Health & Safety", "Multiple patented products"] },
      { title: "Dedicated Order Management", description: "A dedicated expert team follows your order from placement to delivery.", features: ["Dedicated project manager", "Real-time production updates", "Transparent communication", "Flexible order adjustments"] },
      { title: "Logistics & Fast Delivery", description: "Dual manufacturing bases, 240km from Shanghai Port for efficient export.", features: ["Dual production base (Nantong + Taizhou)", "240km from Shanghai Port", "Fast delivery commitment", "Flexible shipping terms (FOB/CIF/DDP)"] },
      { title: "After-sales Service", description: "Ongoing technical support and quality guarantees beyond delivery.", features: ["Comprehensive quality guarantee", "Ongoing technical support", "Fast response to concerns", "Long-term partnership approach"] },
    ],
    processEyebrow: "Process",
    processTitle: "How We Work With You",
    steps: [
      { title: "Inquiry", desc: "Tell us your requirements, application, and target specs." },
      { title: "Solution", desc: "Our engineers recommend the optimal material and provide samples." },
      { title: "Production", desc: "Dedicated team manages your order with real-time updates." },
      { title: "Delivery", desc: "Fast global shipping from our export-ready facilities." },
    ],
    ctaTitle: "Ready to Start Your Project?",
    ctaBody: "Whether you need a custom formulation or a standard product in bulk, our team is ready to help.",
    ctaButton: "Get a Free Quote",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in Touch",
    lead: "Tell us about your project requirements and our team will respond within 24 hours with a tailored solution.",
    labels: {
      name: "Name *",
      email: "Email *",
      company: "Company",
      country: "Country",
      phone: "Phone",
      interestedIn: "Interested In",
      productInterest: "Product of Interest",
      message: "Message *",
    },
    placeholders: {
      name: "Your name",
      email: "your@email.com",
      company: "Company name",
      country: "Your country",
      phone: "+1 234 567 890",
      productInterest: "e.g., Carbon Fiber Surface Mat 10g",
      message: "Tell us about your requirements, quantities, and application...",
    },
    divisionOptions: {
      general: "General Inquiry",
      carbon: "Carbon Fiber Products",
      glass: "Glass Fiber Products",
    },
    sending: "Sending...",
    submit: "Send Inquiry",
    success: "Thank you! We'll respond within 24 hours.",
    error: "Something went wrong. Please try again or contact us via WhatsApp.",
    contactInfoHeading: "Contact Info",
    companyLabel: "Company",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    faqHeading: "FAQ",
    faqs: [
      { q: "What is the MOQ?", a: "MOQ varies by product. Generally 100-500 sqm for standard items." },
      { q: "Can I get samples?", a: "Yes, we provide free samples for evaluation. Shipping cost may apply." },
      { q: "Lead time?", a: "Standard products: 7-15 days. Custom orders: 15-30 days." },
    ],
    fasterHeading: "For Faster Quoting",
    fasterIntro: "Include the product format, target GSM, resin system, width, estimated order volume, and application. That gives the team enough context to recommend the right sample or prepare a faster commercial reply.",
    fasterList: [
      "Product family or exact material name",
      "Application or end-use industry",
      "Target weight, width, or construction",
      "Sample need, MOQ expectation, and timeline",
    ],
    fasterOutro: "If you already have a drawing, laminate schedule, or supplier benchmark, mention it in the message field. That usually leads to a more precise first reply and reduces follow-up rounds.",
  },
};

import { ko } from "./pages-content.ko";
import { zh } from "./pages-content.zh";
import { es } from "./pages-content.es";
import { pt } from "./pages-content.pt";

const content: Record<Locale, PagesContent> = { en, zh, ko, es, pt };

export function getPagesContent(locale: Locale): PagesContent {
  return content[locale] ?? content[defaultLocale];
}

export { en as enPagesContent };
