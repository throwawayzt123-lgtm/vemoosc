"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../Container";
import PageHeader from "../PageHeader";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: "ri-lightbulb-flash-line",
    title: "Creative Approaches",
    body: "Bold thinking that breaks away from conventional methods and tired playbooks.",
  },
  {
    icon: "ri-focus-3-line",
    title: "Customized Plans",
    body: "Strategies shaped around your goals — never a template, never off the shelf.",
  },
  {
    icon: "ri-rocket-2-line",
    title: "Rapid, Sustainable Growth",
    body: "Focused execution designed to drive momentum that lasts well beyond launch.",
  },
];

const STATS = [
  { value: 500, suffix: "+", label: "Projects delivered" },
  { value: 6, suffix: "+", label: "Years of experience" },
  { value: 99, suffix: "%", label: "Client satisfaction" },
  { value: 20, suffix: "+", label: "Five-star reviews" },
];

export default function AboutPageContent() {
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
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      document.querySelectorAll<HTMLElement>(".ab-count").forEach((el) => {
        const target = Number(el.dataset.value);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toString();
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <PageHeader
        eyebrow="Our Story"
        title="About"
        accent="WebCraft"
        intro="As one of the leading consulting companies, we strive to empower businesses with cutting-edge solutions and exceptional services tailored to their unique needs."
      />

      {/* Narrative + pull quote */}
      <section className="bg-background py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <div className="rv space-y-6 text-base leading-relaxed text-foreground-muted md:text-lg">
              <p>
                At WebCraft Consulting, we redefine Business Consulting with our
                &ldquo;Amplified&rdquo; approach&mdash;focused on elevating your
                business to new heights. In an ever-evolving marketplace,
                traditional strategies often fail to deliver the growth and
                competitive edge your business needs.
              </p>
              <p>
                That&rsquo;s where we step in. Our team believes in bold,
                innovative solutions that go beyond the standard playbook. We
                specialize in strategies that challenge the norm, helping your
                business not only adapt but thrive.
              </p>
              <p>
                Choose us to unlock your true potential and drive remarkable
                success. Let&rsquo;s craft your future together with innovation
                at its core.
              </p>
            </div>

            <aside className="rv relative rounded-3xl border border-border bg-surface p-8 md:p-10">
              <i className="ri-double-quotes-l absolute right-8 top-8 text-4xl text-brand/25" aria-hidden="true" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-light">
                Our Vision
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground md:text-lg">
                To be the driving force behind transformative business success —
                empowering companies to break through traditional boundaries and
                lead their industries through creativity, technology and bold
                decision-making.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-light"
              >
                Contact Now
                <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="border-y border-border bg-background-alt py-20 md:py-28">
        <Container>
          <div className="rv max-w-2xl">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-light">
              <span className="h-px w-8 bg-brand-light/70" />
              What Drives Us
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
              The Amplified <span className="text-brand">Difference</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <article
                key={p.title}
                className="rv group rounded-3xl border border-border bg-surface p-8 transition hover:border-brand/50"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-xl text-brand">
                    <i className={p.icon} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-border">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-background py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rv text-center">
                <div className="flex items-baseline justify-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="ab-count" data-value={s.value}>
                    0
                  </span>
                  <span className="text-brand">{s.suffix}</span>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-foreground-muted sm:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
