/**
 * Detailed content for individual service pages, keyed by the same `slug`
 * used in `SERVICES` (src/lib/site.ts). Sourced from the client-provided
 * capability document; Construction's content was written in-house in the
 * same style since it wasn't part of that document.
 */

export type ServiceSection = {
  heading: string;
  /** Optional lead-in paragraph before the list, used for narrative sections. */
  intro?: string;
  items: string[];
};

/** A tabbed group of equipment/category-specific service lists (Mechanical). */
export type ServiceTab = {
  label: string;
  intro?: string;
  items: string[];
};

export type ServiceDetail = {
  slug: string;
  sections?: ServiceSection[];
  tabs?: ServiceTab[];
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "electrical-maintenance": {
    slug: "electrical-maintenance",
    sections: [
      {
        heading: "Electrical Installation & Maintenance",
        items: [
          "Main Lighting Panel Installation & Commissioning",
          "Power Distribution Panel Installation",
          "Motor Control Center (MCC) Installation & Maintenance",
          "Distribution Board (DB) Installation & Upgrades",
          "DOL, Star-Delta & Soft Starter Installation",
          "Electrical Cable Laying, Glanding & Termination",
          "Cable Tray & Trunking Installation",
          "Replacement of Light Fixtures",
        ],
      },
      {
        heading: "Preventive & Corrective Maintenance",
        items: [
          "Preventive & Corrective Maintenance (PM & CM) of Electrical Equipment",
          "Transformer Inspection, Testing & Maintenance",
          "Switchgear Maintenance",
          "Circuit Breaker Inspection & Servicing",
          "Motor Inspection, Testing & Maintenance",
          "Generator Electrical Maintenance",
          "UPS & Battery Backup System Maintenance",
          "Electrical Troubleshooting & Fault Rectification",
        ],
      },
      {
        heading: "Industrial Electrical Services",
        items: [
          "Industrial Power Distribution Systems",
          "Plant Shutdown & Turnaround Electrical Support",
          "Electrical System Modifications & Upgrades",
          "Preventive Maintenance Programs",
          "Emergency Breakdown Maintenance",
          "Energy-Efficient Lighting Upgrades",
        ],
      },
    ],
  },

  "mechanical-maintenance": {
    slug: "mechanical-maintenance",
    sections: [
      {
        heading: "Static Equipment Maintenance",
        intro:
          "VEMOOSC undertakes a wide range of static equipment maintenance services — heat exchangers, reactors, heaters, boilers, columns, drums, storage tanks, vessels and various types of valves — during plant turnarounds and shutdowns across oil & gas refineries and petrochemical industries. Our focus is efficient operation with minimal downtime and maintenance cost: regular inspection, cleaning and repair to prevent equipment failure, leaks and other in-service issues. Our project team and planners work closely with end-users from the initial stages to achieve the most optimised shutdown schedules, adding real value to production downtime.",
        items: [],
      },
    ],
    tabs: [
      {
        label: "Column",
        items: [
          "Hydro Jetting Cleaning",
          "Vacuuming",
          "Chemical Cleaning",
          "Manual Cleaning",
          "Internals Replacement",
          "Tray Installation / Fitting",
          "Pall / Raschig Rings Washing & Cleaning",
          "Packing Replacement",
          "Strip Lining / Weld Build-Up",
          "Surface Treatment (APPC)",
          "Buffing of Weld Joints",
          "Misc. Fabrication / Repairs",
          "Sand Blasting / Painting",
          "Pneumatic Testing",
          "Bolt Torquing / Tensioning",
          "Hot Bolting / Online Torquing",
        ],
      },
      {
        label: "Furnace",
        items: [
          "Mechanical Cleaning",
          "Furnace Tubes Replacement",
          "Internals Replacement / Repair",
          "Burners Replacement",
          "Tubes Pneumatic Testing",
          "Welding Fabrication",
          "Hotspot Repair / Patch Works",
          "Analyzer Installation (Under OEM)",
          "Bolt Torquing / Tensioning",
        ],
      },
      {
        label: "Tank",
        items: [
          "Specialized Hydro Jetting Cleaning",
          "Chemical Cleaning",
          "Vacuuming",
          "Internal Repairs",
          "Tank Bottom Plate Replacement",
          "Tanks CP System Replacement with Improved Design",
          "Water Fill Test / Hydro Test",
          "Internal / External Piping Replacement",
          "Sand Blasting / Painting",
          "Bolt Torquing / Tensioning",
        ],
      },
      {
        label: "Heat Exchanger",
        items: [
          "Hydro Jetting Cleaning",
          "Bundle Pulling (Up to 80 Tons, Special Configuration)",
          "Chemical Cleaning",
          "On-Site Machining",
          "Flange Facing",
          "Flange Integrity",
          "Tubes Replacement",
          "Individual Tube Testing",
          "Tube Puncturing",
          "Internal Tube Cutting",
          "Pop-A-Plug Installation / Removal",
          "Diaphragm Cutting, Welding & Repair",
          "Ferrule Replacement",
          "Hydro / Pneumatic Testing",
          "Test Rings Fabrication",
          "Tube Sheet Machining — Front & Back",
          "Bolt Torquing / Tensioning & Hot Bolting / Online Torquing",
        ],
      },
      {
        label: "Valves & Pipes",
        items: [
          "Pressure Safety Valves Replacement",
          "Control Valves Replacement",
          "Motor Operated Valves Replacement",
          "Mechanical Valves Replacement",
          "KUBOTA Valves Replacement",
          "Misc. Valves Replacement",
          "In-Situ Machining of Gasket Faces",
          "Flange Serration",
          "Bolt Torquing / Tensioning & Hot Bolting / Online Torquing",
        ],
      },
      {
        label: "Pressure Vessels",
        items: [
          "Fabrication of New Vessel (U-Stamp)",
          "Repair & Maintenance of PVs Including R-Stamp",
          "Nozzles Replacement",
          "Demisters Replacement",
          "Internal Hydro Jetting Cleaning",
          "Vacuuming",
          "Chemical Cleaning",
          "Hydro Test / Pneumatic Testing",
          "Buffing of Weld Joints",
          "Flange Facing",
          "Bolt Torquing / Tensioning & Hot Bolting / Online Torquing",
        ],
      },
      {
        label: "Hydro Jetting",
        intro:
          "Completely enclosed bundle cleaning system, eliminating the need for a cleaning bay or pad — with hydraulically operated cleaning arms that remove operators from the work face.",
        items: [
          "Hydraulically Operated Cold-Cut Jigs & Rigs for Any Situation",
          "Cleaning of Pipe Externals & Internals of All Sizes and Services",
          "Remotely Operated UHP Coatings Removal for Large Vertical & Horizontal Surfaces",
          "Water Capture & Waste Removal to Eliminate Environmental Contamination",
          "HP and UHP Pumps — 150 to 1200hp, Pressures Up to 60,000psi",
          "Multi-Lance Cleaners",
          "Onshore and Offshore Capability",
        ],
      },
      {
        label: "Cold Cutting",
        intro:
          "Used for demolition of plant facilities, providing access to tanks and columns, removing internal and external refractory, concrete cutting and scabbling, and surface preparation through coatings removal. Highly effective on steel, composites and almost any other hard material — and, unlike thermal methods, reduces dust, cutting oils, vibration and waste while preventing mechanical or thermal stress. An ecologically sound, precise solution executed by our expert technicians.",
        items: [],
      },
      {
        label: "Reactors / Vessels",
        items: [
          "Catalyst Replacement for CATOFIN, EO/EG, CCR, HOFCC",
          "Resin Loading / Unloading",
          "Catalyst Skimming / Top-Up",
          "Internals / Mesh Replacement",
          "Distributor Cleaning",
          "Vacuuming / Cleaning",
          "Manual Cleaning",
          "Bolt Torquing / Tensioning & Hot Bolting / Online Torquing",
        ],
      },
      {
        label: "Flare & Chimney",
        items: [
          "Ground Flare Repair & Maintenance",
          "Burner Removal / Repair / Replacement",
          "Stacks Welding / Repair",
          "Removal & Installation of Chimney & Silencer",
          "Piping Replacement",
        ],
      },
    ],
  },

  "chemical-services": {
    slug: "chemical-services",
    sections: [
      {
        heading: "Catalyst Handling",
        items: [
          "Execution Planning",
          "Blind-to-Blind Catalyst Change-Out Services",
          "Catalyst Loading & Unloading Under Inert or Normal Conditions",
          "Wet or Dry Catalyst Removal Options",
          "Dense Loading & Tube Loading Systems",
          "Services in Hazardous, Toxic & Inert Environments",
          "Vessel Internal Modifications & Revamps",
          "Vacuum Unloading with Closed-Loop Nitrogen Re-Circulation",
          "Catalyst Screening & Catalyst Oxidization",
          "Pre-Commissioning of Reactors & Vessels, and Pre-Sulphiding",
          "Mercury Detection, Handling & Sampling",
          "Spent Adsorbent Handling & Waste Processing",
          "Transportation, Storage & Containment (UN-Approved Containers)",
        ],
      },
      {
        heading: "Decontamination & Chemical Cleaning",
        intro:
          "Our in-house specialists provide innovative, safe and cost-effective decontamination, chemical cleaning and metal passivation solutions for oil refining, petrochemical, dairy and potable-water facilities. Chemical cleaning delivers significant HSE and cost benefits over conventional methods — our specialised techniques remove residual oils, corrosion, hard-water deposits and other contaminants from process equipment without damaging equipment surfaces, while keeping overall cleaning costs down.",
        items: [
          "Decontamination Services Enabling Breathing-Apparatus-Free CSE to Vessels",
          "Acid Pickling & Passivation Services (Including Exotic Metals)",
          "Chemical Cleaning Decommissioning Services",
          "Degreasing & Commissioning Services",
          "Hot Alkaline Flushing",
          "Mercury Decontamination Services",
          "Naturally Occurring Radioactive Material (NORM) Decontamination Services",
          "Monitoring Services for Mercury / BTEX / NORM",
          "Online Fin-Fan & Cooler Cleaning",
          "Marine Growth & Bacteria Control and Cleaning",
          "Steam Cleaning Services — Vapour Phase & Boil-Out Technologies",
          "Persistent & Hard Scale Removal",
          "Custom Chemical Formulation Flushing Services",
          "Unique Heat Exchanger Cleaning Methodologies",
          "Coke & Asphaltene Chemical Cleaning Services",
          "Metals Reclamation & Disposal of Materials",
        ],
      },
      {
        heading: "Reactors / Vessels",
        items: [
          "Catalyst Replacement for CATOFIN, EO/EG, CCR, HOFCC",
          "Resin Loading / Unloading",
          "Catalyst Skimming / Top-Up",
          "Internals / Mesh Replacement",
          "Distributor Cleaning",
          "Vacuuming / Cleaning",
          "Manual Cleaning",
          "Flange Facing",
          "Bolt Torquing / Tensioning & Hot Bolting / Online Torquing",
        ],
      },
      {
        heading: "Flare & Chimney",
        items: [
          "Ground Flare Repair & Maintenance",
          "Burner Removal / Repair / Replacement",
          "Stacks Welding / Repair",
          "Removal & Installation of Chimney & Silencer",
          "Piping Replacement",
        ],
      },
    ],
  },

  "civil-works": {
    slug: "civil-works",
    sections: [
      {
        heading: "What We Handle",
        items: [
          "Residential Villa Renovations — Complete structural works and upgrades for modern, functional living spaces",
          "Commercial Building Works & Office Structures — Efficient, scalable solutions for offices, retail spaces and commercial developments",
          "Structural Repair & Strengthening Projects — Reinforcement and restoration to improve safety and extend building lifespan",
          "Interior Civil Modifications & Space Restructuring — Reconfiguring spaces to enhance layout, usability and performance",
        ],
      },
      {
        heading: "What We Provide",
        items: [
          "Block Work & Masonry — Durable masonry work with precise alignment and high-quality finishing",
          "Concrete Works & Slab Casting — Strong foundations and structural elements built for stability and load-bearing performance",
          "Structural Reinforcements — Enhancing existing structures for improved strength and safety",
          "Wall Construction & Partitioning — Functional, well-designed space division solutions",
          "Floor Screeding — Smooth, level surfaces prepared for final flooring applications",
          "Extensions & Renovations — Expanding and upgrading spaces to meet evolving needs",
          "Excavation, Foundation & Underground Waterproofing Works",
          "Civil & Concrete Related Works",
          "Electromechanical Requirements",
          "Landscaping & Hardscaping",
          "Any Additional Requirements as per Project Scope",
        ],
      },
    ],
  },

  construction: {
    slug: "construction",
    sections: [
      {
        heading: "Project Delivery",
        intro:
          "VEMOOSC delivers industrial and commercial construction from initial planning through to handover — coordinating civil, mechanical and electrical scopes under one accountable team so schedule, quality and safety are managed to a single standard throughout.",
        items: [
          "Industrial & Commercial Build Packages",
          "New-Build Structures & Facility Expansions",
          "Multi-Discipline Site Coordination (Civil, Mechanical, Electrical)",
          "Site Mobilisation, Permits & Method Statements",
          "Programme Management & Progress Reporting",
        ],
      },
      {
        heading: "Quality & Handover",
        items: [
          "QA/QC Inspection Throughout Construction",
          "HSE-Led Site Supervision",
          "Materials Testing & Compliance Documentation",
          "Snagging, Commissioning & Final Handover",
          "As-Built Documentation & Close-Out Reports",
        ],
      },
    ],
  },

  "manpower-support": {
    slug: "manpower-support",
    sections: [
      {
        heading: "Workforce Categories",
        intro:
          "Providing skilled manpower solutions for industrial and infrastructure projects across the UAE.",
        items: [
          "Skilled & Semi-Skilled Workforce",
          "Engineers & Supervisors",
          "Mechanical, Electrical & Instrumentation Personnel",
          "Civil Construction Teams",
          "Certified Welders, Pipe Fitters & Fabricators",
          "QA/QC & HSE Personnel",
        ],
      },
      {
        heading: "Deployment",
        items: [
          "Shutdown & Turnaround Support",
          "Project-Based & Long-Term Staffing",
          "Fast Mobilization Across the UAE",
        ],
      },
    ],
  },

  "technical-assessment": {
    slug: "technical-assessment",
    sections: [
      {
        heading: "Energy & Electrical Assessment",
        items: [
          "Energy Audit",
          "Power Consumption Analysis",
          "Carbon Reduction Assessment",
          "Electrical System Health Assessment",
          "Power Distribution System Assessment",
          "Transformer Condition Assessment",
          "Switchgear & MCC Assessment",
          "Motor Performance Assessment",
          "Cable Integrity Assessment",
          "Earthing & Grounding Assessment",
          "Lighting System Assessment",
          "Electrical Load Analysis",
          "Electrical Safety Audit",
        ],
      },
      {
        heading: "Mechanical & Process Assessment",
        items: [
          "Rotating Equipment Assessment",
          "Pump & Compressor Assessment",
          "Piping System Assessment",
          "Valve Condition Assessment",
          "Loop Check Assessment",
          "Field Instrument Assessment",
          "Shutdown System (ESD) Assessment",
          "Instrument Calibration Assessment",
          "Root Cause Failure Analysis (RCFA)",
        ],
      },
      {
        heading: "Structural & HSE Assessment",
        items: [
          "Structural Integrity Assessment",
          "Building Condition Assessment",
          "HSE Compliance Assessment",
          "Hazard Identification",
          "Risk Assessment",
          "Permit-to-Work System Review",
          "Fire Protection System Assessment",
          "Hazardous Area (Ex) Compliance Assessment",
        ],
      },
    ],
  },
};
