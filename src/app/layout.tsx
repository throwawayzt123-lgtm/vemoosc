import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CursorFollower from "@/components/CursorFollower";
import { ThemeProvider, ThemeScript } from "@/components/ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "VEMOOSC | Built on Vision. Driven by Excellence.",
    template: "%s | VEMOOSC",
  },
  description:
    "VEMOOSC — Vision Excellence Maintenance & Operations Oil Services Company — is a UAE-based engineering and industrial solutions provider delivering reliable, safe and innovative services across the energy, infrastructure and industrial sectors.",
  keywords: [
    "oil services UAE",
    "engineering solutions Abu Dhabi",
    "industrial solutions provider",
    "electrical maintenance Abu Dhabi",
    "mechanical maintenance UAE",
    "chemical services",
    "civil works",
    "construction company Abu Dhabi",
    "manpower supply UAE",
    "Al Dhafra",
    "Ghayathi",
  ],
  openGraph: {
    title: "VEMOOSC | Built on Vision. Driven by Excellence.",
    description:
      "A UAE-based engineering and industrial solutions provider delivering reliable, safe and innovative services across the energy, infrastructure and industrial sectors.",
    siteName: "VEMOOSC",
    type: "website",
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: "VEMOOSC | Built on Vision. Driven by Excellence.",
    description:
      "A UAE-based engineering and industrial solutions provider delivering reliable, safe and innovative services across the energy, infrastructure and industrial sectors.",
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
      data-theme="light"
      className={`${spaceGrotesk.variable} h-full antialiased`}
      // The pre-paint script swaps `data-theme` before React hydrates, so the
      // server and client markup differ here by design.
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <SmoothScroll />
          <CursorFollower />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
