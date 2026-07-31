"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DISCIPLINES = [
  "Electrical",
  "Mechanical",
  "Chemical",
  "Civil",
  "Construction",
  "Manpower",
];

const SECTORS = [
  { icon: "ri-search-eye-line", label: "Technical Assessment" },
  { icon: "ri-oil-line", label: "Energy" },
  { icon: "ri-road-map-line", label: "Infrastructure" },
  { icon: "ri-building-3-line", label: "Industrial" },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.set(".hero-word", { yPercent: 115 })
        .set(
          [".hero-eyebrow", ".hero-sub", ".hero-legal", ".hero-cta", ".hero-panel", ".hero-scroll"],
          { opacity: 0, y: 30 }
        )
        .set(".hero-bg-img", { opacity: 0, scale: 1.15 })
        .to(".hero-bg-img", { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }, 0)
        .to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.35)
        .to(".hero-word", { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0.45)
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.8 }, "-=0.65")
        .to(".hero-legal", { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(".hero-panel", { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
        .to(".hero-scroll", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      // Ambient float on the background + marquee-like drift on the discipline
      // ticker so the composition never feels static.
      gsap.to(".hero-bg-img", {
        scale: 1.06,
        duration: 9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-scroll-dot", {
        y: 14,
        duration: 1.1,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      const onMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;
        gsap.to(".hero-parallax", { x: x * 16, y: y * 16, duration: 1, ease: "power2.out" });
        gsap.to(".hero-parallax-soft", { x: x * -24, y: y * -24, duration: 1.2, ease: "power2.out" });
      };
      window.addEventListener("mousemove", onMove);

      // Content sinks and softens as the user scrolls past the pinned hero.
      gsap.to(".hero-content-inner", {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=45%",
          scrub: 0.6,
        },
      });

      return () => window.removeEventListener("mousemove", onMove);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Aurora canvas: slow-drifting brand-tinted blobs behind the headline,
  // rendered live so it never needs a licensed stock clip. Respects
  // reduced-motion by holding still.
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = rootRef.current;
    if (!canvas || !section) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const c = canvas.getContext("2d");
    if (!c) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Blob = { x: number; y: number; r: number; hue: string; sx: number; sy: number; ph: number };
    const blobs: Blob[] = [
      { x: 0.25, y: 0.35, r: 0.42, hue: "8,89,116", sx: 0.6, sy: 0.4, ph: 0 },
      { x: 0.72, y: 0.4, r: 0.5, hue: "27,140,176", sx: -0.5, sy: 0.55, ph: 2 },
      { x: 0.5, y: 0.72, r: 0.38, hue: "5,57,75", sx: 0.4, sy: -0.5, ph: 4 },
    ];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      c.clearRect(0, 0, w, h);
      c.globalCompositeOperation = "lighter";
      const base = Math.min(w, h);
      for (const b of blobs) {
        const dx = Math.sin(t * 0.15 * b.sx + b.ph) * 0.08;
        const dy = Math.cos(t * 0.15 * b.sy + b.ph) * 0.08;
        const cx = (b.x + dx) * w;
        const cy = (b.y + dy) * h;
        const rad = b.r * base;
        const g = c.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${b.hue},0.55)`);
        g.addColorStop(0.6, `rgba(${b.hue},0.12)`);
        g.addColorStop(1, `rgba(${b.hue},0)`);
        c.fillStyle = g;
        c.beginPath();
        c.arc(cx, cy, rad, 0, Math.PI * 2);
        c.fill();
      }
      c.globalCompositeOperation = "source-over";
      if (!reduceMotion) t += 0.016;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[112svh] w-full overflow-hidden bg-background text-white"
    >
      <div className="sticky top-0 flex min-h-[100svh] w-full flex-col overflow-hidden">
        {/* Background video with minimal overlay — video dominates */}
        <div className="pointer-events-none absolute inset-0">
          <video
            className="hero-bg-img hero-parallax absolute inset-0 h-full w-full scale-105 object-cover opacity-0"
            src="/Herobg5.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Minimal directional shade — only where text sits, very light */}
          <div className="absolute inset-0 bg-linear-to-r from-black/25 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent" />
        </div>

        {/* Aurora accent layer, drawn behind the headline */}
        {/* <canvas
          ref={canvasRef}
          className="hero-parallax-soft pointer-events-none absolute inset-0 h-full w-full opacity-60 mix-blend-screen"
          aria-hidden="true"
        /> */}

        {/* Fine grid texture for a technical, engineered feel */}
        {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 30% 40%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 30% 40%, black, transparent 75%)",
          }}
        /> */}

        {/* Giant watermark wordmark, bleeding off the right edge for depth */}
        {/* <span
          aria-hidden="true"
          className="hero-parallax-soft pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none text-[20vw] font-bold uppercase leading-none tracking-tighter text-white/[0.04] lg:block"
        >
          VEMOOSC
        </span> */}

        {/* Hero content — left-aligned editorial layout */}
        <div className="hero-content-inner relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-6 pt-28 sm:px-10 md:px-14 md:pt-32">
          <div className="max-w-3xl">
            {/* <p className="hero-eyebrow mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-light backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-light" />
              </span>
              Built on Vision. Driven by Excellence.
            </p> */}

             {/* Carbon-reduction commitment strip — a second highlighted bar,
                echoing the glass "Our Disciplines" bar below, in the site's
                brand teal. Logo circle sized up so the badge artwork (skyline
                + wordmark) actually reads instead of shrinking to a blur. */}
            <Link
              href="/about"
              className="hero-cta group mt-5 inline-flex items-center gap-3 rounded-full "
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                <Image
                  src="/CarbonEmissionLogo.jpeg"
                  alt=""
                  width={220}
                  height={220}
                  className="h-full w-full scale-110 object-contain"
                />
              </span>
              <span className="text-xs font-semibold text-white sm:text-sm">
                Making a Change — Reducing Carbon Emission in the UAE
              </span>
              <i
                className="ri-arrow-right-line text-brand-light transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <h1 className="text-[13.5vw] font-bold uppercase leading-[0.85] tracking-tight sm:text-[10vw] md:text-[8vw] lg:text-[7.5vw]">
              <span className="block overflow-hidden">
                <span className="hero-word block text-white">VEMOOSC</span>
              </span>
            </h1>

            <p className="hero-legal mt-4 text-sm font-medium italic leading-snug text-white sm:text-base md:text-lg">
              Vision Excellence Maintenance &amp; Operation Oil Services Company
            </p>

            <p className="hero-sub mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              A UAE-based engineering and industrial solutions provider
              delivering reliable, safe and innovative services across the
              energy, infrastructure and industrial sectors.
            </p>

            {/* Sector chips */}
            <div className="hero-cta mt-6 flex flex-wrap gap-2.5">
              {SECTORS.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
                >
                  <i className={`${s.icon} text-brand-light`} aria-hidden="true" />
                  {s.label}
                </span>
              ))}
            </div>

            <div className="hero-cta mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white shadow-[0_8px_32px_-6px_var(--color-brand)] transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_14px_44px_-6px_var(--color-brand)]"
              >
                <span className="relative z-10">Request Services</span>
                <i className="ri-arrow-right-line relative z-10 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10"
              >
                Our Services
                <i className="ri-arrow-right-up-line transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>

           
          </div>
        </div>

        {/* Glass discipline bar pinned near the bottom */}
        <div className="hero-panel relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 sm:px-10 md:px-14 md:pb-12">
          <div className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
              Our Disciplines
            </span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {DISCIPLINES.map((d, i) => (
                <span key={d} className="flex items-center gap-x-5">
                  {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-brand-light/70 sm:inline-block" />}
                  <span className="text-sm font-medium text-white/85">{d}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator — pinned to the right edge, vertical, so it never
            collides with the discipline bar at the bottom. */}
        <div className="hero-scroll pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60 lg:flex">
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <span className="relative flex h-8 w-5 justify-center rounded-full border border-white/30">
            <span className="hero-scroll-dot mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-light" />
          </span>
        </div>

        {/* Seam — dissolves the bottom of the Hero into whatever comes next.
            Kept short so it doesn't wash out the discipline bar above it. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-background" />
      </div>
    </section>
  );
}
