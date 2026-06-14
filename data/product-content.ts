import type { Division } from "@/types/product";

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductContent {
  // Long-form technical overview shown on the product detail page.
  // Each string renders as its own paragraph.
  overview: string[];
  faqs: ProductFaq[];
}

// Keyed as `${division}/${category}/${product}` because carbon and glass
// divisions reuse some category/product slugs (e.g. "composite-mat").
const productContent: Record<string, ProductContent> = {};

export function getProductContent(
  division: Division,
  categorySlug: string,
  productSlug: string,
): ProductContent | undefined {
  return productContent[`${division}/${categorySlug}/${productSlug}`];
}

// ---------------------------------------------------------------------------
// Carbon Fiber — Carbon Fiber Mat
// ---------------------------------------------------------------------------

productContent["carbon/carbon-fiber-mat/surface-mat-10g"] = {
  overview: [
    "The 10g/m² carbon fiber surface mat is the thinnest veil in our conductive mat range, produced from finely dispersed carbon filaments to deliver a continuous conductive surface at minimal added weight. Because it adds almost no thickness to a laminate, it is the preferred choice when engineers need to introduce electrical or thermal conductivity without disturbing the structural fiber architecture underneath.",
    "In military and defense composites the mat is used as a grounding and charge-dissipation layer, while in hydrogen fuel cell assemblies it contributes to the conductive pathways required around the membrane electrode stack. The open, uniform fiber distribution allows resin to wet out quickly during infusion or hand lay-up, so the veil consolidates cleanly against adjacent plies without trapping air.",
    "Supplied in roll form, the 10g grade is typically applied as the outermost or near-surface ply where its low areal weight keeps the finished part light. It pairs well with epoxy, vinyl ester, and phenolic systems, and its corrosion resistance makes it suitable for components exposed to aggressive service environments.",
  ],
  faqs: [
    {
      question: "What makes a 10g/m² carbon fiber surface mat different from heavier mats?",
      answer:
        "At 10g/m² this is an ultra-thin veil, so it adds conductivity and a smooth conductive surface with almost no weight or thickness penalty. Heavier mats (20g and above) provide more robust conductive pathways and bulk but are less suited to weight-critical surface layers.",
    },
    {
      question: "Is the 10g carbon surface mat suitable for fuel cell components?",
      answer:
        "Yes. Its uniform fiber distribution and high electrical conductivity make it appropriate for fuel cell components where a thin, even conductive layer is needed. For gas diffusion layer applications specifically, we also offer a dedicated fuel cell GDL grade.",
    },
    {
      question: "Which resin systems are compatible with this surface mat?",
      answer:
        "The mat wets out readily with epoxy, vinyl ester, and phenolic resins. Its open structure supports both vacuum infusion and hand lay-up processes.",
    },
  ],
};

productContent["carbon/carbon-fiber-mat/surface-mat-20g"] = {
  overview: [
    "The 20g/m² carbon fiber surface mat balances conductivity and handling for applications that need a slightly more robust conductive layer than the ultra-thin 10g veil. It is widely specified for electric heating elements, where the continuous carbon network distributes current evenly to generate uniform, flicker-free heat across a panel or surface.",
    "Wind turbine mold builders use the 20g grade as a conductive tooling surface and for fuel-cell-grade outer wrapping, taking advantage of its consistent areal weight and clean wet-out behavior. The mat lays down flat and conforms to gentle curvature, making it straightforward to position during lay-up of large molds and FRP components.",
    "Like the rest of our surface mat family, the 20g grade is compatible with common thermoset resins and provides reliable corrosion resistance. Its combination of conductivity and processability makes it a practical default when a single conductive veil has to serve both electrical and surface-finish roles.",
  ],
  faqs: [
    {
      question: "What are the main applications for the 20g carbon surface mat?",
      answer:
        "It is commonly used in electric heating systems, wind turbine molds, FRP surface layers, and fuel cell outer wrapping, where an even conductive surface at moderate weight is required.",
    },
    {
      question: "How does the 20g grade compare to the 10g surface mat?",
      answer:
        "The 20g mat provides a more substantial conductive layer and is slightly easier to handle, while the 10g veil is chosen when minimum weight and thickness are the priority. Both share the same carbon fiber composition and corrosion resistance.",
    },
    {
      question: "Can this mat be used for electric heating panels?",
      answer:
        "Yes. The continuous carbon fiber network conducts current uniformly, which makes it well suited to surface and panel heating where even heat distribution matters.",
    },
  ],
};

productContent["carbon/carbon-fiber-mat/nickel-plated-mat"] = {
  overview: [
    "The nickel-plated carbon fiber mat combines the conductivity of carbon fiber with a nickel coating to deliver high-performance electromagnetic interference (EMI) and radio-frequency interference (RFI) shielding at 30g/m². The metallic surface dramatically increases surface conductivity compared with bare carbon, allowing the mat to reflect and attenuate electromagnetic energy across a broad frequency range.",
    "This grade is engineered for military and defense electronics, where enclosures and composite housings must contain emissions and protect sensitive circuitry from external fields. Integrated as a ply within a laminate, the mat provides shielding without the weight of a metal sheet, while remaining compatible with standard composite manufacturing.",
    "Beyond defense, the nickel-plated mat is used in aerospace and commercial electronics that demand reliable EMI protection. The plating is bonded to the carbon substrate for durability, and the mat retains the corrosion resistance and processability expected from a carbon fiber veil.",
  ],
  faqs: [
    {
      question: "How does nickel plating improve EMI shielding?",
      answer:
        "The nickel layer greatly increases surface conductivity over bare carbon fiber, which improves the mat's ability to reflect and absorb electromagnetic energy. This makes it effective for EMI/RFI shielding in enclosures and composite housings.",
    },
    {
      question: "Is the nickel-plated mat suitable for lightweight shielding?",
      answer:
        "Yes. At 30g/m² it delivers shielding performance without the weight of a metal sheet, which is why it is favored in aerospace and defense applications where mass is critical.",
    },
    {
      question: "What industries use nickel-plated carbon fiber mat?",
      answer:
        "It is primarily used in military and defense electronics, aerospace, and commercial electronics that require reliable electromagnetic shielding.",
    },
  ],
};

productContent["carbon/carbon-fiber-mat/carbon-glass-hybrid"] = {
  overview: [
    "The carbon-glass hybrid mat blends carbon and glass fibers at 30g/m² to deliver useful electrical conductivity at a lower cost than an all-carbon veil. By combining the conductive carbon network with the economy of glass fiber, it offers a practical middle ground for projects that need conductivity but cannot justify the price of a full carbon mat.",
    "It is widely used in electric heating and wind energy applications, where the hybrid structure provides enough conductivity for heating or charge dissipation while the glass content adds dimensional stability and reduces material cost. The mat handles and wets out much like a standard surface veil, so it drops into existing FRP processes without special tooling.",
    "Because it balances performance, cost, and process flexibility, the carbon-glass hybrid mat is a sensible choice for high-volume parts and large surfaces where an all-carbon solution would be uneconomical. It works with common thermoset resins and is compatible with hand lay-up and infusion.",
  ],
  faqs: [
    {
      question: "Why choose a carbon-glass hybrid mat over pure carbon?",
      answer:
        "The hybrid offers useful conductivity at a lower cost than an all-carbon mat. It is ideal when a project needs conductivity and dimensional stability but does not require the full performance of pure carbon fiber.",
    },
    {
      question: "What conductivity level does the hybrid mat provide?",
      answer:
        "It provides moderate conductivity, sufficient for electric heating, charge dissipation, and many wind energy applications, while the glass content keeps cost down and adds stability.",
    },
    {
      question: "Is the hybrid mat compatible with standard FRP processes?",
      answer:
        "Yes. It handles and wets out like a standard surface veil and works with hand lay-up and infusion using common thermoset resins.",
    },
  ],
};

productContent["carbon/carbon-fiber-mat/composite-mat"] = {
  overview: [
    "The carbon fiber composite mat is a heavier 300–320g/m² conductive mat engineered specifically for pultrusion, where reinforcement is pulled continuously through a heated die to form constant-cross-section profiles. Its higher areal weight delivers the bulk and conductive content that pultruded profiles require, while maintaining the corrosion resistance characteristic of carbon fiber.",
    "Available in 300g and a 320g (280g + 20g) construction, the mat provides a consistent conductive layer across the profile and resists the chemically aggressive environments common in industrial and chemical processing equipment. The structure is designed to feed smoothly through pultrusion tooling without snagging or distortion, supporting stable, high-throughput production.",
    "Beyond pure pultrusion, the composite mat suits industrial manufacturing where conductivity and corrosion resistance must be combined in a single reinforcement layer. It is compatible with the thermoset resins typically used in pultrusion lines, including polyester, vinyl ester, and epoxy.",
  ],
  faqs: [
    {
      question: "Why is this mat optimized for pultrusion?",
      answer:
        "Its 300–320g/m² weight and stable structure feed smoothly through pultrusion dies and provide the conductive bulk pultruded profiles need, without snagging or distorting during continuous production.",
    },
    {
      question: "What does the 320g (280g+20g) construction mean?",
      answer:
        "It is a layered construction totaling 320g/m², combining a 280g base with a 20g layer to balance conductivity and surface quality in the finished pultruded profile.",
    },
    {
      question: "Is the composite mat corrosion resistant?",
      answer:
        "Yes. Carbon fiber is inherently resistant to many corrosive media, making this mat suitable for chemical and industrial environments where conductivity and durability are both required.",
    },
  ],
};

productContent["carbon/carbon-fiber-mat/needled-mat"] = {
  overview: [
    "The carbon fiber needled mat is a 350g/m² high-strength mat produced by needle-punching, a process that mechanically entangles the fibers to create a dense, cohesive structure without a chemical binder. This entanglement gives the mat superior mechanical integrity compared with bonded veils, while preserving the electrical conductivity of the underlying carbon fiber.",
    "The needle-punched structure resists delamination and holds together during handling and processing, making it well suited to high-strength components and conductive applications that see mechanical load. Because the fibers are mechanically locked rather than resin-bonded, the mat maintains performance across a wide temperature range and absorbs resin readily during lay-up.",
    "At 350g/m² the needled mat provides substantial reinforcement and a robust conductive pathway in a single layer. It is a practical choice where both structural contribution and conductivity are needed, and where a binderless construction is preferred for thermal or chemical reasons.",
  ],
  faqs: [
    {
      question: "How does needle-punching improve the mat?",
      answer:
        "Needle-punching mechanically entangles the fibers into a dense, cohesive structure without a chemical binder. This improves mechanical strength, resists delamination, and lets the mat perform across a wide temperature range.",
    },
    {
      question: "What is the advantage of a binderless mat?",
      answer:
        "Without a chemical binder, the mat tolerates higher temperatures and aggressive chemical environments and wets out readily with resin, while the mechanical entanglement holds the fibers together during handling.",
    },
    {
      question: "Where is the 350g needled mat typically used?",
      answer:
        "It is used in high-strength composite components and conductive applications where the part experiences mechanical load and a single robust reinforcement-plus-conductivity layer is desired.",
    },
  ],
};

productContent["carbon/carbon-fiber-mat/surface-mat-30g"] = {
  overview: [
    "The 30g/m² carbon fiber surface felt is made from fine carbon fiber to combine excellent electrical conductivity with low density and high strength. Its lightweight, flexible construction lets it conform to different surface shapes, making it easy to apply over contoured molds, tubes, and complex geometries where a rigid material would not drape.",
    "The continuous carbon network provides reliable electrostatic discharge and EMI shielding, which is why the felt is used for electronic equipment grounding, anode tubes, and shielding layers. Its conductivity dissipates static charge evenly across a surface, protecting sensitive electronics from discharge events and external electromagnetic fields.",
    "In addition to its electrical functions, the felt offers high recycling value and durability, contributing to a longer service life and more sustainable composite construction. It integrates into standard FRP processes and bonds well within laminates used for molds and industrial enclosures.",
  ],
  faqs: [
    {
      question: "What applications suit the 30g carbon surface felt?",
      answer:
        "It is used for electrostatic discharge, EMI shielding, electronic equipment grounding, and as a conductive layer in molds and anode tubes, thanks to its conductivity and flexible, conformable structure.",
    },
    {
      question: "How does it dissipate static charge?",
      answer:
        "The continuous carbon fiber network conducts charge evenly across the surface, dissipating static and protecting sensitive electronics from discharge events.",
    },
    {
      question: "Can the felt conform to curved surfaces?",
      answer:
        "Yes. Its low density and flexibility allow it to adapt to different surface shapes, including contoured molds, tubes, and complex geometries.",
    },
  ],
};

productContent["carbon/carbon-fiber-mat/fuel-cell-gdl"] = {
  overview: [
    "This carbon fiber felt is engineered specifically for the gas diffusion layer (GDL) in hydrogen fuel cells, one of the most demanding roles a carbon material can play. The GDL must distribute reactant gases evenly to the catalyst, conduct electrons with minimal resistance, manage water produced during the reaction, and survive the acidic, high-pressure environment of a proton exchange membrane fuel cell (PEMFC).",
    "The felt's uniform pore shape and high surface area create efficient diffusion channels that deliver hydrogen and oxygen uniformly across the membrane electrode assembly, while its low resistance and high electrical conductivity minimize losses in the cell. High stress resistance and long-term stability under pressure ensure the GDL maintains its structure through thousands of operating cycles.",
    "Offered in 20g and 30g Grade A weights, the material resists corrosion in acid-base environments, which is essential for the chemistry inside a PEMFC. It is suited to fuel cell stacks and other electrochemical devices where gas diffusion, conductivity, and chemical durability must all be satisfied at once.",
  ],
  faqs: [
    {
      question: "What is a gas diffusion layer (GDL) and why does it matter?",
      answer:
        "The GDL distributes reactant gases to the catalyst, conducts electrons, and manages water in a fuel cell. Its uniform pore structure and conductivity directly affect the efficiency and durability of the cell.",
    },
    {
      question: "What makes this felt suitable for PEMFC applications?",
      answer:
        "It combines a uniform pore structure and high surface area for gas diffusion, low resistance and high conductivity for efficiency, and corrosion resistance in acid-base environments for long-term stability under pressure.",
    },
    {
      question: "What weights are available for the fuel cell GDL felt?",
      answer:
        "It is available in 20g and 30g Grade A weights, allowing selection based on the diffusion and conductivity requirements of the specific fuel cell design.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Carbon Fiber — Carbon Fiber Cloth
// ---------------------------------------------------------------------------

productContent["carbon/carbon-fiber-cloth/hybrid-woven-cloth"] = {
  overview: [
    "The carbon-glass hybrid woven cloth interweaves carbon and glass fibers to achieve the high modulus of carbon at a more accessible cost, available in 200g/m² and 240g/m² weights. The carbon yarns provide stiffness and the distinctive dark aesthetic, while the glass yarns reduce material cost and add toughness, making the fabric attractive for both structural and decorative carbon fiber products.",
    "Built around T300-grade carbon fiber, the cloth offers reliable mechanical performance for parts that need carbon's rigidity without the price of an all-carbon layup. The woven structure drapes over molds and conforms to moderate curvature, and the hybrid construction is popular in automotive trim and visible composite components where the carbon weave appearance is part of the design.",
    "The fabric wets out with standard laminating resins and suits hand lay-up, vacuum bagging, and infusion. Its balance of modulus, cost, and finish makes it a versatile choice for manufacturers producing decorative panels and semi-structural carbon parts at volume.",
  ],
  faqs: [
    {
      question: "What is the benefit of a carbon-glass hybrid cloth?",
      answer:
        "It delivers carbon fiber's high modulus and characteristic appearance at a lower cost than all-carbon fabric, with glass fibers adding toughness. It suits both semi-structural and decorative carbon fiber products.",
    },
    {
      question: "What weights are available?",
      answer:
        "The hybrid woven cloth is offered in 200g/m² and 240g/m² weights, allowing selection based on the stiffness and thickness required for the part.",
    },
    {
      question: "Is this fabric suitable for visible decorative parts?",
      answer:
        "Yes. The woven carbon yarns give a distinctive appearance that is often left visible in automotive trim and decorative composite components.",
    },
  ],
};

productContent["carbon/carbon-fiber-cloth/twill-cloth"] = {
  overview: [
    "The carbon fiber twill cloth is a 200g/m² fabric woven in the classic 2x2 twill pattern using T300-grade carbon fiber. The twill weave produces the diagonal rib pattern associated with premium carbon parts and, more importantly, gives the fabric excellent drapeability so it conforms smoothly to curved and complex mold surfaces without wrinkling.",
    "This combination of aesthetics and conformability makes 2x2 twill the default choice for visible automotive components, sporting goods, and any structural part with compound curvature. The T300 carbon fiber provides consistent strength and stiffness, while the weave's flexibility reduces the labor needed to lay the fabric into intricate tooling.",
    "The cloth wets out cleanly with epoxy and other laminating resins and is well suited to prepreg, infusion, and wet lay-up. Where a balance of structural performance and a high-quality surface finish is required, the 200g twill is a dependable standard.",
  ],
  faqs: [
    {
      question: "Why choose a 2x2 twill weave?",
      answer:
        "The 2x2 twill pattern offers excellent drapeability, conforming to curved and complex molds without wrinkling, and produces the diagonal rib finish associated with premium carbon fiber parts.",
    },
    {
      question: "What does T300 grade mean for performance?",
      answer:
        "T300 is a widely used standard-modulus carbon fiber grade that provides consistent, reliable strength and stiffness for structural and semi-structural composite parts.",
    },
    {
      question: "Is the twill cloth suitable for complex shapes?",
      answer:
        "Yes. Its high drapeability makes it particularly well suited to compound curvature and intricate molds where a plain weave would be harder to lay down cleanly.",
    },
  ],
};

productContent["carbon/carbon-fiber-cloth/plain-cloth"] = {
  overview: [
    "The carbon fiber plain cloth is a 200g/m² T300-grade fabric woven in a simple over-under plain pattern. This is the most tightly interlaced weave, giving the fabric a stable, balanced structure with equal strength in the warp and weft directions, which makes it ideal for flat panels and parts that carry load in two directions.",
    "Because the plain weave locks the yarns firmly in place, the fabric holds its shape during cutting and handling and produces flat, dimensionally stable laminates. It is widely used in carbon fiber products, automotive components, and construction reinforcement where predictable bi-directional performance is more important than draping over tight curves.",
    "The cloth is compatible with epoxy and other thermoset laminating resins and works in wet lay-up, vacuum bagging, and infusion. For flat or gently curved parts that need balanced strength and a uniform surface, the 200g plain weave is a reliable workhorse.",
  ],
  faqs: [
    {
      question: "When should I use plain weave instead of twill?",
      answer:
        "Plain weave provides a stable, balanced structure with equal strength in both directions and holds its shape well, making it ideal for flat panels. Twill is preferred when the fabric must drape over tight curves.",
    },
    {
      question: "Does plain cloth offer balanced strength?",
      answer:
        "Yes. The tightly interlaced plain weave gives equal strength in the warp and weft directions, which is why it suits flat, bi-directionally loaded parts.",
    },
    {
      question: "What processes is the plain cloth compatible with?",
      answer:
        "It works with wet lay-up, vacuum bagging, and resin infusion using epoxy and other thermoset laminating resins.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Carbon Fiber — Carbon Fiber Raw Materials
// ---------------------------------------------------------------------------

productContent["carbon/carbon-fiber-raw/short-cut-fiber"] = {
  overview: [
    "Short cut carbon fiber consists of carbon filaments mechanically chopped to controlled lengths for use as a reinforcing and functional additive. Mixed into plastics, concrete, coatings, or composite matrices, the short fibers disperse uniformly to raise mechanical strength, add electrical conductivity, and improve electromagnetic wave absorption without the cost and complexity of continuous reinforcement.",
    "The material is widely used in reinforced modified plastics, where it boosts stiffness and conductivity, and in construction, electric heating, and shielding applications that exploit its conductive and wave-absorbing properties. Because the fibers are lightweight yet high-strength, they improve performance while adding minimal mass to the host material.",
    "Short cut carbon fiber suits both thermoplastic and thermoset systems and is a key ingredient in new-energy and EMI-shielding products. Its uniform dispersion characteristics make it straightforward to compound into existing production processes.",
  ],
  faqs: [
    {
      question: "What is short cut carbon fiber used for?",
      answer:
        "It is used as a reinforcing and functional additive in modified plastics, construction materials, electric heating, and shielding products, where it raises strength and adds electrical conductivity and wave absorption.",
    },
    {
      question: "Does it disperse evenly in a matrix?",
      answer:
        "Yes. The fibers are cut to controlled lengths for uniform dispersion, which lets them reinforce and add conductivity consistently throughout plastics, coatings, or composite matrices.",
    },
    {
      question: "Is it compatible with both thermoplastics and thermosets?",
      answer:
        "Yes. Short cut carbon fiber can be compounded into both thermoplastic and thermoset systems, making it versatile across many manufacturing processes.",
    },
  ],
};

productContent["carbon/carbon-fiber-raw/carbon-powder"] = {
  overview: [
    "Carbon fiber powder, also known as milled carbon fiber, is produced by grinding carbon fiber into a fine black-gray powder while retaining the material's reinforcing, conductive, and wear-resistant properties. The large specific surface area of the powder allows it to wet out easily in resin, distributing carbon's benefits evenly throughout a matrix as a high-performance filler.",
    "Compounded into thermoplastic and thermoset resins, the powder reinforces the matrix, raises electrical and thermal conductivity, and improves wear resistance and dimensional stability. Because it is a fine particulate rather than a fiber bundle, it can be loaded at high concentrations and used in injection molding, casting, and coating formulations where fibrous reinforcement would be impractical.",
    "Carbon fiber powder is a versatile additive for applications that need carbon's functional properties in a flowable, easily dispersed form, from conductive plastics to wear-resistant components and friction materials.",
  ],
  faqs: [
    {
      question: "What is carbon fiber powder used for?",
      answer:
        "It serves as a high-performance filler in thermoplastic and thermoset resins, adding reinforcement, electrical and thermal conductivity, and wear resistance in a form that disperses easily and can be loaded at high concentrations.",
    },
    {
      question: "How is carbon powder different from short cut fiber?",
      answer:
        "Carbon powder is milled into fine particles, so it flows and disperses like a filler and suits injection molding, casting, and coatings. Short cut fiber retains a fibrous form that provides more directional reinforcement.",
    },
    {
      question: "Why does the large surface area matter?",
      answer:
        "The large specific surface area lets the powder wet out readily in resin, ensuring even distribution of its reinforcing and conductive properties throughout the matrix.",
    },
  ],
};

productContent["carbon/carbon-fiber-raw/carbon-yarn"] = {
  overview: [
    "Carbon fiber yarn is supplied as continuous tow in T300 3K/6K and T700 12K formats, where the number indicates the count of filaments in each bundle. T300 grades offer dependable standard-modulus performance, while T700 12K provides higher strength, giving designers a range of options for weaving, braiding, filament winding, and direct structural reinforcement.",
    "The yarn is the building block for woven fabrics and is also used directly in filament winding of pipes, pressure vessels, and shafts, as well as in textile and conductive applications. Its high tensile strength and anti-corrosion properties make it valuable for construction reinforcement, where carbon tow replaces or supplements steel without the risk of rust.",
    "Delivered in 20kg rolls, the yarn integrates into automated winding and weaving equipment and pairs with epoxy and other thermoset resins. It is the foundational format for manufacturers producing their own carbon reinforcements or building wound and braided structures.",
  ],
  faqs: [
    {
      question: "What do 3K, 6K, and 12K mean for carbon yarn?",
      answer:
        "The number refers to how many individual filaments are bundled in each tow: 3K is 3,000 filaments, 6K is 6,000, and 12K is 12,000. Higher counts generally build up thickness and strength faster during weaving or winding.",
    },
    {
      question: "What is the difference between T300 and T700 grades?",
      answer:
        "T300 is a standard-modulus grade offering reliable general-purpose performance, while T700 provides higher tensile strength for more demanding structural applications.",
    },
    {
      question: "What are the main uses for carbon fiber yarn?",
      answer:
        "It is used for weaving fabrics, filament winding of pipes and pressure vessels, braiding, textile applications, and construction reinforcement where its strength and corrosion resistance are advantageous.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Glass Fiber — Fiberglass Tissue Mat (Veil)
// ---------------------------------------------------------------------------

productContent["glass/tissue-mat/surface-tissue"] = {
  overview: [
    "Fiberglass surface tissue mat is a thin, wet-laid veil applied as the outermost layer of FRP products to create a smooth, resin-rich surface. Its uniform fiber distribution and fast resin penetration produce a finish that hides the coarse texture of structural reinforcement beneath and improves corrosion and weather resistance on the part surface.",
    "Available in winding and hand-laid series and in weights from 10g up to 300g, the tissue suits a wide range of FRP processes, from pipe and tank winding to manual lay-up of panels and moldings. The veil wets out quickly and conforms to the mold, leaving a consistent gel-coat-ready surface that resists fiber print-through and microcracking.",
    "Bonded with PVA or polyester binders depending on the resin system, the surface tissue is a standard finishing layer wherever a clean, durable composite surface is required. It pairs with polyester, vinyl ester, and epoxy resins commonly used in FRP manufacturing.",
  ],
  faqs: [
    {
      question: "What does a surface tissue mat do in an FRP laminate?",
      answer:
        "It forms a thin, resin-rich outer layer that creates a smooth surface, hides the texture of structural reinforcement, and improves corrosion and weather resistance while preventing fiber print-through.",
    },
    {
      question: "What weights are available?",
      answer:
        "Surface tissue is offered from 10g up to 300g, in both winding and hand-laid series, so it can be matched to the process and finish requirements of the part.",
    },
    {
      question: "Which binder should I choose?",
      answer:
        "The tissue is available with PVA or polyester binders. The choice depends on the resin system being used, with polyester binders commonly paired with polyester and vinyl ester resins.",
    },
  ],
};

productContent["glass/tissue-mat/black-tissue"] = {
  overview: [
    "Black fiberglass tissue facing is a colored veil that combines the reinforcing function of glass tissue with flame retardancy, antibacterial protection, and sound absorption. The non-fading black finish gives a clean, uniform appearance for visible surfaces while delivering acoustic and insulation performance, which is why it is widely used in sound barriers, HVAC ducting, and ceiling panels.",
    "Offered in 50g, 60g, 65g, and 80g weights, the facing absorbs sound energy and resists flame spread, making it suitable for building interiors and equipment where fire safety and noise control matter. Its antibacterial and mildew-resistant treatment keeps the material hygienic in humid HVAC and ceiling environments over a long service life.",
    "As a facing layer, the black tissue bonds to insulation boards, acoustic panels, and duct liners, providing both a finished surface and functional performance. It is a practical choice for architectural and mechanical applications that need appearance, acoustics, and fire performance in one material.",
  ],
  faqs: [
    {
      question: "What makes black tissue facing suitable for HVAC and ceilings?",
      answer:
        "It combines flame retardancy, antibacterial and mildew resistance, and sound absorption with a clean non-fading black finish, which suits sound barriers, HVAC insulation, and ceiling panels.",
    },
    {
      question: "What weights does the black tissue come in?",
      answer:
        "It is available in 50g, 60g, 65g, and 80g weights, allowing selection based on the acoustic, insulation, and surface requirements of the application.",
    },
    {
      question: "Is the black color durable?",
      answer:
        "Yes. The facing uses a non-fading black color, so it maintains a uniform appearance over a long service life even in humid HVAC and ceiling environments.",
    },
  ],
};

productContent["glass/tissue-mat/colored-tissue"] = {
  overview: [
    "Colored fiberglass tissue mat offers the same wet-laid construction and performance as standard surface tissue, with the addition of customizable color. Available in shades such as yellow, blue, and green, it lets manufacturers add a decorative or color-coded surface to FRP products without sacrificing the reinforcing and surfacing benefits of a glass veil.",
    "The colored tissue is produced in various weights to match different processes and is used in decorative panels, color-coded industrial components, and custom projects where appearance is part of the specification. It wets out and bonds like standard tissue, so it drops into existing lay-up and winding processes without changes.",
    "Because the color is integral to the veil rather than a surface coating, it remains consistent through the finished laminate. The mat suits polyester, vinyl ester, and epoxy systems and provides a clean, uniform colored surface for both aesthetic and functional identification purposes.",
  ],
  faqs: [
    {
      question: "What colors are available for the tissue mat?",
      answer:
        "Standard options include yellow, blue, and green, and other colors can be customized. This makes the tissue useful for decorative finishes and color-coded components.",
    },
    {
      question: "Does the color affect performance?",
      answer:
        "No. The colored tissue offers the same wet-laid reinforcing and surfacing performance as standard surface tissue; only the appearance changes.",
    },
    {
      question: "Can the weight be customized?",
      answer:
        "Yes. Colored tissue is produced in various weights so it can be matched to the specific process and finish requirements of the project.",
    },
  ],
};

productContent["glass/tissue-mat/rotor-paper"] = {
  overview: [
    "Glass fiber paper for zeolite rotors is a specialized wet-laid substrate engineered to carry molecular sieve (zeolite) material in desiccant rotors used for dehumidification and VOC treatment. The paper provides a stable, high-temperature-resistant skeleton onto which the zeolite is loaded, forming the corrugated honeycomb structure at the heart of a rotor concentrator.",
    "Bonded with PVA and produced with precise thickness control, the paper must withstand the repeated heating and regeneration cycles a rotor experiences while maintaining dimensional stability and an even pore structure for airflow. These properties directly influence the efficiency of moisture adsorption and solvent capture in the finished rotor.",
    "Custom weights are available to suit different rotor designs, and the material is used in dehumidification systems, VOC abatement equipment, and air purification rotors. Its combination of thermal resistance and consistent structure makes it a reliable substrate for demanding adsorption applications.",
  ],
  faqs: [
    {
      question: "What is glass fiber rotor paper used for?",
      answer:
        "It serves as the high-temperature substrate for molecular sieve zeolite rotors used in dehumidification and VOC treatment systems, forming the honeycomb structure that carries the adsorbent material.",
    },
    {
      question: "Why is high-temperature resistance important here?",
      answer:
        "Desiccant rotors are regenerated with heat in repeated cycles. The paper must withstand these temperatures while maintaining dimensional stability and an even pore structure for consistent airflow and adsorption.",
    },
    {
      question: "Can the paper weight be customized?",
      answer:
        "Yes. Custom weights are available to match different rotor designs and the specific adsorption and airflow requirements of the system.",
    },
  ],
};

productContent["glass/tissue-mat/roofing-tissue"] = {
  overview: [
    "Fiberglass roofing tissue mat is a wet-laid reinforcement used inside waterproofing membranes and roofing systems. Engineered for compatibility with bitumen and asphalt, the mat is saturated with these binders to form durable, tear-resistant membranes that protect roofs against water ingress and weathering.",
    "Available in weights from 30g to 100g/m², the tissue provides good tensile strength and a uniform fiber distribution, so the saturated membrane resists cracking and stretches consistently across its surface. As a lightweight reinforcement, it adds strength to shingles and membranes without significantly increasing weight or thickness.",
    "Bonded with PVA or polyester binders, the roofing tissue integrates into bitumen-based waterproofing and shingle production lines. It is a core reinforcement for manufacturers of modified-bitumen membranes and asphalt roofing products.",
  ],
  faqs: [
    {
      question: "Why is roofing tissue compatible with bitumen and asphalt?",
      answer:
        "The mat is engineered to be saturated by bitumen and asphalt binders, forming a strong, tear-resistant waterproofing membrane. Its uniform fiber distribution ensures even saturation and consistent strength.",
    },
    {
      question: "What weight range is available?",
      answer:
        "Roofing tissue is offered from 30g to 100g/m², so it can be matched to the strength and thickness requirements of different membranes and shingles.",
    },
    {
      question: "What does the tissue add to a roofing membrane?",
      answer:
        "It provides tensile strength and dimensional stability as a lightweight reinforcement, helping the membrane resist cracking and tearing without adding significant weight.",
    },
  ],
};

productContent["glass/tissue-mat/wall-covering"] = {
  overview: [
    "Fiberglass wall covering mat is a wet-laid tissue designed for interior wall decoration, where it provides a smooth, dimensionally stable surface and reinforces against cracking. Applied to walls and ceilings before painting or coating, the mat bridges minor substrate movement and prevents hairline cracks from telegraphing through the finished surface.",
    "Produced in weights from 50g to 75g/m², the covering offers good adhesion with coatings and a uniform texture that accepts paint evenly. Its dimensional stability keeps the surface flat and tight over time, while the glass reinforcement adds durability and crack resistance compared with paper-based wall coverings.",
    "The mat is used in interior wall covering, decorative wall systems, and crack-prevention applications in both residential and commercial interiors. It bonds with standard wall adhesives and coating systems, making installation straightforward.",
  ],
  faqs: [
    {
      question: "How does wall covering mat prevent cracks?",
      answer:
        "The glass fiber reinforcement bridges minor substrate movement and distributes stress, preventing hairline cracks from showing through the painted or coated surface.",
    },
    {
      question: "What weights are available for wall covering?",
      answer:
        "It is produced in weights from 50g to 75g/m², which balance surface smoothness with reinforcement for interior wall applications.",
    },
    {
      question: "Does the mat accept paint and coatings well?",
      answer:
        "Yes. Its uniform texture provides good adhesion with coatings and accepts paint evenly, producing a smooth, durable decorative finish.",
    },
  ],
};

productContent["glass/tissue-mat/pipe-wrapping"] = {
  overview: [
    "Glass fiber mat for pipe wrapping is an E-glass wet-laid mat designed to conform around pipelines, providing insulation, mechanical protection, and corrosion resistance. Its conformability lets it wrap smoothly around pipes of varying diameters, forming a continuous protective layer that shields the pipeline from impact, abrasion, and environmental attack.",
    "The mat's thermal insulation properties help maintain process temperatures and protect against heat loss or external heat, while its corrosion resistance guards against chemical and moisture damage in industrial environments. Being lightweight, it adds protection without imposing significant load on pipe supports.",
    "Used in pipe wrapping, pipe insulation, and pipeline protection, the mat integrates with resin or adhesive systems to form a bonded protective shell. It suits both above-ground and buried pipeline applications in industrial and infrastructure settings.",
  ],
  faqs: [
    {
      question: "What protection does pipe wrapping mat provide?",
      answer:
        "It provides thermal insulation, mechanical protection against impact and abrasion, and corrosion resistance, forming a continuous protective layer around pipelines.",
    },
    {
      question: "Can the mat conform to different pipe diameters?",
      answer:
        "Yes. Its conformability allows it to wrap smoothly around pipes of varying diameters, creating a continuous bonded protective shell.",
    },
    {
      question: "Is it suitable for buried pipelines?",
      answer:
        "Yes. Its corrosion resistance and protective properties suit both above-ground and buried pipeline applications in industrial and infrastructure settings.",
    },
  ],
};

productContent["glass/tissue-mat/battery-separator"] = {
  overview: [
    "Glass fiber battery separator is a wet-laid E-glass material used between the positive and negative plates of AGM (absorbent glass mat) and lead-acid batteries. Its high porosity absorbs and retains electrolyte while allowing ions to pass freely, enabling the electrochemical reaction while physically preventing the plates from short-circuiting.",
    "The separator must survive the acidic environment inside a battery, so chemical resistance is essential, alongside good mechanical strength to withstand assembly and the pressure of compressed plate stacks. Uniform fiber distribution ensures consistent electrolyte absorption and even ion conductivity across the cell, which supports stable battery performance and service life.",
    "Used in AGM batteries, traditional lead-acid batteries, and energy-storage cells, the separator is a critical functional component rather than a structural reinforcement. Its porosity, chemical durability, and uniformity directly affect the capacity and reliability of the finished battery.",
  ],
  faqs: [
    {
      question: "What role does the glass fiber separator play in a battery?",
      answer:
        "It sits between the positive and negative plates, absorbing and retaining electrolyte while allowing ions to pass, which enables the reaction and prevents the plates from short-circuiting.",
    },
    {
      question: "Why is high porosity important?",
      answer:
        "High porosity lets the separator absorb a large volume of electrolyte and supports even ion conductivity across the cell, which is essential for stable AGM and lead-acid battery performance.",
    },
    {
      question: "How does it withstand the battery environment?",
      answer:
        "The E-glass material is chemically resistant to the acidic electrolyte and has good mechanical strength to survive assembly and the pressure of compressed plate stacks.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Glass Fiber — Fiberglass Cloth
// ---------------------------------------------------------------------------

productContent["glass/fiberglass-cloth/plain-weave"] = {
  overview: [
    "Plain weave fiberglass cloth is a versatile E-glass, alkali-free fabric offered in 200g, 400g, and 600g weights. The over-under plain weave locks the yarns into a stable, balanced structure that delivers equal strength in both directions, making it a dependable general-purpose reinforcement for FRP, electronics, and board applications.",
    "The alkali-free E-glass composition provides good electrical insulation and chemical resistance, which is why the lighter weights are widely used in printed circuit board and electrical laminate production, while the heavier 400g and 600g grades reinforce structural FRP panels and moldings. The tight weave holds its shape during cutting and lay-up and produces flat, dimensionally stable laminates.",
    "Compatible with polyester, vinyl ester, and epoxy resins, the cloth wets out cleanly in hand lay-up, vacuum bagging, and infusion. Its combination of balanced strength, electrical properties, and availability across multiple weights makes it one of the most broadly applicable fiberglass fabrics.",
  ],
  faqs: [
    {
      question: "What weights does the plain weave cloth come in?",
      answer:
        "It is available in 200g, 400g, and 600g weights, covering everything from electronics and board laminates to heavier structural FRP reinforcement.",
    },
    {
      question: "What does alkali-free E-glass provide?",
      answer:
        "Alkali-free E-glass offers good electrical insulation and chemical resistance, which makes the cloth suitable for both electrical/electronic laminates and corrosion-exposed FRP parts.",
    },
    {
      question: "Is plain weave cloth suitable for electronics?",
      answer:
        "Yes. The lighter weights are widely used in printed circuit board and electrical laminate production thanks to the E-glass insulating properties and balanced, stable weave.",
    },
  ],
};

productContent["glass/fiberglass-cloth/twill-weave"] = {
  overview: [
    "Twill weave fiberglass cloth is an E-glass, alkali-free fabric woven in a diagonal twill pattern that gives it superior drapeability compared with plain weave. This flexibility lets the cloth conform to complex mold shapes and compound curves without wrinkling, making it the preferred reinforcement for parts with intricate geometry.",
    "The twill pattern also produces an attractive surface, so the fabric is used in decorative FRP applications as well as structural ones. Custom weights are available to suit different thickness and strength requirements, and the alkali-free composition ensures good chemical resistance for parts exposed to demanding environments.",
    "The cloth wets out readily with polyester, vinyl ester, and epoxy resins and suits hand lay-up, vacuum bagging, and infusion. Where conformability and finish are priorities, twill weave is the natural choice over a stiffer plain weave.",
  ],
  faqs: [
    {
      question: "When is twill weave preferred over plain weave?",
      answer:
        "Twill weave is chosen when the fabric must drape over complex molds and compound curves without wrinkling, and when an attractive diagonal surface pattern is desired.",
    },
    {
      question: "Can the twill cloth weight be customized?",
      answer:
        "Yes. Custom weights are available so the cloth can be matched to the thickness and strength requirements of the specific part.",
    },
    {
      question: "What resins are compatible with the twill cloth?",
      answer:
        "It wets out readily with polyester, vinyl ester, and epoxy resins and works in hand lay-up, vacuum bagging, and infusion processes.",
    },
  ],
};

productContent["glass/fiberglass-cloth/colored-cloth"] = {
  overview: [
    "Colored fiberglass cloth is a 210g+ E-glass, alkali-free fabric available in custom colors such as blue and red, with a soft texture suited to interior decoration and soft-cover applications. The integral coloring lets designers add decorative fiberglass surfaces to walls, panels, and soft furnishings while retaining the durability and fire resistance of glass fabric.",
    "The soft hand of the fabric distinguishes it from structural cloths, making it pleasant to handle and suitable for applications where the textile drapes or covers rather than reinforces. Custom weights and colors allow it to be specified to match interior design requirements for both residential and commercial spaces.",
    "Used in interior decoration, soft-cover panels, and wall systems, the colored cloth combines the practical benefits of fiberglass, such as dimensional stability and fire resistance, with a decorative finish. It can be coated or laminated depending on the final application.",
  ],
  faqs: [
    {
      question: "What is colored fiberglass cloth used for?",
      answer:
        "It is used in interior decoration, soft-cover panels, and wall systems where a decorative colored fiberglass surface is wanted alongside the durability and fire resistance of glass fabric.",
    },
    {
      question: "What colors and weights are available?",
      answer:
        "The cloth starts at 210g and is available in custom colors such as blue and red, with weights and shades that can be specified to match interior design requirements.",
    },
    {
      question: "How does colored cloth differ from structural fiberglass cloth?",
      answer:
        "It has a softer texture intended for decoration and soft-cover use, rather than the stiffer construction of structural reinforcement fabrics, while keeping fiberglass benefits like fire resistance.",
    },
  ],
};

productContent["glass/fiberglass-cloth/unidirectional"] = {
  overview: [
    "Unidirectional fiberglass cloth aligns the majority of its fibers in a single direction, concentrating strength and stiffness along the primary load path. At 275g/m² in E-glass, alkali-free construction, it is engineered for wind energy and FRP components where loads act predominantly along one axis, such as spar caps and reinforcing strips.",
    "By placing fibers where the load is greatest, unidirectional fabric uses material more efficiently than a balanced weave for single-axis applications, delivering high tensile and flexural strength in the fiber direction. Light stitching or weft yarns hold the unidirectional fibers in place for handling without significantly disturbing their alignment.",
    "The fabric is used in wind turbine blades, structural reinforcements, and any FRP part that needs maximum directional strength. It is compatible with polyester, vinyl ester, and epoxy systems and suits infusion and prepreg processes common in wind energy manufacturing.",
  ],
  faqs: [
    {
      question: "Why use unidirectional cloth instead of woven fabric?",
      answer:
        "Unidirectional cloth concentrates fibers along one axis, delivering maximum strength and stiffness in that direction and using material more efficiently when loads act predominantly along a single path.",
    },
    {
      question: "What is the 275g unidirectional cloth used for?",
      answer:
        "It is used in wind energy components such as blade spar caps and in FRP structural reinforcements where high single-axis strength is required.",
    },
    {
      question: "How are the unidirectional fibers held together?",
      answer:
        "Light stitching or weft yarns hold the aligned fibers in place for handling, without significantly disturbing their orientation along the load direction.",
    },
  ],
};

productContent["glass/fiberglass-cloth/multiaxial"] = {
  overview: [
    "Multiaxial fiberglass fabric places fibers at ±45° to provide high shear strength, and at 300g/m² in A-grade, alkali-free construction it is engineered for wind turbine nacelle covers and structural FRP. Unlike a woven fabric, the layers are stitched together rather than crimped over one another, so the fibers remain straight and deliver their full mechanical potential.",
    "The ±45° biaxial orientation makes the fabric particularly effective at resisting shear and torsional loads, which is why it is specified for nacelle covers and panels that experience complex loading. The stitched, non-crimp construction also improves resin flow and produces laminates with higher and more predictable strength than equivalent woven fabrics.",
    "Used in wind energy, nacelle covers, and structural applications, the fabric suits resin infusion and other closed-mold processes common in large composite manufacturing. It is compatible with polyester, vinyl ester, and epoxy resins.",
  ],
  faqs: [
    {
      question: "What is the advantage of ±45° fiber orientation?",
      answer:
        "The ±45° orientation gives the fabric high shear and torsional strength, making it well suited to nacelle covers and panels that experience complex loading.",
    },
    {
      question: "How does multiaxial fabric differ from woven cloth?",
      answer:
        "The layers are stitched rather than crimped over one another, so the fibers stay straight. This delivers higher, more predictable strength and improved resin flow compared with woven fabric.",
    },
    {
      question: "What does A-grade alkali-free mean?",
      answer:
        "A-grade alkali-free indicates a high-quality E-glass composition with low alkali content, providing good chemical resistance and consistent mechanical performance for demanding structural use.",
    },
  ],
};

productContent["glass/fiberglass-cloth/woven-roving"] = {
  overview: [
    "Woven roving is a heavy 400g/m² E-glass fabric woven from continuous roving bundles, used to build up thickness and strength quickly in FRP laminates. Its coarse, high-glass-content weave makes it the workhorse reinforcement for marine hulls, tanks, and other heavy-duty fiberglass structures where rapid laminate build-up is essential.",
    "The large roving bundles deliver high mechanical strength and excellent wet-out, allowing resin to penetrate the open weave fully and bond the layers into a strong, void-free laminate. Woven roving is typically alternated with chopped strand mat in hand lay-up to combine its strength with the mat's interlaminar bonding and surface fill.",
    "At 400g/m² it provides substantial reinforcement per ply, reducing the number of layers needed for thick structures. The fabric is compatible with polyester and vinyl ester resins commonly used in marine and tank construction and suits hand lay-up and spray-up processes.",
  ],
  faqs: [
    {
      question: "What is woven roving best suited for?",
      answer:
        "Its heavy 400g/m² weave builds up thickness and strength quickly, making it ideal for marine hulls, tanks, and heavy-duty FRP structures that require thick laminates.",
    },
    {
      question: "Why is woven roving often used with chopped strand mat?",
      answer:
        "Alternating woven roving with chopped strand mat combines the roving's high strength with the mat's interlaminar bonding and surface fill, producing a strong, well-consolidated laminate.",
    },
    {
      question: "Does woven roving wet out easily?",
      answer:
        "Yes. The open weave allows resin to penetrate fully for excellent wet-out, helping produce a strong, void-free laminate in hand lay-up and spray-up processes.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Glass Fiber — Fiberglass Composite Mat (Stitched)
// ---------------------------------------------------------------------------

productContent["glass/composite-mat/biaxial-45"] = {
  overview: [
    "The biaxial stitched mat at ±45° is a heavy 900g/m² composite reinforcement built for wind turbine nacelle covers and other large structural parts that must resist shear. Two layers of straight, parallel fibers are oriented at +45° and -45° and held together by stitching, producing a non-crimp fabric that delivers far higher shear strength than a comparable woven cloth.",
    "Because the fibers are not crimped over one another, they carry load along their full length, giving the laminate predictable, high mechanical performance. The stitched construction also opens resin flow paths, which is important for infusing the thick, large-area parts typical of wind energy structures.",
    "At 900g/m² the mat lays down substantial reinforcement per ply, reducing layer count in heavy laminates. The E-glass, alkali-free composition provides chemical resistance and consistent properties, and the fabric suits vacuum infusion and other closed-mold processes used in nacelle and blade manufacturing.",
  ],
  faqs: [
    {
      question: "What is a non-crimp biaxial stitched mat?",
      answer:
        "It is a fabric with two layers of straight fibers oriented at +45° and -45°, held together by stitching rather than weaving. Because the fibers are not crimped, they deliver higher, more predictable strength than woven cloth.",
    },
    {
      question: "Why ±45° orientation for nacelle covers?",
      answer:
        "The ±45° orientation provides high shear strength, which nacelle covers need to handle the torsional and shear loads they experience in service.",
    },
    {
      question: "How does the stitched construction help infusion?",
      answer:
        "The stitched, non-crimp structure opens resin flow paths through the fabric, which helps infuse the thick, large-area laminates typical of wind energy parts.",
    },
  ],
};

productContent["glass/composite-mat/biaxial-0-90"] = {
  overview: [
    "The biaxial stitched mat at 0°/90° is a 900g/m² non-crimp composite reinforcement that places straight fibers along the warp (0°) and weft (90°) directions, delivering balanced strength along both principal axes. Held together by stitching rather than weaving, the fibers remain uncrimped and carry load efficiently, making the mat well suited to wind energy structures that see loads in two perpendicular directions.",
    "Compared with a woven fabric of similar weight, the stitched 0°/90° construction provides higher and more predictable mechanical performance and better resin flow during infusion. This makes it a strong choice for nacelle covers and structural panels where bi-directional strength and reliable laminate quality are required.",
    "The E-glass, alkali-free composition ensures chemical resistance and consistent properties, and at 900g/m² the mat builds thickness quickly in heavy laminates. It is designed for vacuum infusion and closed-mold processes used in large composite manufacturing.",
  ],
  faqs: [
    {
      question: "When should I choose 0°/90° instead of ±45°?",
      answer:
        "Choose 0°/90° when the part carries load primarily along two perpendicular axes (warp and weft). Choose ±45° when shear and torsional strength are the priority.",
    },
    {
      question: "What weight is the biaxial 0°/90° mat?",
      answer:
        "It is a 900g/m² mat, which builds laminate thickness quickly and provides substantial bi-directional reinforcement per ply.",
    },
    {
      question: "Why is the non-crimp construction beneficial?",
      answer:
        "Keeping the fibers straight and uncrimped lets them carry load along their full length, giving higher, more predictable strength and improved resin flow versus woven fabric.",
    },
  ],
};

productContent["glass/composite-mat/multiaxial-1200"] = {
  overview: [
    "The multiaxial stitched mat at 1200g/m² combines ±45°, 0°, and 90° fiber layers in a single heavy-duty reinforcement engineered for wind turbine blades and nacelles. By stacking multiple orientations and stitching them into one non-crimp fabric, the mat resists loads from several directions at once, which is essential for the complex stress fields in large rotor blades.",
    "At 1200g/m² it is one of the heaviest fabrics in the range, delivering maximum structural performance and rapid laminate build-up so manufacturers can reach the thick cross-sections blades require with fewer plies. The uncrimped, multi-axis fibers provide high stiffness and strength while the stitched construction maintains good resin infusion through the thick fabric.",
    "Built from E-glass, alkali-free fiber, the mat suits the vacuum infusion processes used in blade and nacelle production and offers the chemical resistance and consistency demanded by long-life wind energy structures.",
  ],
  faqs: [
    {
      question: "What orientations are combined in the 1200g multiaxial mat?",
      answer:
        "It combines ±45°, 0°, and 90° fiber layers stitched into a single non-crimp fabric, so it resists loads from multiple directions at once.",
    },
    {
      question: "Why use such a heavy 1200g/m² fabric?",
      answer:
        "The high weight allows rapid laminate build-up and maximum structural performance, helping manufacturers reach the thick cross-sections that wind turbine blades require with fewer plies.",
    },
    {
      question: "Is it suitable for resin infusion?",
      answer:
        "Yes. Despite its weight, the stitched non-crimp construction maintains resin flow paths, making it suitable for the vacuum infusion processes used in blade and nacelle manufacturing.",
    },
  ],
};

productContent["glass/composite-mat/grid-stitched"] = {
  overview: [
    "The grid stitched composite mat is a 1050g/m² reinforcement whose fibers are arranged in a grid pattern and held by stitching, engineered specifically for wind turbine nacelle covers. The grid structure creates open channels that promote excellent resin flow during infusion, helping fully wet out the thick laminate and produce void-free parts.",
    "Alongside its resin-flow advantage, the grid pattern provides strong mechanical properties suited to the large, moderately loaded panels of a nacelle cover. The stitched, non-crimp construction keeps the fibers straight for efficient load carrying, and at 1050g/m² the mat builds thickness quickly in production.",
    "Made from E-glass, alkali-free fiber, the mat offers chemical resistance and consistent performance and is designed for the vacuum infusion processes used in nacelle manufacturing. Its balance of resin flow and strength makes it a practical reinforcement for large composite covers.",
  ],
  faqs: [
    {
      question: "What is the benefit of the grid stitched pattern?",
      answer:
        "The grid pattern creates open channels that promote excellent resin flow during infusion, helping fully wet out thick laminates and produce void-free nacelle cover parts.",
    },
    {
      question: "What is the grid stitched mat used for?",
      answer:
        "It is engineered for wind turbine nacelle covers, where its combination of resin flow and mechanical strength suits large, moderately loaded panels.",
    },
    {
      question: "What weight is this mat?",
      answer:
        "It is a 1050g/m² mat, providing substantial reinforcement per ply and rapid laminate build-up for large composite covers.",
    },
  ],
};

productContent["glass/composite-mat/unidirectional-450"] = {
  overview: [
    "The unidirectional stitched mat at 450g/m² concentrates its fibers along a single 0° axis and is engineered for wind energy pultrusion, where reinforcement is pulled continuously through a heated die to form constant-section profiles such as blade spar caps. Aligning the fibers in one direction maximizes strength and stiffness along the profile, exactly where pultruded structural members carry their load.",
    "The stitched, non-crimp construction keeps the unidirectional fibers straight and parallel so they deliver their full mechanical potential, while light cross-stitching holds the fabric together for stable feeding through pultrusion tooling. At 450g/m² the mat provides efficient single-axis reinforcement without excess weight.",
    "Made from E-glass, alkali-free fiber, the mat offers chemical resistance and consistent properties suited to long-life wind energy components. It integrates into pultrusion lines running polyester, vinyl ester, or epoxy resins.",
  ],
  faqs: [
    {
      question: "Why is unidirectional reinforcement used in pultrusion?",
      answer:
        "Pultruded profiles such as spar caps carry load along their length, so aligning fibers in the 0° direction maximizes strength and stiffness exactly where it is needed, using material efficiently.",
    },
    {
      question: "How does the mat feed through pultrusion tooling?",
      answer:
        "Light cross-stitching holds the straight unidirectional fibers together, keeping the fabric stable so it feeds smoothly and consistently through the heated pultrusion die.",
    },
    {
      question: "What weight is the unidirectional stitched mat?",
      answer:
        "It is a 450g/m² mat, providing efficient single-axis reinforcement for wind energy pultrusion without adding excess weight.",
    },
  ],
};

productContent["glass/composite-mat/pp-core"] = {
  overview: [
    "The PP core sandwich mat is a three-layer composite reinforcement totaling 860g/m² (380 + 180 + 300), built around a polypropylene core sandwiched between glass fiber layers. Designed for high-speed rail applications, the sandwich structure delivers high bending stiffness at low weight, much like a structural I-beam, while the PP core adds thermal insulation.",
    "Placing lightweight core material between two glass skins increases the laminate's thickness and flexural rigidity without a proportional increase in mass, which is exactly what transportation structures need to reduce weight while meeting stiffness targets. The integrated construction also simplifies lay-up, since the core and skins are combined in a single product.",
    "Used in high-speed rail and broader transportation applications, the mat suits infusion and closed-mold processes. The glass skins bond with standard composite resins while the PP core contributes lightweight stiffness and insulation to the finished panel.",
  ],
  faqs: [
    {
      question: "How does a PP core sandwich mat reduce weight?",
      answer:
        "Placing a lightweight polypropylene core between two glass skins increases thickness and bending stiffness without a proportional weight gain, similar to how an I-beam achieves rigidity efficiently.",
    },
    {
      question: "What does the 860g (380+180+300) construction mean?",
      answer:
        "It is a three-layer build totaling 860g/m²: a 380g glass layer, a 180g PP core, and a 300g glass layer, combined into a single sandwich reinforcement.",
    },
    {
      question: "Where is the PP core sandwich mat used?",
      answer:
        "It is designed for high-speed rail and other transportation applications that need lightweight stiffness and thermal insulation in structural panels.",
    },
  ],
};

productContent["glass/composite-mat/mesh-composite"] = {
  overview: [
    "The mesh composite mat features an open grid (mesh) structure that enhances resin penetration and creates mechanical interlocking between layers. The open architecture lets resin flow freely through the fabric during lay-up or infusion, improving wet-out and bonding while the grid geometry helps lock adjacent plies together for better interlaminar performance.",
    "Available in customizable weights, the mat is a versatile reinforcement for general composite, construction, and industrial applications where improved resin flow and ply bonding are beneficial. Its open structure is particularly useful in thick laminates or combined lay-ups that would otherwise be difficult to fully infuse.",
    "Made from E-glass, the mesh composite mat works with common thermoset resins and suits both hand lay-up and infusion. Its adaptability and customizable weight make it a practical choice across a broad range of composite parts.",
  ],
  faqs: [
    {
      question: "What is the advantage of an open mesh structure?",
      answer:
        "The open mesh enhances resin penetration for better wet-out and creates mechanical interlocking between layers, improving interlaminar bonding in the finished laminate.",
    },
    {
      question: "Can the mesh composite mat weight be customized?",
      answer:
        "Yes. It is offered in customizable weights so it can be matched to the resin flow, thickness, and reinforcement requirements of the application.",
    },
    {
      question: "What applications suit the mesh composite mat?",
      answer:
        "It suits general composite, construction, and industrial applications, and is especially useful in thick laminates or combined lay-ups that need improved resin flow.",
    },
  ],
};

productContent["glass/composite-mat/knitted-mat"] = {
  overview: [
    "The knitted stitched mat is an edge-stitched glass fiber reinforcement available in 300g and 450g weights, designed primarily for thermal insulation applications. The edge-stitched construction holds the fibers in a flexible, easily handled form that conforms readily around pipes, vessels, and irregular surfaces needing insulation.",
    "Its flexibility and ease of handling make installation straightforward, while the alkali-free E-glass composition provides thermal resistance and chemical durability for insulation service. The stitched structure keeps the mat intact during wrapping and fitting, so it maintains coverage without falling apart or shedding fibers.",
    "Offered in 300g and 450g options, the mat is used in thermal insulation and pipe wrapping, where it provides a conformable, durable insulating layer. It can be used on its own or combined with facings and resins depending on the installation.",
  ],
  faqs: [
    {
      question: "What is the knitted stitched mat used for?",
      answer:
        "It is used primarily for thermal insulation and pipe wrapping, where its flexible, edge-stitched construction conforms easily around pipes, vessels, and irregular surfaces.",
    },
    {
      question: "What weights are available?",
      answer:
        "It is offered in 300g and 450g options, allowing selection based on the insulation thickness and coverage required.",
    },
    {
      question: "Why is the edge-stitched construction useful?",
      answer:
        "Edge stitching keeps the mat flexible and intact during wrapping and fitting, so it handles easily and maintains coverage without shedding fibers.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Glass Fiber — Chopped Strand Mat
// ---------------------------------------------------------------------------

productContent["glass/chopped-strand-mat/chopped-strand-mat"] = {
  overview: [
    "Chopped strand mat (CSM) is made from glass fibers chopped to about 50mm and distributed randomly, then held together with a binder to form a sheet with isotropic, in-plane strength. Because the fibers point in all directions, the mat reinforces equally regardless of orientation, making it one of the most widely used reinforcements in hand lay-up and open molding.",
    "Available in 300g, 450g, and 600g weights, the mat is used across automotive, marine, sanitary ware, and construction laminates. The random fiber arrangement and binder give good interlaminar bonding and surface fill, which is why CSM is commonly alternated with woven roving to build strong, well-consolidated laminates.",
    "Supplied with polyester powder or emulsion binders to match the resin system, the mat breaks down readily when wetted with resin, conforming to molds and wetting out fully. It suits hand lay-up and mechanical molding and is a foundational material for general fiberglass production.",
  ],
  faqs: [
    {
      question: "What is chopped strand mat used for?",
      answer:
        "It is a general-purpose reinforcement for hand lay-up and open molding, used in automotive, marine, sanitary ware, and construction laminates, providing equal strength in all in-plane directions.",
    },
    {
      question: "What weights and fiber length does CSM have?",
      answer:
        "It is available in 300g, 450g, and 600g weights with fibers chopped to about 50mm, distributed randomly for isotropic in-plane reinforcement.",
    },
    {
      question: "Why is CSM often used with woven roving?",
      answer:
        "CSM provides good interlaminar bonding and surface fill, so alternating it with woven roving combines the roving's strength with the mat's consolidation to build strong laminates.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Glass Fiber — Other Fiber Materials
// ---------------------------------------------------------------------------

productContent["glass/other-materials/basalt-mat"] = {
  overview: [
    "Basalt fiber mat is a 30g/m² veil made from fibers spun from melted volcanic basalt rock, offering excellent high-temperature resistance and chemical stability. Basalt fiber withstands continuous service up to around 700°C, well beyond ordinary glass fiber, which makes the mat valuable for high-temperature insulation and fire-protection applications.",
    "Beyond its thermal performance, basalt fiber resists acids, alkalis, and many aggressive chemicals, so the mat is used where corrosion resistance and durability matter, such as filtration and chemical-exposed components. As a naturally derived material with no added chemicals in its base composition, it is also regarded as an environmentally friendly reinforcement.",
    "At 30g/m² the mat provides a thin, conformable layer suited to surfacing, insulation, and filtration roles. It combines the handling familiarity of a glass veil with the elevated temperature and chemical performance of basalt fiber.",
  ],
  faqs: [
    {
      question: "What temperature can basalt fiber mat withstand?",
      answer:
        "Basalt fiber offers excellent high-temperature resistance, with continuous service capability up to around 700°C, well beyond ordinary E-glass.",
    },
    {
      question: "How does basalt mat compare to glass fiber mat?",
      answer:
        "Basalt fiber provides higher temperature resistance and strong chemical stability against acids and alkalis, while being handled much like a glass veil. It is also considered an eco-friendly, naturally derived material.",
    },
    {
      question: "What applications use basalt fiber mat?",
      answer:
        "It is used in high-temperature insulation, chemical-resistant components, and filtration, where its thermal and chemical durability are advantageous.",
    },
  ],
};








