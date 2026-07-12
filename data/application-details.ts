// Application detail page content, extracted from the old per-division pages so
// the localized catch-all renderer can consume it. English base; translations
// merge over this in the data-i18n layer (Stage 5).

export type ApplicationDetail = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  description: string;
  // Industry problem framed together with the role fiber materials play.
  challenge: string;
  // Typical parts or locations where the material is used.
  components: string[];
  benefits: string[];
  // Conditions a buyer should confirm before selection (temperature, media,
  // structure, test method). Phrased as prompts, never as guaranteed values.
  selectionCriteria: string[];
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
    challenge:
      "Aircraft and aerospace structures must shed weight without giving up stiffness or fatigue life. Carbon fiber reinforcement lets design teams replace metal in load-bearing and secondary structures, cutting mass while keeping the mechanical margins the airframe requires.",
    components: [
      "Structural panels and stiffeners",
      "Satellite and UAV frames",
      "Interior cabin and trim panels",
      "Surface layers for a smooth composite finish",
    ],
    benefits: [
      "High strength-to-weight potential for lightweight composite structures",
      "Fatigue-resistant reinforcement options for repeated-load components",
      "Material grades can be screened against project temperature requirements",
      "Fiber architectures available for vibration-sensitive structures",
      "Corrosion-resistant reinforcement options for demanding environments",
      "Custom areal weights from 10g/m² to 600g/m², subject to technical confirmation",
    ],
    selectionCriteria: [
      "Structural loads and the target strength-to-weight envelope",
      "Service temperature range and the resin system in use",
      "Fiber architecture and areal weight for each laminate",
      "Applicable qualification and test standards for sign-off",
    ],
    products: [
      { name: "Carbon Fiber Surface Mat 10g", key: { division: "carbon", category: "carbon-fiber-mat", product: "surface-mat-10g" } },
      { name: "Carbon Fiber Needled Mat", key: { division: "carbon", category: "carbon-fiber-mat", product: "needled-mat" } },
      { name: "Carbon-Glass Hybrid Cloth", key: { division: "carbon", category: "carbon-fiber-cloth" } },
    ],
    relatedIndustries: ["military-defense", "new-energy"],
  },
  motorsport: {
    title: "Motorsport & Automotive",
    metaTitle: "Carbon Fiber for Motorsport & Automotive | ZeYuSen Fiber",
    metaDescription:
      "High-performance carbon fiber cloth and reinforcements for body panels, structural components, and lightweight automotive parts.",
    headline: "Lightweight Performance on the Road and Track",
    description:
      "Motorsport and performance automotive programs use carbon fiber to reduce mass, sharpen response, and stiffen key structures. Our woven cloth and reinforcement formats support body panels, monocoque sections, and visible-finish components.",
    challenge:
      "Every kilogram removed from a vehicle improves acceleration, braking, and handling. Carbon fiber reinforcement replaces heavier metal and glass parts with stiff, low-mass laminates, while woven finishes also serve the visual identity buyers expect on premium parts.",
    components: [
      "Body panels and aero components",
      "Monocoque and chassis reinforcements",
      "Interior trim and visible-weave surfaces",
      "Brackets and structural stiffeners",
    ],
    benefits: [
      "High-stiffness reinforcement options for weight-sensitive parts",
      "Woven cloth formats for controlled surface and finish quality",
      "Hybrid carbon-glass constructions for balanced cost and performance",
      "Twill and plain weaves for different drape and appearance needs",
      "Compatible with common epoxy prepreg and infusion processes",
      "Custom widths and weave styles subject to technical confirmation",
    ],
    selectionCriteria: [
      "Whether the part is structural, cosmetic, or both",
      "Target stiffness and weight budget for the component",
      "Weave style and finish expectations for visible surfaces",
      "Molding process — prepreg, infusion, or wet layup",
    ],
    products: [
      { name: "Carbon-Glass Hybrid Woven Cloth", key: { division: "carbon", category: "carbon-fiber-cloth", product: "hybrid-woven-cloth" } },
      { name: "Carbon Fiber Twill Cloth", key: { division: "carbon", category: "carbon-fiber-cloth", product: "twill-cloth" } },
      { name: "Carbon Fiber Plain Cloth", key: { division: "carbon", category: "carbon-fiber-cloth", product: "plain-cloth" } },
    ],
    relatedIndustries: ["aerospace", "manufacturing"],
  },
  "new-energy": {
    title: "New Energy",
    metaTitle: "Carbon Fiber for Fuel Cells & Energy Storage | ZeYuSen Fiber",
    metaDescription:
      "Advanced carbon fiber materials for hydrogen fuel cell GDL, battery separators, and energy storage systems.",
    headline: "Powering Tomorrow's Energy",
    description:
      "The transition to clean energy demands advanced materials with exceptional electrical conductivity and chemical stability. Our ultra-thin carbon fiber mats serve as gas diffusion layers (GDL) in hydrogen fuel cells and separators in advanced batteries.",
    challenge:
      "Fuel cells and advanced batteries need conductive, chemically stable layers that stay consistent across large production volumes. Thin carbon fiber mats provide the porous, conductive structure these electrochemical systems rely on for gas diffusion and current collection.",
    components: [
      "Gas diffusion layers in hydrogen fuel cells",
      "Conductive layers in energy storage devices",
      "Electrode and separator support structures",
      "Thin functional layers requiring controlled porosity",
    ],
    benefits: [
      "Porosity can be tailored for gas diffusion layer evaluation",
      "Conductivity targets confirmed by grade and agreed test method",
      "Chemical compatibility should be validated against the operating environment",
      "Ultra-thin options from 10g/m² for fuel cell applications",
      "Thickness tolerance confirmed in the agreed product specification",
      "Pilot samples and scalable supply for qualification programs",
    ],
    selectionCriteria: [
      "Operating chemistry and the media the layer contacts",
      "Target porosity, thickness, and conductivity behaviour",
      "Test methods used to verify electrical performance",
      "Volume ramp from pilot samples to production supply",
    ],
    products: [
      { name: "Carbon Fiber Surface Mat 10g", key: { division: "carbon", category: "carbon-fiber-mat", product: "surface-mat-10g" } },
      { name: "Carbon Fiber Surface Mat 20g", key: { division: "carbon", category: "carbon-fiber-mat", product: "surface-mat-20g" } },
      { name: "Carbon-Glass Hybrid Mat", key: { division: "carbon", category: "carbon-fiber-mat" } },
    ],
    relatedIndustries: ["aerospace", "military-defense"],
  },
  "military-defense": {
    title: "Military & Defense",
    metaTitle: "Carbon Fiber for Military & Defense Applications | ZeYuSen Fiber",
    metaDescription:
      "Specialized carbon fiber materials for EMI shielding, ballistic protection, and stealth applications.",
    headline: "Protection Through Innovation",
    description:
      "Modern defense systems require materials that provide electromagnetic shielding, structural integrity, and stealth capabilities. Our nickel-plated carbon fiber mats deliver conductive shielding options while maintaining lightweight profiles.",
    challenge:
      "Defense platforms combine strict weight limits with electromagnetic and durability demands. Conductive carbon fiber mats and reinforcements give engineers a lightweight route to shielding and structural protection that can be tuned to each program's test regime.",
    components: [
      "EMI/RFI shielding layers in enclosures",
      "Lightweight protective structural panels",
      "Antenna and radar-adjacent components",
      "Reinforcements for portable equipment housings",
    ],
    benefits: [
      "Conductive nickel-plated options for EMI/RFI shielding evaluation",
      "Lightweight reinforcement formats for protective structures",
      "Materials available for radar and electromagnetic compatibility research",
      "Chemical and corrosion resistance",
      "Project-specific impact and durability testing can be coordinated",
      "Custom specifications subject to application review and sample validation",
    ],
    selectionCriteria: [
      "Whether the priority is shielding, structure, or both",
      "Electromagnetic test method and frequency range of interest",
      "Environmental exposure and durability requirements",
      "Documentation and validation needed for program sign-off",
    ],
    products: [
      { name: "Nickel-Plated Carbon Fiber Mat", key: { division: "carbon", category: "carbon-fiber-mat", product: "nickel-plated-mat" } },
      { name: "Carbon Fiber Composite Mat", key: { division: "carbon", category: "carbon-fiber-mat" } },
      { name: "Carbon Fiber Surface Mat 10g", key: { division: "carbon", category: "carbon-fiber-mat", product: "surface-mat-10g" } },
    ],
    relatedIndustries: ["aerospace", "new-energy"],
  },
  manufacturing: {
    title: "High-end Manufacturing",
    metaTitle: "Carbon Fiber for Advanced Manufacturing | ZeYuSen Fiber",
    metaDescription:
      "Premium carbon fiber mats, needled mats, and chopped fiber for pultrusion, mold making, and advanced composite manufacturing.",
    headline: "Materials for Advanced Composite Production",
    description:
      "Composite manufacturers use carbon fiber in pultrusion, molding, and tooling to build stiff, dimensionally stable parts. Our composite mats, needled mats, and short-cut fiber support consistent processing across production runs.",
    challenge:
      "Production composite processes need reinforcements that feed consistently and cure predictably, run after run. Carbon fiber mats and chopped fiber give manufacturers repeatable handling and mechanical behaviour, which keeps pultrusion lines and molds producing stable parts.",
    components: [
      "Pultruded profiles and stock shapes",
      "Molds and composite tooling",
      "Compound and molding reinforcement",
      "Surface layers for finish quality",
    ],
    benefits: [
      "Consistent mat formats for repeatable processing",
      "Needled and composite constructions for handling and drape",
      "Short-cut fiber for compounding and molding processes",
      "Options that support pultrusion and tooling workflows",
      "Compatible with common thermoset resin systems",
      "Custom formats and weights subject to technical confirmation",
    ],
    selectionCriteria: [
      "Process type — pultrusion, molding, tooling, or compounding",
      "Handling, drape, and wet-out behaviour needed on the line",
      "Resin system and cure conditions in use",
      "Dimensional tolerance and finish expectations for the part",
    ],
    products: [
      { name: "Carbon Fiber Composite Mat", key: { division: "carbon", category: "carbon-fiber-mat", product: "composite-mat" } },
      { name: "Carbon Fiber Needled Mat", key: { division: "carbon", category: "carbon-fiber-mat", product: "needled-mat" } },
      { name: "Short Cut Carbon Fiber", key: { division: "carbon", category: "carbon-fiber-raw", product: "short-cut-fiber" } },
    ],
    relatedIndustries: ["aerospace", "motorsport"],
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
    challenge:
      "Turbine blades keep getting longer, and every meter adds fatigue and stiffness demands. Fiberglass reinforcements carry these loads at a workable cost, which is why multiaxial fabrics and infusion-ready mats sit at the core of modern blade construction.",
    components: [
      "Blade spar caps and shear webs",
      "Blade shells and root sections",
      "Nacelle covers and spinners",
      "Structural reinforcements and stiffeners",
    ],
    benefits: [
      "Multiaxial fabrics optimized for blade spar caps and shells",
      "Fiber architectures designed for fatigue-sensitive structures",
      "Resin infusion performance evaluated with the customer process",
      "Consistent fiber distribution for predictable mechanical properties",
      "Compatible with epoxy, polyester, and vinyl ester resin systems",
      "Available in weights from 300g/m² to 1200g/m²",
    ],
    selectionCriteria: [
      "Structural loads and fatigue life targets for the blade",
      "Fiber orientation and areal weight per laminate zone",
      "Resin system and infusion process on the customer line",
      "Dimensional and quality tolerances for large parts",
    ],
    products: [
      { name: "Multiaxial Fabric", key: { division: "glass", category: "fiberglass-cloth" } },
      { name: "Unidirectional Fabric", key: { division: "glass", category: "fiberglass-cloth" } },
      { name: "Stitched Composite Mat", key: { division: "glass", category: "composite-mat" } },
    ],
    relatedIndustries: ["construction", "transportation"],
  },
  construction: {
    title: "Construction",
    metaTitle: "Fiberglass for Construction & Building Materials | ZeYuSen Fiber",
    metaDescription:
      "Durable fiberglass materials for roofing, waterproofing, insulation, and structural reinforcement in construction.",
    headline: "Building Stronger Foundations",
    description:
      "The construction industry relies on fiberglass materials for waterproofing membranes, roofing systems, pipe insulation, and structural reinforcement. Our tissue mats provide excellent surface quality for SBS/APP modified bitumen membranes.",
    challenge:
      "Building envelopes need materials that stay dimensionally stable through thermal cycling and moisture exposure for years. Fiberglass tissue and reinforcement mats give membranes, roofing, and wall systems a stable carrier that bonds well and resists degradation.",
    components: [
      "Waterproofing and bitumen membranes",
      "Roofing systems and underlays",
      "Pipe and duct insulation facings",
      "Wall coverings and reinforcement layers",
    ],
    benefits: [
      "Excellent dimensional stability under thermal cycling",
      "Superior bonding with bitumen and polymer-modified systems",
      "Alkali-resistant options for concrete reinforcement",
      "Lightweight yet high-strength for structural applications",
      "Weathering performance subject to selected grade and system validation",
      "Fire-retardant grades available; ratings depend on the finished system and test method",
    ],
    selectionCriteria: [
      "The bonding system — bitumen, polymer, or cementitious",
      "Exposure to moisture, alkali, and thermal cycling",
      "Surface finish and dimensional stability required",
      "Any fire or weathering standard the finished system must meet",
    ],
    products: [
      { name: "Surface Tissue Mat", key: { division: "glass", category: "tissue-mat", product: "surface-tissue" } },
      { name: "Chopped Strand Mat", key: { division: "glass", category: "chopped-strand-mat" } },
      { name: "Woven Roving", key: { division: "glass", category: "fiberglass-cloth", product: "woven-roving" } },
    ],
    relatedIndustries: ["wind-energy", "marine"],
  },
  "industrial-filtration": {
    title: "Industrial Filtration",
    metaTitle: "Fiber Materials for Industrial Filtration | ZeYuSen Fiber",
    metaDescription:
      "Specialized fiber and basalt mats for high-temperature filtration, chemical processing, and environmental protection.",
    headline: "Filtration for High-Temperature and Chemical Duty",
    description:
      "Industrial filtration and emission control operate in hot, chemically aggressive environments where organic materials fail. Our basalt and specialty fiber mats offer thermal and chemical resistance suited to filtration and separation media support.",
    challenge:
      "Hot flue gas and aggressive chemical streams break down ordinary media quickly. Basalt and mineral fiber mats withstand elevated temperatures and chemical attack, giving filtration and emission systems a durable structure to build media around.",
    components: [
      "High-temperature filtration media support",
      "Chemical process separation layers",
      "Emission control and flue-gas systems",
      "Thermal and environmental protection layers",
    ],
    benefits: [
      "Basalt fiber options for elevated-temperature service",
      "Chemical-resistant formats for aggressive process streams",
      "Knitted and stitched constructions for structural media support",
      "Consistent mat formats for repeatable filtration builds",
      "Thermal stability suited to demanding industrial environments",
      "Operating limits confirmed by grade and validated test conditions",
    ],
    selectionCriteria: [
      "Continuous operating temperature and any peak excursions",
      "Chemical composition and pH of the process stream",
      "Filtration efficiency and structural support required",
      "Test conditions used to confirm thermal and chemical limits",
    ],
    products: [
      { name: "Basalt Fiber Mat", key: { division: "glass", category: "other-materials", product: "basalt-mat" } },
      { name: "Knitted Stitched Mat", key: { division: "glass", category: "composite-mat", product: "knitted-mat" } },
      { name: "Chopped Strand Mat", key: { division: "glass", category: "chopped-strand-mat" } },
    ],
    relatedIndustries: ["construction", "marine"],
  },
  transportation: {
    title: "Transportation & Rail",
    metaTitle: "Fiberglass Composites for Transportation & Rail | ZeYuSen Fiber",
    metaDescription:
      "Lightweight fiberglass composite mats for rail interiors, automotive components, and transportation infrastructure.",
    headline: "Lightweight Composites for Mobility",
    description:
      "Rail, automotive, and transport programs use fiberglass composites to reduce weight while meeting structural and durability requirements. Our sandwich and composite mats support panels, interiors, and structural components across transport applications.",
    challenge:
      "Vehicles and rolling stock need to carry less structural weight to improve efficiency, without compromising stiffness or durability. Fiberglass composite and core mats deliver rigid, low-mass panels that hold up to the vibration and loading of transport service.",
    components: [
      "Rail and coach interior panels",
      "Automotive body and structural components",
      "Sandwich-cored floor and wall panels",
      "Transport infrastructure components",
    ],
    benefits: [
      "PP core sandwich formats for stiff, lightweight panels",
      "Composite mats for structural and semi-structural parts",
      "Woven roving reinforcement for higher-load areas",
      "Consistent laminate quality for predictable performance",
      "Compatible with common closed-mold and infusion processes",
      "Custom constructions subject to technical confirmation",
    ],
    selectionCriteria: [
      "Structural versus panel-stiffness role of the part",
      "Weight budget and target panel rigidity",
      "Vibration, impact, and durability requirements in service",
      "Molding process and any transport safety standard in scope",
    ],
    products: [
      { name: "PP Core Sandwich Mat", key: { division: "glass", category: "composite-mat", product: "pp-core" } },
      { name: "Composite Mat", key: { division: "glass", category: "composite-mat" } },
      { name: "Woven Roving", key: { division: "glass", category: "fiberglass-cloth", product: "woven-roving" } },
    ],
    relatedIndustries: ["wind-energy", "marine"],
  },
  marine: {
    title: "Marine & Corrosion Protection",
    metaTitle: "Fiberglass for Marine & Corrosion Protection | ZeYuSen Fiber",
    metaDescription:
      "Corrosion-resistant fiberglass roving and mats for shipbuilding, chemical storage tanks, and marine infrastructure.",
    headline: "Corrosion-Resistant Structures for Marine Service",
    description:
      "Marine and chemical environments corrode metal quickly, so builders turn to fiberglass laminates for hulls, tanks, and infrastructure. Our woven roving and mats provide the corrosion resistance and laminate strength these structures require.",
    challenge:
      "Salt water and stored chemicals attack metal structures relentlessly, driving high maintenance costs. Fiberglass laminates resist this corrosion across long service lives, which is why hulls, tanks, and marine infrastructure rely on woven roving and reinforcement mats.",
    components: [
      "Boat and ship hulls",
      "Chemical storage tanks and vessels",
      "Marine infrastructure and gratings",
      "Corrosion-resistant laminated structures",
    ],
    benefits: [
      "Corrosion-resistant reinforcement for marine and chemical exposure",
      "Woven roving for primary laminate strength",
      "Chopped strand mat for interlaminar bulk and bonding",
      "Surface tissue for a resin-rich protective outer layer",
      "Compatible with polyester, vinyl ester, and epoxy systems",
      "Chemical compatibility validated against the stored media",
    ],
    selectionCriteria: [
      "The media in contact — seawater or specific chemicals",
      "Structural loads and laminate thickness required",
      "Resin system matched to the corrosion environment",
      "Surface finish and any marine standard the build must meet",
    ],
    products: [
      { name: "Woven Roving", key: { division: "glass", category: "fiberglass-cloth", product: "woven-roving" } },
      { name: "Chopped Strand Mat", key: { division: "glass", category: "chopped-strand-mat" } },
      { name: "Surface Tissue Mat", key: { division: "glass", category: "tissue-mat", product: "surface-tissue" } },
    ],
    relatedIndustries: ["construction", "transportation"],
  },
};

export function getApplicationDetail(division: "carbon" | "glass", slug: string) {
  return division === "carbon"
    ? carbonApplicationDetails[slug]
    : glassApplicationDetails[slug];
}
