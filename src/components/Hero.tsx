"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.set(".hero-word", { yPercent: 110 })
        .set(
          [".hero-eyebrow", ".hero-sub", ".hero-cta", ".hero-scroll"],
          { opacity: 0, y: 30 }
        )
        .set(".hero-bg-img", { opacity: 0, scale: 1.12 })
        .to(".hero-bg-img", { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" }, 0)
        .to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.35)
        .to(
          ".hero-word",
          { yPercent: 0, duration: 1.2, stagger: 0.12 },
          0.45
        )
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.8 }, "-=0.65")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(".hero-scroll", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      gsap.to(".hero-bg-img", {
        y: -18,
        duration: 7,
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
        gsap.to(".hero-parallax", {
          x: x * 14,
          y: y * 14,
          duration: 1,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", onMove);

      // As the user scrolls past the Hero, the content sinks and softens
      // away while the pinned background keeps drifting underneath —
      // the "content rises up, background stays put" scroll feel. This
      // fade completes over a short distance so it doesn't leave a dead
      // stretch of empty pinned background before the next section starts.
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

  // Light-tunnel canvas: streaking lines rushing from a vanishing point,
  // accelerating as the user scrolls through the Hero. Same idea as
  // scrubbing a video's playback to scroll, but rendered live so it
  // never needs a licensed stock clip.
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = rootRef.current;
    if (!canvas || !section) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let progress = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Streak = { angle: number; radius: number; speed: number; len: number; brand: boolean; alpha: number };
    const STREAK_COUNT = 110;
    let streaks: Streak[] = [];

    const makeStreak = (): Streak => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 40,
      speed: 2 + Math.random() * 3,
      len: 40 + Math.random() * 90,
      brand: Math.random() < 0.62,
      alpha: 0.2 + Math.random() * 0.4,
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      progress = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
    };

    const draw = () => {
      ctx2d.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h * 0.46;
      const maxR = Math.hypot(w, h) * 0.6;
      const speedMul = reduceMotion ? 0 : 0.5 + progress * 2.2;

      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        s.radius += s.speed * speedMul;
        if (s.radius > maxR) {
          streaks[i] = makeStreak();
          streaks[i].radius = 0;
          continue;
        }
        const x1 = cx + Math.cos(s.angle) * s.radius;
        const y1 = cy + Math.sin(s.angle) * s.radius * 0.72;
        const r2 = s.radius + s.len * (0.4 + speedMul * 0.25);
        const x2 = cx + Math.cos(s.angle) * r2;
        const y2 = cy + Math.sin(s.angle) * r2 * 0.72;

        const fade = Math.min(1, s.radius / (maxR * 0.15)) * (1 - s.radius / maxR);
        const color = s.brand ? "50,149,182" : "109,192,114";

        const grad = ctx2d.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, `rgba(${color},${s.alpha * fade})`);
        grad.addColorStop(1, `rgba(${color},0)`);

        ctx2d.strokeStyle = grad;
        ctx2d.lineWidth = Math.max(0.5, (s.radius / maxR) * 2);
        ctx2d.beginPath();
        ctx2d.moveTo(x1, y1);
        ctx2d.lineTo(x2, y2);
        ctx2d.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    streaks = Array.from({ length: STREAK_COUNT }, makeStreak);
    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex w-full flex-col overflow-hidden bg-background text-foreground"
      style={{ height: "112vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden pt-24">
        {/* Background video */}
        <div className="pointer-events-none absolute inset-0">
          <video
            className="hero-bg-img hero-parallax absolute inset-0 h-full w-full object-cover opacity-0"
            src="/Herobg5.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Light tint — just enough to keep the headline legible without dimming the video */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/40" />
        </div>

        {/* Light-tunnel accent layer, drawn behind the headline */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-70 mix-blend-screen"
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="hero-content-inner relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="hero-eyebrow mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-light">
            <span className="h-px w-8 bg-brand-light/70" />
            Business Consulting, Amplified
            <span className="h-px w-8 bg-brand-light/70" />
          </p>

          <h1 className="relative max-w-5xl text-[15vw] font-bold uppercase leading-[0.88] tracking-tight sm:text-[11vw] md:text-[8vw] lg:text-[7vw]">
            <span className="block overflow-hidden">
              <span className="hero-word block text-white">WebCraft</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word block font-light italic text-brand-light">
                Consulting
              </span>
            </span>
          </h1>

          <p className="hero-sub mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            As one of the leading consulting companies, we empower businesses
            with cutting-edge solutions and exceptional services tailored to
            their unique needs.
          </p>

          <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand px-7 py-4 text-sm font-semibold text-white shadow-[0_8px_32px_-6px_var(--color-brand)] transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_12px_40px_-6px_var(--color-brand)]"
            >
              <span className="relative z-10">Contact Now</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10"
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll relative z-10 mb-10 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
          <span className="hidden sm:inline">Scroll to explore</span>
          <span className="relative flex h-8 w-5 justify-center rounded-full border border-white/30">
            <span className="hero-scroll-dot mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-light" />
          </span>
        </div>

        {/* Seam — dissolves the bottom of the Hero into whatever comes next */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>
    </section>
  );
}
