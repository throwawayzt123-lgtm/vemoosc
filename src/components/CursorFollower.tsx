"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// A small brand-colored dot that trails the real cursor with a soft delay,
// giving pointer movement a bit of weight. Hidden on touch devices, where
// there's no persistent cursor to follow.
export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasFinePointer || reduceMotion) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onEnter = () => gsap.to(dot, { opacity: 1, duration: 0.3 });
    const onLeave = () => gsap.to(dot, { opacity: 0, duration: 0.3 });

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-0 shadow-[0_0_12px_2px_var(--color-brand)] [@media(pointer:fine)]:block"
    />
  );
}
