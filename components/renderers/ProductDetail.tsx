import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ProductCategory, Product } from "@/types/product";
import type { ProductContent } from "@/data/product-content";
import { getBlogPost, type BlogPost } from "@/data/blog";
import { WorldStage } from "@/components/fx/world/WorldStage";
import { ProductGallery } from "@/components/products/ProductGallery";
import { SpecTable } from "@/components/products/SpecTable";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { whatsappPhone } from "@/lib/contact";

// Section labels on paper: the stage-label rhythm in a muted paper ink that
// holds contrast on the light table.
const LABEL =
  "text-xs font-medium uppercase tracking-[0.2em] text-[#5C6166] [:lang(ko)_&]:text-sm [:lang(ko)_&]:tracking-[0.1em] [:lang(zh)_&]:text-sm [:lang(zh)_&]:tracking-[0.1em]";
// Label column on the left, content on the right (stacked on mobile).
const ROW = "container-wide grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-16";
const LABEL_CELL = `${LABEL} lg:col-span-3 lg:pt-1`;
const BODY_CELL = "lg:col-span-9";

// Carbon/Glass product detail page body (JSON-LD is injected by the page wrapper).
// The page opens on the SKU's own shot of the fiber world (true areal weight and
// finish, world="route"); everything after the stage lives on paper.
export function ProductDetail({
  division,
  locale,
  dict,
  category,
  product,
  content,
  breadcrumbDivision,
}: {
  division: "carbon" | "glass";
  locale: Locale;
  dict: Dictionary;
  category: ProductCategory;
  product: Product;
  content?: ProductContent;
  breadcrumbDivision: string;
}) {
  const divisionKey = division === "carbon" ? "carbon-fiber" : "glass-fiber";
  const categoryKey = division === "carbon" ? "carbon-category" : "glass-category";
  const productKey = division === "carbon" ? "carbon-product" : "glass-product";
  const relatedGuides = (product.relatedPosts ?? [])
    .map((slug) => getBlogPost(locale, slug))
    .filter((post): post is BlogPost => Boolean(post))
    .slice(0, 4);

  return (
    <>
      <WorldStage
        size="short"
        world="route"
        breadcrumbs={
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link href={localizedHref("home", locale)}>{dict.nav.home}</Link>
            <span>/</span>
            <Link href={localizedHref(divisionKey, locale)}>{breadcrumbDivision}</Link>
            <span>/</span>
            <Link href={localizedHref(categoryKey, locale, { category: category.slug })}>
              {category.name}
            </Link>
            <span>/</span>
            <span className="text-white/80">{product.name}</span>
          </nav>
        }
        title={product.name}
        description={<p>{product.description}</p>}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={localizedHref("contact", locale)}
            className="inline-flex items-center justify-center rounded-full bg-accent-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            {dict.actions.sendInquiry}
          </Link>
          <a
            href={`https://wa.me/${whatsappPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/70 hover:text-white"
          >
            {dict.actions.whatsapp}
          </a>
        </div>
      </WorldStage>

      <div
        data-tone="paper"
        className="relative before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-24 before:bg-linear-to-t before:from-[#EEECE6]/[0.08] before:to-transparent"
      >
        <section className="pt-14 pb-12 sm:pt-20 sm:pb-16">
          <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative z-10 min-w-0 lg:col-span-7">
              <ProductGallery images={product.images} name={product.name} />
            </div>
            <div className="min-w-0 lg:sticky lg:top-32 lg:col-span-5 lg:self-start lg:pt-1">
              <h2 className={LABEL}>{dict.sections.keyFeatures}</h2>
              <ul data-reveal="stagger" className="mt-7 space-y-5 sm:mt-9 sm:space-y-6">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-4 text-lg leading-snug text-[var(--ink-paper)] sm:text-xl"
                  >
                    <span className="mt-[0.55em] size-1.5 flex-shrink-0 rounded-full bg-[var(--ink-paper)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className={ROW}>
            <h2 className={LABEL_CELL}>{dict.sections.specifications}</h2>
            <div data-reveal="up" className={`${BODY_CELL} max-w-[56rem]`}>
              <SpecTable
                specs={product.specs}
                parameterLabel={dict.sections.parameter}
                valueLabel={dict.sections.value}
              />
            </div>
          </div>
        </section>

        {content?.overview?.length ? (
          <section className="py-12 sm:py-16">
            <div className={ROW}>
              <h2 className={LABEL_CELL}>{dict.sections.overview}</h2>
              <div data-reveal="up" className={`${BODY_CELL} max-w-[44rem] space-y-5`}>
                {content.overview.map((paragraph, i) => (
                  <p key={i} className="text-base leading-[1.8] text-[#3B4046] sm:text-[1.0625rem]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="py-12 sm:py-16">
          <div className={ROW}>
            <h2 className={LABEL_CELL}>{dict.sections.applications}</h2>
            <div data-reveal="up" className={`${BODY_CELL} flex flex-wrap gap-2.5`}>
              {product.applications.map((app) => (
                <span
                  key={app}
                  className="rounded-full border border-[#15181C]/15 px-4 py-2 text-sm text-[var(--ink-paper)]"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        </section>

        {content?.faqs?.length ? (
          <section className="py-12 sm:py-16">
            <div className={ROW}>
              <h2 className={LABEL_CELL}>{dict.sections.faq}</h2>
              <div className={`${BODY_CELL} max-w-[44rem] space-y-10`}>
                {content.faqs.map((faq) => (
                  <div key={faq.question} data-reveal="up">
                    <h3 className="text-base font-medium leading-snug text-[var(--ink-paper)] sm:text-lg">
                      {faq.question}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-[1.8] text-[#3B4046]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {relatedGuides.length ? (
          <section className="py-12 sm:py-16">
            <div className={ROW}>
              <h2 className={LABEL_CELL}>{dict.sections.relatedGuides}</h2>
              <div data-reveal="stagger" className={`${BODY_CELL} grid max-w-[56rem] gap-3 sm:grid-cols-2`}>
                {relatedGuides.map((post) => (
                  <Link
                    key={post.slug}
                    href={localizedHref("blog-post", locale, { slug: post.slug })}
                    className="group block rounded-sm bg-white/45 p-5 transition-colors duration-300 hover:bg-white/85 sm:p-6"
                  >
                    <h3 className="line-clamp-2 text-base font-medium leading-snug text-[var(--ink-paper)]">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5C6166]">
                      {post.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <RelatedProducts
          products={category.products}
          hrefFor={(slug) =>
            localizedHref(productKey, locale, { category: category.slug, product: slug })
          }
          currentSlug={product.slug}
          title={dict.sections.relatedProducts}
        />
      </div>
    </>
  );
}
