"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../Container";
import PageHeader from "../PageHeader";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

type Category = "all" | "print" | "digital" | "websites" | "social";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "print", label: "Menus & Print" },
  { id: "digital", label: "Digital & Branding" },
  { id: "websites", label: "Websites" },
  { id: "social", label: "Social Accounts" },
];

const PROJECTS: {
  title: string;
  tag: string;
  category: Exclude<Category, "all">;
  image: string;
}[] = [
  { title: "Spot Shadow", tag: "Post Production, B&W", category: "print", image: "/images/menus/1.jpg" },
  { title: "Soft Focus", tag: "Post Production, Color", category: "print", image: "/images/menus/2.jpg" },
  { title: "Golden Hour", tag: "On Location", category: "print", image: "/images/menus/3.jpg" },
  { title: "Printing Services", tag: "Packaging & Merchandise", category: "print", image: "/images/services/Printing.jpeg" },
  { title: "SEO & Digital Marketing", tag: "Growth Strategy", category: "digital", image: "/images/services/Seo.jpeg" },
  { title: "Social Media Marketing", tag: "Content & Campaigns", category: "digital", image: "/images/services/Marketing.jpeg" },
  { title: "App Development", tag: "iOS, Android, Cross-Platform", category: "digital", image: "/images/services/AppDev.jpeg" },
  { title: "Brand Development", tag: "Identity Systems", category: "digital", image: "/images/services/Branding.jpeg" },
  { title: "WebCraft Consulting", tag: "Next.js & React", category: "websites", image: "/images/services/WebDev.jpeg" },
];

// Website cards use a 16:9 frame (natural for browser screenshots); every
// other category keeps the 4:5 portrait frame used for print/photo work.
const aspectFor = (category: Category) => (category === "websites" ? "aspect-video" : "aspect-[4/5]");

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
        intro="A look at the menus we've printed, the brands we've built, and the digital platforms and social accounts we manage for our clients."
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

          <div
            className={`mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 ${
              filter === "websites" ? "lg:grid-cols-2" : "lg:grid-cols-3"
            }`}
          >
            {visible.map((project) => (
              <figure
                key={project.title}
                className={`rv group relative flex ${aspectFor(project.category)} flex-col justify-end overflow-hidden rounded-3xl border border-border bg-surface`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <figcaption className="relative z-10 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
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

      {/* Social accounts we manage */}
      <section className="border-t border-border bg-background-alt py-20 md:py-28">
        <Container>
          <div className="rv mx-auto max-w-2xl text-center">
            <p className="mb-5 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-light">
              <span className="h-px w-8 bg-brand-light/70" />
              Always Active
              <span className="h-px w-8 bg-brand-light/70" />
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
              Social Accounts <span className="text-brand">We Run</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-muted md:text-lg">
              Beyond print and web, we manage and grow these accounts — follow
              along to see our latest work in motion.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {SITE.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rv group flex flex-col items-center gap-4 rounded-3xl border border-border bg-surface p-10 text-center transition hover:border-brand/50"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/15 text-3xl text-brand transition group-hover:bg-brand group-hover:text-white">
                  <i className={social.icon} aria-hidden="true" />
                </span>
                <span className="text-lg font-bold uppercase tracking-wide">{social.label}</span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-light">
                  Visit Profile
                  <i
                    className="ri-arrow-right-line transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-background py-20 md:py-28">
        <Container size="narrow" className="text-center">
          <h2 className="rv text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
            Want Work Like <span className="text-brand">This?</span>
          </h2>
          <p className="rv mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground-muted md:text-lg">
            Tell us about your project and we&rsquo;ll put together a plan
            tailored to your brand.
          </p>
          <Link
            href="/contact"
            className="rv group mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Start a Project
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </Container>
      </section>
    </div>
  );
}
