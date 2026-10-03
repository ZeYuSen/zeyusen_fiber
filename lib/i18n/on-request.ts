import type { Locale } from "./config";

// Copy for products outside the stocked catalog that are supplied on request.
export type OnRequestCopy = {
  /** Short status label (badges). */
  label: string;
  /** One-paragraph explanation on the product / category page. */
  body: string;
  /** Heading for the "also available on request" list on division pages. */
  listTitle: string;
  /** Intro under that heading. */
  listIntro: string;
};

const copy: Record<Locale, OnRequestCopy> = {
  en: {
    label: "Available on request",
    body: "Not a stocked catalog item. We supply it on request: send your specification and target quantity, and we will confirm availability, MOQ, and lead time.",
    listTitle: "Also available on request",
    listIntro: "Not part of the stocked catalog. Send a specification and we will confirm availability, MOQ, and lead time.",
  },
  zh: {
    label: "可按需供货",
    body: "该产品不属于常备库存，可按需供货。请发送规格要求和目标数量，我们会确认供货可行性、起订量和交期。",
    listTitle: "以下产品可按需供货",
    listIntro: "不属于常备库存。请发送规格要求，我们会确认供货可行性、起订量和交期。",
  },
  ko: {
    label: "요청 시 공급",
    body: "상시 재고 품목이 아니며 요청 시 공급합니다. 사양과 목표 수량을 보내주시면 공급 가능 여부, 최소 주문 수량과 납기를 확인해 드립니다.",
    listTitle: "요청 시 공급 가능한 제품",
    listIntro: "상시 재고 품목이 아닙니다. 사양을 보내주시면 공급 가능 여부, 최소 주문 수량과 납기를 확인해 드립니다.",
  },
  es: {
    label: "Disponible bajo pedido",
    body: "No es un artículo de stock. Lo suministramos bajo pedido: envíe su especificación y la cantidad prevista, y confirmaremos disponibilidad, pedido mínimo y plazo de entrega.",
    listTitle: "También disponible bajo pedido",
    listIntro: "No forma parte del catálogo en stock. Envíe una especificación y confirmaremos disponibilidad, pedido mínimo y plazo de entrega.",
  },
  pt: {
    label: "Disponível sob encomenda",
    body: "Não é um item de estoque. Fornecemos sob encomenda: envie sua especificação e a quantidade prevista, e confirmaremos disponibilidade, pedido mínimo e prazo de entrega.",
    listTitle: "Também disponível sob encomenda",
    listIntro: "Não faz parte do catálogo em estoque. Envie uma especificação e confirmaremos disponibilidade, pedido mínimo e prazo de entrega.",
  },
};

export function getOnRequestCopy(locale: Locale): OnRequestCopy {
  return copy[locale];
}
