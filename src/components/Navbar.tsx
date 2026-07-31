"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SERVICES, SITE } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Small delay before closing so moving the mouse from the "Services" link
  // down into the dropdown panel doesn't close it in transit.
  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Clear any pending close timer on unmount.
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Derived rather than reset via effect: whenever the panel itself is
  // closed, the accordion reads as closed too, regardless of its last state.
  const isMobileServicesExpanded = open && mobileServicesOpen;

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
            const active =
              pathname === link.href ||
              (link.href === "/services" && pathname.startsWith("/services/"));
            const linkClass = `transition ${
              overHero ? "hover:text-brand-light" : "hover:text-brand-accent"
            } ${
              active
                ? overHero
                  ? "text-brand-light"
                  : "text-brand-accent"
                : overHero
                  ? "text-white"
                  : "text-foreground"
            }`;

            if (link.href !== "/services") {
              return (
                <Link key={link.label} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              );
            }

            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={scheduleCloseServices}
              >
                <Link
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 ${linkClass}`}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                >
                  {link.label}
                  <i
                    className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </Link>

                {/* Dropdown panel */}
                <div
                  className={`absolute left-1/2 top-full z-50 w-104 -translate-x-1/2 pt-4 transition-all duration-200 ${
                    servicesOpen
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-background/98 p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-surface"
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/12 text-base text-brand transition group-hover:bg-brand group-hover:text-white">
                          <i className={s.icon} aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-foreground">
                            {s.title}
                          </span>
                          <span className="block truncate text-xs text-foreground-muted">
                            {s.tagline}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
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
        className={`fixed inset-0 z-50 flex h-dvh w-full flex-col bg-background px-6 pb-8 pt-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
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
            onClick={() => {
              setOpen(false);
              setMobileServicesOpen(false);
            }}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-xl"
          >
            <i className="ri-close-line" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 flex flex-1 flex-col overflow-y-auto">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href === "/services" && pathname.startsWith("/services/"));

            if (link.href !== "/services") {
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
            }

            return (
              <div key={link.label} className="border-b border-border/60">
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    className={`flex-1 py-4 text-lg font-medium transition ${
                      active ? "text-brand" : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-label={isMobileServicesExpanded ? "Collapse services" : "Expand services"}
                    aria-expanded={isMobileServicesExpanded}
                    className="flex h-10 w-10 shrink-0 items-center justify-center text-foreground-muted"
                  >
                    <i
                      className={`ri-arrow-down-s-line text-xl transition-transform duration-200 ${
                        isMobileServicesExpanded ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isMobileServicesExpanded ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <div className="flex flex-col gap-1">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm text-foreground-muted transition hover:bg-surface hover:text-foreground"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/12 text-sm text-brand">
                            <i className={s.icon} aria-hidden="true" />
                          </span>
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="mt-6 block shrink-0 rounded-full bg-brand px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Request Services
        </Link>
      </nav>
    </header>
  );
}
