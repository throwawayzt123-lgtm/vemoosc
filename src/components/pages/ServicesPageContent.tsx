"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../Container";
import PageHeader from "../PageHeader";
import { SERVICES } from "@/lib/site";
import Services from "../Services";

gsap.registerPlugin(ScrollTrigger);

const PROCESS = [
  { step: "01", title: "Discover", body: "We learn your business, market and goals before proposing anything." },
  { step: "02", title: "Strategize", body: "We shape a bold, tailored plan built around measurable outcomes." },
  { step: "03", title: "Execute", body: "Our team delivers — design, build, launch and iterate at pace." },
  { step: "04", title: "Amplify", body: "We track performance and scale what works to keep growth compounding." },
];

export default function ServicesPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <PageHeader
        eyebrow="Unmatched Expertise"
        title="Our"
        accent="Services"
        intro="With WebCraft Consulting, you're gaining a partner dedicated to amplifying your business and driving tangible results — across print, digital, and software."
      />

      <Services/>

      {/* Services grid */}
      <section className="bg-background py-20 md:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <article
                key={service.slug}
                className="rv group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition hover:border-brand/50"
              >
                {/* Image / colour block */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden"
                  style={{ background: service.color }}
                >
                  <Image
                    src={service.image}
                    alt={`${service.title} — WebCraft Consulting`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover text-transparent transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <span className="absolute left-6 top-6 text-sm font-semibold tracking-[0.3em] text-white/70">
                    {service.id}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h2 className="text-xl font-bold uppercase leading-tight md:text-2xl">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground-muted">
                        <i className="ri-check-line mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-light"
                  >
                    Get a Quote
                    <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-t border-border bg-background-alt py-20 md:py-28">
        <Container>
          <div className="rv max-w-2xl">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-light">
              <span className="h-px w-8 bg-brand-light/70" />
              How We Work
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
              Our <span className="text-brand">Process</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="rv group relative">
                <span
                  className="text-5xl font-bold text-brand/25 transition-all duration-500 ease-out group-hover:text-brand group-hover:[text-shadow:0_0_24px_var(--color-brand),0_0_48px_var(--color-brand)] md:text-6xl"
                >
                  {p.step}
                </span>
                <div className="mt-3 h-px w-12 bg-brand" />
                <h3 className="mt-5 text-lg font-bold uppercase">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
