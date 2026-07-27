"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Placeholder frames — replace `src` with real site photography as it becomes
// available; the labels describe the work type, not a specific named project.
const IMAGES = [
  { src: "/images/services/Mechanical.jpg", label: "Maintenance Works", tag: "Electrical & Mechanical" },
  { src: "/images/services/Construction.jpg", label: "Civil & Construction", tag: "Structural & Groundworks" },
  { src: "/images/services/Manpower.jpg", label: "Manpower Support", tag: "Skilled Trades On Site" },
];

// Two resting spots, left and right, with clear space between them — small,
// dim and pushed back in z. Whichever side is "active" animates up to the
// CENTER spot (big, sharp, in front); the other stays resting.
const LEFT_REST = { x: "-32vw", y: "0vh", scale: 0.4, opacity: 0.45, blur: 4, zIndex: 10 };
const RIGHT_REST = { x: "32vw", y: "0vh", scale: 0.4, opacity: 0.45, blur: 4, zIndex: 10 };
const CENTER = { x: "0vw", y: "0vh", scale: 1, opacity: 1, blur: 0, zIndex: 30 };
// Where a resting image goes once it's done being "active" and steps aside
// for the next image to take its resting spot.
const RETREAT = { scale: 0.15, opacity: 0, blur: 16 };

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRefs = useRef<HTMLDivElement[]>([]);
  const captionRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const frames = frameRefs.current;
      const captions = captionRefs.current;
      const total = IMAGES.length;

      const setTo = (i: number, state: { x?: string; y?: string; scale: number; opacity: number; blur: number; zIndex: number }) => {
        gsap.set(frames[i], {
          x: state.x,
          y: state.y,
          scale: state.scale,
          opacity: state.opacity,
          filter: `blur(${state.blur}px)`,
          zIndex: state.zIndex,
        });
      };

      // Image 0 starts already active/centered. Image 1 rests on the right,
      // waiting its turn. Everything else queues up off-screen (rests at the
      // right spot but invisible, ready to fade in once it's their turn).
      setTo(0, CENTER);
      gsap.set(captions[0], { opacity: 1, y: 0 });
      setTo(1, RIGHT_REST);
      gsap.set(captions[1], { opacity: 0, y: 16 });
      for (let i = 2; i < total; i++) {
        setTo(i, { ...RIGHT_REST, opacity: 0, scale: 0.15, blur: 16 });
        gsap.set(captions[i], { opacity: 0, y: 16 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(total - 1) * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Step i: the currently-active (centered) image retreats away, the
      // image resting on the side comes forward to the center, and — two
      // steps ahead — a fresh image fades into the now-empty resting spot.
      for (let step = 0; step < total - 1; step++) {
        const active = step; // currently centered, about to retreat
        const incoming = step + 1; // currently resting, about to become active
        const queued = step + 2; // fades into the resting spot this side vacates
        const sideIsLeft = step % 2 === 0; // alternate which side "incoming" comes from
        const restSpot = sideIsLeft ? LEFT_REST : RIGHT_REST;

        tl.to(
          frames[active],
          {
            scale: RETREAT.scale,
            opacity: RETREAT.opacity,
            filter: `blur(${RETREAT.blur}px)`,
            zIndex: 5,
            duration: 1,
            ease: "power2.in",
          },
          step
        )
          .to(captions[active], { opacity: 0, y: -16, duration: 0.4, ease: "power2.inOut" }, step)
          .to(
            frames[incoming],
            {
              x: CENTER.x,
              y: CENTER.y,
              scale: CENTER.scale,
              opacity: CENTER.opacity,
              filter: `blur(${CENTER.blur}px)`,
              zIndex: CENTER.zIndex,
              duration: 1,
              ease: "power2.inOut",
            },
            step
          )
          .to(
            captions[incoming],
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            step + 0.5
          );

        if (queued < total) {
          tl.fromTo(
            frames[queued],
            {
              x: restSpot.x,
              y: restSpot.y,
              scale: 0.15,
              opacity: 0,
              filter: "blur(16px)",
            },
            {
              scale: restSpot.scale,
              opacity: restSpot.opacity,
              filter: `blur(${restSpot.blur}px)`,
              zIndex: restSpot.zIndex,
              duration: 1,
              ease: "power2.out",
            },
            step + 0.2
          );
        }
      }
    }, section);

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
      className="relative flex h-[100vh] w-full flex-col overflow-hidden bg-background-alt text-foreground"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background-alt via-transparent to-background-alt" />

      {/* Heading — reserves its own space at the top so the image track
          below never overlaps it, regardless of viewport height. */}
      <div className="relative z-40 shrink-0 px-6 pt-24 text-center sm:pt-28 md:pt-32">
        <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-accent">
          <span className="h-px w-8 bg-brand-accent/60" />
          Our Work
          <span className="h-px w-8 bg-brand-accent/60" />
        </p>
        <h2 className="text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Delivered <span className="text-brand">On Site</span>
        </h2>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center justify-center overflow-hidden px-6 py-6">
        {IMAGES.map((img, i) => (
          // Static centering wrapper (never touched by GSAP) so the inner
          // element below is free to animate x/y/scale for the left-right-
          // center effect without fighting Tailwind's own centering transform.
          // Height-capped (not just width-driven) so the 4:5 portrait frame
          // always fits the available space instead of getting clipped on
          // short/wide viewports.
          <div
            key={img.src}
            className="pointer-events-none absolute left-1/2 top-1/2 flex aspect-[4/5] h-[46vh] w-auto max-h-[420px] min-w-[180px] -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-[54vh] md:h-[58vh]"
          >
            <div
              ref={(el) => {
                if (el) frameRefs.current[i] = el;
              }}
              className="relative h-full w-full will-change-transform"
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  sizes="(max-width: 768px) 46vw, 24vw"
                  className="object-cover"
                  priority={i < 2}
                />
              </div>
              <div
                ref={(el) => {
                  if (el) captionRefs.current[i] = el;
                }}
                className="absolute -top-12 left-0 whitespace-nowrap text-left"
              >
                <p className="text-sm font-semibold tracking-wide text-brand-accent">{img.label}</p>
                <p className="text-xs text-foreground-muted">{img.tag}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
