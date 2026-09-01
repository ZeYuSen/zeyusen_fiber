import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";

const EVENT_SLUG = "zeyusen-china-composites-expo-2026-booth-6r30";

const copy = {
  en: {
    announcement: "Exhibition notice | September 1 to 3, China Composites Expo 2026 in Shanghai, Booth 6R30. Event details",
    announcementMobile: "Sept. 1 to 3 · China Composites Expo 2026 · 6R30",
    label: "Company update",
    dateStart: "September 1",
    dateSeparator: " to ",
    dateEnd: "3, 2026",
    location: "Shanghai",
    title: "Zeyusen will exhibit at China Composites Expo 2026",
    body: "Find us at Booth 6R30 to discuss fiberglass mats, carbon fiber mats and desiccant rotor forming paper.",
    link: "Event details",
  },
  zh: {
    announcement: "参展通知｜9月1–3日，我们将在上海参加中国国际复合材料工业技术展览会，展位 6R30。查看参展信息",
    announcementMobile: "9月1–3日 · 中国国际复合材料工业技术展览会 · 6R30",
    label: "公司动态",
    dateStart: "2026年9月1日",
    dateSeparator: "–",
    dateEnd: "3日",
    location: "上海",
    title: "泽宇森将参加 2026 中国国际复合材料工业技术展览会",
    body: "展位 6R30。现场可交流玻纤毡、碳毡和除湿转轮成型纸。",
    link: "参展信息",
  },
  ko: {
    announcement: "전시회 안내 | 9월 1일부터 3일까지 상하이 CCE 6R30 부스에서 만날 수 있습니다. 자세히 보기",
    announcementMobile: "9월 1~3일 · China Composites Expo 2026 · 6R30",
    label: "회사 소식",
    dateStart: "2026년 9월 1일",
    dateSeparator: "부터 ",
    dateEnd: "3일까지",
    location: "상하이",
    title: "Zeyusen이 China Composites Expo 2026에 참가합니다",
    body: "6R30 부스에서 유리섬유 매트, 탄소섬유 매트, 제습 로터 성형지를 상담할 수 있습니다.",
    link: "전시회 안내",
  },
  es: {
    announcement: "Aviso de feria | Del 1 al 3 de septiembre, China Composites Expo 2026, stand 6R30. Ver información",
    announcementMobile: "1-3 sep. · China Composites Expo 2026 · 6R30",
    label: "Noticias de la empresa",
    dateStart: "1",
    dateSeparator: "-",
    dateEnd: "3 de septiembre de 2026",
    location: "Shanghái",
    title: "Zeyusen participará en China Composites Expo 2026",
    body: "Visítenos en el stand 6R30 para hablar sobre mantas de fibra de vidrio, mantas de fibra de carbono y papel para rotores desecantes.",
    link: "Información de la feria",
  },
  pt: {
    announcement: "Aviso de feira | De 1 a 3 de setembro, China Composites Expo 2026, estande 6R30. Ver informações",
    announcementMobile: "1 a 3 set. · China Composites Expo 2026 · 6R30",
    label: "Notícias da empresa",
    dateStart: "1",
    dateSeparator: " a ",
    dateEnd: "3 de setembro de 2026",
    location: "Xangai",
    title: "A Zeyusen participará da China Composites Expo 2026",
    body: "Visite o estande 6R30 para conversar sobre mantas de fibra de vidro, mantas de fibra de carbono e papel para rotores dessecantes.",
    link: "Informações da feira",
  },
} satisfies Record<
  Locale,
  {
    announcement: string;
    announcementMobile: string;
    label: string;
    dateStart: string;
    dateSeparator: string;
    dateEnd: string;
    location: string;
    title: string;
    body: string;
    link: string;
  }
>;

function eventHref(locale: Locale) {
  return localizedHref("blog-post", locale, { slug: EVENT_SLUG });
}

export function TradeShowAnnouncement({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <aside
      className="border-b border-black/10 bg-[#f3efe6] text-[#263746]"
      aria-label={text.label}
    >
      <Link
        href={eventHref(locale)}
        className="container-wide flex min-h-9 items-center justify-center overflow-hidden py-2 text-center text-[10px] font-medium leading-5 transition-colors hover:text-[#023465] sm:text-xs"
      >
        <span className="whitespace-nowrap sm:hidden">
          {text.announcementMobile}<span aria-hidden="true"> →</span>
        </span>
        <span className="hidden whitespace-nowrap sm:inline">
          {text.announcement}<span aria-hidden="true"> →</span>
        </span>
      </Link>
    </aside>
  );
}

export function TradeShowCompanyUpdate({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <section className="bg-white pb-8 sm:pb-10" aria-labelledby="company-update-heading">
      <div className="container-wide">
        <article className="grid gap-4 border-y border-neutral-200 py-6 sm:py-7 lg:grid-cols-[9rem_1fr_auto] lg:items-center lg:gap-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-neutral-900">
              {text.label}
            </p>
            <p className="mt-1 text-xs leading-5 text-neutral-500">
              <time dateTime="2026-09-01">{text.dateStart}</time>
              <span>{text.dateSeparator}</span>
              <time dateTime="2026-09-03">{text.dateEnd}</time>
              <span> · {text.location}</span>
            </p>
          </div>

          <div>
            <h2 id="company-update-heading" className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
              {text.title}
            </h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-6 text-neutral-600">
              {text.body}
            </p>
          </div>

          <Link
            href={eventHref(locale)}
            className="w-fit border-b border-neutral-400 pb-0.5 text-sm font-medium text-neutral-900 transition-colors hover:border-[#023465] hover:text-[#023465]"
          >
            {text.link}<span aria-hidden="true"> →</span>
          </Link>
        </article>
      </div>
    </section>
  );
}
