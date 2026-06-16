import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { BlogPost } from "@/data/blog";

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
      <section className="pt-36 pb-16">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
            <Link href={localizedHref("home", locale)} className="hover:text-neutral-700 transition-colors">
              {dict.nav.home}
            </Link>
            <span>/</span>
            <span className="text-neutral-600">{dict.nav.blog}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mt-3">
            {dict.blog.eyebrow}
          </h1>
          <p className="text-neutral-500 mt-4 max-w-xl leading-relaxed">
            {dict.blog.intro}
          </p>
        </div>
      </section>

      <section className="pb-24">
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
