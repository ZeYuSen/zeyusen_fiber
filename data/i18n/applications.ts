// Application translations (detail pages + overview group cards). Generated +
// human-reviewed; merged over the English base with per-field fallback.

export type ApplicationDetailTranslation = {
  title?: string;
  metaDescription?: string;
  headline?: string;
  description?: string;
  benefits?: string[];
  products?: string[]; // display names only, by index
};
export type ApplicationDetailTranslations = Record<string, ApplicationDetailTranslation>;

export type ApplicationGroupTranslation = {
  label?: string;
  eyebrow?: string;
  summary?: string;
  applications?: Record<string, { title?: string; description?: string; products?: string[] }>;
};
export type ApplicationGroupTranslations = Record<string, ApplicationGroupTranslation>;

export const applicationDetailsKo: ApplicationDetailTranslations = {
  "aerospace": {
    "title": "항공우주 및 항공",
    "metaDescription": "항공기 구조 부품, 내부 패널, 경량 항공 솔루션을 위한 고성능 탄소섬유 복합재.",
    "headline": "하늘을 위해 설계된",
    "description": "항공우주 산업은 뛰어난 강도와 최소한의 무게를 결합한 소재를 요구합니다. 당사의 탄소섬유 솔루션은 항공기 구조 부품, 위성 시스템, UAV 프레임, 기내 패널에 특화 설계되었습니다.",
    "benefits": [
      "초경량: 알루미늄 합금 대비 최대 70% 경량",
      "연장된 서비스 수명을 위한 뛰어난 피로 저항성",
      "300°C까지의 고온 안정성",
      "우수한 진동 감쇠 특성",
      "극한 환경에서의 무부식 성능",
      "10g/m²부터 600g/m²까지 맞춤 중량 사양"
    ],
    "products": [
      "Carbon Fiber Surface Mat 10g",
      "Carbon Fiber Needled Mat",
      "Carbon-Glass Hybrid Cloth"
    ]
  },
  "military-defense": {
    "title": "군사 및 국방",
    "metaDescription": "EMI 차폐, 방탄 보호, 스텔스 응용을 위한 특수 탄소섬유 소재.",
    "headline": "혁신을 통한 보호",
    "description": "현대 방위 시스템은 전자기 차폐, 구조적 무결성, 스텔스 기능을 제공하는 소재를 필요로 합니다. 당사의 니켈 도금 탄소섬유 매트는 경량 프로파일을 유지하면서 우수한 EMI/RFI 차폐 성능을 제공합니다.",
    "benefits": [
      "우수한 EMI/RFI 차폐 효과 (60-90 dB)",
      "경량 방탄 보호 솔루션",
      "레이더 흡수 소재 (RAM) 기능",
      "내화학성 및 내부식성",
      "높은 충격 강도와 손상 허용성",
      "기밀 응용을 위한 맞춤 사양"
    ],
    "products": [
      "Nickel-Plated Carbon Fiber Mat",
      "Carbon Fiber Composite Mat",
      "Carbon Fiber Surface Mat 10g"
    ]
  },
  "new-energy": {
    "title": "신에너지",
    "metaDescription": "수소 연료전지 GDL, 배터리 분리막, 에너지 저장 시스템을 위한 고급 탄소섬유 소재.",
    "headline": "미래 에너지를 구동하다",
    "description": "청정에너지로의 전환은 뛰어난 전기 전도성과 화학적 안정성을 갖춘 고급 소재를 요구합니다. 당사의 초박형 탄소섬유 매트는 수소 연료전지의 가스확산층(GDL)과 고급 배터리의 분리막으로 사용됩니다.",
    "benefits": [
      "가스확산층 응용에 최적화된 기공률",
      "우수한 전기 전도성 (< 5 mΩ·cm²)",
      "산성 및 알칼리 환경에서의 화학적 안정성",
      "연료전지 응용을 위한 10g/m²부터 시작하는 초박형 옵션",
      "일관된 두께 균일성 (±5%)",
      "상업용 에너지 시스템을 위한 확장 가능한 생산"
    ],
    "products": [
      "Carbon Fiber Surface Mat 10g",
      "Carbon Fiber Surface Mat 20g",
      "Carbon-Glass Hybrid Mat"
    ]
  },
  "wind-energy": {
    "title": "풍력 에너지",
    "metaDescription": "풍력 터빈 블레이드, 나셀 커버, 구조 부품을 위한 고성능 유리섬유 보강재.",
    "headline": "재생 에너지를 강화하다",
    "description": "풍력 에너지는 재생 에너지 발전에서 가장 빠르게 성장하는 분야 중 하나이며, 유리섬유 복합재는 터빈 블레이드 제조의 핵심입니다. 당사의 다축 직물과 복합 매트는 블레이드 생산에 특화 설계되었습니다.",
    "benefits": [
      "블레이드 스파 캡과 쉘에 최적화된 다축 직물",
      "20년 이상의 서비스 수명을 위한 뛰어난 피로 저항성",
      "보이드 없는 적층을 위한 우수한 수지 주입 특성",
      "예측 가능한 기계적 특성을 위한 일관된 섬유 분포",
      "에폭시, 폴리에스테르, 비닐에스테르 수지 시스템과 호환",
      "300g/m²부터 1200g/m²까지의 중량 제공"
    ],
    "products": [
      "Multiaxial Fabric",
      "Unidirectional Fabric",
      "Stitched Composite Mat"
    ]
  },
  "construction": {
    "title": "건설",
    "metaDescription": "건설 분야의 지붕 방수, 단열, 구조 보강을 위한 내구성 유리섬유 소재.",
    "headline": "더 강한 기초를 구축하다",
    "description": "건설 산업은 방수 멤브레인, 지붕 시스템, 파이프 단열, 구조 보강을 위해 유리섬유 소재를 활용합니다. 당사의 티슈 매트는 SBS/APP 개질 비투멘 멤브레인에 우수한 표면 품질을 제공합니다.",
    "benefits": [
      "열 사이클에서의 우수한 치수 안정성",
      "비투멘 및 폴리머 개질 시스템과의 우수한 접합성",
      "콘크리트 보강을 위한 내알칼리성 옵션",
      "구조 응용을 위한 경량 고강도",
      "외부 응용을 위한 UV 및 습기 저항성",
      "난연 등급 제공 (Class A 등급)"
    ],
    "products": [
      "Surface Tissue Mat",
      "Chopped Strand Mat",
      "Woven Roving"
    ]
  }
};

export const applicationGroupsKo: ApplicationGroupTranslations = {
  "carbon": {
    "label": "탄소섬유",
    "eyebrow": "탄소섬유 응용 분야",
    "summary": "성능이 중요한 산업을 위한 경량, 전도성, 고강도 소재.",
    "applications": {
      "aerospace": {
        "title": "항공우주 및 항공",
        "description": "구조 부품, 내부 패널, 첨단 항공우주 응용을 위한 초경량 탄소섬유 복합재.",
        "products": [
          "Carbon Fiber Surface Mat 10g",
          "Carbon Fiber Needled Mat",
          "Carbon Fiber Yarn"
        ]
      },
      "motorsport": {
        "title": "모터스포츠 및 자동차",
        "description": "바디 패널, 구조 보강, 경량 부품을 위한 고성능 탄소섬유 소재.",
        "products": [
          "Carbon-Glass Hybrid Woven Cloth",
          "Carbon Fiber Twill Cloth",
          "Carbon Fiber Plain Cloth"
        ]
      },
      "new-energy": {
        "title": "신에너지 및 연료전지",
        "description": "수소 연료전지 GDL, 배터리 분리막, 에너지 저장 시스템을 위한 고급 탄소섬유 소재.",
        "products": [
          "Carbon Fiber Surface Mat 10g",
          "Carbon Fiber Surface Mat 20g",
          "Carbon-Glass Hybrid Mat"
        ]
      },
      "military-defense": {
        "title": "군사 및 국방",
        "description": "전자기 차폐, 방탄 보호, 스텔스 응용을 위한 특수 탄소섬유 솔루션.",
        "products": [
          "Nickel-Plated Carbon Fiber Mat",
          "Carbon Fiber Surface Mat 10g",
          "Carbon Fiber Composite Mat"
        ]
      },
      "manufacturing": {
        "title": "고급 제조",
        "description": "인발 공정, 금형 제작, 첨단 복합재 제조를 위한 프리미엄 탄소섬유 소재.",
        "products": [
          "Carbon Fiber Composite Mat",
          "Carbon Fiber Needled Mat",
          "Short Cut Carbon Fiber"
        ]
      }
    }
  },
  "glass": {
    "label": "유리섬유",
    "eyebrow": "유리섬유 응용 분야",
    "summary": "에너지, 건설, 운송, 산업용 비용 효율적이고 내부식성 있는 보강재.",
    "applications": {
      "wind-energy": {
        "title": "풍력 에너지",
        "description": "터빈 블레이드, 나셀 커버, 구조 부품을 위한 고성능 유리섬유 보강재.",
        "products": [
          "Biaxial Stitched Mat",
          "Multiaxial Stitched Mat",
          "Unidirectional Cloth"
        ]
      },
      "construction": {
        "title": "건설 및 건축",
        "description": "단열, 방수 멤브레인, 벽 마감재, 구조 보강을 위한 내구성 유리섬유 소재.",
        "products": [
          "Surface Tissue Mat",
          "Black Tissue Facing",
          "Roofing Tissue Mat"
        ]
      },
      "industrial-filtration": {
        "title": "산업용 여과",
        "description": "고온 여과, 화학 공정, 환경 보호를 위한 특수 섬유 소재.",
        "products": [
          "Basalt Fiber Mat",
          "Knitted Stitched Mat",
          "Chopped Strand Mat"
        ]
      },
      "transportation": {
        "title": "운송 및 철도",
        "description": "고속철도 내부, 자동차 부품, 운송 인프라를 위한 경량 복합재.",
        "products": [
          "PP Core Sandwich Mat",
          "Composite Mat",
          "Woven Roving"
        ]
      },
      "marine": {
        "title": "해양 및 부식 방지",
        "description": "조선, 화학 저장 탱크, 해양 인프라를 위한 내부식성 유리섬유 솔루션.",
        "products": [
          "Woven Roving",
          "Chopped Strand Mat",
          "Surface Tissue Mat"
        ]
      }
    }
  }
};

export const applicationDetailsEs: ApplicationDetailTranslations = {
  "aerospace": {
    "title": "Aeroespacial y Aviación",
    "metaDescription": "Composites de fibra de carbono de alto rendimiento para componentes estructurales aeroespaciales, paneles de cabina y soluciones de aviación ligeras.",
    "headline": "Diseñado para el Cielo",
    "description": "La industria aeroespacial exige materiales que combinen una resistencia excepcional con el mínimo peso. Nuestras soluciones de fibra de carbono están específicamente diseñadas para componentes estructurales de aeronaves, sistemas satelitales, bastidores de UAV y paneles de cabina.",
    "benefits": [
      "Ultraligero: hasta un 70% más ligero que las aleaciones de aluminio",
      "Resistencia excepcional a la fatiga para una vida útil prolongada",
      "Estabilidad a alta temperatura de hasta 300°C",
      "Excelentes propiedades de amortiguación de vibraciones",
      "Rendimiento libre de corrosión en entornos extremos",
      "Especificaciones de peso personalizadas de 10g/m² a 600g/m²"
    ],
    "products": [
      "Carbon Fiber Surface Mat 10g",
      "Carbon Fiber Needled Mat",
      "Carbon-Glass Hybrid Cloth"
    ]
  },
  "military-defense": {
    "title": "Militar y Defensa",
    "metaDescription": "Materiales especializados de fibra de carbono para blindaje EMI, protección balística y aplicaciones de sigilo.",
    "headline": "Protección a Través de la Innovación",
    "description": "Los sistemas de defensa modernos requieren materiales que proporcionen blindaje electromagnético, integridad estructural y capacidades de sigilo. Nuestros mats de fibra de carbono niquelados ofrecen una protección EMI/RFI superior manteniendo perfiles ligeros.",
    "benefits": [
      "Eficacia de blindaje EMI/RFI superior (60-90 dB)",
      "Soluciones de protección balística de bajo peso",
      "Capacidades de material absorbente de radar (RAM)",
      "Resistencia química y a la corrosión",
      "Alta resistencia al impacto y tolerancia al daño",
      "Especificaciones personalizadas para aplicaciones clasificadas"
    ],
    "products": [
      "Nickel-Plated Carbon Fiber Mat",
      "Carbon Fiber Composite Mat",
      "Carbon Fiber Surface Mat 10g"
    ]
  },
  "new-energy": {
    "title": "Nuevas Energías",
    "metaDescription": "Materiales avanzados de fibra de carbono para GDL de pilas de combustible de hidrógeno, separadores de baterías y sistemas de almacenamiento de energía.",
    "headline": "Impulsando la Energía del Mañana",
    "description": "La transición hacia la energía limpia exige materiales avanzados con una conductividad eléctrica excepcional y estabilidad química. Nuestros mats de fibra de carbono ultrafinos actúan como capas de difusión de gas (GDL) en pilas de combustible de hidrógeno y como separadores en baterías avanzadas.",
    "benefits": [
      "Porosidad optimizada para aplicaciones de capa de difusión de gas",
      "Excelente conductividad eléctrica (< 5 mΩ·cm²)",
      "Estabilidad química en entornos ácidos y alcalinos",
      "Opciones ultrafinas desde 10g/m² para aplicaciones de pilas de combustible",
      "Uniformidad de espesor consistente (±5%)",
      "Producción escalable para sistemas de energía comercial"
    ],
    "products": [
      "Carbon Fiber Surface Mat 10g",
      "Carbon Fiber Surface Mat 20g",
      "Carbon-Glass Hybrid Mat"
    ]
  },
  "wind-energy": {
    "title": "Energía Eólica",
    "metaDescription": "Refuerzos de fibra de vidrio de alto rendimiento para palas de aerogeneradores, cubiertas de góndola y componentes estructurales.",
    "headline": "Reforzando las Energías Renovables",
    "description": "La energía eólica es uno de los sectores de más rápido crecimiento en la generación de energía renovable, y los composites de fibra de vidrio son el núcleo de la fabricación de palas de aerogeneradores. Nuestros tejidos multiaxiales y mats composite están específicamente diseñados para la producción de palas.",
    "benefits": [
      "Tejidos multiaxiales optimizados para largueros y carcasas de palas",
      "Excelente resistencia a la fatiga para una vida útil de más de 20 años",
      "Características superiores de infusión de resina para laminados sin vacíos",
      "Distribución consistente de fibras para propiedades mecánicas predecibles",
      "Compatible con sistemas de resina epoxi, poliéster y éster vinílico",
      "Disponible en pesos de 300g/m² a 1200g/m²"
    ],
    "products": [
      "Multiaxial Fabric",
      "Unidirectional Fabric",
      "Stitched Composite Mat"
    ]
  },
  "construction": {
    "title": "Construcción",
    "metaDescription": "Materiales de fibra de vidrio duraderos para cubiertas, impermeabilización, aislamiento y refuerzo estructural en la construcción.",
    "headline": "Construyendo Cimientos Más Sólidos",
    "description": "La industria de la construcción depende de los materiales de fibra de vidrio para membranas impermeabilizantes, sistemas de cubierta, aislamiento de tuberías y refuerzo estructural. Nuestros mats de tissue ofrecen una excelente calidad superficial para membranas bituminosas modificadas SBS/APP.",
    "benefits": [
      "Excelente estabilidad dimensional bajo ciclos térmicos",
      "Adherencia superior con sistemas de betún y polímeros modificados",
      "Opciones resistentes a los álcalis para el refuerzo de hormigón",
      "Ligero pero de alta resistencia para aplicaciones estructurales",
      "Resistente a los rayos UV y la humedad para aplicaciones exteriores",
      "Grados ignífugos disponibles (Clase A)"
    ],
    "products": [
      "Surface Tissue Mat",
      "Chopped Strand Mat",
      "Woven Roving"
    ]
  }
};

export const applicationGroupsEs: ApplicationGroupTranslations = {
  "carbon": {
    "label": "Fibra de Carbono",
    "eyebrow": "Aplicaciones de Fibra de Carbono",
    "summary": "Materiales ligeros, conductivos y de alta resistencia para industrias de alto rendimiento.",
    "applications": {
      "aerospace": {
        "title": "Aeroespacial y Aviación",
        "description": "Composites de fibra de carbono ultraligeros para componentes estructurales, paneles de cabina y aplicaciones aeroespaciales avanzadas.",
        "products": [
          "Carbon Fiber Surface Mat 10g",
          "Carbon Fiber Needled Mat",
          "Carbon Fiber Yarn"
        ]
      },
      "motorsport": {
        "title": "Competición y Automoción",
        "description": "Materiales de fibra de carbono de alto rendimiento para paneles de carrocería, refuerzo estructural y componentes ligeros.",
        "products": [
          "Carbon-Glass Hybrid Woven Cloth",
          "Carbon Fiber Twill Cloth",
          "Carbon Fiber Plain Cloth"
        ]
      },
      "new-energy": {
        "title": "Nuevas Energías y Pilas de Combustible",
        "description": "Materiales avanzados de fibra de carbono para GDL de pilas de combustible de hidrógeno, separadores de baterías y sistemas de almacenamiento de energía.",
        "products": [
          "Carbon Fiber Surface Mat 10g",
          "Carbon Fiber Surface Mat 20g",
          "Carbon-Glass Hybrid Mat"
        ]
      },
      "military-defense": {
        "title": "Militar y Defensa",
        "description": "Soluciones especializadas de fibra de carbono para blindaje electromagnético, protección balística y aplicaciones de sigilo.",
        "products": [
          "Nickel-Plated Carbon Fiber Mat",
          "Carbon Fiber Surface Mat 10g",
          "Carbon Fiber Composite Mat"
        ]
      },
      "manufacturing": {
        "title": "Fabricación de Alta Gama",
        "description": "Materiales premium de fibra de carbono para procesos de pultrusión, fabricación de moldes y manufactura avanzada de composites.",
        "products": [
          "Carbon Fiber Composite Mat",
          "Carbon Fiber Needled Mat",
          "Short Cut Carbon Fiber"
        ]
      }
    }
  },
  "glass": {
    "label": "Fibra de Vidrio",
    "eyebrow": "Aplicaciones de Fibra de Vidrio",
    "summary": "Refuerzos rentables y resistentes a la corrosión para energía, construcción, transporte e industria.",
    "applications": {
      "wind-energy": {
        "title": "Energía Eólica",
        "description": "Refuerzos de fibra de vidrio de alto rendimiento para palas de aerogeneradores, cubiertas de góndola y componentes estructurales.",
        "products": [
          "Biaxial Stitched Mat",
          "Multiaxial Stitched Mat",
          "Unidirectional Cloth"
        ]
      },
      "construction": {
        "title": "Construcción y Edificación",
        "description": "Materiales de fibra de vidrio duraderos para aislamiento, membranas impermeabilizantes, revestimientos de paredes y refuerzo estructural.",
        "products": [
          "Surface Tissue Mat",
          "Black Tissue Facing",
          "Roofing Tissue Mat"
        ]
      },
      "industrial-filtration": {
        "title": "Filtración Industrial",
        "description": "Materiales de fibra especializados para filtración a alta temperatura, procesamiento químico y protección medioambiental.",
        "products": [
          "Basalt Fiber Mat",
          "Knitted Stitched Mat",
          "Chopped Strand Mat"
        ]
      },
      "transportation": {
        "title": "Transporte y Ferroviario",
        "description": "Materiales composite ligeros para interiores de trenes de alta velocidad, componentes de automoción e infraestructuras de transporte.",
        "products": [
          "PP Core Sandwich Mat",
          "Composite Mat",
          "Woven Roving"
        ]
      },
      "marine": {
        "title": "Marina y Protección contra la Corrosión",
        "description": "Soluciones de fibra de vidrio resistentes a la corrosión para construcción naval, tanques de almacenamiento químico e infraestructuras marinas.",
        "products": [
          "Woven Roving",
          "Chopped Strand Mat",
          "Surface Tissue Mat"
        ]
      }
    }
  }
};

export const applicationDetailsPt: ApplicationDetailTranslations = {
  "aerospace": {
    "title": "Aeroespacial e Aviação",
    "metaDescription": "Compósitos de fibra de carbono de alto desempenho para componentes estruturais aeroespaciais, painéis interiores e soluções de aviação leve.",
    "headline": "Projetado para os Céus",
    "description": "A indústria aeroespacial exige materiais que combinam resistência excepcional com peso mínimo. Nossas soluções em fibra de carbono são especialmente desenvolvidas para componentes estruturais de aeronaves, sistemas de satélites, estruturas de VANTs e painéis de cabine interior.",
    "benefits": [
      "Ultra-leve: até 70% mais leve que ligas de alumínio",
      "Excepcional resistência à fadiga para vida útil prolongada",
      "Estabilidade a altas temperaturas de até 300°C",
      "Excelentes propriedades de amortecimento de vibração",
      "Desempenho livre de corrosão em ambientes extremos",
      "Especificações de peso personalizadas de 10g/m² a 600g/m²"
    ],
    "products": [
      "Manta de Superfície de Fibra de Carbono 10g",
      "Manta Agulhada de Fibra de Carbono",
      "Tecido Híbrido Carbono-Vidro"
    ]
  },
  "military-defense": {
    "title": "Militar e Defesa",
    "metaDescription": "Materiais especializados de fibra de carbono para blindagem EMI, proteção balística e aplicações stealth.",
    "headline": "Proteção Através da Inovação",
    "description": "Os sistemas de defesa modernos exigem materiais que forneçam blindagem eletromagnética, integridade estrutural e capacidades stealth. Nossas mantas de fibra de carbono niqueladas oferecem proteção superior contra EMI/RFI mantendo perfis leves.",
    "benefits": [
      "Eficácia de blindagem EMI/RFI superior (60-90 dB)",
      "Soluções de proteção balística leve",
      "Capacidades de material absorvedor de radar (RAM)",
      "Resistência química e à corrosão",
      "Alta resistência ao impacto e tolerância a danos",
      "Especificações personalizadas para aplicações classificadas"
    ],
    "products": [
      "Manta de Fibra de Carbono Niquelada",
      "Manta Composta de Fibra de Carbono",
      "Manta de Superfície de Fibra de Carbono 10g"
    ]
  },
  "new-energy": {
    "title": "Nova Energia",
    "metaDescription": "Materiais avançados de fibra de carbono para GDL de células de combustível de hidrogênio, separadores de baterias e sistemas de armazenamento de energia.",
    "headline": "Alimentando a Energia do Amanhã",
    "description": "A transição para energia limpa exige materiais avançados com condutividade elétrica excepcional e estabilidade química. Nossas mantas ultrafinas de fibra de carbono atuam como camadas de difusão de gás (GDL) em células de combustível de hidrogênio e como separadores em baterias avançadas.",
    "benefits": [
      "Porosidade otimizada para aplicações de camada de difusão de gás",
      "Excelente condutividade elétrica (< 5 mΩ·cm²)",
      "Estabilidade química em ambientes ácidos e alcalinos",
      "Opções ultrafinas a partir de 10g/m² para aplicações em células de combustível",
      "Uniformidade de espessura consistente (±5%)",
      "Produção escalável para sistemas de energia comercial"
    ],
    "products": [
      "Manta de Superfície de Fibra de Carbono 10g",
      "Manta de Superfície de Fibra de Carbono 20g",
      "Manta Híbrida Carbono-Vidro"
    ]
  },
  "wind-energy": {
    "title": "Energia Eólica",
    "metaDescription": "Reforços de fibra de vidro de alto desempenho para pás de turbinas eólicas, coberturas de nacele e componentes estruturais.",
    "headline": "Reforçando o Poder Renovável",
    "description": "A energia eólica é um dos setores de maior crescimento na geração de energia renovável, e os compósitos de fibra de vidro estão no centro da fabricação de pás de turbinas. Nossas mantas compostas multiaxiais são especificamente desenvolvidas para a produção de pás.",
    "benefits": [
      "Tecidos multiaxiais otimizados para longarinas e cascas de pás",
      "Excelente resistência à fadiga para vida útil de 20+ anos",
      "Características superiores de infusão de resina para laminados sem vazios",
      "Distribuição consistente de fibras para propriedades mecânicas previsíveis",
      "Compatível com sistemas de resina epóxi, poliéster e éster vinílico",
      "Disponível em gramaturas de 300g/m² a 1200g/m²"
    ],
    "products": [
      "Tecido Multiaxial",
      "Tecido Unidirecional",
      "Manta Composta Costurada"
    ]
  },
  "construction": {
    "title": "Construção",
    "metaDescription": "Materiais duráveis de fibra de vidro para impermeabilização, coberturas, isolamento e reforço estrutural na construção civil.",
    "headline": "Construindo Fundações mais Sólidas",
    "description": "A indústria da construção depende de materiais de fibra de vidro para membranas de impermeabilização, sistemas de cobertura, isolamento de tubulações e reforço estrutural. Nossas mantas tissue oferecem excelente qualidade superficial para membranas de betume modificado SBS/APP.",
    "benefits": [
      "Excelente estabilidade dimensional sob ciclagem térmica",
      "Adesão superior com sistemas de betume e polímero modificado",
      "Opções resistentes a álcalis para reforço de concreto",
      "Leve porém de alta resistência para aplicações estruturais",
      "Resistente a UV e umidade para aplicações externas",
      "Grades com retardante de chamas disponíveis (classificação Classe A)"
    ],
    "products": [
      "Manta Tissue de Superfície",
      "Manta de Fios Cortados",
      "Rovings Tecidos"
    ]
  }
};

export const applicationDetailsZh: ApplicationDetailTranslations = {
  "aerospace": {
    "title": "航空航天",
    "metaDescription": "用于航空航天结构件、内饰面板和轻量化航空解决方案的高性能碳纤维复合材料。",
    "headline": "为蓝天而设计",
    "description": "航空航天行业需要兼具卓越强度和最轻重量的材料。我们的碳纤维解决方案专为飞机结构件、卫星系统、无人机框架和客舱内饰面板设计。",
    "benefits": [
      "超轻量：比铝合金减重最高70%",
      "优异的抗疲劳性能延长使用寿命",
      "耐高温至300°C",
      "出色的振动阻尼特性",
      "极端环境下的无腐蚀性能",
      "10g/m²到600g/m²定制克重规格"
    ],
    "products": [
      "碳纤维表面毡 10g",
      "碳纤维针刺毡",
      "碳-玻混合织物"
    ]
  },
  "military-defense": {
    "title": "军工国防",
    "metaDescription": "用于EMI屏蔽、防弹防护和隐身应用的特种碳纤维材料。",
    "headline": "以创新实现防护",
    "description": "现代国防系统需要能提供电磁屏蔽、结构完整性和隐身功能的材料。我们的镀镍碳纤维毡在保持轻量化的同时提供优异的EMI/RFI屏蔽性能。",
    "benefits": [
      "优异的EMI/RFI屏蔽效能（60-90 dB）",
      "轻量化防弹防护解决方案",
      "雷达吸波材料（RAM）能力",
      "耐化学和耐腐蚀性",
      "高冲击强度和损伤容限",
      "保密应用的定制规格"
    ],
    "products": [
      "镀镍碳纤维毡",
      "碳纤维复合毡",
      "碳纤维表面毡 10g"
    ]
  },
  "new-energy": {
    "title": "新能源",
    "metaDescription": "用于氢燃料电池GDL、电池隔膜和储能系统的先进碳纤维材料。",
    "headline": "驱动明天的能源",
    "description": "向清洁能源的转型需要具有卓越导电性和化学稳定性的先进材料。我们的超薄碳纤维毡可用作氢燃料电池的气体扩散层（GDL）和先进电池的隔膜。",
    "benefits": [
      "针对气体扩散层应用优化的孔隙率",
      "优异的电导率（< 5 mΩ·cm²）",
      "酸碱环境下的化学稳定性",
      "燃料电池应用10g/m²起的超薄选项",
      "一致的厚度均匀性（±5%）",
      "商用能源系统的规模化生产"
    ],
    "products": [
      "碳纤维表面毡 10g",
      "碳纤维表面毡 20g",
      "碳-玻混合毡"
    ]
  },
  "wind-energy": {
    "title": "风力发电",
    "metaDescription": "用于风力涡轮叶片、机舱罩和结构件的高性能玻璃纤维增强材料。",
    "headline": "增强可再生能源",
    "description": "风电是可再生能源发电中增长最快的领域之一，玻璃纤维复合材料是涡轮叶片制造的核心。我们的多轴织物和复合毡专为叶片生产设计。",
    "benefits": [
      "针对叶片主梁和壳体优化的多轴织物",
      "优异的抗疲劳性能满足20年以上使用寿命",
      "出色的树脂灌注特性实现无空隙层压",
      "一致的纤维分布确保可预测的力学性能",
      "兼容环氧、聚酯和乙烯基酯树脂体系",
      "300g/m²到1200g/m²多种克重"
    ],
    "products": [
      "多轴向织物",
      "单向织物",
      "缝编复合毡"
    ]
  },
  "construction": {
    "title": "建筑工程",
    "metaDescription": "用于建筑领域屋面防水、保温和结构加固的耐久玻璃纤维材料。",
    "headline": "构建更坚实的基础",
    "description": "建筑行业依赖玻璃纤维材料用于防水卷材、屋面系统、管道保温和结构加固。我们的薄毡为SBS/APP改性沥青防水卷材提供优异的表面质量。",
    "benefits": [
      "热循环下优异的尺寸稳定性",
      "与沥青和聚合物改性系统优异的粘结性",
      "混凝土加固用耐碱选项",
      "结构应用的轻量高强",
      "户外应用的抗紫外和防潮",
      "阻燃等级可选（A级）"
    ],
    "products": [
      "玻璃纤维表面毡",
      "短切毡",
      "方格布"
    ]
  }
};

export const applicationGroupsZh: ApplicationGroupTranslations = {
  "carbon": {
    "label": "碳纤维",
    "eyebrow": "碳纤维应用领域",
    "summary": "轻量、导电、高强度材料，服务于性能关键型行业。",
    "applications": {
      "aerospace": {
        "title": "航空航天",
        "description": "用于结构件、内饰面板和先进航空航天应用的超轻碳纤维复合材料。",
        "products": [
          "碳纤维表面毡 10g",
          "碳纤维针刺毡",
          "碳纤维纱线"
        ]
      },
      "motorsport": {
        "title": "赛车与汽车",
        "description": "用于车身面板、结构加固和轻量化部件的高性能碳纤维材料。",
        "products": [
          "碳-玻混合织物",
          "碳纤维斜纹布",
          "碳纤维平纹布"
        ]
      },
      "new-energy": {
        "title": "新能源与燃料电池",
        "description": "用于氢燃料电池GDL、电池隔膜和储能系统的先进碳纤维材料。",
        "products": [
          "碳纤维表面毡 10g",
          "碳纤维表面毡 20g",
          "碳-玻混合毡"
        ]
      },
      "military-defense": {
        "title": "军工国防",
        "description": "用于电磁屏蔽、防弹防护和隐身应用的特种碳纤维解决方案。",
        "products": [
          "镀镍碳纤维毡",
          "碳纤维表面毡 10g",
          "碳纤维复合毡"
        ]
      },
      "manufacturing": {
        "title": "先进制造",
        "description": "用于拉挤工艺、模具制造和先进复合材料制造的优质碳纤维材料。",
        "products": [
          "碳纤维复合毡",
          "碳纤维针刺毡",
          "碳纤维短切丝"
        ]
      }
    }
  },
  "glass": {
    "label": "玻璃纤维",
    "eyebrow": "玻璃纤维应用领域",
    "summary": "经济高效、耐腐蚀的增强材料，服务于能源、建筑、交通和工业。",
    "applications": {
      "wind-energy": {
        "title": "风力发电",
        "description": "用于涡轮叶片、机舱罩和结构件的高性能玻璃纤维增强材料。",
        "products": [
          "双轴缝编毡",
          "多轴缝编毡",
          "单向布"
        ]
      },
      "construction": {
        "title": "建筑工程",
        "description": "用于保温、防水卷材、墙面覆盖和结构加固的耐久玻璃纤维材料。",
        "products": [
          "玻璃纤维表面毡",
          "黑色玻纤薄毡",
          "玻纤屋面毡"
        ]
      },
      "industrial-filtration": {
        "title": "工业过滤",
        "description": "用于高温过滤、化工处理和环境保护的特种纤维材料。",
        "products": [
          "玄武岩纤维毡",
          "针织缝编毡",
          "短切毡"
        ]
      },
      "transportation": {
        "title": "交通运输",
        "description": "用于高铁内饰、汽车部件和交通基础设施的轻量化复合材料。",
        "products": [
          "PP芯夹层毡",
          "复合毡",
          "方格布"
        ]
      },
      "marine": {
        "title": "船舶与防腐",
        "description": "用于造船、化学储罐和海洋基础设施的耐腐蚀玻璃纤维解决方案。",
        "products": [
          "方格布",
          "短切毡",
          "玻璃纤维表面毡"
        ]
      }
    }
  }
};

export const applicationGroupsPt: ApplicationGroupTranslations = {
  "carbon": {
    "label": "Fibra de Carbono",
    "eyebrow": "Aplicações de Fibra de Carbono",
    "summary": "Materiais leves, condutivos e de alta resistência para indústrias onde o desempenho é crítico.",
    "applications": {
      "aerospace": {
        "title": "Aeroespacial e Aviação",
        "description": "Compósitos de fibra de carbono ultraleves para componentes estruturais, painéis interiores e aplicações aeroespaciais avançadas.",
        "products": [
          "Manta de Superfície de Fibra de Carbono 10g",
          "Manta Agulhada de Fibra de Carbono",
          "Fio de Fibra de Carbono"
        ]
      },
      "motorsport": {
        "title": "Motorsport e Automotivo",
        "description": "Materiais de fibra de carbono de alto desempenho para painéis de carroceria, reforço estrutural e componentes leves.",
        "products": [
          "Tecido Híbrido Carbono-Vidro",
          "Tecido Sarja de Fibra de Carbono",
          "Tecido Plano de Fibra de Carbono"
        ]
      },
      "new-energy": {
        "title": "Nova Energia e Células de Combustível",
        "description": "Materiais avançados de fibra de carbono para GDL de células de combustível de hidrogênio, separadores de baterias e sistemas de armazenamento de energia.",
        "products": [
          "Manta de Superfície de Fibra de Carbono 10g",
          "Manta de Superfície de Fibra de Carbono 20g",
          "Manta Híbrida Carbono-Vidro"
        ]
      },
      "military-defense": {
        "title": "Militar e Defesa",
        "description": "Soluções especializadas em fibra de carbono para blindagem eletromagnética, proteção balística e aplicações stealth.",
        "products": [
          "Manta de Fibra de Carbono Niquelada",
          "Manta de Superfície de Fibra de Carbono 10g",
          "Manta Composta de Fibra de Carbono"
        ]
      },
      "manufacturing": {
        "title": "Manufatura de Alto Padrão",
        "description": "Materiais premium de fibra de carbono para processos de pultrusão, fabricação de moldes e manufatura avançada de compósitos.",
        "products": [
          "Manta Composta de Fibra de Carbono",
          "Manta Agulhada de Fibra de Carbono",
          "Fibra de Carbono Picada"
        ]
      }
    }
  },
  "glass": {
    "label": "Fibra de Vidro",
    "eyebrow": "Aplicações de Fibra de Vidro",
    "summary": "Reforços resistentes à corrosão e de custo competitivo para energia, construção, transporte e uso industrial.",
    "applications": {
      "wind-energy": {
        "title": "Energia Eólica",
        "description": "Reforços de fibra de vidro de alto desempenho para pás de turbinas, coberturas de nacele e componentes estruturais.",
        "products": [
          "Manta Costurada Biaxial",
          "Manta Costurada Multiaxial",
          "Tecido Unidirecional"
        ]
      },
      "construction": {
        "title": "Construção e Edificações",
        "description": "Materiais duráveis de fibra de vidro para isolamento, membranas de impermeabilização, revestimentos de parede e reforço estrutural.",
        "products": [
          "Manta Tissue de Superfície",
          "Véu Tissue Preto",
          "Manta Tissue para Cobertura"
        ]
      },
      "industrial-filtration": {
        "title": "Filtração Industrial",
        "description": "Materiais de fibra especializados para filtração a alta temperatura, processamento químico e proteção ambiental.",
        "products": [
          "Manta de Fibra de Basalto",
          "Manta Costurada Tricotada",
          "Manta de Fios Cortados"
        ]
      },
      "transportation": {
        "title": "Transporte e Ferroviário",
        "description": "Materiais compósitos leves para interiores de trens de alta velocidade, componentes automotivos e infraestrutura de transporte.",
        "products": [
          "Manta Sanduíche com Núcleo PP",
          "Manta Composta",
          "Rovings Tecidos"
        ]
      },
      "marine": {
        "title": "Naval e Proteção contra Corrosão",
        "description": "Soluções de fibra de vidro resistentes à corrosão para construção naval, tanques de armazenamento químico e infraestrutura marítima.",
        "products": [
          "Rovings Tecidos",
          "Manta de Fios Cortados",
          "Manta Tissue de Superfície"
        ]
      }
    }
  }
};
