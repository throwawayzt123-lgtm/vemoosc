"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Container from "./Container";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
};

export default function PageHeader({ eyebrow, title, accent, intro }: PageHeaderProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".ph-word", { yPercent: 110 });
      gsap.set([".ph-eyebrow", ".ph-intro", ".ph-crumb"], { opacity: 0, y: 18 });

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(".ph-eyebrow", { opacity: 1, y: 0, duration: 0.6 }, 0.1)
        .to(".ph-word", { yPercent: 0, duration: 1, stagger: 0.08 }, 0.2)
        .to(".ph-intro", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .to(".ph-crumb", { opacity: 1, y: 0, duration: 0.6 }, "-=0.45");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-b border-border bg-background pb-16 pt-32 md:pb-24 md:pt-44"
    >
      <Container>
        <p className="ph-eyebrow mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-accent">
          <span className="h-px w-8 bg-brand-accent/60" />
          {eyebrow}
        </p>

        <h1 className="max-w-4xl text-4xl font-bold uppercase leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block overflow-hidden">
            <span className="ph-word block">{title}</span>
          </span>
          {accent && (
            <span className="block overflow-hidden">
              <span className="ph-word block text-brand">{accent}</span>
            </span>
          )}
        </h1>

        {intro && (
          <p className="ph-intro mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg">
            {intro}
          </p>
        )}

        <nav aria-label="Breadcrumb" className="ph-crumb mt-8 text-xs text-foreground-muted">
          <Link href="/" className="transition hover:text-brand">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-foreground">
            {accent ? `${title} ${accent}` : title}
          </span>
        </nav>
      </Container>
    </section>
  );
}
