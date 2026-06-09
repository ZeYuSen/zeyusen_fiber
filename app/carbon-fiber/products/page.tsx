import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { allCarbonFiberCategories } from "@/data/carbon-fiber";

export const metadata: Metadata = createPageMetadata({
  title: "Carbon Fiber Catalog",
  description:
    "Browse carbon fiber mats, cloth, hybrid reinforcements, yarns, and raw material formats with technical data for composite manufacturing.",
  path: "/carbon-fiber/products",
});

export default function CarbonProductsPage() {
  return (
    <>
      <section className="pt-36 pb-16">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
            <Link href="/" className="hover:text-neutral-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/carbon-fiber" className="hover:text-neutral-700 transition-colors">Carbon Fiber</Link>
            <span>/</span>
            <span className="text-neutral-600">All Products</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            Carbon Fiber Products
          </h1>
          <p className="text-neutral-500 mt-3 max-w-2xl leading-relaxed">
            High-performance carbon fiber materials for aerospace, motorsport, military, and advanced manufacturing.
          </p>
          <p className="text-neutral-500 mt-4 max-w-3xl leading-relaxed">
            Use this catalog to compare carbon fiber mats, woven cloth, and raw material formats by product family before moving into individual product pages for specifications, applications, and inquiry flow.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-wide space-y-16">
          {allCarbonFiberCategories.map((category) => (
            <div key={category.slug}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium text-neutral-900">{category.name}</h2>
                <Link
                  href={`/carbon-fiber/products/${category.slug}`}
                  className="text-xs font-medium text-carbon-accent hover:text-neutral-900 transition-colors"
                >
                  View all {category.name}
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.products.slice(0, 4).map((product) => (
                  <Link
                    key={product.slug}
                    href={`/carbon-fiber/products/${category.slug}/${product.slug}`}
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
                      <h3 className="text-sm font-medium text-neutral-900 group-hover:text-carbon-accent transition-colors line-clamp-1">
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
          <h2 className="text-2xl font-semibold text-neutral-900">
            Use This Catalog to Shortlist the Right Carbon Fiber Format
          </h2>
          <p className="mt-4 text-neutral-500 leading-relaxed">
            Start with the product family that matches your manufacturing process, then open the detailed product page for target GSM, application fit, and inquiry context. Surface mats are usually evaluated for conductivity and finish layers, woven cloth for directional reinforcement, and raw materials for weaving, winding, and compounding workflows.
          </p>
          <p className="mt-4 text-neutral-500 leading-relaxed">
            If you are still comparing options, review the [carbon fiber surface mat guide](/blog/carbon-fiber-surface-mat-selection-guide) and the [carbon fiber cloth selection guide](/blog/carbon-fiber-cloth-twill-plain-weave-guide) before requesting samples.
          </p>
        </div>
      </section>
    </>
  );
}
