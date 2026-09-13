import type { Metadata } from "next";
import Link from "next/link";

import { screenSizeDataset } from "@/lib/screen-size-data";
import { siteConfig, siteIds } from "@/lib/site";

export const metadata: Metadata = {
  title: "16:9 Screen Size Chart — Width and Height by Diagonal",
  description: "Formula-derived width, height and visible area for common 16:9 TV and monitor sizes, with inches, centimeters and downloadable JSON.",
  alternates: { canonical: "/reference/screen-size-chart" },
};

export default function ScreenSizeChartPage() {
  const pageUrl = `${siteConfig.url}/reference/screen-size-chart`;
  const dataUrl = `${siteConfig.url}/data/screen-size-chart.json`;
  const structuredData = { "@context": "https://schema.org", "@type": "Dataset", "@id": `${pageUrl}#dataset`, name: screenSizeDataset.name, description: metadata.description, url: pageUrl, creator: { "@id": siteIds.organization }, dateModified: siteConfig.contentUpdatedAt.toISOString(), measurementTechnique: screenSizeDataset.formula, distribution: { "@type": "DataDownload", contentUrl: dataUrl, encodingFormat: "application/json" } };
  return <main className="shell prose-page reference-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <p>Reference dataset · Version {screenSizeDataset.version}</p>
    <h1>16:9 screen size chart</h1>
    <p><strong>Direct answer:</strong> A 16:9 screen&apos;s width equals its diagonal multiplied by 16 and divided by √337; height uses the same formula with 9. The figures below describe the visible rectangular panel only. They exclude bezels, stands, curved-panel geometry and manufacturer rounding.</p>
    <div className="reference-table-wrap"><table className="reference-table"><thead><tr><th>Diagonal (in)</th><th>Width (in)</th><th>Height (in)</th><th>Width (cm)</th><th>Height (cm)</th><th>Area (in²)</th></tr></thead><tbody>{screenSizeDataset.rows.map((row) => <tr key={row.diagonalInches}><td>{row.diagonalInches}</td><td>{row.widthInches}</td><td>{row.heightInches}</td><td>{row.widthCentimeters}</td><td>{row.heightCentimeters}</td><td>{row.visibleAreaSquareInches}</td></tr>)}</tbody></table></div>
    <h2>How was this chart calculated?</h2><p>{screenSizeDataset.formula}. Values are calculated from aspect-ratio geometry, not copied from manufacturer specifications. {screenSizeDataset.precision}</p>
    <h2>What should you verify before buying?</h2><p>Use the exact model&apos;s specification for chassis width, stand footprint, wall-mount pattern and usable viewing area. Two products with the same advertised diagonal can have different external dimensions.</p>
    <p><a href={dataUrl}>Download the JSON dataset</a> or <Link href="/tools/screen-size-calculator">calculate another diagonal or aspect ratio</Link>.</p>
    <p>Last reviewed: September 13, 2026.</p>
  </main>;
}
