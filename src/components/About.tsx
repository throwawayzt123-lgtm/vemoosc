"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "05", label: "Core Disciplines" },
  { value: "HSE", label: "Led Delivery" },
  { value: "24/7", label: "Site Callout" },
];

const HIGHLIGHTS = [
  {
    icon: "ri-focus-3-line",
    title: "One Accountable Team",
    body: "Every discipline coordinated under a single point of ownership.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Safe by Standard",
    body: "Quality-driven execution to the standards our clients operate by.",
  },
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".about-reveal", { opacity: 0, y: 34 });
      gsap.set(".about-eyebrow", { opacity: 0 });
      gsap.set(".about-img-back", { opacity: 0, scale: 1.1 });
      gsap.set(".about-img-front", { opacity: 0, y: 48, scale: 1.05 });
      gsap.set(".about-badge", { opacity: 0, scale: 0.8, rotate: -8 });
      gsap.set(".about-stat", { opacity: 0, y: 24 });

      gsap
        .timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
          defaults: { ease: "power3.out" },
        })
        .to(".about-eyebrow", { opacity: 1, duration: 1 }, 0)
        .to(".about-img-back", { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, 0.1)
        .to(".about-reveal", { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.25)
        .to(".about-img-front", { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" }, 0.4)
        .to(".about-badge", { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" }, 0.7)
        .to(".about-stat", { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.7);

      // Slow ambient drift on the back image while the section is in view.
      gsap.to(".about-img-back img", {
        scale: 1.1,
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      if (!prefersReducedMotion()) {
        // Scroll-linked parallax: the two photos travel at different speeds,
        // giving the composition real depth as the section passes through.
        gsap.to(".about-img-back", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".about-img-front", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        // The watermark drifts opposite the scroll for extra separation.
        gsap.to(".about-watermark", {
          xPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative overflow-hidden bg-background py-24 text-foreground md:py-32"
    >
      {/* Seam — dissolves in from the Hero above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-seam-strong to-transparent" />

      {/* Ambient brand glow + oversized watermark word for depth */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-brand/10 blur-[130px]" />
      <span
        aria-hidden="true"
        className="about-watermark pointer-events-none absolute -right-6 top-10 select-none text-[22vw] font-bold uppercase leading-none tracking-tighter text-foreground/[0.03] md:text-[16vw]"
      >
        Vemoosc
      </span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20 md:px-14">
        {/* Left: copy */}
        <div className="relative">
          <p className="about-eyebrow mb-7 inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-accent backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Built on Vision. Driven by Excellence.
          </p>

          <h2 className="about-reveal text-4xl font-light uppercase leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Engineering
            <br />
            <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text font-bold text-transparent">
              Solutions
            </span>{" "}
            That
            <br />
            Endure.
          </h2>

          <div className="about-reveal mt-8 space-y-5 text-base leading-relaxed text-foreground-muted md:text-lg">
            <p>
              VEMOOSC is a UAE-based engineering and industrial solutions
              provider delivering reliable, safe, and innovative services
              across the energy, infrastructure, and industrial sectors. Backed
              by over five years of proven EPC experience through our Canadian
              operations, we combine international expertise with local
              execution to deliver high-quality solutions.
            </p>
            <p>
              Through technical expertise, quality-driven execution and a
              commitment to safety, quality, and excellence, we deliver value
              that extends beyond every project &mdash; helping build a more
              efficient and sustainable future.
            </p>
          </div>

          {/* Two compact highlight rows for texture */}
          <div className="about-reveal mt-9 grid gap-4 sm:grid-cols-2">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="group flex gap-4 rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur-sm transition hover:border-brand/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-lg text-brand transition group-hover:bg-brand group-hover:text-white">
                  <i className={h.icon} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold">{h.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
                    {h.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/services"
            className="about-reveal group mt-10 inline-flex items-center gap-3 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_var(--color-brand)] transition hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            View Our Services
            <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* Right: layered photography */}
        <div className="relative h-[62vh] min-h-[520px] w-full lg:h-[640px]">
          {/* Back plate — main image with a soft brand frame glow */}
          <div className="about-img-back absolute inset-4 overflow-hidden rounded-[2rem] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)] sm:inset-8">
            <Image
              src="/images/services/Construction.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
          </div>

          {/* Front card — smaller inset image, overlapping */}
          <div className="about-img-front absolute -bottom-2 left-0 aspect-[4/5] w-[46%] max-w-[15rem] overflow-hidden rounded-[1.5rem] border-4 border-background shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]">
            <Image
              src="/images/services/Electrical.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 46vw, 15rem"
              className="object-cover"
            />
          </div>

          {/* Floating "years / established" style badge, top-right */}
          <div className="about-badge absolute right-2 top-2 flex flex-col items-center rounded-2xl border border-border bg-elevated px-5 py-4 text-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md sm:right-6 sm:top-6">
            <i className="ri-award-line text-2xl text-brand" aria-hidden="true" />
            <p className="mt-1.5 text-[10px] font-semibold uppercase leading-tight tracking-[0.15em] text-foreground-muted">
              Vision
              <br />
              &amp; Excellence
            </p>
          </div>

          {/* Stat strip — floating pill row at the bottom edge */}
          <div className="absolute -bottom-6 right-0 flex divide-x divide-border overflow-hidden rounded-2xl border border-border bg-elevated shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md sm:right-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="about-stat px-4 py-4 text-center sm:px-6 sm:py-5">
                <div className="text-xl font-bold text-brand-accent sm:text-2xl">{stat.value}</div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-foreground-muted sm:text-[10px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
