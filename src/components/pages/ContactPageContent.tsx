"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../Container";
import PageHeader from "../PageHeader";
import { SITE, SERVICES } from "@/lib/site";
 
gsap.registerPlugin(ScrollTrigger);

const inputClass =
  "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground-muted/70 focus:border-brand";

const labelClass =
  "mb-2 block text-sm font-medium uppercase tracking-wide text-foreground";

export default function ContactPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

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

  // No backend is wired up yet, so this hands the enquiry to the user's email
  // client rather than pretending the message was delivered.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Company: ${data.get("company")}`,
      `Service: ${data.get("service")}`,
      "",
      `${data.get("message")}`,
    ].join("\n");

    window.location.href = `${SITE.emails[0].href}?subject=${encodeURIComponent(
      `New enquiry from ${data.get("name")}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  // The "Call Us" card only appears once phone/WhatsApp are filled in on SITE.
  const callItems = [
    ...(SITE.phone ? [{ label: SITE.phone.label, href: SITE.phone.href }] : []),
    ...(SITE.whatsapp
      ? [{ label: `${SITE.whatsapp.label} (WhatsApp)`, href: SITE.whatsapp.href }]
      : []),
  ];

  const CONTACT_CARDS = [
    ...(callItems.length
      ? [{ icon: "ri-phone-fill", title: "Call Us", items: callItems }]
      : []),
    {
      icon: "ri-mail-fill",
      title: "Email Us",
      items: SITE.emails.map((e) => ({ label: e.label, href: e.href })),
    },
    {
      icon: "ri-map-pin-fill",
      title: "Visit Us",
      items: [{ label: SITE.address.label, href: SITE.address.href }],
    },
  ];

  return (
    <div ref={rootRef}>
      <PageHeader
        eyebrow="Contact Us"
        title="Get In"
        accent="Touch"
        intro="Tell us about the works you need — maintenance, civil, construction, chemical or manpower — and our team will come back to you with a proposal."
      />

      <section className="bg-background py-20 md:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
            {/* Form */}
            <div className="rv rounded-3xl border border-border bg-surface p-7 md:p-10">
              <h2 className="text-2xl font-bold uppercase tracking-tight md:text-3xl">
                Send Us Your <span className="text-brand">Enquiry</span>
              </h2>
              <p className="mt-3 text-sm text-foreground-muted">
                Fill in the details below and we&rsquo;ll be in touch shortly.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+971 50 000 0000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      placeholder="Your company name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className={labelClass}>
                      Service Required
                    </label>
                    <select id="service" name="service" defaultValue="" className={inputClass}>
                      <option value="" disabled>
                        Select a service
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe the scope of works, location and timeframe..."
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  Send Message
                  <i
                    className="ri-arrow-right-line transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>

                {sent && (
                  <p className="text-center text-xs text-foreground-muted" role="status">
                    Your email app should have opened with the message ready to send. If
                    nothing happened, email us directly at{" "}
                    <a href={SITE.emails[0].href} className="text-brand-accent underline">
                      {SITE.emails[0].label}
                    </a>
                    .
                  </p>
                )}
              </form>
            </div>

            {/* Contact cards */}
            <div className="flex flex-col gap-6">
              {CONTACT_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="rv rounded-3xl border border-border bg-surface p-7 transition hover:border-brand/50"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/15 text-xl text-brand">
                      <i className={card.icon} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                        {card.title}
                      </h3>
                      <ul className="mt-2 space-y-1.5">
                        {card.items.map((item) => (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              target={item.href.startsWith("http") ? "_blank" : undefined}
                              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="text-sm font-medium break-words transition hover:text-brand"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              {SITE.socials.length > 0 && (
                <div className="rv flex gap-3">
                  {SITE.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border text-lg transition hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <i className={s.icon} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="border-t border-border">
        <iframe
          title="VEMOOSC office location — New Ghayathi Industrial Area, Abu Dhabi"
          src="https://maps.google.com/maps?q=New%20Ghayathi%20Industrial%20Area%20Ghayathi%20Al%20Dhafra%20Abu%20Dhabi%20UAE&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="h-[320px] w-full md:h-[420px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}
