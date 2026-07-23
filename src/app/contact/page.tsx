import type { Metadata } from "next";
import ContactPageContent from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with WebCraft Consulting — call (718) 635-4332, message us on WhatsApp, or email info@webcraftcons.com. Based in Fishkill, New York.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
