import type { Metadata } from "next";
import ServicesPageContent from "@/components/pages/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Printing, SEO & digital marketing, social media, app development, web design, brand development, software and call center services — all under one roof.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
