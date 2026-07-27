import type { Metadata } from "next";
import PortfolioPageContent from "@/components/pages/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Maintenance, civil, construction, chemical and manpower scopes VEMOOSC delivers for industrial and commercial clients across the Al Dhafra region.",
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
