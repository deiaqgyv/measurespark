import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { GoogleAnalytics } from "@/components/google-analytics";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Project Material & Screen Measurement Calculators | MeasureSpark", template: "%s | MeasureSpark" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { title: siteConfig.name, description: siteConfig.description, url: siteConfig.url, siteName: siteConfig.name, type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "MeasureSpark measurement tools and project calculators" }] },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: ["/opengraph-image"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
