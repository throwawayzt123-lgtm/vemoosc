"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../Container";
import PageHeader from "../PageHeader";

gsap.registerPlugin(ScrollTrigger);

// The three values named in the company's vision statement.
const PILLARS = [
  {
    icon: "ri-shield-check-line",
    title: "Integrity",
    body: "Honest assessments, transparent pricing and lasting client relationships built on trust rather than transactions.",
  },
  {
    icon: "ri-lightbulb-flash-line",
    title: "Innovation",
    body: "Technical expertise applied to enhance operational efficiency and improve reliability across every scope we take on.",
  },
  {
    icon: "ri-check-double-line",
    title: "Dependable Performance",
    body: "Quality-driven execution delivered safely and to programme, so our clients can plan around us with confidence.",
  },
];

// Non-numeric capability facts — deliberately avoids project counts or
// satisfaction percentages until the business has verified figures to publish.
const CAPABILITIES = [
  { icon: "ri-flashlight-line", label: "Electrical & Mechanical", sub: "Maintenance" },
  { icon: "ri-flask-line", label: "Chemical", sub: "Services" },
  { icon: "ri-building-3-line", label: "Civil & Construction", sub: "Works" },
  { icon: "ri-team-line", label: "Skilled Manpower", sub: "Support" },
];

export default function AboutPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        );
      });

      // Subtle parallax lift on the intro image as it scrolls into view.
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <PageHeader
        eyebrow="Vision Excellence Maintenance & Operations Oil Services Company"
        title="About"
        accent="VEMOOSC"
        intro="A UAE-based engineering and industrial solutions provider committed to delivering reliable, safe and innovative services across the energy, infrastructure and industrial sectors."
      />

      {/* ─── Story: intro image + numbered narrative ─────────────────────── */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="pointer-events-none absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full bg-brand/10 blur-[130px]" />

        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            {/* Framed lead image with floating tagline chip */}
            <div className="rv relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)]">
                <div className="parallax-img absolute inset-0 scale-110">
                  <Image
                    src="/images/services/Construction.jpg"
                    alt="VEMOOSC engineering and construction works"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />

                {/* Bottom-left overlay label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-light">
                    Since Day One
                  </p>
                  <p className="mt-1.5 text-xl font-bold uppercase leading-tight text-white">
                    Built on Vision.
                    <br />
                    Driven by Excellence.
                  </p>
                </div>
              </div>

              {/* Secondary inset image, overlapping top-right */}
              <div className="absolute -right-4 -top-6 hidden aspect-square w-32 overflow-hidden rounded-2xl border-4 border-background shadow-2xl sm:block md:w-40">
                <Image
                  src="/images/services/Electrical.jpg"
                  alt=""
                  fill
                  sizes="10rem"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Narrative */}
            <div>
              <p className="rv mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-accent">
                <span className="h-px w-8 bg-brand-accent/60" />
                Who We Are
              </p>
              <h2 className="rv text-3xl font-bold uppercase leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                Engineering the UAE&rsquo;s{" "}
                <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  industrial backbone
                </span>
              </h2>

              <div className="mt-8 space-y-6">
                {[
                  "VEMOOSC — Vision Excellence Maintenance & Operations Oil Services Company — is a UAE-based engineering and industrial solutions provider committed to delivering reliable, safe and innovative services across the energy, infrastructure and industrial sectors.",
                  "We provide comprehensive solutions designed to enhance operational efficiency, improve reliability, and support the evolving needs of our clients. Through technical expertise, quality-driven execution and a commitment to excellence, we deliver value that extends beyond every project.",
                  "Our capability spans electrical and mechanical maintenance, chemical services, civil works, construction and skilled manpower support — brought together under one accountable team so our clients have fewer interfaces to manage and clearer ownership of the work.",
                ].map((text, i) => (
                  <div key={i} className="rv flex gap-5">
                    <span className="shrink-0 font-mono text-sm font-bold text-brand/40">
                      0{i + 1}
                    </span>
                    <p className="border-l border-border pl-5 text-base leading-relaxed text-foreground-muted md:text-lg">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <p className="rv mt-8 border-l-2 border-brand pl-5 text-lg font-medium italic leading-relaxed text-foreground md:text-xl">
                &ldquo;At VEMOOSC, we don&rsquo;t just deliver solutions &mdash;
                we help build a more efficient and sustainable future.&rdquo;
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Vision & Mission: two-up feature cards ──────────────────────── */}
      <section className="border-y border-border bg-background-alt py-20 md:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rv group relative overflow-hidden rounded-3xl border border-border bg-brand p-10 text-white md:p-12">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <i className="ri-eye-line mb-6 block text-4xl text-white/90" aria-hidden="true" />
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Our Vision
              </h2>
              <p className="mt-4 text-xl font-light leading-relaxed md:text-2xl">
                To become a trusted partner for organizations across the UAE by
                building lasting relationships founded on{" "}
                <span className="font-semibold">integrity, innovation and
                dependable performance.</span>
              </p>
            </article>

            <article className="rv group relative overflow-hidden rounded-3xl border border-border bg-surface p-10 md:p-12">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/10 blur-2xl" />
              <i className="ri-focus-3-line mb-6 block text-4xl text-brand" aria-hidden="true" />
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent">
                Our Mission
              </h2>
              <p className="mt-4 text-xl font-light leading-relaxed text-foreground md:text-2xl">
                To deliver reliable, safe and innovative services that enhance
                operational efficiency and improve reliability &mdash;{" "}
                <span className="font-semibold">creating value that extends
                beyond every project.</span>
              </p>
            </article>
          </div>
        </Container>
      </section>

      {/* ─── Values ──────────────────────────────────────────────────────── */}
      <section className="bg-background py-20 md:py-28">
        <Container>
          <div className="rv mx-auto max-w-2xl text-center">
            <p className="mb-5 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-accent">
              <span className="h-px w-8 bg-brand-accent/60" />
              What We Stand For
              <span className="h-px w-8 bg-brand-accent/60" />
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
              Our <span className="text-brand">Values</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-muted md:text-lg">
              The principles behind every relationship we build and every scope
              we deliver.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <article
                key={p.title}
                className="rv group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_30px_60px_-30px_var(--color-brand)]"
              >
                {/* Oversized ghost number */}
                <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[6rem] font-bold leading-none text-brand/[0.06] transition-colors duration-300 group-hover:text-brand/10">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12 text-2xl text-brand transition duration-300 group-hover:bg-brand group-hover:text-white">
                  <i className={p.icon} aria-hidden="true" />
                </span>
                <h3 className="relative mt-6 text-xl font-bold">{p.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-foreground-muted">
                  {p.body}
                </p>

                <span className="relative mt-6 block h-px w-10 bg-brand transition-all duration-300 group-hover:w-20" />
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Capabilities + CTA over image ───────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0">
          <Image
            src="/images/services/Mechanical.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/92" />
        </div>

        <Container className="relative py-20 md:py-28">
          <div className="rv mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
              Our <span className="text-brand">Capabilities</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-muted md:text-lg">
              Five core disciplines, delivered by one team and supported by
              skilled manpower on site.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c) => (
              <div
                key={c.label}
                className="rv group flex items-center gap-4 rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur-sm transition hover:border-brand/50 hover:bg-surface"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-xl text-brand transition group-hover:bg-brand group-hover:text-white">
                  <i className={c.icon} aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold">{c.label}</p>
                  <p className="text-xs uppercase tracking-wide text-foreground-muted">
                    {c.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rv mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_var(--color-brand)] transition hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Explore Our Services
              <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:border-brand hover:text-brand"
            >
              Get in Touch
              <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
