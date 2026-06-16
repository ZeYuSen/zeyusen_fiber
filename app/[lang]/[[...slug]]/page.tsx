import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import {
  resolveRoute,
  localizedHref,
  allLocaleHrefs,
  type PageKey,
  type RouteParams,
} from "@/lib/i18n/routes";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo";
import {
  productJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  articleJsonLd,
} from "@/lib/jsonld";

import { getPageContent } from "@/data/page-content";
import {
  getCategories,
  getProductContent,
  getApplicationDetail,
} from "@/lib/data-i18n";
import { getBlogPosts, getBlogPost, getBlogSlugs } from "@/data/blog";

import { HeroImmersive } from "@/components/sections/HeroImmersive";
import { DivisionsSplit } from "@/components/sections/DivisionsSplit";
import { DivisionHome } from "@/components/renderers/DivisionHome";
import { ProductCatalog } from "@/components/renderers/ProductCatalog";
import { CategoryPage } from "@/components/renderers/CategoryPage";
import { ProductDetail } from "@/components/renderers/ProductDetail";
import { ApplicationsOverview } from "@/components/renderers/ApplicationsOverview";
import { ApplicationDetailPage } from "@/components/renderers/ApplicationDetailPage";
import { BlogIndex } from "@/components/renderers/BlogIndex";
import { BlogPostPage } from "@/components/renderers/BlogPostPage";
import { LegalPage } from "@/components/renderers/LegalPage";
import AboutPageContent from "@/components/renderers/AboutWrapper";
import ServicesPageContent from "@/components/renderers/ServicesWrapper";
import ContactPageContent from "@/components/renderers/ContactWrapper";

const StatsBar = dynamic(() => import("@/components/sections/StatsBar").then((m) => m.StatsBar));
const IndustriesGrid = dynamic(() => import("@/components/sections/IndustriesGrid").then((m) => m.IndustriesGrid));
const WhyPartnerNew = dynamic(() => import("@/components/sections/WhyPartnerNew").then((m) => m.WhyPartnerNew));
const TrustEvidence = dynamic(() => import("@/components/sections/TrustEvidence").then((m) => m.TrustEvidence));
const CTAFinal = dynamic(() => import("@/components/sections/CTAFinal").then((m) => m.CTAFinal));

// Pre-render every locale × every route.
export async function generateStaticParams() {
  const params: { lang: string; slug?: string[] }[] = [];
  const staticKeys: PageKey[] = [
    "home",
    "about",
    "services",
    "contact",
    "privacy",
    "terms",
    "blog-index",
    "applications",
    "applications-glass",
    "carbon-fiber",
    "carbon-products",
    "glass-fiber",
    "glass-products",
  ];

  const blogSlugs = getBlogSlugs();

  for (const lang of locales) {
    // Static pages
    for (const key of staticKeys) {
      const href = localizedHref(key, lang);
      const slug = href.split("/").slice(2);
      params.push({ lang, slug: slug.length ? slug : undefined });
    }
    // Carbon categories + products
    for (const division of ["carbon", "glass"] as const) {
      const categoryKey = division === "carbon" ? "carbon-category" : "glass-category";
      const productKey = division === "carbon" ? "carbon-product" : "glass-product";
      for (const category of getCategories(division, lang)) {
        params.push({
          lang,
          slug: localizedHref(categoryKey, lang, { category: category.slug }).split("/").slice(2),
        });
        for (const product of category.products) {
          params.push({
            lang,
            slug: localizedHref(productKey, lang, {
              category: category.slug,
              product: product.slug,
            }).split("/").slice(2),
          });
        }
      }
    }
    // Application detail pages
    for (const slug of ["aerospace", "military-defense", "new-energy"]) {
      params.push({
        lang,
        slug: localizedHref("carbon-application", lang, { slug }).split("/").slice(2),
      });
    }
    for (const slug of ["wind-energy", "construction"]) {
      params.push({
        lang,
        slug: localizedHref("glass-application", lang, { slug }).split("/").slice(2),
      });
    }
    // Blog posts
    for (const slug of blogSlugs) {
      params.push({
        lang,
        slug: localizedHref("blog-post", lang, { slug }).split("/").slice(2),
      });
    }
  }

  return params;
}

type ResolvedPage = { locale: Locale; pageKey: PageKey; params: RouteParams };

async function resolve(
  rawLang: string,
  rawSlug: string[] | undefined,
): Promise<ResolvedPage | null> {
  if (!isLocale(rawLang)) return null;
  const resolved = resolveRoute(rawLang, rawSlug ?? []);
  if (!resolved) return null;
  return { locale: rawLang, pageKey: resolved.pageKey, params: resolved.params };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[[...slug]]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = await resolve(lang, slug);
  if (!page) return {};
  const { locale, pageKey, params: routeParams } = page;
  const content = getPageContent(locale);

  // Resolve title/description + alternates + image per page type.
  let seo = content.seo[pageKey] ?? content.seo.home;
  const alternates = allLocaleHrefs(pageKey, routeParams);
  let image: string | undefined;
  let type: "website" | "article" = "website";

  if (pageKey === "carbon-category" || pageKey === "glass-category") {
    const division = pageKey === "carbon-category" ? "carbon" : "glass";
    const category = getCategories(division, locale).find((c) => c.slug === routeParams.category);
    if (!category) return {};
    seo = { title: `${category.name} Supplier`, description: category.description };
    image = category.image;
  } else if (pageKey === "carbon-product" || pageKey === "glass-product") {
    const division = pageKey === "carbon-product" ? "carbon" : "glass";
    const category = getCategories(division, locale).find((c) => c.slug === routeParams.category);
    const product = category?.products.find((p) => p.slug === routeParams.product);
    if (!category || !product) return {};
    const suffix = division === "carbon" ? "Carbon Fiber" : "Fiberglass";
    seo = { title: `${product.name} ${suffix}`, description: product.description };
    image = product.images[0];
  } else if (pageKey === "carbon-application" || pageKey === "glass-application") {
    const division = pageKey === "carbon-application" ? "carbon" : "glass";
    const detail = getApplicationDetail(locale, division, routeParams.slug);
    if (!detail) return {};
    seo = { title: detail.title, description: detail.metaDescription };
  } else if (pageKey === "blog-post") {
    const post = getBlogPost(locale, routeParams.slug);
    if (!post) return {};
    seo = { title: post.title, description: post.excerpt };
    image = post.image;
    type = "article";
  }

  return createPageMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: localizedHref(pageKey, locale, routeParams),
    alternates,
    image,
    type,
  });
}

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function LocalizedPage({ params }: PageProps<"/[lang]/[[...slug]]">) {
  const { lang, slug } = await params;
  const page = await resolve(lang, slug);
  if (!page) notFound();
  const { locale, pageKey, params: routeParams } = page;
  const dict = await getDictionary(locale);
  const content = getPageContent(locale);

  switch (pageKey) {
    case "home":
      return (
        <>
          <HeroImmersive />
          <DivisionsSplit />
          <StatsBar />
          <IndustriesGrid />
          <WhyPartnerNew />
          <TrustEvidence />
          <CTAFinal />
        </>
      );

    case "about":
      return <AboutPageContent />;
    case "services":
      return <ServicesPageContent />;
    case "contact":
      return <ContactPageContent />;

    case "privacy":
      return <LegalPage {...content.legal.privacy} />;
    case "terms":
      return <LegalPage {...content.legal.terms} />;

    case "carbon-fiber":
    case "glass-fiber": {
      const division = pageKey === "carbon-fiber" ? "carbon" : "glass";
      return (
        <>
          <JsonLd data={faqJsonLd(content.divisionFaq[division])} />
          <DivisionHome
            division={division}
            locale={locale}
            dict={dict}
            copy={content.divisionHome[division]}
          />
        </>
      );
    }

    case "carbon-products":
    case "glass-products": {
      const division = pageKey === "carbon-products" ? "carbon" : "glass";
      return (
        <ProductCatalog
          division={division}
          locale={locale}
          dict={dict}
          copy={content.catalog[division]}
        />
      );
    }

    case "carbon-category":
    case "glass-category": {
      const division = pageKey === "carbon-category" ? "carbon" : "glass";
      const category = getCategories(division, locale).find((c) => c.slug === routeParams.category);
      if (!category) notFound();
      return (
        <CategoryPage
          division={division}
          locale={locale}
          dict={dict}
          category={category}
          breadcrumbDivision={content.catalog[division].breadcrumbDivision}
        />
      );
    }

    case "carbon-product":
    case "glass-product": {
      const division = pageKey === "carbon-product" ? "carbon" : "glass";
      const category = getCategories(division, locale).find((c) => c.slug === routeParams.category);
      if (!category) notFound();
      const product = category.products.find((p) => p.slug === routeParams.product);
      if (!product) notFound();
      const productContent = getProductContent(locale, division, category.slug, product.slug);
      const path = localizedHref(pageKey, locale, routeParams);
      return (
        <>
          <JsonLd
            data={productJsonLd({
              name: product.name,
              description: product.description,
              image: product.images[0],
              category: category.name,
              path,
            })}
          />
          {productContent?.faqs?.length ? (
            <JsonLd data={faqJsonLd(productContent.faqs)} />
          ) : null}
          <JsonLd
            data={breadcrumbJsonLd([
              { name: dict.nav.home, href: localizedHref("home", locale) },
              { name: content.catalog[division].breadcrumbDivision, href: localizedHref(division === "carbon" ? "carbon-fiber" : "glass-fiber", locale) },
              { name: category.name, href: localizedHref(division === "carbon" ? "carbon-category" : "glass-category", locale, { category: category.slug }) },
              { name: product.name, href: path },
            ])}
          />
          <ProductDetail
            division={division}
            locale={locale}
            dict={dict}
            category={category}
            product={product}
            content={productContent}
            breadcrumbDivision={content.catalog[division].breadcrumbDivision}
          />
        </>
      );
    }

    case "applications":
      return (
        <ApplicationsOverview
          selectedMaterial="carbon"
          locale={locale}
          dict={dict}
          copy={content.applications}
        />
      );
    case "applications-glass":
      return (
        <ApplicationsOverview
          selectedMaterial="glass"
          locale={locale}
          dict={dict}
          copy={content.applications}
        />
      );

    case "carbon-application":
    case "glass-application": {
      const division = pageKey === "carbon-application" ? "carbon" : "glass";
      const detail = getApplicationDetail(locale, division, routeParams.slug);
      if (!detail) notFound();
      return (
        <ApplicationDetailPage division={division} locale={locale} dict={dict} detail={detail} />
      );
    }

    case "blog-index": {
      const posts = getBlogPosts(locale);
      return (
        <>
          <JsonLd
            data={breadcrumbJsonLd([
              { name: dict.nav.home, href: localizedHref("home", locale) },
              { name: dict.nav.blog, href: localizedHref("blog-index", locale) },
            ])}
          />
          <BlogIndex locale={locale} dict={dict} posts={posts} />
        </>
      );
    }

    case "blog-post": {
      const post = getBlogPost(locale, routeParams.slug);
      if (!post) notFound();
      const allPosts = getBlogPosts(locale);
      const relatedPosts = allPosts
        .filter((candidate) => candidate.slug !== post.slug)
        .map((candidate) => ({
          post: candidate,
          score: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
        }))
        .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
        .slice(0, 3)
        .map(({ post: candidate }) => candidate);
      const path = localizedHref("blog-post", locale, { slug: post.slug });
      return (
        <>
          <JsonLd
            data={articleJsonLd({
              title: post.title,
              description: post.excerpt,
              image: post.image,
              datePublished: post.date,
              dateModified: post.dateModified,
              path,
            })}
          />
          <JsonLd
            data={breadcrumbJsonLd([
              { name: dict.nav.home, href: localizedHref("home", locale) },
              { name: dict.nav.blog, href: localizedHref("blog-index", locale) },
              { name: post.title, href: path },
            ])}
          />
          {post.faq.length > 0 && <JsonLd data={faqJsonLd(post.faq)} />}
          <BlogPostPage locale={locale} dict={dict} post={post} relatedPosts={relatedPosts} />
        </>
      );
    }

    default:
      notFound();
  }
}
