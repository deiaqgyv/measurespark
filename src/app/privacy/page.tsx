import type { Metadata } from "next";

import { siteConfig, siteIds } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read how MeasureSpark handles browser-based calculations, site data, and privacy.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const pageUrl = `${siteConfig.url}/privacy`;
  const structuredData = { "@context": "https://schema.org", "@type": "WebPage", "@id": `${pageUrl}#webpage`, name: "MeasureSpark Privacy Policy", url: pageUrl, isPartOf: { "@id": siteIds.website }, dateModified: siteConfig.contentUpdatedAt.toISOString() };
  return <main className="shell prose-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <h1>Privacy</h1>
    <p>MeasureSpark is designed so ordinary calculator inputs stay on your device. No account is required, and the site does not send project dimensions to an application database to calculate a result.</p>
    <h2>Calculator inputs</h2><p>Calculations are performed in your browser. Values typed into a calculator update the result on the page and are not attached to a user profile or saved as project history by MeasureSpark.</p>
    <h2>Local preferences</h2><p>The online ruler can save a calibration factor in your browser&apos;s local storage. You can remove it by clearing site data. Other devices and browsers do not receive that calibration.</p>
    <h2>Hosting and technical requests</h2><p>Like most websites, the hosting infrastructure receives technical request data needed to deliver and protect the site, such as the requested URL, time, browser information, and network address. MeasureSpark does not use those records as a measurement-history service.</p>
    <h2>Analytics, advertising, and cookies</h2><p>MeasureSpark currently does not include account tracking, an advertising script, or a third-party analytics component in the site application. If one is introduced, this policy will identify the provider, purpose, choices, and relevant retention details.</p>
    <h2>Questions and corrections</h2><p>For privacy questions, email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Do not include sensitive information that is not needed to explain the question.</p>
    <p>Last updated: August 24, 2026.</p>
  </main>;
}
