// Application detail page content, extracted from the old per-division pages so
// the localized catch-all renderer can consume it. English base; translations
// merge over this in the data-i18n layer (Stage 5).

export type ApplicationDetail = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  description: string;
  benefits: string[];
  products: { name: string; key: ProductRef }[];
  relatedIndustries: string[];
};

// A product link target expressed in route-manifest terms so the renderer can
// build localized hrefs. Either a category page or a product detail page.
export type ProductRef =
  | { division: "carbon" | "glass"; category: string }
  | { division: "carbon" | "glass"; category: string; product: string };

export const carbonApplicationDetails: Record<string, ApplicationDetail> = {
  aerospace: {
    title: "Aerospace & Aviation",
    metaTitle: "Carbon Fiber for Aerospace & Aviation | ZeYuSen Fiber",
    metaDescription:
      "High-performance carbon fiber composites for aerospace structural components, interior panels, and lightweight aviation solutions.",
    headline: "Engineered for the Skies",
    description:
      "The aerospace industry demands materials that combine exceptional strength with minimal weight. Our carbon fiber solutions are specifically engineered for aircraft structural components, satellite systems, UAV frames, and interior cabin panels.",
    benefits: [
      "Ultra-lightweight: up to 70% lighter than aluminum alloys",
      "Exceptional fatigue resistance for extended service life",
      "High temperature stability up to 300°C",
      "Excellent vibration damping properties",
      "Corrosion-free performance in extreme environments",
      "Custom weight specifications from 10g/m² to 600g/m²",
    ],
    products: [
      { name: "Carbon Fiber Surface Mat 10g", key: { division: "carbon", category: "carbon-fiber-mat", product: "surface-mat-10g" } },
      { name: "Carbon Fiber Needled Mat", key: { division: "carbon", category: "carbon-fiber-mat", product: "nickel-plated-mat" } },
      { name: "Carbon-Glass Hybrid Cloth", key: { division: "carbon", category: "carbon-fiber-cloth" } },
    ],
    relatedIndustries: ["military-defense", "new-energy"],
  },
  "military-defense": {
    title: "Military & Defense",
    metaTitle: "Carbon Fiber for Military & Defense Applications | ZeYuSen Fiber",
    metaDescription:
      "Specialized carbon fiber materials for EMI shielding, ballistic protection, and stealth applications.",
    headline: "Protection Through Innovation",
    description:
      "Modern defense systems require materials that provide electromagnetic shielding, structural integrity, and stealth capabilities. Our nickel-plated carbon fiber mats deliver superior EMI/RFI protection while maintaining lightweight profiles.",
    benefits: [
      "Superior EMI/RFI shielding effectiveness (60-90 dB)",
      "Lightweight ballistic protection solutions",
      "Radar-absorbing material (RAM) capabilities",
      "Chemical and corrosion resistance",
      "High impact strength and damage tolerance",
      "Custom specifications for classified applications",
    ],
    products: [
      { name: "Nickel-Plated Carbon Fiber Mat", key: { division: "carbon", category: "carbon-fiber-mat", product: "nickel-plated-mat" } },
      { name: "Carbon Fiber Composite Mat", key: { division: "carbon", category: "carbon-fiber-mat" } },
      { name: "Carbon Fiber Surface Mat 10g", key: { division: "carbon", category: "carbon-fiber-mat", product: "surface-mat-10g" } },
    ],
    relatedIndustries: ["aerospace", "new-energy"],
  },
  "new-energy": {
    title: "New Energy",
    metaTitle: "Carbon Fiber for Fuel Cells & Energy Storage | ZeYuSen Fiber",
    metaDescription:
      "Advanced carbon fiber materials for hydrogen fuel cell GDL, battery separators, and energy storage systems.",
    headline: "Powering Tomorrow's Energy",
    description:
      "The transition to clean energy demands advanced materials with exceptional electrical conductivity and chemical stability. Our ultra-thin carbon fiber mats serve as gas diffusion layers (GDL) in hydrogen fuel cells and separators in advanced batteries.",
    benefits: [
      "Optimized porosity for gas diffusion layer applications",
      "Excellent electrical conductivity (< 5 mΩ·cm²)",
      "Chemical stability in acidic and alkaline environments",
      "Ultra-thin options from 10g/m² for fuel cell applications",
      "Consistent thickness uniformity (±5%)",
      "Scalable production for commercial energy systems",
    ],
    products: [
      { name: "Carbon Fiber Surface Mat 10g", key: { division: "carbon", category: "carbon-fiber-mat", product: "surface-mat-10g" } },
      { name: "Carbon Fiber Surface Mat 20g", key: { division: "carbon", category: "carbon-fiber-mat", product: "surface-mat-20g" } },
      { name: "Carbon-Glass Hybrid Mat", key: { division: "carbon", category: "carbon-fiber-mat" } },
    ],
    relatedIndustries: ["aerospace", "military-defense"],
  },
};

export const glassApplicationDetails: Record<string, ApplicationDetail> = {
  "wind-energy": {
    title: "Wind Energy",
    metaTitle: "Fiberglass for Wind Energy & Turbine Blades | ZeYuSen Fiber",
    metaDescription:
      "High-performance fiberglass reinforcements for wind turbine blades, nacelle covers, and structural components.",
    headline: "Reinforcing Renewable Power",
    description:
      "Wind energy is one of the fastest-growing sectors in renewable power generation, and fiberglass composites are at the heart of turbine blade manufacturing. Our multiaxial fabrics and composite mats are specifically engineered for blade production.",
    benefits: [
      "Multiaxial fabrics optimized for blade spar caps and shells",
      "Excellent fatigue resistance for 20+ year service life",
      "Superior resin infusion characteristics for void-free laminates",
      "Consistent fiber distribution for predictable mechanical properties",
      "Compatible with epoxy, polyester, and vinyl ester resin systems",
      "Available in weights from 300g/m² to 1200g/m²",
    ],
    products: [
      { name: "Multiaxial Fabric", key: { division: "glass", category: "fiberglass-cloth" } },
      { name: "Unidirectional Fabric", key: { division: "glass", category: "fiberglass-cloth" } },
      { name: "Stitched Composite Mat", key: { division: "glass", category: "composite-mat" } },
    ],
    relatedIndustries: ["construction"],
  },
  construction: {
    title: "Construction",
    metaTitle: "Fiberglass for Construction & Building Materials | ZeYuSen Fiber",
    metaDescription:
      "Durable fiberglass materials for roofing, waterproofing, insulation, and structural reinforcement in construction.",
    headline: "Building Stronger Foundations",
    description:
      "The construction industry relies on fiberglass materials for waterproofing membranes, roofing systems, pipe insulation, and structural reinforcement. Our tissue mats provide excellent surface quality for SBS/APP modified bitumen membranes.",
    benefits: [
      "Excellent dimensional stability under thermal cycling",
      "Superior bonding with bitumen and polymer-modified systems",
      "Alkali-resistant options for concrete reinforcement",
      "Lightweight yet high-strength for structural applications",
      "UV and moisture resistant for exterior applications",
      "Fire-retardant grades available (Class A rating)",
    ],
    products: [
      { name: "Surface Tissue Mat", key: { division: "glass", category: "tissue-mat", product: "surface-tissue" } },
      { name: "Chopped Strand Mat", key: { division: "glass", category: "chopped-strand-mat" } },
      { name: "Woven Roving", key: { division: "glass", category: "fiberglass-cloth" } },
    ],
    relatedIndustries: ["wind-energy"],
  },
};

export function getApplicationDetail(division: "carbon" | "glass", slug: string) {
  return division === "carbon"
    ? carbonApplicationDetails[slug]
    : glassApplicationDetails[slug];
}
