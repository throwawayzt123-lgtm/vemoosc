"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        <p className="cta-reveal mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-light">
          <span className="h-px w-8 bg-brand-light/70" />
          Let&rsquo;s Work Together
          <span className="h-px w-8 bg-brand-light/70" />
        </p>

        <h2 className="cta-reveal text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Let&rsquo;s Craft Your Future
          <br />
          <span className="text-brand">Together</span>
        </h2>

        <p className="cta-reveal mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground-muted md:text-lg">
          Ready to amplify your business? Reach out today and let&rsquo;s build a
          bold strategy that drives real, measurable results.
        </p>

        <div className="cta-reveal mt-10 flex flex-wrap items-center justify-center gap-5">
          <a
            href="tel:+17186354332"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            <i className="ri-phone-fill" aria-hidden="true" />
            Call (718) 635-4332
            <i
              className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <a
            href="mailto:info@webcraftcons.com"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand"
          >
            <i className="ri-mail-fill" aria-hidden="true" />
            info@webcraftcons.com
          </a>
        </div>
      </div>
    </section>
  );
}
