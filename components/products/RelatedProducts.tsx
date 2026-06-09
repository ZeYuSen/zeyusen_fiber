import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

export function RelatedProducts({
  products,
  basePath,
  currentSlug,
}: {
  products: Product[];
  basePath: string;
  currentSlug: string;
}) {
  const related = products.filter((p) => p.slug !== currentSlug).slice(0, 4);
  if (related.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container-wide">
        <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((product) => (
            <Link
              key={product.slug}
              href={`${basePath}/${product.slug}`}
              className="group block"
            >
              <div className="bg-white border border-neutral-100 rounded-lg hover:border-neutral-200 overflow-hidden transition-colors">
                <div className="relative h-32 bg-neutral-100 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    quality={68}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-medium text-neutral-900 group-hover:text-accent-500 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
