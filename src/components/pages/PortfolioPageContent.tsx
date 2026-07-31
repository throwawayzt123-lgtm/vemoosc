"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../Container";
import PageHeader from "../PageHeader";

gsap.registerPlugin(ScrollTrigger);

// The three sectors named in the company profile, plus oil & gas — the
// specialism VEMOOSC's full name is built around.
const SECTORS = [
  { icon: "ri-oil-line", label: "Oil & Gas" },
  { icon: "ri-flashlight-line", label: "Energy" },
  { icon: "ri-road-map-line", label: "Infrastructure" },
  { icon: "ri-building-2-line", label: "Industrial" },
];

type Category = "all" | "maintenance" | "civil" | "chemical" | "manpower";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "maintenance", label: "Maintenance" },
  { id: "civil", label: "Civil & Construction" },
  { id: "chemical", label: "Chemical" },
  { id: "manpower", label: "Manpower" },
];

// PLACEHOLDER PROJECTS — these describe the type of work VEMOOSC undertakes,
// not specific completed contracts. Replace `title`/`tag`/`image` with real
// project records (and client permission to name them) before launch.
const PROJECTS: {
  title: string;
  tag: string;
  category: Exclude<Category, "all">;
  image: string;
}[] = [
  { title: "Electrical Maintenance", tag: "Panels, Switchgear & Cabling", category: "maintenance", image: "/images/services/Electrical.jpg" },
  { title: "Mechanical Maintenance", tag: "Pumps, Compressors & Piping", category: "maintenance", image: "/images/services/Mechanical.jpg" },
  { title: "Shutdown Support", tag: "Planned Turnaround Works", category: "maintenance", image: "/images/services/Mechanical.jpg" },
  { title: "Civil Works", tag: "Foundations & Concrete", category: "civil", image: "/images/services/Civilworks.jpg" },
  { title: "Construction Packages", tag: "Industrial & Commercial Build", category: "civil", image: "/images/services/Construction.jpg" },
  { title: "Structural Repair", tag: "Remedial & Finishing Works", category: "civil", image: "/images/services/Civilworks.jpg" },
  { title: "Chemical Cleaning", tag: "Descaling & Treatment", category: "chemical", image: "/images/services/Chemicalservices.jpg" },
  { title: "Skilled Trades Supply", tag: "Technicians & Site Crews", category: "manpower", image: "/images/services/Manpower.jpg" },
  { title: "Site Support Teams", tag: "Short & Long-Term Assignment", category: "manpower", image: "/images/services/Manpower.jpg" },
];

export default function PortfolioPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Category>("all");

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
  }, [filter]);

  const visible = PROJECTS.filter((p) => filter === "all" || p.category === filter);

  return (
    <div ref={rootRef}>
      <PageHeader
        eyebrow="Our Work"
        title="Our"
        accent="Portfolio"
        intro="VEMOOSC is committed to providing high-quality engineering, maintenance, and industrial solutions across the UAE, ensuring every project is executed with uncompromising standards of safety, quality, efficiency, and operational excellence."
      />

      {/* Filter tabs + project grid */}
      <section className="bg-background py-20 md:py-28">
        <Container>
          <div className="rv flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition ${
                  filter === cat.id
                    ? "border-brand bg-brand text-white"
                    : "border-border text-foreground-muted hover:border-brand hover:text-brand"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project) => (
              <figure
                key={project.title}
                className="rv group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl border border-border bg-surface"
              >
                {/* Placeholder imagery — swap for real project photography. */}
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <figcaption className="relative z-10 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                    {project.tag}
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">{project.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="rv mt-14 text-center text-foreground-muted">
              No projects in this category yet — check back soon.
            </p>
          )}
        </Container>
      </section>

      {/* Sectors we serve */}
      <section className="border-t border-border bg-background-alt py-20 md:py-28">
        <Container>
          <div className="rv mx-auto max-w-2xl text-center">
            <p className="mb-5 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-accent">
              <span className="h-px w-8 bg-brand-accent/60" />
              Where We Work
              <span className="h-px w-8 bg-brand-accent/60" />
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
              Sectors <span className="text-brand">We Serve</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-muted md:text-lg">
              Our teams work across industrial and commercial environments
              throughout Abu Dhabi and the Al Dhafra region.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SECTORS.map((sector) => (
              <div
                key={sector.label}
                className="rv group flex flex-col items-center gap-4 rounded-3xl border border-border bg-surface p-10 text-center transition hover:border-brand/50"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/15 text-3xl text-brand transition group-hover:bg-brand group-hover:text-white">
                  <i className={sector.icon} aria-hidden="true" />
                </span>
                <span className="text-base font-bold uppercase tracking-wide">
                  {sector.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-background py-20 md:py-28">
        <Container size="narrow" className="text-center">
          <h2 className="rv text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
            Have a Scope <span className="text-brand">In Mind?</span>
          </h2>
          <p className="rv mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground-muted md:text-lg">
            Send us the details and our team will assess the works and come back
            to you with a proposal.
          </p>
          <Link
            href="/contact"
            className="rv group mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Request Services
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </Container>
      </section>
    </div>
  );
}
