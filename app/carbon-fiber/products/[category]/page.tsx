import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { allCarbonFiberCategories } from "@/data/carbon-fiber";
import { ProductCard } from "@/components/products/ProductCard";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return allCarbonFiberCategories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = allCarbonFiberCategories.find((c) => c.slug === slug);
  if (!category) return {};
  return createPageMetadata({
    title: `${category.name} Supplier`,
    description: category.description,
    path: `/carbon-fiber/products/${category.slug}`,
    image: category.image,
  });
}

export default async function CarbonCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = allCarbonFiberCategories.find((c) => c.slug === slug);
  if (!category) notFound();
  const featuredVariants =
    category.slug === "carbon-fiber-mat"
      ? [
          { name: "Surface Mat 10g", slug: "surface-mat-10g" },
          { name: "Surface Mat 20g", slug: "surface-mat-20g" },
          { name: "Surface Mat 30g", slug: "surface-mat-30g" },
          { name: "Needled Mat 350g", slug: "needled-mat" },
        ]
      : [];

  return (
    <>
      <section className="pt-36 pb-16">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
            <Link href="/" className="hover:text-neutral-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/carbon-fiber" className="hover:text-neutral-700 transition-colors">Carbon Fiber</Link>
            <span>/</span>
            <span className="text-neutral-600">{category.name}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            {category.name}
          </h1>
          <p className="text-neutral-500 mt-3 max-w-2xl leading-relaxed">{category.description}</p>
          {featuredVariants.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {featuredVariants.map((variant) => (
                <Link
                  key={variant.slug}
                  href={`/carbon-fiber/products/${category.slug}/${variant.slug}`}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:text-neutral-900"
                >
                  {variant.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-wide">
          <h2 className="sr-only">Products in this category</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                basePath={`/carbon-fiber/products/${category.slug}`}
                accentColor="carbon-accent"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
