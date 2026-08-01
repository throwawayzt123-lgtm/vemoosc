import gsap from "gsap";

/**
 * Shared scroll-animation helpers.
 *
 * The site previously used one fade-up pattern everywhere, which made every
 * section read the same. These give each section a distinct motion signature
 * while keeping timing/easing consistent so it still feels like one site.
 *
 * All helpers no-op under `prefers-reduced-motion`, leaving content visible.
 */

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Splits an element's text into per-word spans wrapped in an overflow-hidden
 * mask, so words can slide up from behind their own baseline.
 * Returns the created word elements (empty if already split or unavailable).
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (!el || el.dataset.split === "true") return [];

  const text = el.textContent ?? "";
  if (!text.trim()) return [];

  el.dataset.split = "true";
  el.textContent = "";

  const words: HTMLElement[] = [];
  text.split(/(\s+)/).forEach((chunk) => {
    if (!chunk.trim()) {
      el.appendChild(document.createTextNode(chunk));
      return;
    }
    const mask = document.createElement("span");
    mask.style.display = "inline-block";
    mask.style.overflow = "hidden";
    mask.style.verticalAlign = "top";

    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = chunk;

    mask.appendChild(inner);
    el.appendChild(mask);
    words.push(inner);
  });

  return words;
}

/** Headline words rise from behind a mask, staggered. */
export function revealHeadline(
  el: HTMLElement,
  { start = "top 85%", delay = 0 } = {}
) {
  const words = splitWords(el);
  if (!words.length || prefersReducedMotion()) return;

  gsap.fromTo(
    words,
    { yPercent: 115 },
    {
      yPercent: 0,
      duration: 1,
      delay,
      ease: "power4.out",
      stagger: 0.06,
      scrollTrigger: { trigger: el, start },
    }
  );
}

/** Counts a numeric value up when it scrolls into view. */
export function countUp(
  el: HTMLElement,
  to: number,
  { suffix = "", start = "top 88%", duration = 1.8 } = {}
) {
  if (prefersReducedMotion()) {
    el.textContent = `${to}${suffix}`;
    return;
  }

  const obj = { val: 0 };
  gsap.to(obj, {
    val: to,
    duration,
    ease: "power2.out",
    scrollTrigger: { trigger: el, start },
    onUpdate: () => {
      el.textContent = `${Math.round(obj.val)}${suffix}`;
    },
  });
}
