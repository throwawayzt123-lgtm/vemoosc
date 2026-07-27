"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function CtaBand() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".cta-reveal", { opacity: 0, y: 36 });
      gsap
        .timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
          defaults: { ease: "power3.out" },
        })
        .to(".cta-reveal", { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative overflow-hidden bg-background py-32 text-foreground md:py-40"
    >
      {/* Seam — dissolves in from Testimonials above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background-alt to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-14">
        <p className="cta-reveal mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-accent">
          <span className="h-px w-8 bg-brand-accent/60" />
          Start Your Project
          <span className="h-px w-8 bg-brand-accent/60" />
        </p>

        <h2 className="cta-reveal text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Building a More Efficient
          <br />
          <span className="text-brand">Future</span>
        </h2>

        <p className="cta-reveal mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground-muted md:text-lg">
          Send us your scope, drawings or maintenance schedule and our team will
          come back to you with a clear proposal.
        </p>

        <div className="cta-reveal mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Request a Quote
            <i
              className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <a
            href={SITE.emails[0].href}
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand"
          >
            <i className="ri-mail-fill" aria-hidden="true" />
            {SITE.emails[0].label}
          </a>
        </div>
      </div>
    </section>
  );
}
