"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fixed full-viewport video sitting behind all page content. Its playback
// position is scrubbed directly to overall page scroll progress (0 -> 1)
// via GSAP ScrollTrigger, so it never "plays" on its own — it just tracks scroll.
export default function ScrollBgVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let st: ScrollTrigger | undefined;

    const setup = () => {
      if (!video.duration) return;
      st = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          video.currentTime = self.progress * video.duration;
        },
      });
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", setup);
      st?.kill();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="fixed inset-0 -z-10 h-full w-full object-cover"
      src="/videos/HomeBodyBg.mp4"
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
