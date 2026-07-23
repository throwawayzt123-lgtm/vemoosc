/**
 * Company-wide data. Update here and it changes everywhere on the site.
 */
export const SITE = {
  name: "WebCraft Consulting",
  phone: { label: "(718) 635-4332", href: "tel:+17186354332" },
  whatsapp: { label: "(929) 622-0807", href: "https://wa.me/19296220807" },
  emails: [
    { label: "info@webcraftcons.com", href: "mailto:info@webcraftcons.com" },
    { label: "sales@webcraftcons.com", href: "mailto:sales@webcraftcons.com" },
  ],
  address: {
    label: "35 Merritt Blvd STE 2000, Fishkill, NY 12524 USA",
    href: "https://maps.google.com/?q=35+Merritt+Blvd+STE+2000+Fishkill+NY+12524",
  },
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/webcraftcons", icon: "ri-facebook-fill" },
    { label: "Instagram", href: "https://www.instagram.com/webcraftcons/", icon: "ri-instagram-line" },
    { label: "LinkedIn", href: "#", icon: "ri-linkedin-fill" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "News & Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const SERVICES = [
  {
    slug: "printing",
    id: "01",
    title: "Printing Services",
    tagline: "Premium print, packaging & branded merchandise.",
    description:
      "Premium print production for brochures, banners, business cards, packaging and branded merchandise — brought to life with sharp design and quality materials.",
    features: [
      "Large-format & commercial printing",
      "Branded packaging & merchandise",
      "Design-to-print in-house workflow",
    ],
    image: "/images/services/Printing.jpeg",
    color: "#2a0a10",
  },
  {
    slug: "seo",
    id: "02",
    title: "SEO & Digital Marketing",
    tagline: "Data-driven strategies that grow your reach.",
    description:
      "Technical SEO, content and paid acquisition that put your brand in front of the right audience — and keep it there.",
    features: [
      "Technical & on-page SEO audits",
      "Targeted paid acquisition (Meta/Google)",
      "Performance tracking & ROI reporting",
    ],
    image: "/images/services/Seo.jpeg",
    color: "#1c0a0d",
  },
  {
    slug: "social-media",
    id: "03",
    title: "Social Media Marketing",
    tagline: "Content and campaigns that build real engagement.",
    description:
      "Social growth, community management and creative production that keeps your brand top of mind.",
    features: [
      "Social growth & management",
      "Creative content production",
      "Community engagement & analytics",
    ],
    image: "/images/services/Marketing.jpeg",
    color: "#24090e",
  },
  {
    slug: "app-development",
    id: "04",
    title: "App Development",
    tagline: "Native and cross-platform apps built to scale.",
    description:
      "Apps engineered with modern stacks, clean architecture and a focus on real user experience.",
    features: [
      "iOS, Android & cross-platform apps",
      "API integrations & cloud deployment",
      "Ongoing support & optimisation",
    ],
    image: "/images/services/AppDev.jpeg",
    color: "#170709",
  },
  {
    slug: "web-design",
    id: "05",
    title: "Responsive Web Design",
    tagline: "Fast, modern websites for every device.",
    description:
      "Websites designed to convert visitors and reflect the quality of your brand, on every screen size.",
    features: [
      "Conversion-optimised layouts",
      "Next.js & React development",
      "Accessible, mobile-first design",
    ],
    image: "/images/services/WebDev.jpeg",
    color: "#220a0f",
  },
  {
    slug: "brand-development",
    id: "06",
    title: "Brand Development",
    tagline: "Identity systems that make you unforgettable.",
    description:
      "From logo and voice to a complete visual language that sets you apart from everyone else.",
    features: [
      "Logo & visual identity systems",
      "Brand voice & messaging",
      "Guidelines & asset libraries",
    ],
    image: "/images/services/Branding.jpeg",
    color: "#1d0709",
  },
  {
    slug: "software-development",
    id: "07",
    title: "Software Development",
    tagline: "Custom platforms engineered for performance.",
    description:
      "Custom CRMs, ERPs, client portals and SaaS products built with modern stacks and clean architecture.",
    features: [
      "Custom CRM, ERP & SaaS platforms",
      "API integrations & cloud deployment",
      "Scalable, maintainable codebases",
    ],
    image: "/images/services/AppDev.jpeg",
    color: "#1a0a0d",
  },
  {
    slug: "call-center",
    id: "08",
    title: "Call Center Services",
    tagline: "Inbound and outbound support that converts.",
    description:
      "Professional call solutions built to convert, retain and support your customers around the clock.",
    features: [
      "24/7 inbound customer support",
      "Outbound sales & lead generation",
      "Dedicated agent teams & reporting",
    ],
    image: "/images/services/Marketing.jpeg",
    color: "#210a0e",
  },
] as const;
