"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BUSINESS_POINTS = [
  "Bold strategies that break away from conventional methods",
  "Customized plans aligned with your unique business goals",
  "Focused execution that drives rapid, sustainable growth",
];

const BRAND_POINTS = [
  "Establish a cutting-edge, unmistakable brand",
  "Expand your reach to a wider, more engaged audience",
  "Fuel sustainable growth for your digital enterprise",
];

export default function WhyChooseUs() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".why-reveal", { opacity: 0, y: 32 });
      gsap.set(".why-card", { opacity: 0, y: 48, scale: 0.97 });
      gsap.set(".why-swash", { opacity: 0, scale: 0.85, rotate: -6 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
          },
          defaults: { ease: "power3.out" },
        })
        .to(".why-reveal", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0)
        .to(".why-swash", { opacity: 1, scale: 1, rotate: 0, duration: 1 }, 0.15)
        .to(".why-card", { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15 }, 0.2);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="why-choose-us"
      className="relative overflow-hidden bg-background py-32 text-foreground md:py-40"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-14">
        <div className="text-center">
          <p className="why-reveal mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-light">
            <span className="h-px w-8 bg-brand-light/70" />
            Decades of Experience
            <span className="h-px w-8 bg-brand-light/70" />
          </p>

          <h2 className="why-reveal relative inline-block text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Why Choose{" "}
            <span className="relative inline-block text-brand">
              Us
              <svg
                className="why-swash pointer-events-none absolute -right-10 -top-10 h-16 w-20 text-brand-light md:-right-14 md:-top-14 md:h-20 md:w-24"
                viewBox="0 0 100 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 60C25 60 20 30 40 25C55 21 55 45 70 40C80 36.5 78 15 92 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="why-reveal mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg">
            We specialize in establishing cutting-edge marketing brands,
            expanding reach, and fueling the growth of digital enterprises.
            Take control of your creativity and let&rsquo;s build the most
            effective strategy for your success.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1: image + feature list (like "For developers") */}
          <div className="why-card group relative overflow-hidden rounded-3xl border border-border bg-surface">
            <div className="relative h-56 w-full overflow-hidden md:h-64">
              <Image
                src="/images/services/Branding.jpeg"
                alt="WebCraft Consulting team at work"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="p-8 md:p-10">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
                <span className="text-lg font-bold">01</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                For Your Brand
              </h3>
              <p className="mt-2 text-sm text-foreground-muted md:text-base">
                Amplified strategies built around your unique identity
              </p>

              <ul className="mt-6 space-y-3">
                {BRAND_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-foreground-muted md:text-base">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {point}
                  </li>
                ))}
              </ul>

              <a
                href="#services"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-dark md:w-auto"
              >
                Explore Our Services
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>
          </div>

          {/* Card 2: text-only (like "For business") */}
          <div className="why-card group relative flex flex-col justify-center overflow-hidden rounded-3xl border border-border bg-surface p-8 md:p-10">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <span className="text-lg font-bold">02</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
              For Your Business
            </h3>
            <p className="mt-2 text-sm text-foreground-muted md:text-base">
              Get your business fully consulting-ready
            </p>

            <ul className="mt-6 space-y-3">
              {BUSINESS_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-foreground-muted md:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {point}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand md:w-auto"
            >
              Get a Quote
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
