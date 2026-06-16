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

export function getApplicationGroups(locale: Locale): ApplicationGroup[] {
  if (locale === "en") return applicationGroups;
  const t = applicationGroupTranslations[locale];
  if (!t) return applicationGroups;
  return applicationGroups.map((group) => {
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
          description: at.description ?? app.description,
          products: at.products ?? app.products,
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
  const base = getApplicationDetailBase(division, slug);
  if (!base || locale === "en") return base;
  const t = applicationDetailTranslations[locale]?.[slug];
  if (!t) return base;
  return {
    ...base,
    title: t.title ?? base.title,
    metaDescription: t.metaDescription ?? base.metaDescription,
    headline: t.headline ?? base.headline,
    description: t.description ?? base.description,
    benefits: t.benefits ?? base.benefits,
    // Product link names: keep route keys, swap display names if provided.
    products: base.products.map((p, i) => ({
      ...p,
      name: t.products?.[i] ?? p.name,
    })),
  };
}
