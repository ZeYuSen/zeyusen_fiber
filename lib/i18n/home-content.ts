import type { Locale } from "./config";
import { defaultLocale } from "./config";

// Home-page marketing copy, localized. Client-safe (no server-only import) so
// the "use client" section components can consume it via useLocale().

export type HomeContent = {
  hero: { title: string; subtitle: string }[];
  heroCta: { quote: string; about: string };
  divisions: { carbon: DivisionCard; glass: DivisionCard };
  exploreProducts: string;
  stats: { value: number; suffix: string; label: string }[];
  industries: { heading: string; subtitle: string; imageNote: string; items: { title: string; description: string }[] };
  whyPartner: {
    title: string;
    intro: string;
    capabilities: { number: string; title: string; description: string }[];
  };
  trust: {
    title: string;
    intro: string;
    metrics: { number: string; metric: string; suffix: string; unit: string; title: string; text: string }[];
    certHeading: string;
    certCount: string;
    certNote: string;
    deliveryHeading: string;
    deliveryFlow: string;
    logistics: { label: string; text: string }[];
    followUp: string;
    steps: string[];
  };
  cta: {
    title: string;
    intro: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sending: string;
    submit: string;
    successInline: string;
    error: string;
  };
  factory: {
    eyebrow: string;
    title: string;
    intro: string;
    featureCaption: string;
    featureTitle: string;
    featureText: string;
    tabs: { production: string; testing: string; equipment: string; warehouse: string };
    note: string;
  };
};

type DivisionCard = {
  label: string;
  headline: string;
  description: string;
  specs: { label: string; value: string }[];
  categories: string[];
};

const en: HomeContent = {
  hero: [
    {
      title: "Carbon Fiber Mat, Fiberglass Mat & Rotor Paper Manufacturer",
      subtitle:
        "Focused OEM materials for composite surfaces, batteries, industrial protection and desiccant rotors",
    },
    {
      title: "State-of-the-Art Manufacturing",
      subtitle:
        "Standardized production facilities with automated production lines and strict quality control",
    },
    {
      title: "Trusted by Global Buyers",
      subtitle:
        "Dual production bases 240 km from Shanghai Port — FOB, CIF, CFR or EXW, coordinated to your terms",
    },
  ],
  heroCta: { quote: "Get a Quote", about: "About Our Manufacturing" },
  divisions: {
    carbon: {
      label: "Carbon Fiber",
      headline: "Carbon Mats for Functional Composite Layers",
      description:
        "Surface, conductive, composite, needled and fuel-cell GDL mats for functional layers and industrial composite processes.",
      specs: [
        { label: "Weight Range", value: "10–350 g/m²" },
        { label: "Product Series", value: "7" },
        { label: "Customization", value: "OEM / ODM" },
      ],
      categories: [
        "Surface Mat",
        "Nickel-Plated Mat",
        "Composite Mat",
        "Needled Mat",
        "Fuel-Cell GDL Mat",
      ],
    },
    glass: {
      label: "Glass Fiber",
      headline: "Fiberglass Mats & Rotor Forming Paper",
      description:
        "Wet-laid mats and veils for surface, roofing, wall, pipe and battery uses, plus forming paper for desiccant rotors.",
      specs: [
        { label: "Weight Range", value: "30–300 g/m²" },
        { label: "Product Series", value: "8" },
        { label: "Customization", value: "OEM / ODM" },
      ],
      categories: [
        "Desiccant Rotor Paper",
        "Surface Tissue",
        "Roofing Tissue",
        "Wall-Covering Mat",
        "Pipe-Wrapping Mat",
        "Battery Separator",
      ],
    },
  },
  exploreProducts: "Explore Products",
  stats: [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 80, suffix: "%+", label: "Repeat Buyers" },
    { value: 80, suffix: "M", label: "Sqm Annual Output" },
    { value: 13, suffix: "+", label: "Patents Granted" },
  ],
  industries: {
    heading: "Industries We Serve",
    subtitle: "High-performance carbon fiber and fiberglass composites — engineered for the world's most demanding sectors.",
    imageNote: "industry application reference image",
    items: [
      { title: "Composite Surface Layers", description: "Lightweight veils for finish quality, conductivity and functional surfaces" },
      { title: "Industrial Dehumidification", description: "Forming paper for desiccant and molecular-sieve rotors" },
      { title: "Construction", description: "Roofing membranes, wall coverings, pipe facings, and surface layers" },
      { title: "Defense Electronics", description: "EMI/RFI shielding evaluation and conductive functional layers" },
      { title: "New Energy", description: "Fuel cells, battery separators, and energy storage systems" },
    ],
  },
  whyPartner: {
    title: "Precision at every scale.",
    intro:
      "With a decade of manufacturing expertise and partnerships with leading research institutions, we deliver composite materials that meet the most demanding specifications — on time, every time.",
    capabilities: [
      { number: "01", title: "Specification Support", description: "Project-specific weight, width, binder, and roll-format review." },
      { number: "02", title: "Global Logistics", description: "Dual production bases, 240km from Shanghai Port. Exporting to North America, Southeast Asia, the Middle East, and Japan/South Korea." },
      { number: "03", title: "Quality Certified", description: "ISO 9001, 14001, 45001 certified. 13+ patents in composite materials." },
    ],
  },
  trust: {
    title: "Every claim, verifiable.",
    intro:
      "Certifications, R&D capability, logistics infrastructure, and order support — documented and ready for your review before you place a single order.",
    metrics: [
      { number: "01", metric: "10", suffix: "+", unit: "Years", title: "Composite Experience", text: "Focused exclusively on fiberglass and carbon fiber since 2015, serving demanding industrial applications worldwide." },
      { number: "02", metric: "2", suffix: "", unit: "R&D Centers", title: "Engineering Backbone", text: "Dedicated R&D staff guide you from material selection through production — engineers who understand your process." },
      { number: "03", metric: "80", suffix: "%+", unit: "Repeat Buyers", title: "Export Footprint", text: "Stable global delivery to North America, Southeast Asia, the Middle East, and Japan/South Korea. FOB, CIF, CFR, EXW — coordinated to your terms." },
    ],
    certHeading: "Certified Quality & Patents",
    certCount: "Certificates",
    certNote: "ISO 9001 / ISO 14001 / ISO 45001 certified. 13+ utility model patents.",
    deliveryHeading: "Delivery & Support",
    deliveryFlow: "Inquiry → Shipment",
    logistics: [
      { label: "Dual Production Base", text: "Manufacturing in Nantong and Taizhou — stable, scalable output." },
      { label: "240 km to Shanghai Port", text: "Export-ready logistics hub with efficient sea freight worldwide." },
      { label: "Flexible Trade Terms", text: "FOB, CIF, CFR, EXW — sample shipments to bulk orders." },
    ],
    followUp: "End-to-end follow-up",
    steps: ["Inquiry", "Production", "Inspection", "Shipment"],
  },
  cta: {
    title: "Send Your Spec, Get a Recommendation in 24h",
    intro:
      "Tell us your requirements. Our engineers will provide a tailored recommendation within 24 hours.",
    emailPlaceholder: "Your email",
    messagePlaceholder: "What are you looking for?",
    sending: "Sending...",
    submit: "Send Inquiry",
    successInline: "Thank you! We'll be in touch within 24 hours.",
    error: "Something went wrong. Please try again.",
  },
  factory: {
    eyebrow: "Inside Our Operation",
    title: "Real factory. Real stock. Ready to ship.",
    intro:
      "What you order is what we make — production lines, testing labs, and a stocked warehouse you can verify before committing.",
    featureCaption: "R&D Center",
    featureTitle: "In-house research, formula to finished product",
    featureText:
      "Dedicated R&D facility with pilot production lines, enabling rapid prototyping from raw fiber to certified composite — 13+ patents and counting.",
    tabs: { production: "Production Line", testing: "Quality Testing", equipment: "Slitting & Winding", warehouse: "Warehouse & Shipping" },
    note: "All photos taken at our own facility. Factory visits and live video tours welcome.",
  },
};

const ko: HomeContent = {
  hero: [
    { title: "탄소섬유 매트, 유리섬유 매트 및 로터 성형지 제조업체", subtitle: "복합재 표면, 배터리, 산업 보호 및 제습 로터용 OEM 소재" },
    { title: "최첨단 제조 시설", subtitle: "자동화 생산 라인과 엄격한 품질 관리를 갖춘 표준화 생산 시설" },
    { title: "글로벌 바이어의 신뢰", subtitle: "상하이항에서 240km 거리의 이중 생산 거점 — FOB, CIF, CFR, EXW, 귀하의 조건에 맞춰 조율" },
  ],
  heroCta: { quote: "견적 요청", about: "제조 시설 소개" },
  divisions: {
    carbon: { label: "탄소섬유", headline: "기능성 복합층용 탄소 매트", description: "기능층과 산업용 복합 공정을 위한 표면, 전도성, 복합, 니들 및 연료전지 GDL용 매트.",
      specs: [
        { label: "중량 범위", value: "10–350 g/m²" },
        { label: "제품 시리즈", value: "7" },
        { label: "맞춤 제작", value: "OEM / ODM" },
      ],
      categories: ["표면 매트", "니켈 도금 매트", "복합 매트", "니들 매트", "연료전지 GDL 매트"],
    },
    glass: { label: "유리섬유", headline: "유리섬유 매트 및 로터 성형지", description: "표면, 지붕, 벽, 파이프와 배터리용 습식 매트 및 제습 로터용 성형지.",
      specs: [
        { label: "중량 범위", value: "30–300 g/m²" },
        { label: "제품 시리즈", value: "8" },
        { label: "맞춤 제작", value: "OEM / ODM" },
      ],
      categories: ["제습 로터 성형지", "표면 매트", "지붕 매트", "벽 마감 매트", "파이프 래핑 매트", "배터리 분리막"],
    },
  },
  exploreProducts: "제품 둘러보기",
  stats: [
    { value: 10, suffix: "+", label: "년 경력" },
    { value: 80, suffix: "%+", label: "재구매율" },
    { value: 80, suffix: "M", label: "연간 생산량(㎡)" },
    { value: 13, suffix: "+", label: "특허 등록" },
  ],
  industries: {
    heading: "당사가 서비스하는 산업",
    subtitle: "고성능 탄소섬유 및 유리섬유 복합재 — 세계에서 가장 까다로운 산업을 위해 설계되었습니다.",
    imageNote: "산업 응용 예시 이미지",
    items: [
      { title: "복합재 표면층", description: "마감 품질, 전도성과 기능성 표면을 위한 경량 베일" },
      { title: "산업용 제습", description: "제습 및 분자체 로터용 유리섬유 성형지" },
      { title: "건설", description: "루핑 멤브레인, 벽 마감, 파이프 표면재와 표면층" },
      { title: "방산 전자장비", description: "EMI/RFI 차폐 평가와 전도성 기능층" },
      { title: "신에너지", description: "연료전지, 배터리 분리막 및 에너지 저장 시스템" },
    ],
  },
  whyPartner: {
    title: "모든 규모에서의 정밀함.",
    intro: "10년 이상의 제조 전문성과 선도적인 연구 기관과의 협력을 통해, 가장 까다로운 사양을 충족하는 복합재 소재를 항상 정시에 제공합니다.",
    capabilities: [
      { number: "01", title: "사양 지원", description: "프로젝트별 평량, 폭, 바인더와 롤 형식을 검토합니다." },
      { number: "02", title: "글로벌 물류", description: "상하이항에서 240km 거리의 이중 생산 거점. 북미, 동남아시아, 중동 및 일본/한국 수출." },
      { number: "03", title: "품질 인증", description: "ISO 9001, 14001, 45001 인증. 복합재 분야 13건 이상 특허." },
    ],
  },
  trust: {
    title: "모든 주장은 검증 가능합니다.",
    intro: "인증, R&D 역량, 물류 인프라 및 주문 지원 — 단 한 건의 주문을 하기 전에 검토할 수 있도록 문서화되어 준비되어 있습니다.",
    metrics: [
      { number: "01", metric: "10", suffix: "+", unit: "년", title: "복합재 경력", text: "2015년부터 유리섬유와 탄소섬유에만 전념하며 전 세계의 까다로운 산업 응용에 서비스를 제공합니다." },
      { number: "02", metric: "2", suffix: "", unit: "R&D 센터", title: "엔지니어링 기반", text: "전담 R&D 인력이 소재 선택부터 생산까지 안내합니다 — 귀하의 공정을 이해하는 엔지니어." },
      { number: "03", metric: "80", suffix: "%+", unit: "재구매율", title: "수출 거점", text: "북미, 동남아시아, 중동 및 일본/한국으로 안정적인 글로벌 배송, 상하이항까지 240km. FOB, CIF, CFR, EXW — 귀하의 조건에 맞춰 조율." },
    ],
    certHeading: "인증 품질 & 특허",
    certCount: "건의 인증",
    certNote: "ISO 9001 / ISO 14001 / ISO 45001 인증. 13건 이상의 실용신안 특허.",
    deliveryHeading: "배송 & 지원",
    deliveryFlow: "문의 → 출하",
    logistics: [
      { label: "이중 생산 거점", text: "난퉁과 타이저우에서 제조 — 안정적이고 확장 가능한 생산." },
      { label: "상하이항까지 240km", text: "전 세계로 효율적인 해상 운송이 가능한 수출 준비 물류 허브." },
      { label: "유연한 무역 조건", text: "FOB, CIF, CFR, EXW — 샘플 배송부터 대량 주문까지." },
    ],
    followUp: "엔드투엔드 후속 관리",
    steps: ["문의", "생산", "검사", "출하"],
  },
  cta: {
    title: "사양을 보내주시면 24시간 내 추천해 드립니다",
    intro: "요구사항을 알려주세요. 당사 엔지니어가 24시간 이내에 맞춤 추천을 제공합니다.",
    emailPlaceholder: "이메일",
    messagePlaceholder: "무엇을 찾고 계신가요?",
    sending: "전송 중...",
    submit: "문의하기",
    successInline: "감사합니다! 24시간 이내에 연락드리겠습니다.",
    error: "오류가 발생했습니다. 다시 시도해 주세요.",
  },
  factory: {
    eyebrow: "공장 내부 둘러보기",
    title: "실제 공장, 실제 재고, 즉시 출하.",
    intro: "주문하신 그대로 생산합니다 — 생산 라인, 검사 실험실, 재고 창고를 주문 전에 확인하실 수 있습니다.",
    featureCaption: "연구개발 센터",
    featureTitle: "자체 연구, 원료에서 완제품까지",
    featureText: "파일럿 생산라인을 갖춘 전용 R&D 시설에서 원사부터 인증된 복합재까지 신속 시제품 제작 — 13건 이상 특허 보유.",
    tabs: { production: "생산 라인", testing: "품질 검사", equipment: "슬리팅 & 와인딩", warehouse: "창고 & 출하" },
    note: "모든 사진은 자체 시설에서 촬영했습니다. 현장 방문 및 화상 공장 투어를 환영합니다.",
  },
};

const es: HomeContent = {
  hero: [
    { title: "Fabricante de Mantas de Carbono, Mantas de Vidrio y Papel para Rotores", subtitle: "Materiales OEM para superficies compuestas, baterías, protección industrial y rotores desecantes" },
    { title: "Fabricación de Vanguardia", subtitle: "Instalaciones de producción estandarizadas con líneas automatizadas y estricto control de calidad" },
    { title: "La Confianza de Compradores Globales", subtitle: "Bases de producción duales a 240 km del Puerto de Shanghái — FOB, CIF, CFR o EXW, coordinado a sus términos" },
  ],
  heroCta: { quote: "Solicitar Cotización", about: "Sobre Nuestra Fabricación" },
  divisions: {
    carbon: { label: "Fibra de Carbono", headline: "Mantas para Capas Funcionales", description: "Mantas superficiales, conductoras, compuestas, punzonadas y para GDL en procesos industriales.",
      specs: [
        { label: "Rango de Gramaje", value: "10–350 g/m²" },
        { label: "Series de Producto", value: "7" },
        { label: "Personalización", value: "OEM / ODM" },
      ],
      categories: ["Manta de Superficie", "Manta Niquelada", "Manta Compuesta", "Manta Punzonada", "Manta para GDL"],
    },
    glass: { label: "Fibra de Vidrio", headline: "Mantas y Papel para Rotores", description: "Mantas por vía húmeda para superficies, cubiertas, paredes, tuberías y baterías, más papel para rotores desecantes.",
      specs: [
        { label: "Rango de Gramaje", value: "30–300 g/m²" },
        { label: "Series de Producto", value: "8" },
        { label: "Personalización", value: "OEM / ODM" },
      ],
      categories: ["Papel para Rotor", "Velo de Superficie", "Manta para Cubiertas", "Manta para Pared", "Manta para Tuberías", "Separador de Batería"],
    },
  },
  exploreProducts: "Explorar Productos",
  stats: [
    { value: 10, suffix: "+", label: "Años de Experiencia" },
    { value: 80, suffix: "%+", label: "Recompra de Clientes" },
    { value: 80, suffix: "M", label: "m² Producción Anual" },
    { value: 13, suffix: "+", label: "Patentes Concedidas" },
  ],
  industries: {
    heading: "Sectores que Atendemos",
    subtitle: "Compuestos de fibra de carbono y fibra de vidrio de alto rendimiento — diseñados para los sectores más exigentes del mundo.",
    imageNote: "imagen de referencia de aplicación industrial",
    items: [
      { title: "Capas Superficiales de Compuestos", description: "Velos ligeros para acabado, conductividad y superficies funcionales" },
      { title: "Deshumidificación Industrial", description: "Papel de fibra de vidrio para rotores desecantes y de tamiz molecular" },
      { title: "Construcción", description: "Membranas de cubierta, paredes, tuberías y capas superficiales" },
      { title: "Electrónica de Defensa", description: "Evaluación EMI/RFI y capas funcionales conductoras" },
      { title: "Nueva Energía", description: "Celdas de combustible, separadores de batería y sistemas de almacenamiento de energía" },
    ],
  },
  whyPartner: {
    title: "Precisión a cualquier escala.",
    intro: "Con más de 10 años de experiencia en fabricación y alianzas con instituciones de investigación líderes, entregamos materiales compuestos que cumplen las especificaciones más exigentes — a tiempo, siempre.",
    capabilities: [
      { number: "01", title: "Soporte de Especificación", description: "Revisión de gramaje, ancho, ligante y formato de rollo por proyecto." },
      { number: "02", title: "Logística Global", description: "Bases de producción duales, a 240 km del Puerto de Shanghái. Exportando a América del Norte, Sudeste Asiático, Oriente Medio y Japón/Corea del Sur." },
      { number: "03", title: "Calidad Certificada", description: "Certificado ISO 9001, 14001, 45001. Más de 13 patentes en materiales compuestos." },
    ],
  },
  trust: {
    title: "Cada afirmación, verificable.",
    intro: "Certificaciones, capacidad de I+D, infraestructura logística y soporte de pedidos — documentados y listos para su revisión antes de realizar un solo pedido.",
    metrics: [
      { number: "01", metric: "10", suffix: "+", unit: "Años", title: "Experiencia en Compuestos", text: "Enfocados exclusivamente en fibra de vidrio y fibra de carbono desde 2015, atendiendo aplicaciones industriales exigentes en todo el mundo." },
      { number: "02", metric: "2", suffix: "", unit: "Centros de I+D", title: "Base de Ingeniería", text: "Personal de I+D dedicado lo guía desde la selección de materiales hasta la producción — ingenieros que entienden su proceso." },
      { number: "03", metric: "80", suffix: "%+", unit: "Recompra", title: "Presencia Exportadora", text: "Entrega global estable a América del Norte, Sudeste Asiático, Oriente Medio y Japón/Corea del Sur. FOB, CIF, CFR, EXW — coordinado a sus términos." },
    ],
    certHeading: "Calidad Certificada y Patentes",
    certCount: "Certificados",
    certNote: "Certificado ISO 9001 / ISO 14001 / ISO 45001. Más de 13 patentes de modelo de utilidad.",
    deliveryHeading: "Entrega y Soporte",
    deliveryFlow: "Consulta → Envío",
    logistics: [
      { label: "Base de Producción Dual", text: "Fabricación en Nantong y Taizhou — producción estable y escalable." },
      { label: "240 km al Puerto de Shanghái", text: "Centro logístico listo para exportación con flete marítimo eficiente en todo el mundo." },
      { label: "Términos Comerciales Flexibles", text: "FOB, CIF, CFR, EXW — desde envíos de muestra hasta pedidos a granel." },
    ],
    followUp: "Seguimiento de principio a fin",
    steps: ["Consulta", "Producción", "Inspección", "Envío"],
  },
  cta: {
    title: "Envíe su especificación y reciba una recomendación en 24 h",
    intro: "Cuéntenos sus requisitos. Nuestros ingenieros le brindarán una recomendación a medida en 24 horas.",
    emailPlaceholder: "Su correo electrónico",
    messagePlaceholder: "¿Qué está buscando?",
    sending: "Enviando...",
    submit: "Enviar Consulta",
    successInline: "¡Gracias! Nos pondremos en contacto en 24 horas.",
    error: "Algo salió mal. Inténtelo de nuevo.",
  },
  factory: {
    eyebrow: "Dentro de nuestra fábrica",
    title: "Fábrica real. Stock real. Listo para enviar.",
    intro:
      "Lo que pide es lo que fabricamos — líneas de producción, laboratorios de ensayo y un almacén con stock que puede verificar antes de comprometerse.",
    featureCaption: "Centro de I+D",
    featureTitle: "Investigación propia, de la fórmula al producto final",
    featureText:
      "Instalación de I+D dedicada con líneas piloto, prototipado rápido desde fibra cruda hasta compuesto certificado — más de 13 patentes.",
    tabs: { production: "Línea de producción", testing: "Control de calidad", equipment: "Corte y bobinado", warehouse: "Almacén y envío" },
    note: "Todas las fotos tomadas en nuestras instalaciones. Visitas a fábrica y recorridos por video bienvenidos.",
  },
};

const pt: HomeContent = {
  hero: [
    { title: "Fabricante de Mantas de Carbono, Mantas de Vidro e Papel para Rotores", subtitle: "Materiais OEM para superfícies compósitas, baterias, proteção industrial e rotores dessecantes" },
    { title: "Fabricação de Última Geração", subtitle: "Instalações de produção padronizadas com linhas automatizadas e rigoroso controle de qualidade" },
    { title: "A Confiança de Compradores Globais", subtitle: "Bases de produção duplas a 240 km do Porto de Xangai — FOB, CIF, CFR ou EXW, coordenado aos seus termos" },
  ],
  heroCta: { quote: "Solicitar Orçamento", about: "Sobre Nossa Fabricação" },
  divisions: {
    carbon: { label: "Fibra de Carbono", headline: "Mantas para Camadas Funcionais", description: "Mantas de superfície, condutivas, compostas, agulhadas e para GDL em processos industriais.",
      specs: [
        { label: "Faixa de Gramatura", value: "10–350 g/m²" },
        { label: "Séries de Produto", value: "7" },
        { label: "Personalização", value: "OEM / ODM" },
      ],
      categories: ["Manta de Superfície", "Manta Niquelada", "Manta Compósita", "Manta Agulhada", "Manta para GDL"],
    },
    glass: { label: "Fibra de Vidro", headline: "Mantas e Papel para Rotores", description: "Mantas por via úmida para superfícies, coberturas, paredes, tubulações e baterias, além de papel para rotores dessecantes.",
      specs: [
        { label: "Faixa de Gramatura", value: "30–300 g/m²" },
        { label: "Séries de Produto", value: "8" },
        { label: "Personalização", value: "OEM / ODM" },
      ],
      categories: ["Papel para Rotor", "Véu de Superfície", "Manta para Cobertura", "Manta para Parede", "Manta para Tubulação", "Separador de Bateria"],
    },
  },
  exploreProducts: "Explorar Produtos",
  stats: [
    { value: 10, suffix: "+", label: "Anos de Experiência" },
    { value: 80, suffix: "%+", label: "Recompra de Clientes" },
    { value: 80, suffix: "M", label: "m² Produção Anual" },
    { value: 13, suffix: "+", label: "Patentes Concedidas" },
  ],
  industries: {
    heading: "Setores que Atendemos",
    subtitle: "Compósitos de fibra de carbono e fibra de vidro de alto desempenho — projetados para os setores mais exigentes do mundo.",
    imageNote: "imagem de referência de aplicação industrial",
    items: [
      { title: "Camadas Superficiais de Compósitos", description: "Véus leves para acabamento, condutividade e superfícies funcionais" },
      { title: "Desumidificação Industrial", description: "Papel de fibra de vidro para rotores dessecantes e de peneira molecular" },
      { title: "Construção", description: "Membranas de cobertura, paredes, faces de tubos e camadas superficiais" },
      { title: "Eletrônica de Defesa", description: "Avaliação EMI/RFI e camadas funcionais condutivas" },
      { title: "Nova Energia", description: "Células de combustível, separadores de bateria e sistemas de armazenamento de energia" },
    ],
  },
  whyPartner: {
    title: "Precisão em qualquer escala.",
    intro: "Com mais de 10 anos de experiência em fabricação e parcerias com instituições de pesquisa líderes, entregamos materiais compósitos que atendem às especificações mais exigentes — no prazo, sempre.",
    capabilities: [
      { number: "01", title: "Suporte de Especificação", description: "Revisão de gramatura, largura, ligante e formato do rolo por projeto." },
      { number: "02", title: "Logística Global", description: "Bases de produção duplas, a 240 km do Porto de Xangai. Exportando para América do Norte, Sudeste Asiático, Oriente Médio e Japão/Coreia do Sul." },
      { number: "03", title: "Qualidade Certificada", description: "Certificado ISO 9001, 14001, 45001. Mais de 13 patentes em materiais compósitos." },
    ],
  },
  trust: {
    title: "Cada afirmação, verificável.",
    intro: "Certificações, capacidade de P&D, infraestrutura logística e suporte a pedidos — documentados e prontos para sua análise antes de fazer um único pedido.",
    metrics: [
      { number: "01", metric: "10", suffix: "+", unit: "Anos", title: "Experiência em Compósitos", text: "Focados exclusivamente em fibra de vidro e fibra de carbono desde 2015, atendendo aplicações industriais exigentes em todo o mundo." },
      { number: "02", metric: "2", suffix: "", unit: "Centros de P&D", title: "Base de Engenharia", text: "Equipe de P&D dedicada o orienta da seleção de materiais à produção — engenheiros que entendem o seu processo." },
      { number: "03", metric: "80", suffix: "%+", unit: "Recompra", title: "Presença de Exportação", text: "Entrega global estável para América do Norte, Sudeste Asiático, Oriente Médio e Japão/Coreia do Sul. FOB, CIF, CFR, EXW — coordenado aos seus termos." },
    ],
    certHeading: "Qualidade Certificada e Patentes",
    certCount: "Certificados",
    certNote: "Certificado ISO 9001 / ISO 14001 / ISO 45001. Mais de 13 patentes de modelo de utilidade.",
    deliveryHeading: "Entrega e Suporte",
    deliveryFlow: "Consulta → Embarque",
    logistics: [
      { label: "Base de Produção Dupla", text: "Fabricação em Nantong e Taizhou — produção estável e escalável." },
      { label: "240 km do Porto de Xangai", text: "Hub logístico pronto para exportação com frete marítimo eficiente em todo o mundo." },
      { label: "Termos Comerciais Flexíveis", text: "FOB, CIF, CFR, EXW — de remessas de amostra a pedidos em grande volume." },
    ],
    followUp: "Acompanhamento de ponta a ponta",
    steps: ["Consulta", "Produção", "Inspeção", "Embarque"],
  },
  cta: {
    title: "Envie sua especificação e receba uma recomendação em 24 h",
    intro: "Conte-nos seus requisitos. Nossos engenheiros fornecerão uma recomendação sob medida em 24 horas.",
    emailPlaceholder: "Seu e-mail",
    messagePlaceholder: "O que você está procurando?",
    sending: "Enviando...",
    submit: "Enviar Consulta",
    successInline: "Obrigado! Entraremos em contato em 24 horas.",
    error: "Algo deu errado. Tente novamente.",
  },
  factory: {
    eyebrow: "Dentro da nossa fábrica",
    title: "Fábrica real. Estoque real. Pronto para enviar.",
    intro:
      "O que você pede é o que fabricamos — linhas de produção, laboratórios de ensaio e um armazém com estoque que você pode verificar antes de fechar.",
    featureCaption: "Centro de P&D",
    featureTitle: "Pesquisa própria, da fórmula ao produto final",
    featureText:
      "Instalação de P&D dedicada com linhas piloto, prototipagem rápida da fibra bruta ao compósito certificado — mais de 13 patentes.",
    tabs: { production: "Linha de produção", testing: "Controle de qualidade", equipment: "Corte e bobinamento", warehouse: "Armazém e envio" },
    note: "Todas as fotos tiradas em nossas instalações. Visitas à fábrica e tours por vídeo são bem-vindos.",
  },
};

const zh: HomeContent = {
  hero: [
    { title: "碳毡、玻纤毡与除湿转轮成型纸制造商", subtitle: "面向复合材料表面、电池、工业防护和除湿转轮的OEM材料" },
    { title: "先进制造设施", subtitle: "标准化生产基地，配备自动化生产线和严格质量管控" },
    { title: "深受全球买家信赖", subtitle: "距上海港240公里的双生产基地——FOB、CIF、CFR 或 EXW，按您的条款灵活协调" },
  ],
  heroCta: { quote: "获取报价", about: "了解我们的制造" },
  divisions: {
    carbon: { label: "碳纤维", headline: "面向功能复合层的碳毡", description: "用于功能层和工业复合工艺的表面毡、导电毡、复合毡、针刺毡及燃料电池GDL用毡。",
      specs: [
        { label: "克重范围", value: "10–350 g/m²" },
        { label: "产品系列", value: "7" },
        { label: "定制服务", value: "OEM / ODM" },
      ],
      categories: ["表面毡", "镀镍碳毡", "复合毡", "针刺毡", "燃料电池GDL用毡"],
    },
    glass: { label: "玻璃纤维", headline: "玻纤毡与转轮成型纸", description: "用于表面、屋面、墙面、管道和电池的湿法玻纤毡，以及除湿转轮成型纸。",
      specs: [
        { label: "克重范围", value: "30–300 g/m²" },
        { label: "产品系列", value: "8" },
        { label: "定制服务", value: "OEM / ODM" },
      ],
      categories: ["除湿转轮成型纸", "表面毡", "屋面毡", "墙面毡", "管道包覆毡", "电池隔板"],
    },
  },
  exploreProducts: "浏览产品",
  stats: [
    { value: 10, suffix: "+", label: "年经验" },
    { value: 80, suffix: "%+", label: "客户复购率" },
    { value: 80, suffix: "M", label: "平方米年产量" },
    { value: 13, suffix: "+", label: "授权专利" },
  ],
  industries: {
    heading: "服务行业",
    subtitle: "高性能碳纤维与玻璃纤维复合材料——为全球最苛刻的行业量身定制。",
    imageNote: "行业应用示意图",
    items: [
      { title: "复合材料表面层", description: "用于表面质量、导电和功能层的轻质碳纤维面纱" },
      { title: "工业除湿", description: "用于除湿及分子筛转轮的玻纤成型纸" },
      { title: "建筑工程", description: "屋面卷材、墙面覆盖、管道面层和复合材料表层" },
      { title: "军工电子", description: "EMI/RFI屏蔽评估与导电功能层" },
      { title: "新能源", description: "燃料电池、电池隔膜和储能系统" },
    ],
  },
  whyPartner: {
    title: "每个规模都精准无误。",
    intro: "凭借10年以上制造经验和与顶尖科研机构的合作，我们交付满足最严苛规格要求的复合材料——准时，每一次。",
    capabilities: [
      { number: "01", title: "规格支持", description: "按项目评估克重、幅宽、粘结剂和卷装要求。" },
      { number: "02", title: "全球物流", description: "双生产基地，距上海港240公里。出口北美、东南亚、中东及日韩市场。" },
      { number: "03", title: "质量认证", description: "ISO 9001、14001、45001认证。复合材料领域13+项专利。" },
    ],
  },
  trust: {
    title: "每项声明，可验证。",
    intro: "认证、研发能力、物流基础设施和订单支持——在您下单之前即可审查，一切文档齐备。",
    metrics: [
      { number: "01", metric: "10", suffix: "+", unit: "年", title: "复合材料经验", text: "自2015年起专注玻璃纤维和碳纤维，服务全球严苛工业应用。" },
      { number: "02", metric: "2", suffix: "", unit: "研发中心", title: "工程技术基石", text: "专属研发团队从选材到生产全程指导——了解您工艺的工程师。" },
      { number: "03", metric: "80", suffix: "%+", unit: "复购率", title: "出口足迹", text: "稳定交付北美、东南亚、中东及日韩市场，距上海港240公里。FOB、CIF、CFR、EXW——按您的条款协调。" },
    ],
    certHeading: "认证品质与专利",
    certCount: "项认证",
    certNote: "ISO 9001 / ISO 14001 / ISO 45001认证。13+项实用新型专利。",
    deliveryHeading: "交付与支持",
    deliveryFlow: "询价 → 发货",
    logistics: [
      { label: "双生产基地", text: "南通和泰州制造——稳定、可扩展的产出。" },
      { label: "距上海港240公里", text: "出口就绪的物流枢纽，高效海运覆盖全球。" },
      { label: "灵活贸易条款", text: "FOB、CIF、CFR、EXW——从样品寄送到批量订单。" },
    ],
    followUp: "端到端全程跟踪",
    steps: ["询价", "生产", "检验", "发货"],
  },
  cta: {
    title: "发送您的规格，24小时内获取选型建议",
    intro: "告诉我们您的需求。我们的工程师将在24小时内为您提供定制推荐。",
    emailPlaceholder: "您的邮箱",
    messagePlaceholder: "您在寻找什么？",
    sending: "发送中...",
    submit: "发送询价",
    successInline: "感谢您的咨询！我们将在24小时内联系您。",
    error: "出了点问题，请重试。",
  },
  factory: {
    eyebrow: "走进我们的工厂",
    title: "真实工厂，真实库存，随时发货。",
    intro: "您所订即我们所产——生产线、检测实验室和备货仓库，下单前皆可核验。",
    featureCaption: "研发中心",
    featureTitle: "自主研发，从配方到成品",
    featureText: "配备中试产线的自有研发中心，从原丝到认证复合材料快速打样——已获授权专利13+项。",
    tabs: { production: "生产线", testing: "质量检测", equipment: "分切与复卷", warehouse: "仓储运输" },
    note: "所有照片均摄于自有厂房。欢迎实地参观与视频验厂。",
  },
};

const content: Record<Locale, HomeContent> = { en, zh, ko, es, pt };

export function getHomeContent(locale: Locale): HomeContent {
  return content[locale] ?? content[defaultLocale];
}
