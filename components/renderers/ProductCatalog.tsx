import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getCategories } from "@/lib/data-i18n";

// Carbon/Glass full catalog page.
export function ProductCatalog({
  division,
  locale,
  dict,
  copy,
}: {
  division: "carbon" | "glass";
  locale: Locale;
  dict: Dictionary;
  copy: {
    breadcrumbDivision: string;
    title: string;
    intro: string;
    body: string;
    closingTitle: string;
    closingBody: string;
  };
}) {
  const categories = getCategories(division, locale);
  const accent = division === "carbon" ? "carbon-accent" : "glass-accent";
  const divisionKey = division === "carbon" ? "carbon-fiber" : "glass-fiber";
  const categoryKey = division === "carbon" ? "carbon-category" : "glass-category";
  const productKey = division === "carbon" ? "carbon-product" : "glass-product";

  return (
    <>
      <section className="pt-36 pb-16">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
            <Link href={localizedHref("home", locale)} className="hover:text-neutral-700 transition-colors">
              {dict.nav.home}
            </Link>
            <span>/</span>
            <Link href={localizedHref(divisionKey, locale)} className="hover:text-neutral-700 transition-colors">
              {copy.breadcrumbDivision}
            </Link>
            <span>/</span>
            <span className="text-neutral-600">{dict.nav.allProducts}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            {copy.title}
          </h1>
          <p className="text-neutral-500 mt-3 max-w-2xl leading-relaxed">{copy.intro}</p>
          <p className="text-neutral-500 mt-4 max-w-3xl leading-relaxed">{copy.body}</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-wide space-y-16">
          {categories.map((category) => (
            <div key={category.slug}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium text-neutral-900">{category.name}</h2>
                <Link
                  href={localizedHref(categoryKey, locale, { category: category.slug })}
                  className={`text-xs font-medium text-${accent} hover:text-neutral-900 transition-colors`}
                >
                  {dict.actions.viewAll}
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.products.slice(0, 4).map((product) => (
                  <Link
                    key={product.slug}
                    href={localizedHref(productKey, locale, {
                      category: category.slug,
                      product: product.slug,
                    })}
                    className="group block bg-white border border-neutral-100 rounded-lg hover:border-neutral-200 overflow-hidden transition-colors cursor-pointer"
                  >
                    <div className="relative h-36 bg-neutral-100 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className={`text-sm font-medium text-neutral-900 group-hover:text-${accent} transition-colors line-clamp-1`}>
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-500 line-clamp-1">
                        {product.specs[0]?.value}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-wide max-w-3xl">
          <h2 className="text-2xl font-semibold text-neutral-900">{copy.closingTitle}</h2>
          <p className="mt-4 text-neutral-500 leading-relaxed">{copy.closingBody}</p>
        </div>
      </section>
    </>
  );
}
