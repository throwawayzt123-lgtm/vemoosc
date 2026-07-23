"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    name: "Sabira Dosani",
    when: "8 months ago",
    text: "I like the service, they care about customers' satisfaction and quality of materials — very good. I definitely recommend. I will remember to give any printing order to WebCraft Consulting. Thank you so much.",
  },
  {
    name: "Jadav Bhavin",
    when: "8 months ago",
    text: "Very professional and good customer service, gets your printing needs done in a timely manner and the way you want them. Highly recommend — I will not go anywhere else.",
  },
  {
    name: "Kausalya Rajappan",
    when: "9 months ago",
    text: "Wonderful job done and on time delivery.",
  },
  {
    name: "Ashim Shrestha",
    when: "10 months ago",
    text: "From the easy online ordering to the timely delivery, WebCraft Consulting made printing a breeze. Sunny helped me a lot and provided excellent support. Great products and great service.",
  },
  {
    name: "Suresh Silwal",
    when: "11 months ago",
    text: "Great experience! Great quality cards and very communicative customer service reps. Ordering from a press in New York as a business owner in Rhode Island was questionable, but the prices were extremely cheap and the business cards are VERY durable.",
  },
  {
    name: "Roni Khan",
    when: "11 months ago",
    text: "Very professional. I got 5000 menus for my restaurant. Price is reasonable. They did wonderful work.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-sm text-brand-light" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className="ri-star-fill" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);
  const autoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [autoplay.current]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".rev-reveal", { opacity: 0, y: 32 });
      gsap.set(".rev-slider", { opacity: 0, y: 40 });

      gsap
        .timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
          defaults: { ease: "power3.out" },
        })
        .to(".rev-reveal", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0)
        .to(".rev-slider", { opacity: 1, y: 0, duration: 0.7 }, 0.2);
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-14">
        <div className="text-center">
          <p className="rev-reveal mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-light">
            <span className="h-px w-8 bg-brand-light/70" />
            Unmatched Expertise
            <span className="h-px w-8 bg-brand-light/70" />
          </p>
          <h2 className="rev-reveal text-4xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl">
            What Our <span className="text-brand">Clients Say</span>
          </h2>

          <div className="rev-reveal mt-8 inline-flex flex-wrap items-center justify-center gap-4 rounded-full border border-border bg-surface/60 px-6 py-3">
            <span className="text-lg font-bold tracking-wide">EXCELLENT</span>
            <Stars />
            <span className="text-sm text-foreground-muted">
              Based on <span className="text-foreground">20 reviews</span> on Google
            </span>
          </div>
        </div>

        <div className="rev-slider relative mt-16">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-6 flex">
              {REVIEWS.map((review) => (
                <div
                  key={review.name}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-6 sm:basis-1/2 lg:basis-1/3"
                >
                  <figure className="flex h-full flex-col rounded-3xl border border-border bg-surface p-7 transition hover:border-brand/50">
                    <div className="mb-4 flex items-center justify-between">
                      <Stars />
                      <i
                        className="ri-google-fill text-lg text-foreground-muted"
                        aria-label="Google review"
                      />
                    </div>
                    <blockquote className="flex-1 text-sm leading-relaxed text-foreground-muted">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-sm font-bold text-brand">
                        {review.name.charAt(0)}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{review.name}</div>
                        <div className="text-xs text-foreground-muted">{review.when}</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next controls */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous testimonials"
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-5 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-md transition hover:border-brand hover:text-brand sm:flex"
          >
            <i className="ri-arrow-left-s-line text-xl" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next testimonials"
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 translate-x-5 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-md transition hover:border-brand hover:text-brand sm:flex"
          >
            <i className="ri-arrow-right-s-line text-xl" aria-hidden="true" />
          </button>

          {/* Dot indicators */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === selectedIndex ? "w-7 bg-brand" : "w-2.5 bg-border hover:bg-brand/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
