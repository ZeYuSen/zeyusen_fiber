import type { Locale } from "@/lib/i18n/config";
import type { ProductCategory } from "@/types/product";
import { allCarbonFiberCategories } from "@/data/carbon-fiber";
import { allGlassFiberCategories } from "@/data/glass-fiber";
import { applicationGroups, type ApplicationGroup } from "@/data/applications";
import {
  getProductContent as getProductContentBase,
  type ProductContent,
} from "@/data/product-content";
import {
  getApplicationDetail as getApplicationDetailBase,
  type ApplicationDetail,
} from "@/data/application-details";
import { mergeCategories, type DivisionTranslations } from "@/data/i18n/types";
import { isActiveApplication } from "@/lib/application-scope";

// --- Translation registries (zh/ko/es/pt). English uses the base verbatim. ---
import { carbonFiberZh } from "@/data/i18n/carbon-fiber.zh";
import { carbonFiberKo } from "@/data/i18n/carbon-fiber.ko";
import { carbonFiberEs } from "@/data/i18n/carbon-fiber.es";
import { carbonFiberPt } from "@/data/i18n/carbon-fiber.pt";
import { glassFiberZh } from "@/data/i18n/glass-fiber.zh";
import { glassFiberKo } from "@/data/i18n/glass-fiber.ko";
import { glassFiberEs } from "@/data/i18n/glass-fiber.es";
import { glassFiberPt } from "@/data/i18n/glass-fiber.pt";
import {
  productContentZh,
  productContentKo,
  productContentEs,
  productContentPt,
  type ProductContentTranslations,
} from "@/data/i18n/product-content";
import {
  applicationDetailsZh,
  applicationDetailsKo,
  applicationDetailsEs,
  applicationDetailsPt,
  applicationGroupsZh,
  applicationGroupsKo,
  applicationGroupsEs,
  applicationGroupsPt,
  type ApplicationDetailTranslations,
  type ApplicationGroupTranslations,
} from "@/data/i18n/applications";

const carbonTranslations: Partial<Record<Locale, DivisionTranslations>> = {
  zh: carbonFiberZh,
  ko: carbonFiberKo,
  es: carbonFiberEs,
  pt: carbonFiberPt,
};
const glassTranslations: Partial<Record<Locale, DivisionTranslations>> = {
  zh: glassFiberZh,
  ko: glassFiberKo,
  es: glassFiberEs,
  pt: glassFiberPt,
};
const productContentTranslations: Partial<Record<Locale, ProductContentTranslations>> = {
  zh: productContentZh,
  ko: productContentKo,
  es: productContentEs,
  pt: productContentPt,
};
const applicationDetailTranslations: Partial<Record<Locale, ApplicationDetailTranslations>> = {
  zh: applicationDetailsZh,
  ko: applicationDetailsKo,
  es: applicationDetailsEs,
  pt: applicationDetailsPt,
};
const applicationGroupTranslations: Partial<Record<Locale, ApplicationGroupTranslations>> = {
  zh: applicationGroupsZh,
  ko: applicationGroupsKo,
  es: applicationGroupsEs,
  pt: applicationGroupsPt,
};

const applicationProductKeys: Record<
  string,
  ApplicationDetail["products"][number]["key"][]
> = {
  "new-energy": [
    { division: "carbon", category: "carbon-fiber-mat", product: "fuel-cell-gdl" },
    { division: "carbon", category: "carbon-fiber-mat", product: "surface-mat-10g" },
    { division: "carbon", category: "carbon-fiber-mat", product: "surface-mat-20g" },
  ],
  "military-defense": [
    { division: "carbon", category: "carbon-fiber-mat", product: "nickel-plated-mat" },
    { division: "carbon", category: "carbon-fiber-mat", product: "composite-mat" },
    { division: "carbon", category: "carbon-fiber-mat", product: "surface-mat-10g" },
  ],
  construction: [
    { division: "glass", category: "tissue-mat", product: "roofing-tissue" },
    { division: "glass", category: "tissue-mat", product: "wall-covering" },
    { division: "glass", category: "tissue-mat", product: "surface-tissue" },
  ],
};

const applicationGroupDescriptions: Record<Locale, Record<string, string>> = {
  en: {
    "new-energy": "Carbon fiber mats for fuel-cell GDL evaluation and conductive functional layers.",
    "military-defense": "Carbon fiber mats for EMI/RFI shielding evaluation and conductive layers in defense electronics.",
    construction: "Fiberglass tissues for roofing membranes, wall coverings, pipe facings, and surface layers.",
  },
  zh: {
    "new-energy": "用于燃料电池气体扩散层评估和导电功能层的碳毡。",
    "military-defense": "用于军工电子设备 EMI/RFI 屏蔽评估和导电功能层的碳毡。",
    construction: "用于屋面卷材、墙面覆盖、管道面层和复合材料表面的玻纤薄毡。",
  },
  ko: {
    "new-energy": "연료전지 GDL 평가와 전도성 기능층을 위한 탄소섬유 매트.",
    "military-defense": "방산 전자장비의 EMI/RFI 차폐 평가와 전도층을 위한 탄소섬유 매트.",
    construction: "루핑 멤브레인, 벽 마감, 파이프 표면재와 복합재 표면층용 유리섬유 티슈.",
  },
  es: {
    "new-energy": "Mantas de carbono para evaluar GDL de pilas de combustible y capas funcionales conductoras.",
    "military-defense": "Mantas de carbono para evaluar blindaje EMI/RFI y capas conductoras en electrónica de defensa.",
    construction: "Velos de vidrio para membranas de cubierta, paredes, revestimiento de tuberías y capas superficiales.",
  },
  pt: {
    "new-energy": "Mantas de carbono para avaliação de GDL de células a combustível e camadas condutivas.",
    "military-defense": "Mantas de carbono para avaliação de blindagem EMI/RFI e camadas condutivas em eletrônica de defesa.",
    construction: "Véus de vidro para membranas de cobertura, paredes, faces de tubos e camadas superficiais.",
  },
};

type ScopedApplicationCopy = Pick<
  ApplicationDetail,
  "metaDescription" | "description" | "challenge" | "components" | "benefits" | "selectionCriteria"
>;

const applicationDetailScopeCopy: Record<
  Locale,
  Record<"military-defense" | "construction", ScopedApplicationCopy>
> = {
  en: {
    "military-defense": {
      metaDescription: "Carbon fiber mats for EMI/RFI shielding evaluation and conductive functional layers in defense electronics.",
      description: "Defense electronics often need lightweight conductive layers for enclosure shielding, grounding, and static management. Our nickel-plated and standard carbon fiber mats can be evaluated against the program's specified EMI/RFI method.",
      challenge: "Shielding performance depends on frequency, laminate design, grounding, joints, resin, and the finished enclosure. The mat must therefore be selected and tested as part of the complete system rather than approved from a generic material claim.",
      components: ["EMI/RFI layers in electronic enclosures", "Conductive layers in equipment housings", "Grounding and static-management layers", "Antenna and radar-adjacent electronic assemblies"],
      benefits: ["Nickel-plated option for shielding evaluation", "Lightweight carbon mat formats", "Standard and composite mat options", "Grade-specific data tied to an agreed test method", "Project-specific width and handling review", "Sample validation before production approval"],
      selectionCriteria: ["Frequency range and shielding test method", "Grounding, seams, joints, and enclosure design", "Resin system and environmental exposure", "Documentation and validation required for approval"],
    },
    construction: {
      metaDescription: "Fiberglass tissues for roofing membranes, waterproofing carriers, wall coverings, pipe facings, and composite surface layers.",
      description: "Fiberglass tissues provide a lightweight, dimensionally stable carrier or surface layer for roofing membranes, wall coverings, pipe facings, and related building-material converting processes.",
      challenge: "The tissue must run consistently through coating, impregnation, drying, laminating, and winding while remaining compatible with the selected bitumen, polymer, adhesive, or resin system.",
      components: ["Roofing and waterproofing membrane carriers", "Wall-covering substrates", "Pipe and duct insulation facings", "Composite surface layers"],
      benefits: ["Lightweight roll format for converting", "Surface uniformity for coating or impregnation", "Basis weight and width options by grade", "Binder compatibility reviewed for the process", "Weathering performance validated in the finished system", "Fire performance determined by the finished system and test method"],
      selectionCriteria: ["Coating, adhesive, bitumen, or resin system", "Target basis weight, width, and roll construction", "Line speed, drying, winding, and handling conditions", "Finished-system weathering or fire test requirements"],
    },
  },
  zh: {
    "military-defense": {
      metaDescription: "用于军工电子设备 EMI/RFI 屏蔽评估和导电功能层的碳毡。",
      description: "军工电子设备常需要轻量导电层，用于机箱屏蔽、接地和静电管理。镀镍碳毡及标准碳毡应按照项目规定的 EMI/RFI 方法进行整机体系评估。",
      challenge: "屏蔽效果会受到频率、层合设计、接地、接缝、树脂和成品机箱结构影响，不能仅凭材料通用描述判定。",
      components: ["电子机箱 EMI/RFI 功能层", "设备外壳导电层", "接地与静电管理层", "天线及雷达相邻电子组件"],
      benefits: ["可用于屏蔽评估的镀镍碳毡", "轻量碳毡形态", "标准表面毡和复合毡选项", "按约定测试方法提供牌号数据", "可评估项目所需幅宽与操作性", "量产批准前进行样品验证"],
      selectionCriteria: ["频率范围与屏蔽测试方法", "接地、接缝和机箱设计", "树脂体系与环境暴露", "项目验收所需的文件与验证"],
    },
    construction: {
      metaDescription: "用于屋面防水卷材、墙面覆盖、管道面层和复合材料表层的玻纤薄毡。",
      description: "玻纤薄毡可作为屋面防水卷材、墙面覆盖、管道面层及相关建材加工中的轻量稳定载体或表面层。",
      challenge: "材料需要在涂布、浸渍、干燥、复合和收卷过程中稳定运行，并与沥青、聚合物、胶粘剂或树脂体系相容。",
      components: ["屋面与防水卷材载体", "墙面覆盖基材", "管道及风管保温面层", "复合材料表面层"],
      benefits: ["适合后加工的轻量卷材", "便于涂布或浸渍的均匀表面", "按牌号提供克重与幅宽选项", "结合工艺评估粘结剂相容性", "在成品体系中验证耐候性", "防火性能由成品体系和测试方法确定"],
      selectionCriteria: ["涂层、胶粘剂、沥青或树脂体系", "目标克重、幅宽和卷装", "线速、干燥、收卷与操作条件", "成品体系的耐候或防火测试要求"],
    },
  },
  ko: {
    "military-defense": {
      metaDescription: "방산 전자장비의 EMI/RFI 차폐 평가와 전도성 기능층을 위한 탄소섬유 매트.",
      description: "방산 전자장비의 인클로저 차폐, 접지와 정전기 관리를 위해 경량 전도층이 사용됩니다. 니켈 도금 및 표준 탄소섬유 매트는 프로그램이 지정한 EMI/RFI 시험법으로 평가해야 합니다.",
      challenge: "차폐 성능은 주파수, 적층 설계, 접지, 이음부, 수지와 완성 인클로저에 따라 달라지므로 일반 소재 설명만으로 승인할 수 없습니다.",
      components: ["전자 인클로저 EMI/RFI 층", "장비 하우징 전도층", "접지 및 정전기 관리층", "안테나와 레이더 인접 전자 조립품"],
      benefits: ["차폐 평가용 니켈 도금 옵션", "경량 탄소 매트 형식", "표면 및 복합 매트 선택", "합의된 시험법에 따른 등급별 데이터", "프로젝트별 폭과 취급성 검토", "생산 승인 전 샘플 검증"],
      selectionCriteria: ["주파수 범위와 차폐 시험법", "접지, 이음부와 인클로저 설계", "수지 시스템과 환경 노출", "승인에 필요한 문서와 검증"],
    },
    construction: {
      metaDescription: "루핑 멤브레인, 벽 마감, 파이프 표면재와 복합재 표면층용 유리섬유 티슈.",
      description: "유리섬유 티슈는 루핑과 방수 멤브레인, 벽 마감, 파이프 표면재와 관련 건축자재 변환 공정의 경량 캐리어 또는 표면층으로 사용됩니다.",
      challenge: "티슈는 코팅, 함침, 건조, 적층과 권취 공정에서 안정적으로 작동하고 선택한 역청, 폴리머, 접착제 또는 수지와 호환되어야 합니다.",
      components: ["루핑 및 방수 멤브레인 캐리어", "벽 마감 기재", "파이프와 덕트 단열 표면재", "복합재 표면층"],
      benefits: ["변환용 경량 롤 형식", "코팅과 함침을 위한 균일한 표면", "등급별 평량과 폭 선택", "공정에 따른 바인더 호환성 검토", "완성 시스템에서 내후성 검증", "완성 시스템과 시험법으로 화재 성능 결정"],
      selectionCriteria: ["코팅, 접착제, 역청 또는 수지 시스템", "목표 평량, 폭과 롤 구조", "라인 속도, 건조, 권취와 취급 조건", "완성 시스템의 내후 또는 화재 시험 요구"],
    },
  },
  es: {
    "military-defense": {
      metaDescription: "Mantas de carbono para evaluar blindaje EMI/RFI y capas funcionales conductoras en electrónica de defensa.",
      description: "La electrónica de defensa puede necesitar capas conductoras ligeras para blindaje de envolventes, puesta a tierra y control estático. Las mantas de carbono niqueladas y estándar deben evaluarse con el método EMI/RFI indicado por el programa.",
      challenge: "El resultado depende de la frecuencia, el laminado, la puesta a tierra, las juntas, la resina y la envolvente terminada. Una afirmación genérica del material no basta para aprobar el sistema.",
      components: ["Capas EMI/RFI en envolventes electrónicas", "Capas conductoras en carcasas", "Puesta a tierra y control estático", "Conjuntos electrónicos próximos a antenas y radar"],
      benefits: ["Opción niquelada para evaluar blindaje", "Formatos ligeros de manta de carbono", "Mantas superficiales y compuestas", "Datos por grado y método de ensayo acordado", "Revisión de ancho y manipulación", "Validación de muestras antes de producción"],
      selectionCriteria: ["Rango de frecuencia y método de ensayo", "Puesta a tierra, juntas y diseño de la envolvente", "Resina y exposición ambiental", "Documentación y validación de aprobación"],
    },
    construction: {
      metaDescription: "Velos de vidrio para membranas de cubierta, impermeabilización, paredes, revestimiento de tuberías y capas superficiales.",
      description: "Los velos de vidrio aportan un soporte o capa superficial ligera y estable para membranas de cubierta, paredes, revestimientos de tuberías y procesos relacionados de materiales de construcción.",
      challenge: "El velo debe funcionar de forma estable durante recubrimiento, impregnación, secado, laminado y bobinado, y ser compatible con el betún, polímero, adhesivo o resina elegidos.",
      components: ["Soporte de membranas de cubierta e impermeabilización", "Sustratos para paredes", "Revestimiento de aislamiento de tuberías y conductos", "Capas superficiales de composites"],
      benefits: ["Rollo ligero para conversión", "Superficie uniforme para recubrir o impregnar", "Opciones de gramaje y ancho por grado", "Compatibilidad del ligante revisada según el proceso", "Intemperie validada en el sistema final", "Fuego determinado por sistema final y método de ensayo"],
      selectionCriteria: ["Recubrimiento, adhesivo, betún o resina", "Gramaje, ancho y construcción del rollo", "Velocidad, secado, bobinado y manipulación", "Ensayos de intemperie o fuego del sistema final"],
    },
  },
  pt: {
    "military-defense": {
      metaDescription: "Mantas de carbono para avaliação de blindagem EMI/RFI e camadas condutivas em eletrônica de defesa.",
      description: "A eletrônica de defesa pode exigir camadas condutivas leves para blindagem de invólucros, aterramento e controle estático. Mantas de carbono niqueladas e padrão devem ser avaliadas pelo método EMI/RFI definido no programa.",
      challenge: "O resultado depende da frequência, laminado, aterramento, juntas, resina e invólucro final. Uma alegação genérica do material não aprova o sistema completo.",
      components: ["Camadas EMI/RFI em invólucros eletrônicos", "Camadas condutivas em carcaças", "Aterramento e controle estático", "Conjuntos eletrônicos próximos a antenas e radar"],
      benefits: ["Opção niquelada para avaliação de blindagem", "Formatos leves de manta de carbono", "Mantas superficiais e compostas", "Dados por classe e método acordado", "Revisão de largura e manuseio", "Validação de amostras antes da produção"],
      selectionCriteria: ["Faixa de frequência e método de ensaio", "Aterramento, juntas e projeto do invólucro", "Resina e exposição ambiental", "Documentação e validação de aprovação"],
    },
    construction: {
      metaDescription: "Véus de vidro para membranas de cobertura, impermeabilização, paredes, faces de tubos e camadas superficiais.",
      description: "Véus de vidro oferecem suporte ou camada superficial leve e estável para membranas de cobertura, paredes, faces de tubos e processos relacionados de materiais de construção.",
      challenge: "O véu deve operar de forma estável durante revestimento, impregnação, secagem, laminação e bobinamento, e ser compatível com o betume, polímero, adesivo ou resina selecionados.",
      components: ["Suporte de membranas de cobertura e impermeabilização", "Substratos para paredes", "Faces de isolamento de tubos e dutos", "Camadas superficiais de compósitos"],
      benefits: ["Rolo leve para conversão", "Superfície uniforme para revestimento ou impregnação", "Opções de gramatura e largura por classe", "Compatibilidade do ligante revisada pelo processo", "Intemperismo validado no sistema final", "Fogo determinado pelo sistema final e método de ensaio"],
      selectionCriteria: ["Revestimento, adesivo, betume ou resina", "Gramatura, largura e construção do rolo", "Velocidade, secagem, bobinamento e manuseio", "Ensaios de intemperismo ou fogo do sistema final"],
    },
  },
};

export function getCarbonCategories(locale: Locale): ProductCategory[] {
  return mergeCategories(allCarbonFiberCategories, carbonTranslations[locale], locale);
}

export function getGlassCategories(locale: Locale): ProductCategory[] {
  return mergeCategories(allGlassFiberCategories, glassTranslations[locale], locale);
}

export function getCategories(
  division: "carbon" | "glass",
  locale: Locale,
): ProductCategory[] {
  return division === "carbon"
    ? getCarbonCategories(locale)
    : getGlassCategories(locale);
}

function getApplicationProductNames(locale: Locale, slug: string): string[] {
  return (applicationProductKeys[slug] ?? []).map((key) => {
    const category = getCategories(key.division, locale).find(
      (item) => item.slug === key.category,
    );
    return "product" in key
      ? category?.products.find((product) => product.slug === key.product)?.name ?? "Product"
      : category?.name ?? "Product";
  });
}

export function getApplicationGroups(locale: Locale): ApplicationGroup[] {
  const activeGroups = applicationGroups.map((group) => ({
    ...group,
    applications: group.applications
      .filter((application) => isActiveApplication(group.material, application.slug))
      .map((application) => ({
        ...application,
        description:
          applicationGroupDescriptions[locale][application.slug] ??
          application.description,
        products: getApplicationProductNames(locale, application.slug),
      })),
  }));
  if (locale === "en") return activeGroups;
  const t = applicationGroupTranslations[locale];
  if (!t) return activeGroups;
  return activeGroups.map((group) => {
    const gt = t[group.material];
    if (!gt) return group;
    return {
      ...group,
      label: gt.label ?? group.label,
      eyebrow: gt.eyebrow ?? group.eyebrow,
      summary: gt.summary ?? group.summary,
      applications: group.applications.map((app) => {
        const at = gt.applications?.[app.slug];
        if (!at) return app;
        return {
          ...app,
          title: at.title ?? app.title,
          description:
            applicationGroupDescriptions[locale][app.slug] ??
            at.description ??
            app.description,
          // Product names stay sourced from the narrowed localized catalog;
          // legacy translation arrays still contain retired product families.
          products: app.products,
        };
      }),
    };
  });
}

export function getProductContent(
  locale: Locale,
  division: "carbon" | "glass",
  category: string,
  product: string,
): ProductContent | undefined {
  const base = getProductContentBase(division, category, product);
  if (!base || locale === "en") return base;
  const t = productContentTranslations[locale]?.[`${division}/${category}/${product}`];
  if (!t) return base;
  return {
    overview: t.overview ?? base.overview,
    faqs: t.faqs ?? base.faqs,
  };
}

export function getApplicationDetail(
  locale: Locale,
  division: "carbon" | "glass",
  slug: string,
): ApplicationDetail | undefined {
  if (!isActiveApplication(division, slug)) return undefined;
  const base = getApplicationDetailBase(division, slug);
  if (!base) return undefined;
  const t = applicationDetailTranslations[locale]?.[slug];
  const localizedProducts = (applicationProductKeys[slug] ?? []).map((key) => {
    const category = getCategories(key.division, locale).find(
      (item) => item.slug === key.category,
    );
    const name = "product" in key
      ? category?.products.find((product) => product.slug === key.product)?.name
      : category?.name;
    return { name: name ?? "Product", key };
  });

  const translated = locale === "en" || !t
    ? base
    : {
        ...base,
        title: t.title ?? base.title,
        metaDescription: t.metaDescription ?? base.metaDescription,
        headline: t.headline ?? base.headline,
        description: t.description ?? base.description,
        challenge: t.challenge ?? base.challenge,
        components: t.components ?? base.components,
        benefits: t.benefits ?? base.benefits,
        selectionCriteria: t.selectionCriteria ?? base.selectionCriteria,
      };
  const scoped = applicationDetailScopeCopy[locale][slug as "military-defense" | "construction"];
  return { ...translated, ...(scoped ?? {}), products: localizedProducts };
}
