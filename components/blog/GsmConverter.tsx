"use client";

import { useId, useState } from "react";
import type { Locale } from "@/lib/i18n/config";

// Interactive GSM <-> oz/yd² converter, embedded in blog markdown with the
// `::gsm-converter` directive. 1 oz/yd² = 28.349523125 g / 0.83612736 m².
const GSM_PER_OZ = 28.349523125 / 0.83612736;
const PRESETS = [30, 50, 100, 200, 300, 400, 600];

const copy: Record<
  Locale,
  { title: string; gsm: string; oz: string; presets: string; note: string }
> = {
  en: {
    title: "GSM to oz/yd² converter",
    gsm: "Weight in g/m² (GSM)",
    oz: "Weight in oz/yd²",
    presets: "Common weights",
    note: "1 oz/yd² = 33.906 g/m². Results are rounded; confirm nominal weight and tolerance on the data sheet.",
  },
  zh: {
    title: "GSM 与 oz/yd² 在线换算",
    gsm: "克重（g/m²，GSM）",
    oz: "盎司每平方码（oz/yd²）",
    presets: "常用克重",
    note: "1 oz/yd² = 33.906 g/m²。结果已四舍五入，请以规格书上的标称克重和公差为准。",
  },
  ko: {
    title: "GSM ↔ oz/yd² 변환기",
    gsm: "중량 g/m² (GSM)",
    oz: "중량 oz/yd²",
    presets: "자주 쓰는 중량",
    note: "1 oz/yd² = 33.906 g/m². 결과는 반올림 값이므로 공칭 중량과 허용오차는 데이터시트로 확인하십시오.",
  },
  es: {
    title: "Conversor de GSM a oz/yd²",
    gsm: "Peso en g/m² (GSM)",
    oz: "Peso en oz/yd²",
    presets: "Pesos habituales",
    note: "1 oz/yd² = 33,906 g/m². Los resultados están redondeados; confirme el peso nominal y la tolerancia en la ficha técnica.",
  },
  pt: {
    title: "Conversor de GSM para oz/yd²",
    gsm: "Peso em g/m² (GSM)",
    oz: "Peso em oz/yd²",
    presets: "Pesos comuns",
    note: "1 oz/yd² = 33,906 g/m². Os resultados são arredondados; confirme o peso nominal e a tolerância na ficha técnica.",
  },
};

function parse(value: string): number | null {
  const n = Number(value.replace(",", ".").trim());
  return value.trim() !== "" && Number.isFinite(n) && n >= 0 ? n : null;
}

const toOz = (gsm: number) => (gsm / GSM_PER_OZ).toFixed(2);
const toGsm = (oz: number) => (oz * GSM_PER_OZ).toFixed(1);

export function GsmConverter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const id = useId();
  const [gsm, setGsm] = useState("200");
  const [oz, setOz] = useState(toOz(200));

  const onGsm = (value: string) => {
    setGsm(value);
    const n = parse(value);
    setOz(n === null ? "" : toOz(n));
  };
  const onOz = (value: string) => {
    setOz(value);
    const n = parse(value);
    setGsm(n === null ? "" : toGsm(n));
  };

  const inputClass =
    "mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-2xl font-semibold tabular-nums text-neutral-900 outline-none transition-colors focus:border-carbon-accent";

  return (
    <section className="my-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`} className="text-base font-semibold text-neutral-900">
        {t.title}
      </h3>
      <div className="mt-4 grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <label className="block text-sm text-neutral-500" htmlFor={`${id}-gsm`}>
          {t.gsm}
          <input
            id={`${id}-gsm`}
            inputMode="decimal"
            value={gsm}
            onChange={(e) => onGsm(e.target.value)}
            className={inputClass}
          />
        </label>
        <span aria-hidden className="hidden pb-3 text-2xl text-neutral-300 sm:block">
          ⇄
        </span>
        <label className="block text-sm text-neutral-500" htmlFor={`${id}-oz`}>
          {t.oz}
          <input
            id={`${id}-oz`}
            inputMode="decimal"
            value={oz}
            onChange={(e) => onOz(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs text-neutral-400">{t.presets}:</span>
        {PRESETS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onGsm(String(value))}
            className={`rounded-full border px-3 py-1 text-xs tabular-nums transition-colors ${
              gsm === String(value)
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
            }`}
          >
            {value} g/m²
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-neutral-400">{t.note}</p>
    </section>
  );
}
