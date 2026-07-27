import type { Metadata } from "next";
import AboutPageContent from "@/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Vision Excellence Maintenance & Operations Oil Services Company — a UAE-based engineering and industrial solutions provider building lasting relationships founded on integrity, innovation and dependable performance.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
