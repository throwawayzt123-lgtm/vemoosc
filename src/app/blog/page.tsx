import type { Metadata } from "next";
import BlogPageContent from "@/components/pages/BlogPageContent";

export const metadata: Metadata = {
  title: "News & Blogs",
  description:
    "Insights on printing, SEO, digital marketing and brand development from the WebCraft Consulting team.",
};

export default function BlogPage() {
  return <BlogPageContent />;
}
