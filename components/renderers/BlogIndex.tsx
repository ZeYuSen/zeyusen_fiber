import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { BlogPost } from "@/data/blog";
import { PageMediaHero } from "@/components/ui/PageMediaHero";
import { pageHeroImages } from "@/lib/site-images";

export function BlogIndex({
  locale,
  dict,
  posts,
}: {
  locale: Locale;
  dict: Dictionary;
  posts: BlogPost[];
}) {
  return (
    <>
      <PageMediaHero
        title={dict.blog.eyebrow}
        description={dict.blog.intro}
        image={pageHeroImages.blog}
        imageAlt={dict.blog.eyebrow}
        breadcrumbs={
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
            <Link href={localizedHref("home", locale)}>{dict.nav.home}</Link>
            <span>/</span>
            <span className="text-white/90">{dict.nav.blog}</span>
          </nav>
        }
      />

      <section className="pt-16 pb-24 sm:pt-20">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={localizedHref("blog-post", locale, { slug: post.slug })}
                className="group block"
              >
                <article className="h-full overflow-hidden bg-neutral-50 border border-neutral-100 rounded-xl hover:border-neutral-200 transition-colors cursor-pointer">
                  <div className="relative h-44 bg-neutral-100 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      quality={70}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-white text-neutral-500 border border-neutral-200 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-base font-medium text-neutral-900 group-hover:text-carbon-accent transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-neutral-500 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 font-mono text-xs text-neutral-400">{post.date}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
