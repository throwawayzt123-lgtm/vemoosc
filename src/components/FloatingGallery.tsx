"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scattered card layout — position (vw/vh from section center), size, tilt,
// and depth are hand-placed to echo a loose, floating photo-wall arrangement
// rather than a grid. `delay` staggers each card's ambient drift so they
// never move in sync.
const CARDS = [
  { src: "/images/menus/1.jpg", x: -34, y: -22, w: 15, rotate: -8, z: 10, delay: 0 },
  { src: "/images/menus/2.jpg", x: -22, y: -30, w: 9, rotate: 6, z: 6, delay: 0.6 },
  { src: "/images/menus/3.jpg", x: -12, y: 4, w: 17, rotate: -4, z: 14, delay: 1.1 },
  { src: "/images/services/Printing.jpeg", x: -26, y: 26, w: 11, rotate: 10, z: 8, delay: 0.3 },
  { src: "/images/services/Seo.jpeg", x: 10, y: -26, w: 16, rotate: 5, z: 12, delay: 0.8 },
  { src: "/images/services/Marketing.jpeg", x: 4, y: 6, w: 9, rotate: -12, z: 5, delay: 1.4 },
  { src: "/images/services/AppDev.jpeg", x: 24, y: -6, w: 12, rotate: 8, z: 9, delay: 0.5 },
  { src: "/images/services/WebDev.jpeg", x: 34, y: 20, w: 14, rotate: -6, z: 13, delay: 1.0 },
  { src: "/images/services/Branding.jpeg", x: 20, y: 30, w: 8, rotate: 12, z: 7, delay: 0.2 },
];

export default function FloatingGallery() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const section = rootRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current;

      gsap.set(".floating-reveal", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, scale: 0.85 });

      gsap
        .timeline({ scrollTrigger: { trigger: section, start: "top 75%" } })
        .to(".floating-reveal", { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0)
        .to(cards, { opacity: 1, scale: 1, duration: 1, stagger: 0.06, ease: "power2.out" }, 0.1);

      // Independent ambient drift + slow tilt per card, offset by `delay`
      // so the whole field feels alive rather than mechanically synced.
      cards.forEach((card, i) => {
        const meta = CARDS[i];
        gsap.to(card, {
          y: "+=18",
          rotate: meta.rotate + (i % 2 === 0 ? 3 : -3),
          duration: 5 + (i % 4),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: meta.delay,
        });
      });

      // Gentle parallax on mouse move — cards further "forward" (higher z)
      // shift a little more than cards set further back.
      const onMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;
        cards.forEach((card, i) => {
          const depth = CARDS[i].z / 14;
          gsap.to(card, {
            x: `+=${x * 10 * depth - (Number(card.dataset.px) || 0)}`,
            duration: 1.2,
            ease: "power2.out",
            onStart: () => {
              card.dataset.px = String(x * 10 * depth);
            },
          });
        });
      };
      window.addEventListener("mousemove", onMove);

      return () => window.removeEventListener("mousemove", onMove);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-gradient-to-br from-[#f4f6fb] via-[#eef1f9] to-[#e6ebf7] py-28 md:py-36"
      style={{ perspective: "1800px" }}
    >
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="floating-reveal mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand">
          <span className="h-px w-8 bg-brand/60" />
          A Glimpse of Our Craft
          <span className="h-px w-8 bg-brand/60" />
        </p>
        <h2 className="floating-reveal text-4xl font-bold uppercase tracking-tight text-[#0b0c10] sm:text-5xl md:text-6xl">
          Work That <span className="text-brand">Speaks</span>
        </h2>
      </div>

      <div className="relative z-0 mx-auto mt-10 h-[70vh] min-h-[520px] w-full max-w-6xl md:h-[80vh]">
        {CARDS.map((card, i) => (
          <div
            key={card.src}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 aspect-[4/5] overflow-hidden rounded-lg shadow-[0_30px_60px_-20px_rgba(20,25,50,0.35)] will-change-transform"
            style={{
              width: `${card.w}vw`,
              maxWidth: "260px",
              minWidth: "110px",
              transform: `translate(-50%, -50%) translate(${card.x}vw, ${card.y}vh) rotate(${card.rotate}deg)`,
              zIndex: card.z,
            }}
          >
            <Image
              src={card.src}
              alt=""
              fill
              sizes="260px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
