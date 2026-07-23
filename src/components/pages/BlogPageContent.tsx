"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../Container";
import PageHeader from "../PageHeader";
import { BLOG_POSTS } from "@/lib/blog";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <PageHeader
        eyebrow="Insights"
        title="News &"
        accent="Blogs"
        intro="Practical thinking on printing, SEO, marketing and brand development — written by the team that does the work."
      />

      <section className="bg-background py-20 md:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="rv group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition hover:border-brand/50"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/10] w-full overflow-hidden bg-background-alt"
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover text-transparent transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                    {post.category}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-center gap-3 text-xs text-foreground-muted">
                    <time dateTime={post.date}>{post.dateLabel}</time>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{post.readingTime}</span>
                  </div>

                  <h2 className="mt-3 text-lg font-bold leading-snug md:text-xl">
                    <Link href={`/blog/${post.slug}`} className="transition hover:text-brand">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-light"
                  >
                    Read More
                    <i
                      className="ri-arrow-right-line transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
