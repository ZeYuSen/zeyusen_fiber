import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  zh: () => import("./dictionaries/zh.json").then((m) => m.default),
  ko: () => import("./dictionaries/ko.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>;
