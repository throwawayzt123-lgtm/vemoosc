import type { Metadata } from "next";
import TermsPageContent from "@/components/pages/TermsPageContent";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for orders placed with WebCraft Consulting — production, shipping, proofing, payment, and liability terms.",
};

export default function TermsPage() {
  return <TermsPageContent />;
}
