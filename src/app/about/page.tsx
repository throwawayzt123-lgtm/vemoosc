import type { Metadata } from "next";
import AboutPageContent from "@/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "WebCraft Consulting redefines business consulting with an 'Amplified' approach — bold, innovative strategies that help your business thrive, not just adapt.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
