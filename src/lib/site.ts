/**
 * Company-wide data. Update here and it changes everywhere on the site.
 */
export const SITE = {
  name: "VEMOOSC",
  legalName:
    "Vision Excellence Maintenance & Operations Oil Services Company",
  tagline: "Built on Vision. Driven by Excellence.",
  descriptor:
    "VEMOOSC – Vision Excellence Maintenance & Operations Oil Services Company is a UAE-based engineering and industrial solutions provider delivering reliable, safe, and innovative services across the energy, infrastructure, and industrial sectors. Backed by over five years of proven EPC experience through our Canadian operations, we combine international expertise with local execution to deliver high-quality engineering, procurement, construction, and maintenance solutions with a commitment to safety, quality, and excellence.",
  // An empty list hides the phone entries site-wide; add more in the same
  // shape and they appear everywhere phone numbers are listed.
  phones: [
    { label: "+971 50 259 3318", href: "tel:+971502593318" },
    { label: "+971 56 905 8170", href: "tel:+971569058170" },
  ] as ReadonlyArray<{ label: string; href: string }>,
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
    icon: "ri-flashlight-line",
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
    icon: "ri-settings-3-line",
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
    icon: "ri-flask-line",
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
    icon: "ri-hammer-line",
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
    icon: "ri-building-3-line",
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
    icon: "ri-team-line",
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
  {
    slug: "technical-assessment",
    id: "07",
    icon: "ri-search-eye-line",
    title: "Technical Assessment",
    tagline: "Independent audits that find issues before they cost you.",
    description:
      "Energy, electrical, mechanical, structural and HSE assessments that give you an accurate, independent picture of asset condition and compliance — before failure, audit or shutdown forces the issue.",
    features: [
      "Energy & electrical system audits",
      "Rotating equipment & process assessment",
      "Structural integrity & HSE compliance review",
    ],
    image: "/images/services/Mechanical.jpg",
    color: "#151d24",
  },
] as const;
