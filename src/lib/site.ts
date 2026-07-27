/**
 * Company-wide data. Update here and it changes everywhere on the site.
 */
export const SITE = {
  name: "VEMOOSC",
  legalName:
    "Vision Excellence Maintenance & Operations Oil Services Company",
  tagline: "Built on Vision. Driven by Excellence.",
  descriptor:
    "UAE-based engineering and industrial solutions provider serving the energy, infrastructure and industrial sectors.",
  // Phone/WhatsApp are not published yet. Leave `null` and the UI will hide
  // those entries; fill them in here and they reappear site-wide.
  phone: null as { label: string; href: string } | null,
  whatsapp: null as { label: string; href: string } | null,
  emails: [{ label: "info@vemoosc.com", href: "mailto:info@vemoosc.com" }],
  address: {
    label:
      "Al Dhafra Region, Ghayathi, New Ghayathi Industrial T1361, Office # 5, Abu Dhabi, UAE",
    short: "New Ghayathi Industrial T1361, Office # 5",
    city: "Abu Dhabi, UAE",
    href: "https://maps.google.com/?q=New+Ghayathi+Industrial+Area+Ghayathi+Al+Dhafra+Abu+Dhabi+UAE",
  },
  // Social profiles. Add entries in this shape to switch more on site-wide.
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/vemoosc/",
      icon: "ri-linkedin-fill",
    },
  ] as ReadonlyArray<{ label: string; href: string; icon: string }>,
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const SERVICES = [
  {
    slug: "electrical-maintenance",
    id: "01",
    title: "Electrical Maintenance",
    tagline: "Power systems kept safe, compliant and running.",
    description:
      "Preventive and corrective electrical maintenance for industrial and commercial facilities — from LV distribution and motor control centres to lighting, cabling and emergency systems.",
    features: [
      "LV/HV panel & switchgear maintenance",
      "Motor control centres & drives",
      "Cable installation, testing & termination",
    ],
    image: "/images/services/Electrical.jpg",
    color: "#0d1b24",
  },
  {
    slug: "mechanical-maintenance",
    id: "02",
    title: "Mechanical Maintenance",
    tagline: "Rotating and static equipment at full uptime.",
    description:
      "Planned shutdown support, breakdown response and routine servicing for pumps, compressors, piping, valves and static equipment across plant and utility systems.",
    features: [
      "Pumps, compressors & rotating equipment",
      "Piping, valves & static equipment",
      "Shutdown, turnaround & breakdown support",
    ],
    image: "/images/services/Mechanical.jpg",
    color: "#111c22",
  },
  {
    slug: "chemical-services",
    id: "03",
    title: "Chemical Services",
    tagline: "Cleaning, treatment and specialist handling.",
    description:
      "Industrial chemical cleaning, descaling and treatment programmes delivered under strict handling, containment and HSE controls.",
    features: [
      "Chemical cleaning & descaling",
      "Water treatment & dosing support",
      "Controlled handling & safe disposal",
    ],
    image: "/images/services/Chemicalservices.jpg",
    color: "#0f1d1a",
  },
  {
    slug: "civil-works",
    id: "04",
    title: "Civil Works",
    tagline: "Groundworks, concrete and structural repair.",
    description:
      "Civil packages covering foundations, concrete works, structural repair, road and surface works, and site preparation for industrial facilities.",
    features: [
      "Foundations, concrete & structural repair",
      "Roads, surfacing & site preparation",
      "Fabrication, fencing & finishing works",
    ],
    image: "/images/services/Civilworks.jpg",
    color: "#141b20",
  },
  {
    slug: "construction",
    id: "05",
    title: "Construction",
    tagline: "Multi-discipline delivery, start to handover.",
    description:
      "End-to-end construction of industrial and commercial works — planned, resourced and executed to programme with coordinated civil, mechanical and electrical scopes.",
    features: [
      "Industrial & commercial build packages",
      "Multi-discipline site coordination",
      "Programme, QA/QC & handover support",
    ],
    image: "/images/services/Construction.jpg",
    color: "#101a22",
  },
  {
    slug: "manpower-support",
    id: "06",
    title: "Manpower Support",
    tagline: "Skilled trades, mobilised when you need them.",
    description:
      "Qualified technicians, tradesmen and support crews supplied on short- or long-term assignment, inducted and ready to work to your site's standards.",
    features: [
      "Skilled trades & technicians",
      "Short- and long-term assignment",
      "Site-inducted, HSE-compliant crews",
    ],
    image: "/images/services/Manpower.jpg",
    color: "#131a1f",
  },
] as const;
