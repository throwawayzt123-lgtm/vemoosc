import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { SITE, SERVICES } from "@/lib/site";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "News & Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background text-foreground">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          {/* Brand + blurb */}
          <div>
            <Link href="/" aria-label="WebCraft Consulting — Home">
              <Image
                src="/webcraftLogo.webp"
                alt="WebCraft Consulting"
                width={1122}
                height={1402}
                className="h-24 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground-muted">
              We redefine business consulting with our &ldquo;Amplified&rdquo;
              approach — focused on elevating your business to new heights with
              bold, innovative solutions that go beyond the standard playbook.
            </p>
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
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
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
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href="/services"
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
              <li>
                <a href={SITE.phone.href} className="flex items-center gap-3 transition hover:text-brand">
                  <i className="ri-phone-fill shrink-0 text-brand" aria-hidden="true" />
                  {SITE.phone.label}
                </a>
              </li>
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
          <p>Copyright &copy;2025 Web Craft. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with
            <i className="ri-heart-fill text-brand" aria-hidden="true" />
            for bold businesses.
          </p>
        </div>
      </Container>
    </footer>
  );
}
