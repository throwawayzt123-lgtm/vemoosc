"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current;

      // Recompute each card's 3D depth based on how close its center is to the
      // horizontal center of the viewport. The closest card "pops" forward
      // (scale up, no rotation, full brightness, lifted, higher z); cards to
      // the sides recede (scale down, rotate away, dim, sink back).
      const updateDepth = () => {
        const viewportCenter = window.innerWidth / 2;
        cards.forEach((card) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const offset = (cardCenter - viewportCenter) / (window.innerWidth / 2);
          const clamped = gsap.utils.clamp(-1.4, 1.4, offset);
          const proximity = 1 - Math.min(1, Math.abs(clamped)); // 1 = centered

          const scale = gsap.utils.mapRange(0, 1, 0.84, 1.05, proximity);
          const y = gsap.utils.mapRange(0, 1, 54, -20, proximity);
          const z = gsap.utils.mapRange(0, 1, -240, 0, proximity);
          const rotateY = clamped * -20; // turn side cards away from viewer
          const opacity = gsap.utils.mapRange(0, 1, 0.45, 1, proximity);
          const brightness = gsap.utils.mapRange(0, 1, 0.55, 1, proximity);
          const zIndex = Math.round(proximity * 100);

          gsap.set(card, {
            scale,
            y,
            z,
            rotateY,
            opacity,
            zIndex,
            filter: `brightness(${brightness})`,
          });
        });
      };

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        onUpdate: updateDepth,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onRefresh: updateDepth,
        },
      });

      updateDepth();
    }, section);

    // Track width depends on font/image loading; re-measure so the pin-spacer
    // reserves the correct scroll distance and the next section never overlaps.
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative flex h-screen w-full flex-col overflow-hidden bg-background text-foreground"
    >
      {/* Seam — dissolves in from About above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-seam to-transparent" />

      {/* Heading — pinned above the cards */}
      <div className="relative z-20 shrink-0 px-6 pt-16 text-center md:px-14 md:pt-20">
        <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-accent">
          <span className="h-px w-8 bg-brand-accent/60" />
          Multi-Discipline Capability
          <span className="h-px w-8 bg-brand-accent/60" />
        </p>
        <h2 className="text-4xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl">
          What We <span className="text-brand">Deliver</span>
        </h2>
      </div>

      {/* 3D perspective viewport for the horizontal track */}
      <div
        className="relative flex flex-1 items-center"
        style={{ perspective: "1600px" }}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center gap-8 px-[12vw] will-change-transform md:gap-14"
          style={{ transformStyle: "preserve-3d", pointerEvents: "none" }}
        >
          {SERVICES.map((service, i) => (
            <article
              key={service.id}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="group relative aspect-[16/10] h-[56vh] max-h-[520px] w-[84vw] shrink-0 overflow-hidden rounded-3xl border border-border shadow-2xl will-change-transform sm:w-auto"
              style={{ background: service.color, pointerEvents: "auto" }}
            >
              <Link href={`/services/${service.slug}`} className="absolute inset-0">
                {/* Placeholder background image — replace with real project
                    photography. `text-transparent` hides the broken-image glyph
                    if the file isn't present yet — the card's solid color shows
                    instead. */}
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 84vw, 90vh"
                  className="object-cover text-transparent transition-transform duration-1000 ease-out group-hover:scale-110"
                />

                {/* Dark bottom-up scrim so the heading stays readable */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                {/* Smart heading at the bottom */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-8 md:p-10">
                  <span className="mb-3 block text-sm font-semibold tracking-[0.3em] text-brand-accent">
                    {service.id}
                  </span>
                  <div className="h-px w-12 bg-brand" />
                  <h3 className="mt-4 text-2xl font-bold uppercase leading-tight text-white md:text-3xl lg:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm text-white/70 md:text-base">
                    {service.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View Details
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
