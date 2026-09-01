import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

const logoSrc = "/logo.png?v=logo-20260626";

const copy: Record<Locale, { label: string; name: string; description: string }> = {
  en: {
    label: "Author",
    name: "ZeYuSen Fiber Technical Team",
    description: "Focused on fiberglass mats and veils, carbon fiber mats, and desiccant rotor forming paper for industrial material selection and process evaluation.",
  },
  zh: {
    label: "作者",
    name: "泽宇森纤维技术团队",
    description: "专注于玻纤毡、碳毡和除湿转轮成型纸的工业选材与工艺评估。",
  },
  ko: {
    label: "작성자",
    name: "ZeYuSen Fiber 기술팀",
    description: "산업용 소재 선택과 공정 평가를 위한 유리섬유 매트와 베일, 탄소섬유 매트, 제습 로터 성형지에 집중합니다.",
  },
  es: {
    label: "Autor",
    name: "Equipo Técnico de ZeYuSen Fiber",
    description: "Especializado en mantas y velos de fibra de vidrio, mantas de carbono y papel para rotores desecantes destinados a selección de materiales y evaluación de procesos.",
  },
  pt: {
    label: "Autor",
    name: "Equipe Técnica da ZeYuSen Fiber",
    description: "Focada em mantas e véus de fibra de vidro, mantas de carbono e papel para rotores dessecantes para seleção de materiais e avaliação de processos.",
  },
};

export function AuthorSignature({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <div className="mt-12 flex items-start gap-4 rounded-xl border border-neutral-100 bg-neutral-50 p-5">
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-neutral-200">
        <Image
          src={logoSrc}
          alt="ZeYuSen Fiber"
          width={48}
          height={48}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
          {text.label}
        </p>
        <p className="text-sm font-semibold text-neutral-900">
          {text.name}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
          {text.description}
        </p>
      </div>
    </div>
  );
}
