import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

// Sibling SKUs on paper: borderless, true-color photos, ink names.
export function RelatedProducts({
  products,
  hrefFor,
  currentSlug,
  title,
}: {
  products: Product[];
  hrefFor: (slug: string) => string;
  currentSlug: string;
  title: string;
}) {
  const related = products.filter((p) => p.slug !== currentSlug).slice(0, 4);
  if (related.length === 0) return null;

  return (
    <section data-tone="paper" className="pt-12 pb-24 sm:pt-16 sm:pb-32">
      <div className="container-wide grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-16">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-[#5C6166] [:lang(ko)_&]:text-sm [:lang(ko)_&]:tracking-[0.1em] [:lang(zh)_&]:text-sm [:lang(zh)_&]:tracking-[0.1em] lg:col-span-3 lg:pt-1">
          {title}
        </h2>
        <div data-reveal="stagger" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4 lg:col-span-9">
          {related.map((product) => (
            <Link
              key={product.slug}
              href={hrefFor(product.slug)}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#E2DFD8]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  quality={68}
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <h3 className="mt-3 line-clamp-2 text-sm font-medium leading-snug text-[var(--ink-paper)]">
                {product.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
