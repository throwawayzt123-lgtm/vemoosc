"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../Container";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog";

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const rootRef = useRef<HTMLDivElement>(null);

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".bp-meta", ".bp-title", ".bp-hero", ".bp-body"], {
        opacity: 0,
        y: 24,
      });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".bp-meta", { opacity: 1, y: 0, duration: 0.6 }, 0.1)
        .to(".bp-title", { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to(".bp-hero", { opacity: 1, y: 0, duration: 0.9 }, 0.35)
        .to(".bp-body", { opacity: 1, y: 0, duration: 0.8 }, 0.5);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <article>
        {/* Header */}
        <header className="bg-background pb-10 pt-32 md:pt-44">
          <Container size="narrow">
            <nav aria-label="Breadcrumb" className="bp-meta mb-6 text-xs text-foreground-muted">
              <Link href="/" className="transition hover:text-brand">
                Home
              </Link>
              <span className="mx-2 text-border">/</span>
              <Link href="/blog" className="transition hover:text-brand">
                Blog
              </Link>
            </nav>

            <div className="bp-meta flex flex-wrap items-center gap-3 text-xs text-foreground-muted">
              <span className="rounded-full bg-brand px-3 py-1 font-semibold text-white">
                {post.category}
              </span>
              <time dateTime={post.date}>{post.dateLabel}</time>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{post.readingTime}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>By {post.author}</span>
            </div>

            <h1 className="bp-title mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
          </Container>
        </header>

        {/* Hero image */}
        <Container size="narrow">
          <div className="bp-hero relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-background-alt">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover text-transparent"
            />
          </div>
        </Container>

        {/* Body */}
        <Container size="narrow" className="bp-body py-14 md:py-20">
          <div className="space-y-6 text-base leading-relaxed text-foreground-muted md:text-lg">
            <p className="text-lg font-medium text-foreground md:text-xl">
              {post.excerpt}
            </p>
            {post.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {/* Share / back */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-light"
            >
              <i
                className="ri-arrow-left-line transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              All Articles
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Work With Us
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-border bg-background-alt py-16 md:py-24">
          <Container>
            <h2 className="text-2xl font-bold uppercase tracking-tight md:text-3xl">
              Keep <span className="text-brand">Reading</span>
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <article
                  key={r.slug}
                  className="group flex gap-5 rounded-3xl border border-border bg-surface p-5 transition hover:border-brand/50"
                >
                  <Link
                    href={`/blog/${r.slug}`}
                    className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-2xl bg-background-alt sm:w-28"
                  >
                    <Image
                      src={r.image}
                      alt={r.imageAlt}
                      fill
                      sizes="112px"
                      className="object-cover text-transparent transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-foreground-muted">
                      <span className="text-brand-light">{r.category}</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <time dateTime={r.date}>{r.dateLabel}</time>
                    </div>
                    <h3 className="mt-2 text-base font-bold leading-snug">
                      <Link href={`/blog/${r.slug}`} className="transition hover:text-brand">
                        {r.title}
                      </Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
