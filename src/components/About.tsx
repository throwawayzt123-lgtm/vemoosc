"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "500+", label: "Projects" },
  { value: "6yrs", label: "In Practice" },
  { value: "99%", label: "Retained" },
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".about-reveal", { opacity: 0, y: 32 });
      gsap.set(".about-eyebrow", { opacity: 0 });
      gsap.set(".about-img-back", { opacity: 0, scale: 1.08 });
      gsap.set(".about-img-front", { opacity: 0, y: 40, scale: 1.04 });
      gsap.set(".about-stat-strip", { opacity: 0, y: 30 });

      gsap
        .timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
          defaults: { ease: "power3.out" },
        })
        .to(".about-eyebrow", { opacity: 1, duration: 1 }, 0)
        .to(".about-img-back", { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, 0.1)
        .to(".about-reveal", { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.25)
        .to(".about-img-front", { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" }, 0.4)
        .to(".about-stat-strip", { opacity: 1, y: 0, duration: 0.9 }, 0.6);

      // Slow ambient drift on the back image while the section is in view.
      gsap.to(".about-img-back img", {
        scale: 1.08,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative overflow-hidden bg-background text-white"
    >
      {/* Seam — dissolves in from the Hero above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black/60 to-transparent" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="relative flex flex-col justify-center px-6 py-16 sm:px-10 md:px-14 md:py-20">
          {/* Rotated vertical eyebrow, pinned to the section's left edge */}
          <span
            className="about-eyebrow absolute left-4 top-1/2 hidden -translate-y-1/2 -rotate-180 text-xs font-semibold uppercase tracking-[0.5em] text-white/50 sm:left-6 md:block"
            style={{ writingMode: "vertical-rl" }}
          >
            Our Story
          </span>

          <div className="max-w-xl md:pl-10">
            <p className="about-reveal mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-light">
              <span className="h-px w-8 bg-brand-light/70" />
              Business Consulting, Amplified
            </p>

            <h2 className="about-reveal text-4xl font-light uppercase leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
              Sharing the
              <br />
              <span className="font-bold text-brand">Spirit</span> of
              <br />
              Success
            </h2>

            <div className="about-reveal mt-9 space-y-5 text-base leading-relaxed text-white/60 md:text-lg">
              <p>
                Success is not something to be forced. It is something to be
                built. Guided by bold strategy and honest craft, WebCraft
                Consulting opens a clear path back to what matters&mdash;work
                that reflects who you are, and growth that lasts.
              </p>
            </div>

            <a
              href="#services"
              className="about-reveal group mt-11 inline-flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
            >
              <span className="h-px w-10 bg-white/40 transition-all duration-300 group-hover:w-16 group-hover:bg-brand" />
              View Our Services
            </a>
          </div>
        </div>

        {/* Right: layered photography */}
        <div className="relative h-[70vh] w-full lg:h-auto lg:min-h-[680px]">
          <div className="about-img-back absolute inset-0">
            <Image
              src="/images/services/Branding.jpeg"
              alt="WebCraft Consulting — our craft"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="about-img-front absolute bottom-24 left-6 aspect-[4/5] w-[52%] max-w-xs overflow-hidden rounded-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:left-10 md:bottom-28 md:left-14">
            <Image
              src="/images/services/WebDev.jpeg"
              alt="WebCraft Consulting — our work"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>

          {/* Floating stat strip, overlapping the bottom edge of the photos */}
          <div className="about-stat-strip absolute -bottom-px left-1/2 z-10 flex w-[min(90%,420px)] -translate-x-1/2 divide-x divide-white/10 rounded-t-xl border border-b-0 border-white/10 bg-[#0c0d0b]/95 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex-1 px-4 py-6 text-center">
                <div className="text-2xl font-bold text-brand-light md:text-3xl">{stat.value}</div>
                <div className="mt-1.5 text-[10px] uppercase tracking-[0.15em] text-white/50">
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
