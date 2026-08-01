import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { SITE, SERVICES, NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background text-foreground">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          {/* Brand + blurb */}
          <div>
            <Link href="/" aria-label={`${SITE.name} — Home`} className="inline-block">
              <Image
                src="/Logo2.png"
                alt={SITE.name}
                width={872}
                height={644}
                className="h-20 w-auto"
              />
            </Link>
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-brand-accent">
              {SITE.tagline}
            </p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-foreground-muted/70">
              {SITE.legalName}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground-muted">
              A UAE-based engineering and industrial solutions provider
              delivering reliable, safe and innovative services across the
              energy, infrastructure and industrial sectors.
            </p>
            {SITE.socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {SITE.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-base transition hover:border-brand hover:bg-brand hover:text-white"
                    aria-label={s.label}
                  >
                    <i className={s.icon} aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted transition hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-foreground-muted transition hover:text-brand"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-sm text-foreground-muted">
              {SITE.phones.map((phone) => (
                <li key={phone.label}>
                  <a
                    href={phone.href}
                    className="flex items-center gap-3 transition hover:text-brand"
                  >
                    <i className="ri-phone-fill shrink-0 text-brand" aria-hidden="true" />
                    {phone.label}
                  </a>
                </li>
              ))}
              {SITE.whatsapp && (
                <li>
                  <a
                    href={SITE.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 transition hover:text-brand"
                  >
                    <i className="ri-whatsapp-line shrink-0 text-brand" aria-hidden="true" />
                    {SITE.whatsapp.label}
                  </a>
                </li>
              )}
              {SITE.emails.map((email) => (
                <li key={email.label}>
                  <a href={email.href} className="flex items-center gap-3 transition hover:text-brand">
                    <i className="ri-mail-fill shrink-0 text-brand" aria-hidden="true" />
                    {email.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={SITE.address.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition hover:text-brand"
                >
                  <i className="ri-map-pin-fill mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  {SITE.address.label}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-foreground-muted sm:flex-row">
          <p>Copyright &copy;2026 {SITE.name}. All Rights Reserved.</p>
          <p>{SITE.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
