"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// PLACEHOLDER CONTENT — replace every entry below with a genuine, attributable
// client testimonial before this site goes live. Publishing invented reviews as
// real ones is misleading and, in the UAE, exposes the business to advertising
// and consumer-protection complaints. Until real quotes are supplied these are
// deliberately unattributed and visibly marked as examples. `image` is optional:
// add a real client/company photo path and it replaces the initial avatar.
const REVIEWS: {
  name: string;
  when: string;
  text: string;
  image?: string;
}[] = [
  {
    name: "uyuj",
    when: "Project / scope",
    text: "nice.",
  },
  {
    name: "rdgh",
    when: "Project / scope",
    text: "Placeholder — a short quote about how the works were delivered: safety, programme, quality or responsiveness.",
  },
  {
    name: "tyyyyyyyyyyme",
    when: "Project / scope",
    text: "Placeholder — a quote covering a maintenance, shutdown or construction package VEMOOSC completed.",
  },
  {
    name: "tyyyyyyyyyyme",
    when: "Project / scope",
    text: "Placeholder — a quote covering a maintenance, shutdown or construction package VEMOOSC completed.",
  },
];

function Stars() {
  return (
    <span className="inline-flex gap-0.5 text-[#f5b301]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className="ri-star-fill text-xs" aria-hidden="true" />
      ))}
    </span>
  );
}

export default function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".rev-reveal", { opacity: 0, y: 32 });
      gsap.set(".rev-card", { opacity: 0, y: 44, scale: 0.96 });

      gsap
        .timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
          defaults: { ease: "power3.out" },
        })
        .to(".rev-reveal", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0)
        .to(
          ".rev-card",
          { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.18 },
          0.25
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="testimonials"
      className="relative overflow-hidden bg-background-alt py-32 text-foreground md:py-40"
    >
      {/* Seams — dissolve into the sections above and below */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

      {/* Ambient brand glow behind the stack, like the reference lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-14">
        <div className="text-center">
          <p className="rev-reveal mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-accent">
            <span className="h-px w-8 bg-brand-accent/60" />
            Client Feedback
            <span className="h-px w-8 bg-brand-accent/60" />
          </p>
          <h2 className="rev-reveal text-4xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl">
            What Our <span className="text-brand">Clients Say</span>
          </h2>

          {/* Remove this notice once real testimonials replace the placeholders. */}
          <div className="rev-reveal mt-8 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-brand/40 bg-brand/10 px-6 py-3">
            <i className="ri-information-line text-brand" aria-hidden="true" />
            <span className="text-sm text-foreground-muted">
              Example layout — real client testimonials to be added.
            </span>
          </div>
        </div>

        {/* Stacked glass pill cards. Odd rows nudge right, even rows left, to
            echo the offset arrangement in the reference. */}
        <div className="mt-16 flex flex-col gap-7">
          {REVIEWS.map((review, i) => (
            <figure
              key={i}
              style={{
                marginLeft: i % 2 === 0 ? undefined : "auto",
                maxWidth: "min(100%, 42rem)",
              }}
              className={`rev-card group relative flex items-center gap-5 overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.06] p-4 pr-8 backdrop-blur-xl transition-all duration-500 hover:border-brand/40 hover:bg-white/[0.09] sm:gap-7 ${
                i % 2 === 0 ? "self-start" : "self-end"
              }`}
            >
              {/* Glass sheen + inner ring for the glossy pill look */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/10"
              />
              {/* Soft brand under-glow that intensifies on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 shadow-[0_0_60px_-10px_var(--color-brand-light)] transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* Avatar — circular, glossy ring. Uses a photo if provided,
                  otherwise the client's initial. */}
              <div className="relative z-10 h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-brand to-brand-dark p-[2px] shadow-[0_8px_24px_-6px_var(--color-brand)] sm:h-20 sm:w-20">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-background-alt">
                  {review.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.image}
                      alt={review.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-brand sm:text-2xl">
                      {review.name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              {/* Text block */}
              <div className="relative z-10 min-w-0">
                <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-base font-bold text-foreground sm:text-lg">
                    {review.name}
                  </span>
                  <Stars />
                </figcaption>
                <p className="text-[11px] uppercase tracking-wide text-foreground-muted">
                  {review.when}
                </p>
                <blockquote className="mt-2 text-sm leading-relaxed text-foreground-muted sm:text-base">
                  {review.text}
                </blockquote>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
