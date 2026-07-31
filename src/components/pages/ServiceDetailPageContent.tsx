"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../Container";
import PageHeader from "../PageHeader";
import { SERVICES } from "@/lib/site";
import type { ServiceDetail } from "@/lib/service-details";

gsap.registerPlugin(ScrollTrigger);

type Service = (typeof SERVICES)[number];

export default function ServiceDetailPageContent({
  service,
  detail,
}: {
  service: Service;
  detail: ServiceDetail | undefined;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [activeTab]);

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);
  const sections = detail?.sections ?? [];
  const tabs = detail?.tabs ?? [];

  return (
    <div ref={rootRef}>
      <PageHeader
        eyebrow={`Service ${service.id}`}
        title={service.title}
        intro={service.description}
      />

      {/* ─── Hero image band ──────────────────────────────────────────────── */}
      <section className="relative h-[38vh] min-h-[280px] w-full overflow-hidden md:h-[46vh]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-black/40" />
        <div className="absolute inset-x-0 bottom-0">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6 pb-8 md:pb-10">
              <p className="max-w-xl text-sm font-medium leading-relaxed text-white/90 md:text-base">
                {service.tagline}
              </p>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_10px_30px_-10px_var(--color-brand)] transition hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                Request Services
                <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </div>
      </section>

      {/* ─── Quick capability chips (top-level features) ─────────────────── */}
      <section className="border-b border-border bg-background-alt py-8">
        <Container>
          <div className="flex flex-wrap gap-3">
            {service.features.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-foreground-muted"
              >
                <i className="ri-checkbox-circle-fill text-brand" aria-hidden="true" />
                {f}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Plain sections (Electrical / Chemical / Civil / Construction /
             Manpower / Technical Assessment) ─────────────────────────────── */}
      {sections.length > 0 && (
        <section className="bg-background py-20 md:py-28">
          <Container>
            <div className="space-y-16 md:space-y-20">
              {sections.map((sec, i) => (
                <div key={sec.heading} className="rv">
                  <div className="flex items-start gap-5">
                    <span className="mt-1 shrink-0 font-mono text-sm font-bold text-brand/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                        {sec.heading}
                      </h2>

                      {sec.intro && (
                        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground-muted md:text-lg">
                          {sec.intro}
                        </p>
                      )}

                      {sec.items.length > 0 && (
                        <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                          {sec.items.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground-muted md:text-base">
                              <i className="ri-checkbox-circle-fill mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ─── Tabbed equipment categories (Mechanical only) ────────────────── */}
      {tabs.length > 0 && (
        <section className={`bg-background pb-20 md:pb-28 ${sections.length > 0 ? "" : "pt-20 md:pt-28"}`}>
          <Container>
            <div className="rv mb-10 max-w-2xl">
              <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-accent">
                <span className="h-px w-8 bg-brand-accent/60" />
                By Equipment Type
              </p>
              <h2 className="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                Static Equipment <span className="text-brand">Capability</span>
              </h2>
            </div>

            {/* Tab bar — horizontally scrollable on small screens */}
            <div className="rv -mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
              <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
                {tabs.map((tab, i) => (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setActiveTab(i)}
                    className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                      activeTab === i
                        ? "border-brand bg-brand text-white"
                        : "border-border bg-surface text-foreground-muted hover:border-brand/50 hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active tab content */}
            <div className="mt-10 rounded-3xl border border-border bg-surface p-7 md:p-10">
              {tabs[activeTab].intro && (
                <p className="mb-7 max-w-3xl text-base leading-relaxed text-foreground-muted md:text-lg">
                  {tabs[activeTab].intro}
                </p>
              )}
              {tabs[activeTab].items.length > 0 && (
                <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                  {tabs[activeTab].items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground-muted md:text-base">
                      <i className="ri-checkbox-circle-fill mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* ─── CTA band ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border bg-brand py-16 text-white md:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                Need {service.title}?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                Tell us your scope and site details — our team will come back
                to you with a clear, itemised proposal.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-brand transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Request Services
              <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ─── Explore other services ────────────────────────────────────────── */}
      <section className="bg-background-alt py-20 md:py-28">
        <Container>
          <div className="rv mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-accent">
                <span className="h-px w-8 bg-brand-accent/60" />
                Explore More
              </p>
              <h2 className="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                Other <span className="text-brand">Services</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-accent sm:inline-flex"
            >
              View All
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.slice(0, 3).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rv group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-3xl border border-border"
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="relative z-10 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
                    {s.id}
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">{s.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
