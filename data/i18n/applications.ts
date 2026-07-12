// Application translations (detail pages + overview group cards). Generated +
// human-reviewed; merged over the English base with per-field fallback.

export type ApplicationDetailTranslation = {
  title?: string;
  metaDescription?: string;
  headline?: string;
  description?: string;
  challenge?: string;
  components?: string[];
  benefits?: string[];
  selectionCriteria?: string[];
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
    "challenge": "항공기 및 항공우주 구조는 강성과 피로 수명을 희생하지 않으면서 무게를 줄여야 합니다. 탄소섬유 보강은 설계팀이 하중 지지 및 2차 구조에서 금속을 대체하도록 하여, 기체가 요구하는 기계적 여유를 유지하면서 질량을 줄입니다.",
    "components": [
      "구조 패널 및 보강재",
      "위성 및 UAV 프레임",
      "기내 및 트림 패널",
      "매끄러운 복합재 마감을 위한 표면층"
    ],
    "benefits": [
      "경량 복합 구조를 위한 높은 비강도 잠재력",
      "반복 하중 부품을 위한 내피로 보강 옵션",
      "프로젝트 온도 요구사항에 따라 소재 등급 검토 가능",
      "진동 민감 구조를 위한 다양한 섬유 구조",
      "가혹 환경용 내식 보강 옵션",
      "10g/m²부터 600g/m²까지 맞춤 평량, 기술 검토 후 확정"
    ],
    "selectionCriteria": [
      "구조 하중 및 목표 비강도 범위",
      "사용 온도 범위와 적용 수지 시스템",
      "각 적층별 섬유 구조와 평량",
      "승인을 위한 적용 인증 및 시험 표준"
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
    "description": "현대 방위 시스템은 전자기 차폐, 구조적 무결성, 스텔스 기능을 제공하는 소재를 필요로 합니다. 당사의 니켈 도금 탄소섬유 매트는 경량 프로파일을 유지하면서 전도성 차폐 옵션을 제공합니다.",
    "challenge": "방위 플랫폼은 엄격한 무게 제한과 함께 전자기 및 내구성 요구를 동시에 충족해야 합니다. 전도성 탄소섬유 매트와 보강재는 각 프로그램의 시험 체계에 맞춰 조정 가능한 경량 차폐·구조 보호 경로를 제공합니다.",
    "components": [
      "인클로저 내 EMI/RFI 차폐층",
      "경량 보호 구조 패널",
      "안테나 및 레이더 인접 부품",
      "휴대용 장비 하우징 보강재"
    ],
    "benefits": [
      "EMI/RFI 차폐 평가용 전도성 니켈 도금 옵션",
      "보호 구조용 경량 보강 형식",
      "레이더 및 전자파 적합성 연구용 소재 옵션",
      "내화학성 및 내부식성",
      "프로젝트별 충격 및 내구 시험 협의 가능",
      "응용 검토 및 샘플 검증 후 맞춤 사양 확정"
    ],
    "selectionCriteria": [
      "우선순위가 차폐, 구조 또는 둘 다인지",
      "관심 대상 전자파 시험법 및 주파수 대역",
      "환경 노출 및 내구성 요구사항",
      "프로그램 승인에 필요한 문서 및 검증"
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
    "challenge": "연료전지와 첨단 배터리는 대량 생산 전반에서 일관성을 유지하는 전도성·화학적 안정성 층을 필요로 합니다. 얇은 탄소섬유 매트는 이러한 전기화학 시스템이 가스 확산과 집전에 의존하는 다공성 전도 구조를 제공합니다.",
    "components": [
      "수소 연료전지의 가스확산층",
      "에너지 저장 장치의 전도층",
      "전극 및 분리막 지지 구조",
      "정밀한 기공률 제어가 필요한 박막 기능층"
    ],
    "benefits": [
      "가스확산층 평가에 맞춰 기공률 조정 가능",
      "전도성 목표는 제품 등급과 합의된 시험법에 따라 확인",
      "사용 환경에 대한 화학적 적합성 검증 필요",
      "연료전지 응용을 위한 10g/m²부터 시작하는 초박형 옵션",
      "두께 공차는 합의된 제품 사양서에서 확정",
      "평가 프로그램을 위한 파일럿 샘플 및 양산 공급"
    ],
    "selectionCriteria": [
      "운전 화학 체계 및 층이 접촉하는 매체",
      "목표 기공률, 두께 및 전도 거동",
      "전기 성능 검증에 사용하는 시험법",
      "파일럿 샘플에서 양산 공급까지의 증산 경로"
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
    "challenge": "터빈 블레이드는 점점 길어지고 있으며, 길이가 늘수록 피로와 강성 요구가 커집니다. 유리섬유 보강재는 이러한 하중을 합리적인 비용으로 지지하므로, 다축 직물과 인퓨전용 매트가 현대 블레이드 제조의 핵심이 됩니다.",
    "components": [
      "블레이드 스파 캡 및 전단 웹",
      "블레이드 쉘 및 루트 섹션",
      "나셀 커버 및 스피너",
      "구조 보강재 및 보강 리브"
    ],
    "benefits": [
      "블레이드 스파 캡과 쉘에 최적화된 다축 직물",
      "피로 민감 구조를 고려한 섬유 구조",
      "고객 공정으로 수지 주입 성능 평가",
      "예측 가능한 기계적 특성을 위한 일관된 섬유 분포",
      "에폭시, 폴리에스테르, 비닐에스테르 수지 시스템과 호환",
      "300g/m²부터 1200g/m²까지의 중량 제공"
    ],
    "selectionCriteria": [
      "블레이드의 구조 하중 및 피로 수명 목표",
      "적층 구역별 섬유 배향 및 평량",
      "고객 라인의 수지 시스템 및 인퓨전 공정",
      "대형 부품의 치수 및 품질 공차"
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
    "challenge": "건물 외피는 수년간의 열 사이클과 습기 노출에도 치수가 안정적으로 유지되는 소재를 필요로 합니다. 유리섬유 티슈 및 보강 매트는 멤브레인, 지붕, 벽체 시스템에 접합성이 우수하고 열화에 강한 안정적 캐리어를 제공합니다.",
    "components": [
      "방수 및 비투멘 멤브레인",
      "지붕 시스템 및 언더레이",
      "배관 및 덕트 단열 페이싱",
      "벽 마감재 및 보강층"
    ],
    "benefits": [
      "열 사이클에서의 우수한 치수 안정성",
      "비투멘 및 폴리머 개질 시스템과의 우수한 접합성",
      "콘크리트 보강을 위한 내알칼리성 옵션",
      "구조 응용을 위한 경량 고강도",
      "선택 등급 및 시스템 검증에 따른 내후 성능",
      "난연 등급 선택 가능; 최종 등급은 완성 시스템과 시험 방법에 따라 결정"
    ],
    "selectionCriteria": [
      "접합 시스템 — 비투멘, 폴리머 또는 시멘트계",
      "습기, 알칼리, 열 사이클에 대한 노출 정도",
      "요구되는 표면 마감 및 치수 안정성",
      "완성 시스템이 충족해야 할 방화 또는 내후 표준"
    ],
    "products": [
      "Surface Tissue Mat",
      "Chopped Strand Mat",
      "Woven Roving"
    ]
  },
  "motorsport": {
    "title": "모터스포츠 및 자동차",
    "metaDescription": "차체 패널, 구조 부품, 경량 자동차 부품을 위한 고성능 탄소섬유 직물 및 보강재.",
    "headline": "도로와 트랙 위의 경량 성능",
    "description": "모터스포츠 및 고성능 자동차 프로그램은 무게를 줄이고 응답성을 높이며 핵심 구조를 강화하기 위해 탄소섬유를 사용합니다. 당사의 직조 직물과 보강 형식은 차체 패널, 모노코크 섹션, 노출 직조 마감 부품을 지원합니다.",
    "challenge": "차량에서 1kg을 줄일 때마다 가속, 제동, 핸들링이 향상됩니다. 탄소섬유 보강은 더 무거운 금속 및 유리섬유 부품을 강성 있고 저질량인 적층재로 대체하며, 직조 마감은 프리미엄 부품에 요구되는 시각적 정체성도 충족합니다.",
    "components": [
      "차체 패널 및 에어로 부품",
      "모노코크 및 섀시 보강재",
      "인테리어 트림 및 노출 직조 표면",
      "브래킷 및 구조 보강재"
    ],
    "benefits": [
      "무게 민감 부품을 위한 고강성 보강 옵션",
      "표면 및 마감 품질을 제어하는 직조 직물 형식",
      "비용과 성능이 균형 잡힌 하이브리드 탄소-유리 구조",
      "드레이프와 외관 요구에 맞는 능직 및 평직",
      "일반 에폭시 프리프레그 및 인퓨전 공정과 호환",
      "맞춤 폭 및 직조 스타일은 기술 확인 후 확정"
    ],
    "selectionCriteria": [
      "부품이 구조용, 외관용 또는 둘 다인지",
      "부품의 목표 강성 및 무게 예산",
      "노출 표면의 직조 스타일 및 마감 요구",
      "성형 공정 — 프리프레그, 인퓨전 또는 습식 적층"
    ],
    "products": [
      "Carbon-Glass Hybrid Woven Cloth",
      "Carbon Fiber Twill Cloth",
      "Carbon Fiber Plain Cloth"
    ]
  },
  "manufacturing": {
    "title": "첨단 제조",
    "metaDescription": "인발, 금형 제작, 첨단 복합재 제조를 위한 프리미엄 탄소섬유 매트, 니들 매트, 촙 파이버.",
    "headline": "첨단 복합재 생산을 위한 소재",
    "description": "복합재 제조업체는 인발, 성형, 툴링에서 탄소섬유를 사용해 강성이 높고 치수가 안정적인 부품을 생산합니다. 당사의 복합 매트, 니들 매트, 촙 파이버는 양산 전반의 일관된 가공을 지원합니다.",
    "challenge": "양산 복합재 공정은 매 배치마다 일관되게 공급되고 예측 가능하게 경화되는 보강재를 필요로 합니다. 탄소섬유 매트와 촙 파이버는 제조업체에 반복 가능한 취급성과 기계적 거동을 제공하여, 인발 라인과 금형이 안정적인 부품을 계속 생산하도록 합니다.",
    "components": [
      "인발 프로파일 및 표준 형재",
      "금형 및 복합재 툴링",
      "컴파운드 및 성형 보강",
      "마감 품질을 위한 표면층"
    ],
    "benefits": [
      "반복 가공을 위한 일관된 매트 형식",
      "취급성과 드레이프를 위한 니들 및 복합 구조",
      "컴파운딩 및 성형 공정을 위한 촙 파이버",
      "인발 및 툴링 워크플로를 지원하는 옵션",
      "일반 열경화성 수지 시스템과 호환",
      "맞춤 형식 및 평량은 기술 확인 후 확정"
    ],
    "selectionCriteria": [
      "공정 유형 — 인발, 성형, 툴링 또는 컴파운딩",
      "라인에서 요구되는 취급성, 드레이프, 함침 거동",
      "사용 중인 수지 시스템 및 경화 조건",
      "부품의 치수 공차 및 마감 요구"
    ],
    "products": [
      "Carbon Fiber Composite Mat",
      "Carbon Fiber Needled Mat",
      "Short Cut Carbon Fiber"
    ]
  },
  "industrial-filtration": {
    "title": "산업용 여과",
    "metaDescription": "고온 여과, 화학 공정, 환경 보호를 위한 특수 섬유 매트 및 현무암 매트.",
    "headline": "고온 및 화학 환경을 위한 여과",
    "description": "산업 여과와 배출 제어는 유기 소재가 견디지 못하는 고온·화학적으로 공격적인 환경에서 작동합니다. 당사의 현무암 및 특수 섬유 매트는 여과 및 분리 매체 지지에 적합한 내열·내화학 성능을 제공합니다.",
    "challenge": "고온 배기가스와 공격적인 화학 흐름은 일반 매체를 빠르게 손상시킵니다. 현무암 및 광물 섬유 매트는 고온과 화학적 공격을 견뎌내어, 여과 및 배출 시스템이 매체를 구성할 수 있는 내구성 구조를 제공합니다.",
    "components": [
      "고온 여과 매체 지지",
      "화학 공정 분리층",
      "배출 제어 및 배기가스 시스템",
      "열 및 환경 보호층"
    ],
    "benefits": [
      "고온 사용을 위한 현무암 섬유 옵션",
      "공격적인 공정 흐름을 위한 내화학 형식",
      "구조적 매체 지지를 위한 편직 및 스티치 구조",
      "반복 가능한 여과 구성을 위한 일관된 매트 형식",
      "까다로운 산업 환경에 적합한 열 안정성",
      "사용 한계는 등급 및 검증된 시험 조건으로 확인"
    ],
    "selectionCriteria": [
      "연속 사용 온도 및 피크 변동",
      "공정 흐름의 화학 조성 및 pH",
      "요구되는 여과 효율 및 구조 지지",
      "열·화학 한계 확인에 사용하는 시험 조건"
    ],
    "products": [
      "Basalt Fiber Mat",
      "Knitted Stitched Mat",
      "Chopped Strand Mat"
    ]
  },
  "transportation": {
    "title": "운송 및 철도",
    "metaDescription": "철도 내장재, 자동차 부품, 운송 인프라를 위한 경량 유리섬유 복합 매트.",
    "headline": "모빌리티를 위한 경량 복합재",
    "description": "철도, 자동차, 운송 프로그램은 구조 및 내구성 요구를 충족하면서 무게를 줄이기 위해 유리섬유 복합재를 사용합니다. 당사의 샌드위치 및 복합 매트는 운송 응용 전반의 패널, 내장재, 구조 부품을 지원합니다.",
    "challenge": "차량과 철도 차량은 강성이나 내구성을 손상하지 않으면서 효율 향상을 위해 구조 중량을 줄여야 합니다. 유리섬유 복합 매트와 코어 매트는 운송 사용의 진동과 하중을 견디는 강성 있고 저질량인 패널을 제공합니다.",
    "components": [
      "철도 및 객차 내장 패널",
      "자동차 차체 및 구조 부품",
      "샌드위치 코어 바닥 및 벽 패널",
      "운송 인프라 부품"
    ],
    "benefits": [
      "강성 있고 경량인 패널을 위한 PP 코어 샌드위치 형식",
      "구조 및 준구조 부품을 위한 복합 매트",
      "고하중 영역을 위한 로빙 직물 보강",
      "예측 가능한 성능을 위한 일관된 적층 품질",
      "일반 폐쇄 금형 및 인퓨전 공정과 호환",
      "맞춤 구조는 기술 확인 후 확정"
    ],
    "selectionCriteria": [
      "부품이 구조 역할인지 패널 강성 역할인지",
      "무게 예산 및 목표 패널 강성",
      "사용 중 진동, 충격, 내구성 요구",
      "성형 공정 및 적용 운송 안전 표준"
    ],
    "products": [
      "PP Core Sandwich Mat",
      "Composite Mat",
      "Woven Roving"
    ]
  },
  "marine": {
    "title": "해양 및 부식 방지",
    "metaDescription": "조선, 화학 저장 탱크, 해양 인프라를 위한 내부식성 유리섬유 로빙 및 매트.",
    "headline": "해양 사용을 위한 내부식성 구조",
    "description": "해양 및 화학 환경은 금속을 빠르게 부식시키므로, 제조업체는 선체, 탱크, 인프라에 유리섬유 적층재를 사용합니다. 당사의 로빙 직물과 매트는 이러한 구조가 요구하는 내부식성과 적층 강도를 제공합니다.",
    "challenge": "해수와 저장된 화학 물질은 금속 구조를 끊임없이 공격하여 높은 유지보수 비용을 유발합니다. 유리섬유 적층재는 긴 사용 수명 동안 이 부식에 견디므로, 선체, 탱크, 해양 인프라는 로빙 직물과 보강 매트에 의존합니다.",
    "components": [
      "보트 및 선박 선체",
      "화학 저장 탱크 및 용기",
      "해양 인프라 및 그레이팅",
      "내부식성 적층 구조"
    ],
    "benefits": [
      "해양 및 화학 노출을 위한 내부식성 보강",
      "주 적층 강도를 위한 로빙 직물",
      "층간 충전 및 접합을 위한 촙 스트랜드 매트",
      "수지 리치 보호 외층을 형성하는 표면 티슈",
      "폴리에스테르, 비닐에스테르, 에폭시 시스템과 호환",
      "화학 적합성은 저장 매체에 대해 검증"
    ],
    "selectionCriteria": [
      "접촉 매체 — 해수 또는 특정 화학 물질",
      "요구되는 구조 하중 및 적층 두께",
      "부식 환경에 맞춘 수지 시스템",
      "표면 마감 및 충족해야 할 해양 표준"
    ],
    "products": [
      "Woven Roving",
      "Chopped Strand Mat",
      "Surface Tissue Mat"
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
    "challenge": "Las estructuras aeronáuticas y aeroespaciales deben reducir peso sin sacrificar rigidez ni vida a fatiga. El refuerzo de fibra de carbono permite a los equipos de diseño sustituir el metal en estructuras portantes y secundarias, reduciendo la masa y manteniendo los márgenes mecánicos que exige la célula.",
    "components": [
      "Paneles estructurales y rigidizadores",
      "Bastidores de satélites y UAV",
      "Paneles interiores de cabina y acabado",
      "Capas de superficie para un acabado compuesto liso"
    ],
    "benefits": [
      "Alta relación resistencia-peso para estructuras compuestas ligeras",
      "Opciones de refuerzo resistentes a la fatiga para cargas repetidas",
      "Grados de material evaluables según la temperatura del proyecto",
      "Arquitecturas de fibra para estructuras sensibles a la vibración",
      "Opciones de refuerzo resistentes a la corrosión para entornos exigentes",
      "Gramajes personalizados de 10g/m² a 600g/m², sujetos a confirmación técnica"
    ],
    "selectionCriteria": [
      "Cargas estructurales y relación resistencia-peso objetivo",
      "Rango de temperatura de servicio y sistema de resina empleado",
      "Arquitectura de fibra y gramaje de cada laminado",
      "Normas de cualificación y ensayo aplicables para la validación"
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
    "description": "Los sistemas de defensa modernos requieren materiales que proporcionen blindaje electromagnético, integridad estructural y capacidades de sigilo. Nuestros mats de fibra de carbono niquelados ofrecen opciones de blindaje conductivo manteniendo perfiles ligeros.",
    "challenge": "Las plataformas de defensa combinan límites estrictos de peso con exigencias electromagnéticas y de durabilidad. Los mats y refuerzos conductivos de fibra de carbono ofrecen a los ingenieros una vía ligera hacia el blindaje y la protección estructural, ajustable al régimen de ensayo de cada programa.",
    "components": [
      "Capas de blindaje EMI/RFI en envolventes",
      "Paneles estructurales de protección ligeros",
      "Componentes próximos a antenas y radar",
      "Refuerzos para carcasas de equipos portátiles"
    ],
    "benefits": [
      "Opciones conductoras niqueladas para evaluar blindaje EMI/RFI",
      "Formatos de refuerzo ligeros para estructuras de protección",
      "Materiales para investigación de radar y compatibilidad electromagnética",
      "Resistencia química y a la corrosión",
      "Ensayos de impacto y durabilidad coordinables por proyecto",
      "Especificaciones personalizadas sujetas a revisión y validación de muestras"
    ],
    "selectionCriteria": [
      "Si la prioridad es el blindaje, la estructura o ambos",
      "Método de ensayo electromagnético y rango de frecuencias de interés",
      "Requisitos de exposición ambiental y durabilidad",
      "Documentación y validación necesarias para la aprobación del programa"
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
    "challenge": "Las pilas de combustible y las baterías avanzadas necesitan capas conductivas y químicamente estables que se mantengan constantes en grandes volúmenes de producción. Los mats finos de fibra de carbono aportan la estructura porosa y conductiva de la que dependen estos sistemas electroquímicos para la difusión de gas y la captación de corriente.",
    "components": [
      "Capas de difusión de gas en pilas de combustible de hidrógeno",
      "Capas conductivas en dispositivos de almacenamiento de energía",
      "Estructuras de soporte de electrodos y separadores",
      "Capas funcionales finas con porosidad controlada"
    ],
    "benefits": [
      "Porosidad ajustable para evaluar capas de difusión de gas",
      "Objetivos de conductividad confirmados por grado y método de ensayo",
      "Compatibilidad química a validar según el entorno operativo",
      "Opciones ultrafinas desde 10g/m² para aplicaciones de pilas de combustible",
      "Tolerancia de espesor confirmada en la especificación acordada",
      "Muestras piloto y suministro escalable para programas de homologación"
    ],
    "selectionCriteria": [
      "Química de operación y medio en contacto con la capa",
      "Porosidad, espesor y comportamiento conductivo objetivo",
      "Métodos de ensayo usados para verificar el rendimiento eléctrico",
      "Escalado desde muestras piloto hasta suministro de producción"
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
    "challenge": "Las palas de aerogenerador son cada vez más largas, y cada metro añade exigencias de fatiga y rigidez. Los refuerzos de fibra de vidrio soportan estas cargas a un coste viable, por lo que los tejidos multiaxiales y los mats aptos para infusión son el núcleo de la construcción moderna de palas.",
    "components": [
      "Largueros y almas de cortante de la pala",
      "Carcasas y secciones de raíz de la pala",
      "Cubiertas de góndola y spinners",
      "Refuerzos estructurales y rigidizadores"
    ],
    "benefits": [
      "Tejidos multiaxiales optimizados para largueros y carcasas de palas",
      "Arquitecturas de fibra para estructuras sensibles a la fatiga",
      "Rendimiento de infusión evaluado con el proceso del cliente",
      "Distribución consistente de fibras para propiedades mecánicas predecibles",
      "Compatible con sistemas de resina epoxi, poliéster y éster vinílico",
      "Disponible en pesos de 300g/m² a 1200g/m²"
    ],
    "selectionCriteria": [
      "Cargas estructurales y objetivos de vida a fatiga de la pala",
      "Orientación de fibra y gramaje por zona del laminado",
      "Sistema de resina y proceso de infusión en la línea del cliente",
      "Tolerancias dimensionales y de calidad para piezas grandes"
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
    "challenge": "La envolvente del edificio necesita materiales que se mantengan dimensionalmente estables durante años de ciclos térmicos y exposición a la humedad. Los mats de tissue y refuerzo de fibra de vidrio aportan a las membranas, cubiertas y sistemas de muro un soporte estable que adhiere bien y resiste la degradación.",
    "components": [
      "Membranas impermeabilizantes y bituminosas",
      "Sistemas de cubierta y láminas base",
      "Recubrimientos de aislamiento de tuberías y conductos",
      "Revestimientos de pared y capas de refuerzo"
    ],
    "benefits": [
      "Excelente estabilidad dimensional bajo ciclos térmicos",
      "Adherencia superior con sistemas de betún y polímeros modificados",
      "Opciones resistentes a los álcalis para el refuerzo de hormigón",
      "Ligero pero de alta resistencia para aplicaciones estructurales",
      "Rendimiento a la intemperie sujeto al grado y al sistema seleccionado",
      "Grados ignífugos disponibles; la clasificación depende del sistema final y del método de ensayo"
    ],
    "selectionCriteria": [
      "El sistema de adhesión — betún, polímero o cementoso",
      "Exposición a humedad, álcalis y ciclos térmicos",
      "Acabado superficial y estabilidad dimensional requeridos",
      "Norma de fuego o intemperie que deba cumplir el sistema final"
    ],
    "products": [
      "Surface Tissue Mat",
      "Chopped Strand Mat",
      "Woven Roving"
    ]
  },
  "motorsport": {
    "title": "Competición y Automoción",
    "metaDescription": "Tejidos y refuerzos de fibra de carbono de alto rendimiento para paneles de carrocería, componentes estructurales y piezas ligeras de automoción.",
    "headline": "Rendimiento Ligero en Carretera y Circuito",
    "description": "Los programas de competición y automoción de altas prestaciones usan fibra de carbono para reducir masa, afinar la respuesta y rigidizar estructuras clave. Nuestros tejidos y formatos de refuerzo sirven para paneles de carrocería, secciones de monocasco y piezas de acabado visto.",
    "challenge": "Cada kilogramo eliminado de un vehículo mejora la aceleración, la frenada y el comportamiento dinámico. El refuerzo de fibra de carbono sustituye piezas más pesadas de metal y vidrio por laminados rígidos y de baja masa, mientras que los acabados tejidos aportan la identidad visual que se espera en piezas premium.",
    "components": [
      "Paneles de carrocería y componentes aerodinámicos",
      "Refuerzos de monocasco y chasis",
      "Molduras interiores y superficies de tejido visto",
      "Soportes y rigidizadores estructurales"
    ],
    "benefits": [
      "Opciones de refuerzo de alta rigidez para piezas sensibles al peso",
      "Formatos de tejido para calidad de superficie y acabado controlados",
      "Construcciones híbridas carbono-vidrio para equilibrar coste y prestaciones",
      "Sarga y tafetán para distintas necesidades de drapeado y aspecto",
      "Compatible con procesos comunes de preimpregnado e infusión",
      "Anchos y estilos de tejido personalizados sujetos a confirmación técnica"
    ],
    "selectionCriteria": [
      "Si la pieza es estructural, estética o ambas",
      "Rigidez objetivo y presupuesto de peso del componente",
      "Estilo de tejido y expectativas de acabado en superficies vistas",
      "Proceso de moldeo — preimpregnado, infusión o laminado húmedo"
    ],
    "products": [
      "Carbon-Glass Hybrid Woven Cloth",
      "Carbon Fiber Twill Cloth",
      "Carbon Fiber Plain Cloth"
    ]
  },
  "manufacturing": {
    "title": "Fabricación de Alta Gama",
    "metaDescription": "Mats premium de fibra de carbono, mats agujados y fibra cortada para pultrusión, fabricación de moldes y manufactura avanzada de composites.",
    "headline": "Materiales para la Producción Avanzada de Composites",
    "description": "Los fabricantes de composites usan fibra de carbono en pultrusión, moldeo y utillaje para producir piezas rígidas y dimensionalmente estables. Nuestros mats composite, mats agujados y fibra cortada favorecen un procesado consistente en series de producción.",
    "challenge": "Los procesos de composites en producción necesitan refuerzos que se alimenten de forma consistente y curen de manera predecible en cada serie. Los mats y la fibra cortada de carbono dan a los fabricantes una manipulación y un comportamiento mecánico repetibles, que mantienen estables las líneas de pultrusión y los moldes.",
    "components": [
      "Perfiles pultruidos y formas estándar",
      "Moldes y utillaje de composite",
      "Refuerzo de compuestos y moldeo",
      "Capas de superficie para calidad de acabado"
    ],
    "benefits": [
      "Formatos de mat consistentes para un procesado repetible",
      "Construcciones agujadas y composite para manipulación y drapeado",
      "Fibra cortada para procesos de compounding y moldeo",
      "Opciones que soportan flujos de pultrusión y utillaje",
      "Compatible con sistemas de resina termoestable comunes",
      "Formatos y gramajes personalizados sujetos a confirmación técnica"
    ],
    "selectionCriteria": [
      "Tipo de proceso — pultrusión, moldeo, utillaje o compounding",
      "Manipulación, drapeado y mojado necesarios en la línea",
      "Sistema de resina y condiciones de curado en uso",
      "Tolerancia dimensional y expectativas de acabado de la pieza"
    ],
    "products": [
      "Carbon Fiber Composite Mat",
      "Carbon Fiber Needled Mat",
      "Short Cut Carbon Fiber"
    ]
  },
  "industrial-filtration": {
    "title": "Filtración Industrial",
    "metaDescription": "Mats de fibra especial y basalto para filtración a alta temperatura, procesamiento químico y protección medioambiental.",
    "headline": "Filtración para Servicio a Alta Temperatura y Químico",
    "description": "La filtración industrial y el control de emisiones operan en entornos calientes y químicamente agresivos donde los materiales orgánicos fallan. Nuestros mats de basalto y fibra especial ofrecen resistencia térmica y química aptas para el soporte de medios de filtración y separación.",
    "challenge": "Los gases de combustión calientes y las corrientes químicas agresivas degradan rápidamente los medios convencionales. Los mats de basalto y fibra mineral resisten temperaturas elevadas y el ataque químico, dando a los sistemas de filtración y emisiones una estructura duradera sobre la que construir el medio.",
    "components": [
      "Soporte de medios de filtración a alta temperatura",
      "Capas de separación en procesos químicos",
      "Sistemas de control de emisiones y gases de combustión",
      "Capas de protección térmica y ambiental"
    ],
    "benefits": [
      "Opciones de fibra de basalto para servicio a temperatura elevada",
      "Formatos resistentes a productos químicos para corrientes agresivas",
      "Construcciones tricotadas y cosidas para soporte estructural del medio",
      "Formatos de mat consistentes para builds de filtración repetibles",
      "Estabilidad térmica apta para entornos industriales exigentes",
      "Límites de operación confirmados por grado y condiciones de ensayo validadas"
    ],
    "selectionCriteria": [
      "Temperatura de operación continua y posibles picos",
      "Composición química y pH de la corriente de proceso",
      "Eficiencia de filtración y soporte estructural requeridos",
      "Condiciones de ensayo para confirmar límites térmicos y químicos"
    ],
    "products": [
      "Basalt Fiber Mat",
      "Knitted Stitched Mat",
      "Chopped Strand Mat"
    ]
  },
  "transportation": {
    "title": "Transporte y Ferroviario",
    "metaDescription": "Mats composite ligeros de fibra de vidrio para interiores ferroviarios, componentes de automoción e infraestructura de transporte.",
    "headline": "Composites Ligeros para la Movilidad",
    "description": "Los programas ferroviarios, de automoción y de transporte usan composites de fibra de vidrio para reducir peso cumpliendo requisitos estructurales y de durabilidad. Nuestros mats sándwich y composite sirven para paneles, interiores y componentes estructurales en aplicaciones de transporte.",
    "challenge": "Los vehículos y el material rodante deben reducir peso estructural para mejorar la eficiencia, sin comprometer rigidez ni durabilidad. Los mats composite y de núcleo de fibra de vidrio aportan paneles rígidos y de baja masa que resisten la vibración y las cargas del servicio de transporte.",
    "components": [
      "Paneles interiores ferroviarios y de vagones",
      "Componentes de carrocería y estructurales de automoción",
      "Paneles de suelo y pared con núcleo sándwich",
      "Componentes de infraestructura de transporte"
    ],
    "benefits": [
      "Formatos sándwich con núcleo PP para paneles rígidos y ligeros",
      "Mats composite para piezas estructurales y semiestructurales",
      "Refuerzo de roving tejido para zonas de mayor carga",
      "Calidad de laminado consistente para un rendimiento predecible",
      "Compatible con procesos comunes de molde cerrado e infusión",
      "Construcciones personalizadas sujetas a confirmación técnica"
    ],
    "selectionCriteria": [
      "Papel estructural o de rigidez de panel de la pieza",
      "Presupuesto de peso y rigidez de panel objetivo",
      "Requisitos de vibración, impacto y durabilidad en servicio",
      "Proceso de moldeo y norma de seguridad de transporte aplicable"
    ],
    "products": [
      "PP Core Sandwich Mat",
      "Composite Mat",
      "Woven Roving"
    ]
  },
  "marine": {
    "title": "Marina y Protección contra la Corrosión",
    "metaDescription": "Roving y mats de fibra de vidrio resistentes a la corrosión para construcción naval, tanques de almacenamiento químico e infraestructura marina.",
    "headline": "Estructuras Resistentes a la Corrosión para Servicio Marino",
    "description": "Los entornos marinos y químicos corroen el metal con rapidez, por lo que los constructores recurren a laminados de fibra de vidrio para cascos, tanques e infraestructura. Nuestro roving tejido y mats aportan la resistencia a la corrosión y la resistencia de laminado que estas estructuras requieren.",
    "challenge": "El agua salada y los productos químicos almacenados atacan sin descanso las estructuras metálicas, elevando los costes de mantenimiento. Los laminados de fibra de vidrio resisten esta corrosión durante largas vidas útiles, por lo que cascos, tanques e infraestructura marina dependen del roving tejido y los mats de refuerzo.",
    "components": [
      "Cascos de embarcaciones y buques",
      "Tanques y recipientes de almacenamiento químico",
      "Infraestructura marina y rejillas",
      "Estructuras laminadas resistentes a la corrosión"
    ],
    "benefits": [
      "Refuerzo resistente a la corrosión para exposición marina y química",
      "Roving tejido para la resistencia principal del laminado",
      "Mat de hilo cortado para volumen interlaminar y adhesión",
      "Tissue de superficie para una capa exterior protectora rica en resina",
      "Compatible con sistemas de poliéster, éster vinílico y epoxi",
      "Compatibilidad química validada frente al medio almacenado"
    ],
    "selectionCriteria": [
      "El medio en contacto — agua de mar o productos químicos concretos",
      "Cargas estructurales y espesor de laminado requeridos",
      "Sistema de resina adecuado al entorno de corrosión",
      "Acabado superficial y norma marina que deba cumplir la construcción"
    ],
    "products": [
      "Woven Roving",
      "Chopped Strand Mat",
      "Surface Tissue Mat"
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
    "challenge": "Estruturas aeronáuticas e aeroespaciais precisam reduzir peso sem abrir mão de rigidez ou vida em fadiga. O reforço em fibra de carbono permite às equipes de projeto substituir o metal em estruturas portantes e secundárias, reduzindo a massa e mantendo as margens mecânicas que a fuselagem exige.",
    "components": [
      "Painéis estruturais e reforçadores",
      "Estruturas de satélites e VANTs",
      "Painéis interiores de cabine e acabamento",
      "Camadas de superfície para um acabamento compósito liso"
    ],
    "benefits": [
      "Alta relação resistência-peso para estruturas compósitas leves",
      "Opções de reforço resistentes à fadiga para cargas repetidas",
      "Classes de material avaliáveis conforme a temperatura do projeto",
      "Arquiteturas de fibra para estruturas sensíveis à vibração",
      "Opções de reforço resistentes à corrosão para ambientes exigentes",
      "Gramaturas personalizadas de 10g/m² a 600g/m², sujeitas à confirmação técnica"
    ],
    "selectionCriteria": [
      "Cargas estruturais e relação resistência-peso pretendida",
      "Faixa de temperatura de serviço e sistema de resina utilizado",
      "Arquitetura de fibra e gramatura de cada laminado",
      "Normas de qualificação e ensaio aplicáveis para a validação"
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
    "description": "Os sistemas de defesa modernos exigem materiais que forneçam blindagem eletromagnética, integridade estrutural e capacidades stealth. Nossas mantas de fibra de carbono niqueladas oferecem opções de blindagem condutiva mantendo perfis leves.",
    "challenge": "As plataformas de defesa combinam limites rígidos de peso com exigências eletromagnéticas e de durabilidade. Mantas e reforços condutivos de fibra de carbono oferecem aos engenheiros um caminho leve para blindagem e proteção estrutural, ajustável ao regime de ensaio de cada programa.",
    "components": [
      "Camadas de blindagem EMI/RFI em invólucros",
      "Painéis estruturais de proteção leves",
      "Componentes próximos a antenas e radar",
      "Reforços para carcaças de equipamentos portáteis"
    ],
    "benefits": [
      "Opções condutivas niqueladas para avaliação de blindagem EMI/RFI",
      "Formatos de reforço leves para estruturas de proteção",
      "Materiais para pesquisa de radar e compatibilidade eletromagnética",
      "Resistência química e à corrosão",
      "Ensaios de impacto e durabilidade podem ser coordenados por projeto",
      "Especificações personalizadas sujeitas à análise e validação de amostras"
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
    "challenge": "Células de combustível e baterias avançadas precisam de camadas condutivas e quimicamente estáveis que se mantenham consistentes em grandes volumes de produção. Mantas finas de fibra de carbono fornecem a estrutura porosa e condutiva de que esses sistemas eletroquímicos dependem para difusão de gás e coleta de corrente.",
    "components": [
      "Camadas de difusão de gás em células de combustível de hidrogênio",
      "Camadas condutivas em dispositivos de armazenamento de energia",
      "Estruturas de suporte de eletrodos e separadores",
      "Camadas funcionais finas com porosidade controlada"
    ],
    "benefits": [
      "Porosidade ajustável para avaliação de camadas de difusão de gás",
      "Metas de condutividade confirmadas por classe e método de ensaio",
      "Compatibilidade química a validar conforme o ambiente operacional",
      "Opções ultrafinas a partir de 10g/m² para aplicações em células de combustível",
      "Tolerância de espessura confirmada na especificação acordada",
      "Amostras piloto e fornecimento escalável para programas de qualificação"
    ],
    "selectionCriteria": [
      "Química de operação e o meio em contato com a camada",
      "Porosidade, espessura e comportamento condutivo pretendidos",
      "Métodos de ensaio usados para verificar o desempenho elétrico",
      "Escalonamento de amostras piloto ao fornecimento de produção"
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
    "challenge": "As pás de turbina estão cada vez mais longas, e cada metro adiciona exigências de fadiga e rigidez. Os reforços de fibra de vidro suportam essas cargas a um custo viável, por isso tecidos multiaxiais e mantas prontas para infusão são o núcleo da construção moderna de pás.",
    "components": [
      "Longarinas e almas de cisalhamento da pá",
      "Cascas e seções de raiz da pá",
      "Coberturas de nacele e spinners",
      "Reforços estruturais e enrijecedores"
    ],
    "benefits": [
      "Tecidos multiaxiais otimizados para longarinas e cascas de pás",
      "Arquiteturas de fibra para estruturas sensíveis à fadiga",
      "Desempenho de infusão avaliado com o processo do cliente",
      "Distribuição consistente de fibras para propriedades mecânicas previsíveis",
      "Compatível com sistemas de resina epóxi, poliéster e éster vinílico",
      "Disponível em gramaturas de 300g/m² a 1200g/m²"
    ],
    "selectionCriteria": [
      "Cargas estruturais e metas de vida em fadiga da pá",
      "Orientação de fibra e gramatura por zona do laminado",
      "Sistema de resina e processo de infusão na linha do cliente",
      "Tolerâncias dimensionais e de qualidade para peças grandes"
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
    "challenge": "O envelope do edifício precisa de materiais que permaneçam dimensionalmente estáveis ao longo de anos de ciclagem térmica e exposição à umidade. Mantas tissue e de reforço de fibra de vidro dão a membranas, coberturas e sistemas de parede um suporte estável que adere bem e resiste à degradação.",
    "components": [
      "Membranas de impermeabilização e betuminosas",
      "Sistemas de cobertura e mantas de base",
      "Faces de isolamento de tubulações e dutos",
      "Revestimentos de parede e camadas de reforço"
    ],
    "benefits": [
      "Excelente estabilidade dimensional sob ciclagem térmica",
      "Adesão superior com sistemas de betume e polímero modificado",
      "Opções resistentes a álcalis para reforço de concreto",
      "Leve porém de alta resistência para aplicações estruturais",
      "Desempenho ao intemperismo sujeito à classe e ao sistema selecionado",
      "Classes retardantes de chama disponíveis; a classificação depende do sistema final e do método de ensaio"
    ],
    "selectionCriteria": [
      "O sistema de adesão — betume, polímero ou cimentício",
      "Exposição a umidade, álcalis e ciclagem térmica",
      "Acabamento superficial e estabilidade dimensional exigidos",
      "Norma de fogo ou intemperismo que o sistema final deva atender"
    ],
    "products": [
      "Manta Tissue de Superfície",
      "Manta de Fios Cortados",
      "Rovings Tecidos"
    ]
  },
  "motorsport": {
    "title": "Motorsport e Automotivo",
    "metaDescription": "Tecidos e reforços de fibra de carbono de alto desempenho para painéis de carroceria, componentes estruturais e peças automotivas leves.",
    "headline": "Desempenho Leve na Estrada e na Pista",
    "description": "Programas de motorsport e automotivos de alto desempenho usam fibra de carbono para reduzir massa, aguçar a resposta e enrijecer estruturas-chave. Nossos tecidos e formatos de reforço atendem painéis de carroceria, seções de monocoque e peças de acabamento aparente.",
    "challenge": "Cada quilograma removido de um veículo melhora aceleração, frenagem e dirigibilidade. O reforço em fibra de carbono substitui peças mais pesadas de metal e vidro por laminados rígidos e de baixa massa, enquanto acabamentos tecidos também atendem à identidade visual esperada em peças premium.",
    "components": [
      "Painéis de carroceria e componentes aerodinâmicos",
      "Reforços de monocoque e chassi",
      "Acabamentos internos e superfícies de trama aparente",
      "Suportes e enrijecedores estruturais"
    ],
    "benefits": [
      "Opções de reforço de alta rigidez para peças sensíveis ao peso",
      "Formatos de tecido para qualidade de superfície e acabamento controlados",
      "Construções híbridas carbono-vidro para equilibrar custo e desempenho",
      "Sarja e tela para diferentes necessidades de drapeado e aparência",
      "Compatível com processos comuns de pré-impregnado e infusão",
      "Larguras e estilos de trama personalizados sujeitos à confirmação técnica"
    ],
    "selectionCriteria": [
      "Se a peça é estrutural, estética ou ambas",
      "Rigidez pretendida e orçamento de peso do componente",
      "Estilo de trama e expectativas de acabamento em superfícies aparentes",
      "Processo de moldagem — pré-impregnado, infusão ou laminação úmida"
    ],
    "products": [
      "Tecido Híbrido Carbono-Vidro",
      "Tecido Sarja de Fibra de Carbono",
      "Tecido Plano de Fibra de Carbono"
    ]
  },
  "manufacturing": {
    "title": "Manufatura de Alto Padrão",
    "metaDescription": "Mantas premium de fibra de carbono, mantas agulhadas e fibra picada para pultrusão, fabricação de moldes e manufatura avançada de compósitos.",
    "headline": "Materiais para a Produção Avançada de Compósitos",
    "description": "Fabricantes de compósitos usam fibra de carbono em pultrusão, moldagem e ferramental para produzir peças rígidas e dimensionalmente estáveis. Nossas mantas compostas, mantas agulhadas e fibra picada favorecem um processamento consistente em lotes de produção.",
    "challenge": "Processos de compósitos em produção precisam de reforços que alimentem de forma consistente e curem de modo previsível, lote após lote. Mantas e fibra picada de carbono dão aos fabricantes manuseio e comportamento mecânico repetíveis, o que mantém linhas de pultrusão e moldes produzindo peças estáveis.",
    "components": [
      "Perfis pultrudados e formas padrão",
      "Moldes e ferramental de compósito",
      "Reforço de compostos e moldagem",
      "Camadas de superfície para qualidade de acabamento"
    ],
    "benefits": [
      "Formatos de manta consistentes para processamento repetível",
      "Construções agulhadas e compostas para manuseio e drapeado",
      "Fibra picada para processos de composição e moldagem",
      "Opções que suportam fluxos de pultrusão e ferramental",
      "Compatível com sistemas de resina termofixa comuns",
      "Formatos e gramaturas personalizados sujeitos à confirmação técnica"
    ],
    "selectionCriteria": [
      "Tipo de processo — pultrusão, moldagem, ferramental ou composição",
      "Manuseio, drapeado e molhamento necessários na linha",
      "Sistema de resina e condições de cura em uso",
      "Tolerância dimensional e expectativas de acabamento da peça"
    ],
    "products": [
      "Manta Composta de Fibra de Carbono",
      "Manta Agulhada de Fibra de Carbono",
      "Fibra de Carbono Picada"
    ]
  },
  "industrial-filtration": {
    "title": "Filtração Industrial",
    "metaDescription": "Mantas de fibra especial e basalto para filtração a alta temperatura, processamento químico e proteção ambiental.",
    "headline": "Filtração para Serviço a Alta Temperatura e Químico",
    "description": "A filtração industrial e o controle de emissões operam em ambientes quentes e quimicamente agressivos onde materiais orgânicos falham. Nossas mantas de basalto e fibra especial oferecem resistência térmica e química adequadas ao suporte de mídia de filtração e separação.",
    "challenge": "Gases de combustão quentes e correntes químicas agressivas degradam rapidamente mídias comuns. Mantas de basalto e fibra mineral resistem a temperaturas elevadas e ao ataque químico, dando aos sistemas de filtração e emissões uma estrutura durável sobre a qual construir a mídia.",
    "components": [
      "Suporte de mídia de filtração a alta temperatura",
      "Camadas de separação em processos químicos",
      "Sistemas de controle de emissões e gases de combustão",
      "Camadas de proteção térmica e ambiental"
    ],
    "benefits": [
      "Opções de fibra de basalto para serviço a temperatura elevada",
      "Formatos resistentes a químicos para correntes de processo agressivas",
      "Construções tricotadas e costuradas para suporte estrutural da mídia",
      "Formatos de manta consistentes para builds de filtração repetíveis",
      "Estabilidade térmica adequada a ambientes industriais exigentes",
      "Limites de operação confirmados por classe e condições de ensaio validadas"
    ],
    "selectionCriteria": [
      "Temperatura de operação contínua e eventuais picos",
      "Composição química e pH da corrente de processo",
      "Eficiência de filtração e suporte estrutural exigidos",
      "Condições de ensaio para confirmar limites térmicos e químicos"
    ],
    "products": [
      "Manta de Fibra de Basalto",
      "Manta Costurada Tricotada",
      "Manta de Fios Cortados"
    ]
  },
  "transportation": {
    "title": "Transporte e Ferroviário",
    "metaDescription": "Mantas compostas leves de fibra de vidro para interiores ferroviários, componentes automotivos e infraestrutura de transporte.",
    "headline": "Compósitos Leves para a Mobilidade",
    "description": "Programas ferroviários, automotivos e de transporte usam compósitos de fibra de vidro para reduzir peso atendendo a requisitos estruturais e de durabilidade. Nossas mantas sanduíche e compostas atendem painéis, interiores e componentes estruturais em aplicações de transporte.",
    "challenge": "Veículos e material rodante precisam reduzir peso estrutural para melhorar a eficiência, sem comprometer rigidez ou durabilidade. Mantas compostas e de núcleo de fibra de vidro entregam painéis rígidos e de baixa massa que resistem à vibração e às cargas do serviço de transporte.",
    "components": [
      "Painéis interiores ferroviários e de vagões",
      "Componentes de carroceria e estruturais automotivos",
      "Painéis de piso e parede com núcleo sanduíche",
      "Componentes de infraestrutura de transporte"
    ],
    "benefits": [
      "Formatos sanduíche com núcleo PP para painéis rígidos e leves",
      "Mantas compostas para peças estruturais e semiestruturais",
      "Reforço de roving tecido para áreas de maior carga",
      "Qualidade de laminado consistente para desempenho previsível",
      "Compatível com processos comuns de molde fechado e infusão",
      "Construções personalizadas sujeitas à confirmação técnica"
    ],
    "selectionCriteria": [
      "Papel estrutural ou de rigidez de painel da peça",
      "Orçamento de peso e rigidez de painel pretendida",
      "Requisitos de vibração, impacto e durabilidade em serviço",
      "Processo de moldagem e norma de segurança de transporte aplicável"
    ],
    "products": [
      "Manta Sanduíche com Núcleo PP",
      "Manta Composta",
      "Rovings Tecidos"
    ]
  },
  "marine": {
    "title": "Naval e Proteção contra Corrosão",
    "metaDescription": "Roving e mantas de fibra de vidro resistentes à corrosão para construção naval, tanques de armazenamento químico e infraestrutura marítima.",
    "headline": "Estruturas Resistentes à Corrosão para Serviço Marítimo",
    "description": "Ambientes marinhos e químicos corroem o metal rapidamente, por isso os construtores recorrem a laminados de fibra de vidro para cascos, tanques e infraestrutura. Nosso roving tecido e mantas fornecem a resistência à corrosão e a resistência de laminado que essas estruturas exigem.",
    "challenge": "A água salgada e os produtos químicos armazenados atacam incessantemente as estruturas metálicas, elevando os custos de manutenção. Laminados de fibra de vidro resistem a essa corrosão ao longo de longas vidas úteis, por isso cascos, tanques e infraestrutura marítima dependem de roving tecido e mantas de reforço.",
    "components": [
      "Cascos de barcos e navios",
      "Tanques e vasos de armazenamento químico",
      "Infraestrutura marítima e grades",
      "Estruturas laminadas resistentes à corrosão"
    ],
    "benefits": [
      "Reforço resistente à corrosão para exposição marinha e química",
      "Roving tecido para a resistência principal do laminado",
      "Manta de fios cortados para volume interlaminar e adesão",
      "Tissue de superfície para uma camada externa protetora rica em resina",
      "Compatível com sistemas de poliéster, éster vinílico e epóxi",
      "Compatibilidade química validada frente ao meio armazenado"
    ],
    "selectionCriteria": [
      "O meio em contato — água do mar ou produtos químicos específicos",
      "Cargas estruturais e espessura de laminado exigidas",
      "Sistema de resina adequado ao ambiente de corrosão",
      "Acabamento superficial e norma naval que a construção deva atender"
    ],
    "products": [
      "Rovings Tecidos",
      "Manta de Fios Cortados",
      "Manta Tissue de Superfície"
    ]
  }
};

export const applicationDetailsZh: ApplicationDetailTranslations = {
  "aerospace": {
    "title": "航空航天",
    "metaDescription": "用于航空航天结构件、内饰面板和轻量化航空解决方案的高性能碳纤维复合材料。",
    "headline": "为蓝天而设计",
    "description": "航空航天行业需要兼具卓越强度和最轻重量的材料。我们的碳纤维解决方案专为飞机结构件、卫星系统、无人机框架和客舱内饰面板设计。",
    "challenge": "飞机与航空航天结构必须在减重的同时不牺牲刚度和疲劳寿命。碳纤维增强让设计团队在承载和次级结构上替代金属，在保持机体所需力学裕度的前提下降低质量。",
    "components": [
      "结构面板与加强筋",
      "卫星与无人机框架",
      "客舱内饰与装饰面板",
      "用于平滑复合表面的表层"
    ],
    "benefits": [
      "适用于轻量化复合结构的高比强度潜力",
      "面向重复载荷部件的耐疲劳增强方案",
      "可按项目温度要求筛选材料牌号",
      "可为振动敏感结构提供不同纤维构型",
      "面向严苛环境的耐腐蚀增强方案",
      "10g/m²到600g/m²定制克重，最终以技术确认为准"
    ],
    "selectionCriteria": [
      "结构载荷与目标比强度范围",
      "使用温度范围及所用树脂体系",
      "每层铺层的纤维构型和面密度",
      "用于验收的适用鉴定与测试标准"
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
    "description": "现代国防系统需要能提供电磁屏蔽、结构完整性和隐身功能的材料。我们的镀镍碳纤维毡在保持轻量化的同时提供导电屏蔽方案。",
    "challenge": "国防平台在严格的重量限制之外，还有电磁和耐久性要求。导电碳纤维毡和增强材料为工程师提供了一条轻量化的屏蔽与结构防护途径，并可按各项目的测试规范进行调整。",
    "components": [
      "机箱内的EMI/RFI屏蔽层",
      "轻量化防护结构面板",
      "天线和雷达相邻部件",
      "便携设备外壳的增强件"
    ],
    "benefits": [
      "用于EMI/RFI屏蔽评估的导电镀镍方案",
      "适用于防护结构的轻量化增强形式",
      "可用于雷达与电磁兼容研究的材料方案",
      "耐化学和耐腐蚀性",
      "可按项目协调冲击与耐久性测试",
      "定制规格需经应用评审和样品验证"
    ],
    "selectionCriteria": [
      "优先目标是屏蔽、结构，还是两者兼顾",
      "关注的电磁测试方法和频率范围",
      "环境暴露与耐久性要求",
      "项目验收所需的文档与验证"
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
    "challenge": "燃料电池和先进电池需要导电、化学稳定且在大批量生产中保持一致的功能层。薄碳纤维毡提供了这些电化学系统在气体扩散和集流方面所依赖的多孔导电结构。",
    "components": [
      "氢燃料电池中的气体扩散层",
      "储能器件中的导电层",
      "电极与隔膜支撑结构",
      "需要精确控制孔隙率的薄功能层"
    ],
    "benefits": [
      "可针对气体扩散层评估调整孔隙率",
      "导电指标按产品牌号和约定测试方法确认",
      "化学相容性需结合实际运行环境验证",
      "燃料电池应用10g/m²起的超薄选项",
      "厚度公差在双方确认的产品规格中明确",
      "可为材料验证项目提供中试样品和规模化供货"
    ],
    "selectionCriteria": [
      "运行化学体系及功能层接触的介质",
      "目标孔隙率、厚度和导电行为",
      "用于验证电性能的测试方法",
      "从中试样品到量产供货的放量路径"
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
    "challenge": "涡轮叶片越来越长，每增加一米都带来更高的疲劳和刚度要求。玻璃纤维增强材料以可行的成本承载这些载荷，因此多轴织物和适合灌注的毡材成为现代叶片制造的核心。",
    "components": [
      "叶片主梁帽与抗剪腹板",
      "叶片壳体与叶根段",
      "机舱罩与导流罩",
      "结构增强件与加强筋"
    ],
    "benefits": [
      "针对叶片主梁和壳体优化的多轴织物",
      "面向疲劳敏感结构设计的纤维构型",
      "树脂灌注性能需结合客户工艺评估",
      "一致的纤维分布确保可预测的力学性能",
      "兼容环氧、聚酯和乙烯基酯树脂体系",
      "300g/m²到1200g/m²多种克重"
    ],
    "selectionCriteria": [
      "叶片的结构载荷与疲劳寿命目标",
      "各铺层区域的纤维取向与面密度",
      "客户产线上的树脂体系与灌注工艺",
      "大型部件的尺寸与质量公差"
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
    "challenge": "建筑围护结构需要在多年的热循环和潮湿暴露中保持尺寸稳定的材料。玻璃纤维薄毡和增强毡为防水卷材、屋面和墙体系统提供了粘结性好、抗老化的稳定载体。",
    "components": [
      "防水与沥青卷材",
      "屋面系统与垫层",
      "管道与风管保温面层",
      "墙面覆盖与增强层"
    ],
    "benefits": [
      "热循环下优异的尺寸稳定性",
      "与沥青和聚合物改性系统优异的粘结性",
      "混凝土加固用耐碱选项",
      "结构应用的轻量高强",
      "耐候性能取决于所选牌号和体系验证",
      "可选阻燃牌号；最终等级取决于成品体系和测试方法"
    ],
    "selectionCriteria": [
      "粘结体系——沥青、聚合物还是水泥基",
      "潮湿、碱性和热循环的暴露程度",
      "所需的表面处理与尺寸稳定性",
      "成品体系需满足的防火或耐候标准"
    ],
    "products": [
      "玻璃纤维表面毡",
      "短切毡",
      "方格布"
    ]
  },
  "motorsport": {
    "title": "赛车与汽车",
    "metaDescription": "用于车身面板、结构件和轻量化汽车部件的高性能碳纤维织物与增强材料。",
    "headline": "赛道与公路上的轻量化性能",
    "description": "赛车和高性能汽车项目使用碳纤维来减重、提升响应并加强关键结构。我们的机织布和增强形式可用于车身面板、单体壳段和外露纹理饰件。",
    "challenge": "整车每减轻一公斤，都能改善加速、制动和操控。碳纤维增强以刚性、低质量的层压件替代更重的金属和玻纤部件，机织纹理表面也满足高端部件的视觉需求。",
    "components": [
      "车身面板与空气动力部件",
      "单体壳与底盘增强件",
      "内饰件与外露编织表面",
      "支架与结构加强件"
    ],
    "benefits": [
      "面向减重部件的高刚度增强方案",
      "可控表面与外观质量的机织布形式",
      "兼顾成本与性能的碳-玻混合结构",
      "满足不同悬垂性和外观的斜纹与平纹",
      "兼容常见的环氧预浸料和灌注工艺",
      "定制幅宽与编织样式以技术确认为准"
    ],
    "selectionCriteria": [
      "部件是结构件、外观件还是二者兼具",
      "部件的目标刚度和重量预算",
      "外露表面的编织样式与外观要求",
      "成型工艺——预浸料、灌注还是手糊"
    ],
    "products": [
      "碳-玻混合机织布",
      "碳纤维斜纹布",
      "碳纤维平纹布"
    ]
  },
  "manufacturing": {
    "title": "先进制造",
    "metaDescription": "用于拉挤、模具制造和先进复合材料制造的优质碳纤维毡、针刺毡和短切纤维。",
    "headline": "面向先进复合材料生产的材料",
    "description": "复合材料制造商在拉挤、成型和模具中使用碳纤维，制造刚度高、尺寸稳定的部件。我们的复合毡、针刺毡和短切纤维支持批量生产中的一致加工。",
    "challenge": "量产复合材料工艺需要能够稳定送料、可预测固化并批次一致的增强材料。碳纤维毡和短切纤维为制造商提供了可重复的操作性和力学表现，使拉挤线和模具持续产出稳定部件。",
    "components": [
      "拉挤型材与标准型材",
      "模具与复合材料工装",
      "模塑料与成型增强",
      "用于表面质量的表层"
    ],
    "benefits": [
      "一致的毡材形式确保加工可重复",
      "针刺与复合结构兼顾操作性和悬垂性",
      "用于混炼和成型工艺的短切纤维",
      "支持拉挤和工装流程的多种选项",
      "兼容常见热固性树脂体系",
      "定制形式与克重以技术确认为准"
    ],
    "selectionCriteria": [
      "工艺类型——拉挤、成型、工装还是混炼",
      "产线所需的操作性、悬垂性和浸润行为",
      "所用的树脂体系及固化条件",
      "部件的尺寸公差和表面要求"
    ],
    "products": [
      "碳纤维复合毡",
      "碳纤维针刺毡",
      "碳纤维短切丝"
    ]
  },
  "industrial-filtration": {
    "title": "工业过滤",
    "metaDescription": "用于高温过滤、化工处理和环境保护的特种纤维毡与玄武岩毡。",
    "headline": "面向高温与化学工况的过滤",
    "description": "工业过滤和排放控制运行在高温、化学侵蚀性强的环境中，有机材料难以胜任。我们的玄武岩和特种纤维毡具备适合过滤及分离介质支撑的耐热和耐化学性能。",
    "challenge": "高温烟气和侵蚀性化学介质会迅速破坏普通滤材。玄武岩和矿物纤维毡能承受高温和化学侵蚀，为过滤和排放系统提供了可围绕其构建滤材的耐用结构。",
    "components": [
      "高温过滤介质支撑",
      "化工过程分离层",
      "排放控制与烟气系统",
      "热防护与环境防护层"
    ],
    "benefits": [
      "适用于高温工况的玄武岩纤维选项",
      "面向侵蚀性工艺流的耐化学形式",
      "针织与缝编结构提供结构性介质支撑",
      "一致的毡材形式确保过滤构建可重复",
      "适合严苛工业环境的热稳定性",
      "运行上限按牌号和经验证的测试条件确认"
    ],
    "selectionCriteria": [
      "连续运行温度及任何峰值波动",
      "工艺流的化学组成和pH值",
      "所需的过滤效率与结构支撑",
      "用于确认热与化学上限的测试条件"
    ],
    "products": [
      "玄武岩纤维毡",
      "针织缝编毡",
      "短切毡"
    ]
  },
  "transportation": {
    "title": "交通运输",
    "metaDescription": "用于轨道内饰、汽车部件和交通基础设施的轻量化玻璃纤维复合毡。",
    "headline": "面向出行的轻量化复合材料",
    "description": "轨道、汽车和运输项目使用玻璃纤维复合材料来减重，同时满足结构和耐久性要求。我们的夹层毡和复合毡支持运输应用中的面板、内饰和结构部件。",
    "challenge": "车辆和机车车辆需要减少结构重量以提升效率，同时不损失刚度或耐久性。玻璃纤维复合毡和芯材毡提供了刚性、低质量的面板，能够承受运输工况中的振动和载荷。",
    "components": [
      "轨道与客车内饰面板",
      "汽车车身与结构部件",
      "夹芯地板与墙板",
      "交通基础设施部件"
    ],
    "benefits": [
      "PP芯夹层形式打造刚性轻量面板",
      "用于结构和半结构部件的复合毡",
      "用于高载荷区域的方格布增强",
      "一致的层压质量确保性能可预测",
      "兼容常见的闭模和灌注工艺",
      "定制结构以技术确认为准"
    ],
    "selectionCriteria": [
      "部件承担结构还是面板刚度的角色",
      "重量预算与目标面板刚度",
      "使用中的振动、冲击和耐久性要求",
      "成型工艺及适用的运输安全标准"
    ],
    "products": [
      "PP芯夹层毡",
      "复合毡",
      "方格布"
    ]
  },
  "marine": {
    "title": "船舶与防腐",
    "metaDescription": "用于造船、化学储罐和海洋基础设施的耐腐蚀玻璃纤维方格布与毡材。",
    "headline": "面向海洋工况的耐腐蚀结构",
    "description": "海洋和化学环境会迅速腐蚀金属，因此制造商转向玻璃纤维层压件用于船体、储罐和基础设施。我们的方格布和毡材提供这些结构所需的耐腐蚀性和层压强度。",
    "challenge": "海水和储存的化学品会持续侵蚀金属结构，带来高昂的维护成本。玻璃纤维层压件在长使用寿命中抵抗这类腐蚀，因此船体、储罐和海洋基础设施依赖方格布和增强毡。",
    "components": [
      "船艇与船舶船体",
      "化学储罐与容器",
      "海洋基础设施与格栅",
      "耐腐蚀层压结构"
    ],
    "benefits": [
      "面向海洋和化学暴露的耐腐蚀增强",
      "提供主层压强度的方格布",
      "提供层间填充和粘结的短切毡",
      "形成富树脂防护外层的表面毡",
      "兼容聚酯、乙烯基酯和环氧体系",
      "化学相容性需结合储存介质验证"
    ],
    "selectionCriteria": [
      "接触介质——海水还是特定化学品",
      "所需的结构载荷与层压厚度",
      "与腐蚀环境匹配的树脂体系",
      "表面处理及需满足的海洋标准"
    ],
    "products": [
      "方格布",
      "短切毡",
      "玻璃纤维表面毡"
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
