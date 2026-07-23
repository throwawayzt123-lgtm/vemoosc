"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../Container";
import PageHeader from "../PageHeader";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "Cutoff Time & Production",
    body: [
      "We reserve the right to use a production/shipping method that may differ from your order, which may result in you receiving your order faster or on the same due date.",
      "10 AM in the destination time zone is the daily cutoff for that business day to count in production. Files must be print-ready.",
    ],
  },
  {
    title: "Cancellations",
    body: [
      "Orders placed, whether verbal or written, cannot be cancelled except upon terms that will compensate WebCraft Consulting for time spent processing the order, labor, and materials through the date of cancellation. The minimum cancellation fee is $20.",
    ],
  },
  {
    title: "Color Matching",
    body: [
      "We do not color match gang-run printing. Colors may shift if you provide Pantone or RGB files. If you need exact color matching, you must order a custom one-up print run or request PMS colors, when applicable. Please request a quote for custom-run pricing.",
      "Most of our clients choose the convenience of lower gang-run prices over the accuracy of PMS or custom-run printing. All orders will be printed as gang-run CMYK unless otherwise specified. PMS inks and select stocks will be used upon custom quote request and charged at current rates. Please read our Design Guide for further instructions on file submissions.",
    ],
  },
  {
    title: "Color Proofing & Proofs",
    body: [
      "Desktop monitors and mobile devices do not accurately reflect the final color output. Please order a printed proof for a more accurate example. Small differences between color proofs and completed jobs are acceptable.",
      "The customer is responsible for proofreading their proofs for any errors. WebCraft Consulting is not responsible for any errors missed by the customer. Proofs are submitted for customer approval only if requested at the time of the order.",
      "Any changes, corrections, or lost production time due to customer delays or indecision will incur additional charges at current rates. Re-proofing requests will incur a fee of $10 per page or more.",
    ],
  },
  {
    title: "Production Schedules",
    body: [
      "Printing time is the time it takes to print a job. Shipping time is additional. The cutoff time is 10 AM in the destination time zone. For production to count on that day, files must be print-ready. Submitting non-print-ready files may delay production.",
      "Neither the customer nor WebCraft Consulting is liable for delays due to weather, acts of God, strikes, riots, accidents, civil disorder, or other causes beyond control.",
    ],
  },
  {
    title: "Delivery / Shipping / Local Pickup",
    body: [
      "WebCraft Consulting is not responsible for packages left at the delivery address (or lockers) by the carrier. We reserve the right to use a production/shipping method that may differ from your order to meet the delivery deadline.",
      "We are not liable for delivery date guarantees, and all contracts are contingent upon circumstances such as war, strikes, fire, floods, or other emergencies. Shipping prices are valid only for the continental United States.",
      "The customer is responsible for providing an accurate USPS/UPS delivery address. Any fees incurred due to incorrect information will be passed on to the customer.",
    ],
  },
  {
    title: "Quotations, Estimates, and Taxes",
    body: [
      "We honor all written quotes for 30 days. Verbal quotes are not accepted. All quotes are subject to review before work begins, and prices may change if materials or labor costs increase.",
      "Local, state, and federal taxes are not included in quotes and may be added to invoices.",
    ],
  },
  {
    title: "Credit and Terms",
    body: [
      "All estimates are contingent upon credit approval. Payment is due in advance for all orders under $1000. For orders over $1000, a 50% deposit is required upfront, with the remainder due upon proof approval.",
      "No creative work or designs will be released for printing elsewhere until full payment is received. Unpaid balances are subject to 3% interest compounded monthly.",
    ],
  },
  {
    title: "Experimental Work",
    body: [
      "Experimental work, including sketches, proofs, or mock-ups, will be charged at current rates and may not be used commercially without the consent of WebCraft Consulting.",
    ],
  },
  {
    title: "Preparatory & Materials",
    body: [
      "Creative writing, sketches, and preparatory work remain the exclusive intellectual property of WebCraft Consulting. Title to materials created or furnished by WebCraft Consulting will remain our property until full payment is made by the customer.",
    ],
  },
  {
    title: "Alterations",
    body: [
      "Alterations beyond the original specifications will incur additional charges at current rates.",
    ],
  },
  {
    title: "Specification Deficiencies",
    body: [
      "Additional costs arising from specification deficiencies by the customer will be charged at current rates.",
    ],
  },
  {
    title: "Customer Responsibility",
    body: [
      "The customer is responsible for proofreading their proofs, specifying layout, design, paper stock, ink colors, and foils. WebCraft Consulting will not be liable for errors if these details are left to our discretion.",
    ],
  },
  {
    title: "Printing Overruns / Underruns",
    body: [
      "We may deliver up to 10% more or less than the ordered quantity. This tolerance will be invoiced. If the customer requires an exact quantity, they must increase their order quantity accordingly.",
    ],
  },
  {
    title: "Overtime Work",
    body: [
      "Overtime due to customer delays in returning approved copy or other materials will be charged at current overtime rates. A new delivery date will not be assumed without explicit rescheduling.",
    ],
  },
  {
    title: "Customer-Furnished Materials",
    body: [
      "Customer-supplied materials will be handled with care, but WebCraft Consulting is not liable for shortages or defects in those materials.",
    ],
  },
  {
    title: "Storage",
    body: [
      "While temporary storage of materials is free, WebCraft Consulting is not liable for the safekeeping or replacement of lost or damaged materials. Charges for storage of finished goods, samples, or other materials may apply.",
    ],
  },
  {
    title: "Claims",
    body: [
      "Claims for any reason must be made in writing within 5 days of receipt of goods. Failure to claim within this period constitutes acceptance of the goods.",
    ],
  },
  {
    title: "Subcontractors",
    body: [
      "Subcontractors may be used but WebCraft Consulting remains liable for the work.",
    ],
  },
  {
    title: "Reprints and Samples",
    body: [
      "WebCraft Consulting may use samples of the customer's work for advertising purposes unless expressly prohibited.",
    ],
  },
  {
    title: "Limitations on Liability",
    body: [
      "Liability is limited to the price of the goods, and WebCraft Consulting is not liable for special or consequential damages.",
    ],
  },
  {
    title: "Right of Refusal",
    body: [
      "WebCraft Consulting reserves the right to refuse reproduction of any materials that infringe on copyright or are deemed inappropriate or offensive.",
    ],
  },
  {
    title: "Indemnification",
    body: [
      "The customer agrees to indemnify WebCraft Consulting from any legal claims, damages, or expenses that arise from the work provided, including but not limited to copyright infringement or defamation.",
    ],
  },
  {
    title: "Copyrighted Material",
    body: [
      "By agreeing to these terms, the customer affirms that they have permission to reproduce any copyrighted material they provide for production.",
    ],
  },
  {
    title: "Changes to These Terms",
    body: [
      "WebCraft Consulting reserves the right to alter these terms at any time and will notify customers via email. It is the customer's responsibility to review these terms before placing an order.",
    ],
  },
];

export default function TermsPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <PageHeader
        eyebrow="Legal"
        title="Terms of"
        accent="Service"
        intro="By ordering from webcraftcons.com, you are agreeing to the following terms of service. Please read them carefully before placing an order."
      />

      <section className="bg-background py-20 md:py-28">
        <Container size="narrow">
          <p className="rv mb-14 text-sm text-foreground-muted">
            Last updated: 2026. These terms apply to all print, design, and
            production orders placed with WebCraft Consulting.
          </p>

          <div className="space-y-14">
            {SECTIONS.map((section, i) => (
              <div key={section.title} className="rv">
                <h2 className="flex items-baseline gap-3 text-xl font-bold uppercase tracking-tight md:text-2xl">
                  <span className="text-sm font-semibold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 border-l-2 border-border pl-6">
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="text-sm leading-relaxed text-foreground-muted md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rv mt-16 rounded-3xl border border-border bg-surface p-8 text-center md:p-10">
            <p className="text-sm text-foreground-muted md:text-base">
              Questions about these terms? Reach out to us at{" "}
              <a href="mailto:info@webcraftcons.com" className="font-semibold text-brand-light hover:underline">
                info@webcraftcons.com
              </a>{" "}
              before placing your order.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
