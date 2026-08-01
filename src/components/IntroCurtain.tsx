"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";

/**
 * The pre-paint script is the single source of truth for whether the intro
 * plays, and it never changes after that first frame — so there is nothing
 * to subscribe to. These read it in a way React accepts across the
 * server/client boundary without a hydration mismatch.
 */
const subscribeToIntro = () => () => {};
const getIntroSnapshot = () => {
  if (typeof document === "undefined") return false;
  return true;
};
const getServerIntroSnapshot = () => true;

const STRIPES = 7;

/**
 * Runs before first paint so the black curtain is already covering the page
 * when it renders — without this, the site flashes for a frame before React
 * hydrates and mounts the curtain. Sets a class the CSS below hooks into,
 * and skips entirely when the intro won't play (repeat visit / reduced
 * motion), so those visitors never see a dark flash either.
 */
export const INTRO_INIT_SCRIPT = `
(function () {
  try {
    document.documentElement.classList.add('intro-pending');
  } catch (e) {}
})();
`;

export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: INTRO_INIT_SCRIPT }} />;
}

/**
 * Full-screen intro curtain: a black panel split into vertical stripes that
 * shatter away alternately upward/downward, revealing the site behind.
 *
 * Timing is deliberately tight — the whole sequence finishes in ~2.2s so it
 * never reads as a slow-loading site. Shown once per browser session, and
 * skipped entirely for reduced-motion users.
 */
export default function IntroCurtain() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Rendered via `useSyncExternalStore` rather than plain state: the server
  // snapshot is always `false` (it has no DOM), while the client snapshot
  // reads the class the pre-paint script set. React treats the difference as
  // expected instead of a hydration mismatch, and there is no
  // setState-in-effect round trip.
  const pending = useSyncExternalStore(
    subscribeToIntro,
    getIntroSnapshot,
    getServerIntroSnapshot
  );
  const [finished, setFinished] = useState(false);
  const active = pending && !finished;

  useEffect(() => {
    if (!active) return;

    try {
      sessionStorage.setItem("vemoosc-intro", "1");
    } catch {
      // Private browsing / storage disabled — the intro just replays next time.
    }

    // Lock scrolling only while the curtain is actually on screen.
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.classList.remove("intro-pending");
      document.body.style.overflow = "";
    };
  }, [active]);

  useLayoutEffect(() => {
    if (!active) return;

    // The component's own stripes now cover the screen, so drop the CSS
    // stand-in before animating — otherwise it would sit on top and the
    // stripes would tear away behind a static black sheet.
    document.documentElement.classList.remove("intro-pending");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.body.style.overflow = "";
          setFinished(true);
        },
      });

      // 1. Logo snaps in.
      tl.fromTo(
        ".intro-logo",
        { opacity: 0, scale: 0.82, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7 },
        0
      )
        // 2. A brand line sweeps out beneath it.
        .fromTo(
          ".intro-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
          0.25
        )
        // 3. Logo lifts away just before the stripes go.
        .to(
          ".intro-logo",
          { opacity: 0, scale: 1.06, duration: 0.4, ease: "power2.in" },
          1.15
        )
        .to(".intro-rule", { opacity: 0, duration: 0.3 }, 1.15)
        // 4. Stripes shatter apart — odd up, even down — with a slight
        //    stagger so it tears open rather than sliding as one slab.
        .to(
          ".intro-stripe",
          {
            yPercent: (i: number) => (i % 2 === 0 ? -105 : 105),
            duration: 0.9,
            ease: "power3.inOut",
            stagger: { each: 0.055, from: "center" },
          },
          1.35
        );
    }, rootRef);

    return () => ctx.revert();
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-100 overflow-hidden"
    >
      {/* Stripe wall — each column carries its own slice of the black panel. */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: STRIPES }).map((_, i) => (
          <div
            key={i}
            className="intro-stripe h-full flex-1 bg-[#050506] will-change-transform"
            style={{
              // Hairline overlap prevents sub-pixel seams between columns.
              marginRight: i === STRIPES - 1 ? 0 : "-1px",
            }}
          />
        ))}
      </div>

      {/* Centred logo, above the stripes. The artwork has a solid white
          background, so it sits on an intentional white plate rather than
          reading as a stray box on the black curtain. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <div className="intro-logo rounded-2xl bg-white px-8 py-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
          <Image
            src="/logo.png"
            alt="VEMOOSC"
            width={1416}
            height={1111}
            priority
            className="h-20 w-auto sm:h-24 md:h-28"
          />
        </div>
        <span className="intro-rule h-px w-40 origin-left bg-linear-to-r from-transparent via-brand-light to-transparent sm:w-56" />
      </div>
    </div>
  );
}
