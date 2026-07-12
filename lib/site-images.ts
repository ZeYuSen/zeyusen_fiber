export const divisionHeroImages = {
  carbon: "/images/carbon-fiber/carbon_bg.webp",
  glass: "/images/glass-fiber/glass_bg.webp",
} as const;

export const pageHeroImages = {
  about: "/images/hero/banner4.jpg",
  services: "/images/showcase/equipment-slitting.webp",
  contact: "/images/showcase/shipment-ready.webp",
} as const;

// Real, licensed industry scene photos (see
// public/images/applications/SOURCES.md). These are illustrative third-party
// scenes, never ZeYuSen's own sites — use "行业应用示意图"-style alt text.
// Every application slug has a wide `-hero` and a 4:3 `-card` variant.
const APPLICATION_SLUGS = [
  "aerospace",
  "motorsport",
  "new-energy",
  "military-defense",
  "manufacturing",
  "wind-energy",
  "construction",
  "industrial-filtration",
  "transportation",
  "marine",
] as const;

const applicationSlugSet = new Set<string>(APPLICATION_SLUGS);

// Wide hero image for application overview / detail heroes and OG previews.
export function getApplicationImage(slug: string, division: "carbon" | "glass") {
  return applicationSlugSet.has(slug)
    ? `/images/applications/${slug}-hero.webp`
    : divisionHeroImages[division];
}

// 4:3 card image for application overview grid cards.
export function getApplicationCardImage(slug: string, division: "carbon" | "glass") {
  return applicationSlugSet.has(slug)
    ? `/images/applications/${slug}-card.webp`
    : divisionHeroImages[division];
}
