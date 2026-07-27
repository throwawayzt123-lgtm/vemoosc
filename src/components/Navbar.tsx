"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Only the home page puts a dark hero video behind the transparent bar.
  // Every other route starts on the themed background, so the bar's contents
  // must use the normal foreground colour or they vanish in light mode.
  const overHero = pathname === "/" && !scrolled && !open;

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-0 transition-all duration-500 ease-out sm:px-4 sm:pt-3 lg:px-6 lg:pt-4">
      <div
        className={`mx-auto flex w-full items-center justify-between transition-all duration-500 ease-out ${
          scrolled || open
            ? "max-w-5xl rounded-full border border-border/60 bg-background/95 px-5 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-6"
            : "max-w-7xl rounded-none border border-transparent bg-transparent px-5 py-4 sm:px-8 lg:px-14 lg:py-5"
        }`}
      >
        {/* Transparent logo mark — sits directly on the bar, no plate needed. */}
        <Link href="/" aria-label={`${SITE.name} — Home`} className="shrink-0">
          <span className="flex items-center">
            <Image
              src="/Logo2.png"
              alt={SITE.name}
              width={872}
              height={644}
              priority
              className="h-10 w-auto md:h-12"
            />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition ${
                  overHero ? "hover:text-brand-light" : "hover:text-brand-accent"
                } ${
                  active
                    ? overHero
                      ? "text-brand-light"
                      : "text-brand-accent"
                    : overHero
                      ? "text-white"
                      : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle
            className={
              overHero
                ? "border-white/30 text-white hover:border-white/70 hover:text-white"
                : ""
            }
          />    

          <Link
            href="/contact"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark sm:inline-block"
          >
            Contact Now
          </Link>

          {/* Mobile toggle — opens the full-screen menu, which has its own close button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className={`flex h-10 w-10 items-center justify-center rounded-full border text-xl lg:hidden ${
              overHero
                ? "border-white/30 text-white"
                : "border-border text-foreground"
            }`}
          >
            <i className="ri-menu-line" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile menu — full-screen panel sliding in from the right */}
      <nav
        aria-hidden={!open}
        className={`fixed inset-0 z-50 flex h-[100dvh] w-full flex-col bg-background px-6 pb-8 pt-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" aria-label={`${SITE.name} — Home`} onClick={() => setOpen(false)}>
            <span className="flex items-center">
              <Image
                src="/Logo2.png"
                alt={SITE.name}
                width={872}
                height={644}
                className="h-10 w-auto"
              />
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-xl"
          >
            <i className="ri-close-line" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 flex flex-1 flex-col overflow-y-auto">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`block border-b border-border/60 py-4 text-lg font-medium transition ${
                  active ? "text-brand" : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="mt-6 block shrink-0 rounded-full bg-brand px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Get A Quote
        </Link>
      </nav>
    </header>
  );
}
