import type { Metadata } from "next";
import ServicesPageContent from "@/components/pages/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive solutions designed to enhance operational efficiency and improve reliability — electrical and mechanical maintenance, chemical services, civil works, construction and skilled manpower support.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
