import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ProductCategory, Product } from "@/types/product";
import type { ProductContent } from "@/data/product-content";
import { ProductGallery } from "@/components/products/ProductGallery";
import { SpecTable } from "@/components/products/SpecTable";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { whatsappPhone } from "@/lib/contact";

// Carbon/Glass product detail page body (JSON-LD is injected by the page wrapper).
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
  const accent = division === "carbon" ? "carbon-accent" : "glass-accent";
  const divisionKey = division === "carbon" ? "carbon-fiber" : "glass-fiber";
  const categoryKey = division === "carbon" ? "carbon-category" : "glass-category";
  const productKey = division === "carbon" ? "carbon-product" : "glass-product";

  return (
    <>
      <section className="pt-36 pb-4">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-neutral-400">
            <Link href={localizedHref("home", locale)} className="hover:text-neutral-700 transition-colors">
              {dict.nav.home}
            </Link>
            <span>/</span>
            <Link href={localizedHref(divisionKey, locale)} className="hover:text-neutral-700 transition-colors">
              {breadcrumbDivision}
            </Link>
            <span>/</span>
            <Link
              href={localizedHref(categoryKey, locale, { category: category.slug })}
              className="hover:text-neutral-700 transition-colors"
            >
              {category.name}
            </Link>
            <span>/</span>
            <span className="text-neutral-600">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            <ProductGallery images={product.images} name={product.name} />
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                {product.name}
              </h1>
              <p className="mt-4 text-neutral-600 leading-relaxed text-sm">
                {product.description}
              </p>
              <div className="mt-6">
                <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">
                  {dict.sections.keyFeatures}
                </h2>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                      <span className={`w-1.5 h-1.5 rounded-full bg-${accent} mt-1.5 flex-shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href={localizedHref("contact", locale)}
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
                >
                  {dict.actions.sendInquiry}
                </Link>
                <a
                  href={`https://wa.me/${whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-neutral-200 hover:border-neutral-300 text-neutral-700 text-sm font-semibold rounded-full transition-colors"
                >
                  {dict.actions.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide"><div className="h-px bg-neutral-100" /></div>

      {content?.overview?.length ? (
        <>
          <section className="py-12">
            <div className="container-wide">
              <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-6">
                {dict.sections.overview}
              </h2>
              <div className="max-w-3xl space-y-4">
                {content.overview.map((paragraph, i) => (
                  <p key={i} className="text-neutral-600 leading-relaxed text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
          <div className="container-wide"><div className="h-px bg-neutral-100" /></div>
        </>
      ) : null}

      <section className="py-12">
        <div className="container-wide">
          <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-6">
            {dict.sections.specifications}
          </h2>
          <div className="max-w-xl">
            <SpecTable
              specs={product.specs}
              parameterLabel={dict.sections.parameter}
              valueLabel={dict.sections.value}
            />
          </div>
        </div>
      </section>

      <div className="container-wide"><div className="h-px bg-neutral-100" /></div>

      <section className="py-12">
        <div className="container-wide">
          <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-6">
            {dict.sections.applications}
          </h2>
          <div className="flex flex-wrap gap-2">
            {product.applications.map((app) => (
              <span
                key={app}
                className="px-3 py-1.5 bg-neutral-50 border border-neutral-100 text-neutral-600 text-sm rounded-full"
              >
                {app}
              </span>
            ))}
          </div>
        </div>
      </section>

      {content?.faqs?.length ? (
        <>
          <div className="container-wide"><div className="h-px bg-neutral-100" /></div>
          <section className="py-12">
            <div className="container-wide">
              <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-6">
                {dict.sections.faq}
              </h2>
              <div className="max-w-3xl space-y-6">
                {content.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-sm font-semibold text-neutral-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      <div className="container-wide"><div className="h-px bg-neutral-100" /></div>

      <RelatedProducts
        products={category.products}
        hrefFor={(slug) =>
          localizedHref(productKey, locale, { category: category.slug, product: slug })
        }
        currentSlug={product.slug}
        title={dict.sections.relatedProducts}
      />
    </>
  );
}
