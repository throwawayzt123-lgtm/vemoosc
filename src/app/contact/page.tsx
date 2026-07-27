import type { Metadata } from "next";
import ContactPageContent from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with VEMOOSC — email info@vemoosc.com. Based at New Ghayathi Industrial T1361, Al Dhafra Region, Abu Dhabi, UAE.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
