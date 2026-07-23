import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CursorFollower from "@/components/CursorFollower";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "WebCraft Consulting | Business Consulting, Amplified",
    template: "%s | WebCraft Consulting",
  },
  description:
    "WebCraft Consulting empowers businesses with cutting-edge solutions and exceptional services tailored to their unique needs — printing, SEO, social media, apps, web design and brand development.",
  keywords: [
    "business consulting",
    "printing services",
    "SEO",
    "digital marketing",
    "web design",
    "app development",
    "brand development",
  ],
  openGraph: {
    title: "WebCraft Consulting | Business Consulting, Amplified",
    description:
      "We empower businesses with cutting-edge solutions and exceptional services tailored to their unique needs.",
    siteName: "WebCraft Consulting",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebCraft Consulting | Business Consulting, Amplified",
    description:
      "We empower businesses with cutting-edge solutions and exceptional services tailored to their unique needs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll />
        <CursorFollower />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
