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
  industries: { heading: string; items: { title: string; description: string }[] };
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
};

type DivisionCard = { label: string; headline: string; description: string };

const en: HomeContent = {
  hero: [
    {
      title: "ZeYuSen R&D Center",
      subtitle:
        "Dedicated research facility driving innovation in carbon fiber and fiberglass composite materials",
    },
    {
      title: "Advanced Composite Materials",
      subtitle:
        "From carbon fiber to fiberglass — engineered for the world's most demanding industries",
    },
    {
      title: "State-of-the-Art Manufacturing",
      subtitle:
        "80,000 m² production facility with automated production lines and strict quality control",
    },
  ],
  heroCta: { quote: "Get a Quote", about: "About Our Manufacturing" },
  divisions: {
    carbon: {
      label: "Carbon Fiber",
      headline: "High Performance, Lightweight Solutions",
      description:
        "Ultra-lightweight carbon fiber composites for aerospace, motorsport, and advanced manufacturing. From 10g/m² surface mats to complex hybrid structures.",
    },
    glass: {
      label: "Glass Fiber",
      headline: "Reliable, Cost-Effective Reinforcements",
      description:
        "Corrosion-resistant materials for wind energy, construction, and industrial filtration. Tissue mats, woven cloth, and composite reinforcements.",
    },
  },
  exploreProducts: "Explore Products",
  stats: [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Countries Exported" },
    { value: 80, suffix: "M", label: "Sqm Annual Output" },
    { value: 13, suffix: "+", label: "Patents Granted" },
  ],
  industries: {
    heading: "Industries We Serve",
    items: [
      { title: "Aerospace & Aviation", description: "Structural components, interior panels, and lightweight composites" },
      { title: "Wind Energy", description: "Turbine blades, nacelle covers, and structural reinforcements" },
      { title: "Construction", description: "Insulation, waterproofing, and structural reinforcement materials" },
      { title: "Military & Defense", description: "Ballistic protection, stealth applications, and armored composites" },
      { title: "New Energy", description: "Fuel cells, battery separators, and energy storage systems" },
    ],
  },
  whyPartner: {
    title: "Precision at every scale.",
    intro:
      "With 15+ years of manufacturing expertise and partnerships with leading research institutions, we deliver composite materials that meet the most demanding specifications — on time, every time.",
    capabilities: [
      { number: "01", title: "Custom Engineering", description: "Tailored fiber solutions from 10g/m² to 1200g/m², any specification." },
      { number: "02", title: "Global Logistics", description: "Dual production bases, 240km from Shanghai Port. Exporting to 50+ countries." },
      { number: "03", title: "Quality Certified", description: "ISO 9001, 14001, 45001 certified. 15+ patents in composite materials." },
    ],
  },
  trust: {
    title: "Every claim, verifiable.",
    intro:
      "Certifications, R&D capability, logistics infrastructure, and order support — documented and ready for your review before you place a single order.",
    metrics: [
      { number: "01", metric: "15", suffix: "+", unit: "Years", title: "Composite Experience", text: "Focused exclusively on fiberglass and carbon fiber since 2008, serving demanding industrial applications worldwide." },
      { number: "02", metric: "2", suffix: "", unit: "R&D Centers", title: "Engineering Backbone", text: "Dedicated R&D staff guide you from material selection through production — engineers who understand your process." },
      { number: "03", metric: "50", suffix: "+", unit: "Countries", title: "Export Footprint", text: "Stable global delivery from dual production bases, 240 km to Shanghai Port. FOB, CIF, DDP — coordinated to your terms." },
    ],
    certHeading: "Certified Quality & Patents",
    certCount: "Certificates",
    certNote: "ISO 9001 / ISO 14001 / ISO 45001 certified. 13+ utility model patents.",
    deliveryHeading: "Delivery & Support",
    deliveryFlow: "Inquiry → Shipment",
    logistics: [
      { label: "Dual Production Base", text: "Manufacturing in Nantong and Taizhou — stable, scalable output." },
      { label: "240 km to Shanghai Port", text: "Export-ready logistics hub with efficient sea freight worldwide." },
      { label: "Flexible Trade Terms", text: "FOB, CIF, DDP — sample shipments to bulk orders." },
    ],
    followUp: "End-to-end follow-up",
    steps: ["Inquiry", "Production", "Inspection", "Shipment"],
  },
  cta: {
    title: "Let's Build Something Together",
    intro:
      "Tell us your requirements. Our engineers will provide a tailored recommendation within 24 hours.",
    emailPlaceholder: "Your email",
    messagePlaceholder: "What are you looking for?",
    sending: "Sending...",
    submit: "Send Inquiry",
    successInline: "Thank you! We'll be in touch within 24 hours.",
    error: "Something went wrong. Please try again.",
  },
};

const ko: HomeContent = {
  hero: [
    { title: "ZeYuSen R&D 센터", subtitle: "탄소섬유 및 유리섬유 복합재 혁신을 이끄는 전용 연구 시설" },
    { title: "첨단 복합재 소재", subtitle: "탄소섬유부터 유리섬유까지 — 세계에서 가장 까다로운 산업을 위해 설계됨" },
    { title: "최첨단 제조 시설", subtitle: "자동화 생산 라인과 엄격한 품질 관리를 갖춘 80,000 m² 생산 시설" },
  ],
  heroCta: { quote: "견적 요청", about: "제조 시설 소개" },
  divisions: {
    carbon: { label: "탄소섬유", headline: "고성능 경량 솔루션", description: "항공우주, 모터스포츠 및 첨단 제조를 위한 초경량 탄소섬유 복합재. 10g/m² 표면 매트부터 복잡한 하이브리드 구조까지." },
    glass: { label: "유리섬유", headline: "신뢰할 수 있는 경제적 보강재", description: "풍력에너지, 건설 및 산업용 여과를 위한 내식성 소재. 티슈 매트, 직물 및 복합 보강재." },
  },
  exploreProducts: "제품 둘러보기",
  stats: [
    { value: 10, suffix: "+", label: "년 경력" },
    { value: 50, suffix: "+", label: "수출 국가" },
    { value: 80, suffix: "M", label: "연간 생산량(㎡)" },
    { value: 13, suffix: "+", label: "특허 등록" },
  ],
  industries: {
    heading: "당사가 서비스하는 산업",
    items: [
      { title: "항공우주 & 항공", description: "구조 부품, 인테리어 패널 및 경량 복합재" },
      { title: "풍력에너지", description: "터빈 블레이드, 나셀 커버 및 구조 보강재" },
      { title: "건설", description: "단열, 방수 및 구조 보강 소재" },
      { title: "군용 & 방위", description: "방탄, 스텔스 응용 및 장갑 복합재" },
      { title: "신에너지", description: "연료전지, 배터리 분리막 및 에너지 저장 시스템" },
    ],
  },
  whyPartner: {
    title: "모든 규모에서의 정밀함.",
    intro: "15년 이상의 제조 전문성과 선도적인 연구 기관과의 협력을 통해, 가장 까다로운 사양을 충족하는 복합재 소재를 항상 정시에 제공합니다.",
    capabilities: [
      { number: "01", title: "맞춤 엔지니어링", description: "10g/m²에서 1200g/m²까지, 모든 사양에 맞춘 섬유 솔루션." },
      { number: "02", title: "글로벌 물류", description: "상하이항에서 240km 거리의 이중 생산 거점. 50개국 이상 수출." },
      { number: "03", title: "품질 인증", description: "ISO 9001, 14001, 45001 인증. 복합재 분야 15건 이상 특허." },
    ],
  },
  trust: {
    title: "모든 주장은 검증 가능합니다.",
    intro: "인증, R&D 역량, 물류 인프라 및 주문 지원 — 단 한 건의 주문을 하기 전에 검토할 수 있도록 문서화되어 준비되어 있습니다.",
    metrics: [
      { number: "01", metric: "15", suffix: "+", unit: "년", title: "복합재 경력", text: "2008년부터 유리섬유와 탄소섬유에만 전념하며 전 세계의 까다로운 산업 응용에 서비스를 제공합니다." },
      { number: "02", metric: "2", suffix: "", unit: "R&D 센터", title: "엔지니어링 기반", text: "전담 R&D 인력이 소재 선택부터 생산까지 안내합니다 — 귀하의 공정을 이해하는 엔지니어." },
      { number: "03", metric: "50", suffix: "+", unit: "개국", title: "수출 거점", text: "이중 생산 거점에서 안정적인 글로벌 배송, 상하이항까지 240km. FOB, CIF, DDP — 귀하의 조건에 맞춰 조율." },
    ],
    certHeading: "인증 품질 & 특허",
    certCount: "건의 인증",
    certNote: "ISO 9001 / ISO 14001 / ISO 45001 인증. 13건 이상의 실용신안 특허.",
    deliveryHeading: "배송 & 지원",
    deliveryFlow: "문의 → 출하",
    logistics: [
      { label: "이중 생산 거점", text: "난퉁과 타이저우에서 제조 — 안정적이고 확장 가능한 생산." },
      { label: "상하이항까지 240km", text: "전 세계로 효율적인 해상 운송이 가능한 수출 준비 물류 허브." },
      { label: "유연한 무역 조건", text: "FOB, CIF, DDP — 샘플 배송부터 대량 주문까지." },
    ],
    followUp: "엔드투엔드 후속 관리",
    steps: ["문의", "생산", "검사", "출하"],
  },
  cta: {
    title: "함께 만들어 갑시다",
    intro: "요구사항을 알려주세요. 당사 엔지니어가 24시간 이내에 맞춤 추천을 제공합니다.",
    emailPlaceholder: "이메일",
    messagePlaceholder: "무엇을 찾고 계신가요?",
    sending: "전송 중...",
    submit: "문의하기",
    successInline: "감사합니다! 24시간 이내에 연락드리겠습니다.",
    error: "오류가 발생했습니다. 다시 시도해 주세요.",
  },
};

const es: HomeContent = {
  hero: [
    { title: "Centro de I+D de ZeYuSen", subtitle: "Instalación de investigación dedicada que impulsa la innovación en materiales compuestos de fibra de carbono y fibra de vidrio" },
    { title: "Materiales Compuestos Avanzados", subtitle: "De la fibra de carbono a la fibra de vidrio — diseñados para las industrias más exigentes del mundo" },
    { title: "Fabricación de Vanguardia", subtitle: "Planta de producción de 80.000 m² con líneas automatizadas y estricto control de calidad" },
  ],
  heroCta: { quote: "Solicitar Cotización", about: "Sobre Nuestra Fabricación" },
  divisions: {
    carbon: { label: "Fibra de Carbono", headline: "Soluciones Ligeras de Alto Rendimiento", description: "Compuestos de fibra de carbono ultraligeros para aeroespacial, automovilismo y fabricación avanzada. Desde esteras de superficie de 10g/m² hasta estructuras híbridas complejas." },
    glass: { label: "Fibra de Vidrio", headline: "Refuerzos Fiables y Económicos", description: "Materiales resistentes a la corrosión para energía eólica, construcción y filtración industrial. Velos, tejidos y refuerzos compuestos." },
  },
  exploreProducts: "Explorar Productos",
  stats: [
    { value: 10, suffix: "+", label: "Años de Experiencia" },
    { value: 50, suffix: "+", label: "Países de Exportación" },
    { value: 80, suffix: "M", label: "m² Producción Anual" },
    { value: 13, suffix: "+", label: "Patentes Concedidas" },
  ],
  industries: {
    heading: "Sectores que Atendemos",
    items: [
      { title: "Aeroespacial y Aviación", description: "Componentes estructurales, paneles interiores y compuestos ligeros" },
      { title: "Energía Eólica", description: "Palas de turbina, cubiertas de góndola y refuerzos estructurales" },
      { title: "Construcción", description: "Materiales de aislamiento, impermeabilización y refuerzo estructural" },
      { title: "Militar y Defensa", description: "Protección balística, aplicaciones furtivas y compuestos blindados" },
      { title: "Nueva Energía", description: "Celdas de combustible, separadores de batería y sistemas de almacenamiento de energía" },
    ],
  },
  whyPartner: {
    title: "Precisión a cualquier escala.",
    intro: "Con más de 15 años de experiencia en fabricación y alianzas con instituciones de investigación líderes, entregamos materiales compuestos que cumplen las especificaciones más exigentes — a tiempo, siempre.",
    capabilities: [
      { number: "01", title: "Ingeniería Personalizada", description: "Soluciones de fibra a medida de 10g/m² a 1200g/m², cualquier especificación." },
      { number: "02", title: "Logística Global", description: "Bases de producción duales, a 240 km del Puerto de Shanghái. Exportando a más de 50 países." },
      { number: "03", title: "Calidad Certificada", description: "Certificado ISO 9001, 14001, 45001. Más de 15 patentes en materiales compuestos." },
    ],
  },
  trust: {
    title: "Cada afirmación, verificable.",
    intro: "Certificaciones, capacidad de I+D, infraestructura logística y soporte de pedidos — documentados y listos para su revisión antes de realizar un solo pedido.",
    metrics: [
      { number: "01", metric: "15", suffix: "+", unit: "Años", title: "Experiencia en Compuestos", text: "Enfocados exclusivamente en fibra de vidrio y fibra de carbono desde 2008, atendiendo aplicaciones industriales exigentes en todo el mundo." },
      { number: "02", metric: "2", suffix: "", unit: "Centros de I+D", title: "Base de Ingeniería", text: "Personal de I+D dedicado lo guía desde la selección de materiales hasta la producción — ingenieros que entienden su proceso." },
      { number: "03", metric: "50", suffix: "+", unit: "Países", title: "Presencia Exportadora", text: "Entrega global estable desde bases de producción duales, a 240 km del Puerto de Shanghái. FOB, CIF, DDP — coordinado a sus términos." },
    ],
    certHeading: "Calidad Certificada y Patentes",
    certCount: "Certificados",
    certNote: "Certificado ISO 9001 / ISO 14001 / ISO 45001. Más de 13 patentes de modelo de utilidad.",
    deliveryHeading: "Entrega y Soporte",
    deliveryFlow: "Consulta → Envío",
    logistics: [
      { label: "Base de Producción Dual", text: "Fabricación en Nantong y Taizhou — producción estable y escalable." },
      { label: "240 km al Puerto de Shanghái", text: "Centro logístico listo para exportación con flete marítimo eficiente en todo el mundo." },
      { label: "Términos Comerciales Flexibles", text: "FOB, CIF, DDP — desde envíos de muestra hasta pedidos a granel." },
    ],
    followUp: "Seguimiento de principio a fin",
    steps: ["Consulta", "Producción", "Inspección", "Envío"],
  },
  cta: {
    title: "Construyamos Algo Juntos",
    intro: "Cuéntenos sus requisitos. Nuestros ingenieros le brindarán una recomendación a medida en 24 horas.",
    emailPlaceholder: "Su correo electrónico",
    messagePlaceholder: "¿Qué está buscando?",
    sending: "Enviando...",
    submit: "Enviar Consulta",
    successInline: "¡Gracias! Nos pondremos en contacto en 24 horas.",
    error: "Algo salió mal. Inténtelo de nuevo.",
  },
};

const pt: HomeContent = {
  hero: [
    { title: "Centro de P&D da ZeYuSen", subtitle: "Instalação de pesquisa dedicada que impulsiona a inovação em materiais compósitos de fibra de carbono e fibra de vidro" },
    { title: "Materiais Compósitos Avançados", subtitle: "Da fibra de carbono à fibra de vidro — projetados para os setores mais exigentes do mundo" },
    { title: "Fabricação de Última Geração", subtitle: "Planta de produção de 80.000 m² com linhas automatizadas e rigoroso controle de qualidade" },
  ],
  heroCta: { quote: "Solicitar Orçamento", about: "Sobre Nossa Fabricação" },
  divisions: {
    carbon: { label: "Fibra de Carbono", headline: "Soluções Leves de Alto Desempenho", description: "Compósitos de fibra de carbono ultraleves para aeroespacial, automobilismo e manufatura avançada. De mantas de superfície de 10g/m² a estruturas híbridas complexas." },
    glass: { label: "Fibra de Vidro", headline: "Reforços Confiáveis e Econômicos", description: "Materiais resistentes à corrosão para energia eólica, construção e filtração industrial. Véus, tecidos e reforços compostos." },
  },
  exploreProducts: "Explorar Produtos",
  stats: [
    { value: 10, suffix: "+", label: "Anos de Experiência" },
    { value: 50, suffix: "+", label: "Países de Exportação" },
    { value: 80, suffix: "M", label: "m² Produção Anual" },
    { value: 13, suffix: "+", label: "Patentes Concedidas" },
  ],
  industries: {
    heading: "Setores que Atendemos",
    items: [
      { title: "Aeroespacial e Aviação", description: "Componentes estruturais, painéis internos e compósitos leves" },
      { title: "Energia Eólica", description: "Pás de turbina, capôs de nacele e reforços estruturais" },
      { title: "Construção", description: "Materiais de isolamento, impermeabilização e reforço estrutural" },
      { title: "Militar e Defesa", description: "Proteção balística, aplicações furtivas e compósitos blindados" },
      { title: "Nova Energia", description: "Células de combustível, separadores de bateria e sistemas de armazenamento de energia" },
    ],
  },
  whyPartner: {
    title: "Precisão em qualquer escala.",
    intro: "Com mais de 15 anos de experiência em fabricação e parcerias com instituições de pesquisa líderes, entregamos materiais compósitos que atendem às especificações mais exigentes — no prazo, sempre.",
    capabilities: [
      { number: "01", title: "Engenharia Personalizada", description: "Soluções de fibra sob medida de 10g/m² a 1200g/m², qualquer especificação." },
      { number: "02", title: "Logística Global", description: "Bases de produção duplas, a 240 km do Porto de Xangai. Exportando para mais de 50 países." },
      { number: "03", title: "Qualidade Certificada", description: "Certificado ISO 9001, 14001, 45001. Mais de 15 patentes em materiais compósitos." },
    ],
  },
  trust: {
    title: "Cada afirmação, verificável.",
    intro: "Certificações, capacidade de P&D, infraestrutura logística e suporte a pedidos — documentados e prontos para sua análise antes de fazer um único pedido.",
    metrics: [
      { number: "01", metric: "15", suffix: "+", unit: "Anos", title: "Experiência em Compósitos", text: "Focados exclusivamente em fibra de vidro e fibra de carbono desde 2008, atendendo aplicações industriais exigentes em todo o mundo." },
      { number: "02", metric: "2", suffix: "", unit: "Centros de P&D", title: "Base de Engenharia", text: "Equipe de P&D dedicada o orienta da seleção de materiais à produção — engenheiros que entendem o seu processo." },
      { number: "03", metric: "50", suffix: "+", unit: "Países", title: "Presença de Exportação", text: "Entrega global estável a partir de bases de produção duplas, a 240 km do Porto de Xangai. FOB, CIF, DDP — coordenado aos seus termos." },
    ],
    certHeading: "Qualidade Certificada e Patentes",
    certCount: "Certificados",
    certNote: "Certificado ISO 9001 / ISO 14001 / ISO 45001. Mais de 13 patentes de modelo de utilidade.",
    deliveryHeading: "Entrega e Suporte",
    deliveryFlow: "Consulta → Embarque",
    logistics: [
      { label: "Base de Produção Dupla", text: "Fabricação em Nantong e Taizhou — produção estável e escalável." },
      { label: "240 km do Porto de Xangai", text: "Hub logístico pronto para exportação com frete marítimo eficiente em todo o mundo." },
      { label: "Termos Comerciais Flexíveis", text: "FOB, CIF, DDP — de remessas de amostra a pedidos em grande volume." },
    ],
    followUp: "Acompanhamento de ponta a ponta",
    steps: ["Consulta", "Produção", "Inspeção", "Embarque"],
  },
  cta: {
    title: "Vamos Construir Algo Juntos",
    intro: "Conte-nos seus requisitos. Nossos engenheiros fornecerão uma recomendação sob medida em 24 horas.",
    emailPlaceholder: "Seu e-mail",
    messagePlaceholder: "O que você está procurando?",
    sending: "Enviando...",
    submit: "Enviar Consulta",
    successInline: "Obrigado! Entraremos em contato em 24 horas.",
    error: "Algo deu errado. Tente novamente.",
  },
};

const zh: HomeContent = {
  hero: [
    { title: "泽宇森研发中心", subtitle: "专注碳纤维和玻璃纤维复合材料创新的研发设施" },
    { title: "先进复合材料", subtitle: "从碳纤维到玻璃纤维——为全球最严苛行业而设计" },
    { title: "先进制造设施", subtitle: "80,000平方米生产基地，配备自动化生产线和严格质量管控" },
  ],
  heroCta: { quote: "获取报价", about: "了解我们的制造" },
  divisions: {
    carbon: { label: "碳纤维", headline: "高性能轻量化解决方案", description: "用于航空航天、赛车运动和先进制造的超轻碳纤维复合材料。从10g/m²表面毡到复杂混合结构。" },
    glass: { label: "玻璃纤维", headline: "可靠、经济的增强材料", description: "用于风电、建筑和工业过滤的耐腐蚀材料。薄毡、织物和复合增强材料。" },
  },
  exploreProducts: "浏览产品",
  stats: [
    { value: 10, suffix: "+", label: "年经验" },
    { value: 50, suffix: "+", label: "出口国家" },
    { value: 80, suffix: "M", label: "平方米年产量" },
    { value: 13, suffix: "+", label: "授权专利" },
  ],
  industries: {
    heading: "服务行业",
    items: [
      { title: "航空航天", description: "结构件、内饰面板和轻量化复合材料" },
      { title: "风力发电", description: "涡轮叶片、机舱罩和结构增强材料" },
      { title: "建筑工程", description: "保温、防水和结构加固材料" },
      { title: "军工国防", description: "防弹防护、隐身应用和装甲复合材料" },
      { title: "新能源", description: "燃料电池、电池隔膜和储能系统" },
    ],
  },
  whyPartner: {
    title: "每个规模都精准无误。",
    intro: "凭借15年以上制造经验和与顶尖科研机构的合作，我们交付满足最严苛规格要求的复合材料——准时，每一次。",
    capabilities: [
      { number: "01", title: "定制工程", description: "从10g/m²到1200g/m²，任何规格的定制纤维解决方案。" },
      { number: "02", title: "全球物流", description: "双生产基地，距上海港240公里。出口50+国家。" },
      { number: "03", title: "质量认证", description: "ISO 9001、14001、45001认证。复合材料领域15+项专利。" },
    ],
  },
  trust: {
    title: "每项声明，可验证。",
    intro: "认证、研发能力、物流基础设施和订单支持——在您下单之前即可审查，一切文档齐备。",
    metrics: [
      { number: "01", metric: "15", suffix: "+", unit: "年", title: "复合材料经验", text: "自2008年起专注玻璃纤维和碳纤维，服务全球严苛工业应用。" },
      { number: "02", metric: "2", suffix: "", unit: "研发中心", title: "工程技术基石", text: "专属研发团队从选材到生产全程指导——了解您工艺的工程师。" },
      { number: "03", metric: "50", suffix: "+", unit: "国家", title: "出口足迹", text: "双基地稳定全球交付，距上海港240公里。FOB、CIF、DDP——按您的条款协调。" },
    ],
    certHeading: "认证品质与专利",
    certCount: "项认证",
    certNote: "ISO 9001 / ISO 14001 / ISO 45001认证。13+项实用新型专利。",
    deliveryHeading: "交付与支持",
    deliveryFlow: "询价 → 发货",
    logistics: [
      { label: "双生产基地", text: "南通和泰州制造——稳定、可扩展的产出。" },
      { label: "距上海港240公里", text: "出口就绪的物流枢纽，高效海运覆盖全球。" },
      { label: "灵活贸易条款", text: "FOB、CIF、DDP——从样品寄送到批量订单。" },
    ],
    followUp: "端到端全程跟踪",
    steps: ["询价", "生产", "检验", "发货"],
  },
  cta: {
    title: "让我们一起创造",
    intro: "告诉我们您的需求。我们的工程师将在24小时内为您提供定制推荐。",
    emailPlaceholder: "您的邮箱",
    messagePlaceholder: "您在寻找什么？",
    sending: "发送中...",
    submit: "发送询价",
    successInline: "感谢您的咨询！我们将在24小时内联系您。",
    error: "出了点问题，请重试。",
  },
};

const content: Record<Locale, HomeContent> = { en, zh, ko, es, pt };

export function getHomeContent(locale: Locale): HomeContent {
  return content[locale] ?? content[defaultLocale];
}
