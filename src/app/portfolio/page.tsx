import type { Metadata } from "next";
import PortfolioPageContent from "@/components/pages/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "See our printed menus, brand and digital work, and the social media accounts we manage for our clients.",
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
