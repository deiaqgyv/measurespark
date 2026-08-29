import type { Metadata } from "next";

import { siteConfig, siteIds } from "@/lib/site";

export const metadata: Metadata = {
  title: "About MeasureSpark",
  description: "Learn how MeasureSpark builds free, private measurement tools and home project calculators.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const pageUrl = `${siteConfig.url}/about`;
  const structuredData = { "@context": "https://schema.org", "@type": "AboutPage", "@id": `${pageUrl}#webpage`, name: "About MeasureSpark", url: pageUrl, isPartOf: { "@id": siteIds.website }, about: { "@id": siteIds.organization }, dateModified: siteConfig.contentUpdatedAt.toISOString() };
  return <main className="shell prose-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <h1>About MeasureSpark</h1>
    <p>MeasureSpark publishes free measurement tools and home-project calculators for homeowners, renters, students, and makers. Each page is built around a concrete task and gives an immediate result without requiring an account.</p>
    <h2>How calculations are reviewed</h2>
    <p>Each calculator states its formula, units, defaults, and ordering allowance beside the result. We test calculation functions against hand-worked examples and boundary cases, then review guidance against a named standards body, government source, university extension, or established trade organization where one is relevant. A “Last reviewed” date on a guide records the latest content check.</p>
    <h2>What the results can and cannot do</h2>
    <p>Results are planning estimates, not engineering, medical, legal, or building-code advice. Product specifications, site conditions, local requirements, and qualified professional guidance take priority. Safety-critical dimensions should be checked with an appropriate physical measuring tool.</p>
    <h2>Privacy by design</h2>
    <p>Core calculations run locally in the browser. MeasureSpark does not require an account, upload measurements, or maintain a project-history database. The online ruler can store its calibration only in the browser on the device where it was set.</p>
    <h2 id="contact">Corrections and contact</h2>
    <p>If a formula, source, or explanation needs correction, email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> with the page URL, the input values used, the result received, and the result you expected.</p>
    <p>Last reviewed: August 24, 2026.</p>
  </main>;
}
