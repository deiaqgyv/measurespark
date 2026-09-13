import type { Metadata } from "next";
import Link from "next/link";

import { ppiReferenceDataset } from "@/lib/ppi-reference-data";
import { siteConfig, siteIds } from "@/lib/site";

export const metadata: Metadata = {
  title: "PPI Chart — Pixel Density by Screen Size and Resolution",
  description: "Formula-derived PPI for common Full HD, QHD and 4K displays, with assumptions, calculation method and downloadable JSON.",
  alternates: { canonical: "/reference/ppi-chart" },
};

export default function PpiChartPage() {
  const pageUrl = `${siteConfig.url}/reference/ppi-chart`;
  const dataUrl = `${siteConfig.url}/data/ppi-reference.json`;
  const structuredData = { "@context": "https://schema.org", "@type": "Dataset", "@id": `${pageUrl}#dataset`, name: ppiReferenceDataset.name, description: metadata.description, url: pageUrl, creator: { "@id": siteIds.organization }, dateModified: siteConfig.contentUpdatedAt.toISOString(), measurementTechnique: ppiReferenceDataset.formula, distribution: { "@type": "DataDownload", contentUrl: dataUrl, encodingFormat: "application/json" } };
  return <main className="shell prose-page reference-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <p>Reference dataset · Version {ppiReferenceDataset.version}</p>
    <h1>Screen PPI chart</h1>
    <p><strong>Direct answer:</strong> Pixel density increases when more pixels fit into the same diagonal and decreases when the same resolution is spread across a larger screen. PPI is calculated from the diagonal pixel count divided by the visible diagonal in inches; it is not the same as CSS pixels, operating-system scaling or viewing-distance guidance.</p>
    <div className="reference-table-wrap"><table className="reference-table"><thead><tr><th>Display</th><th>Resolution</th><th>Diagonal</th><th>PPI</th></tr></thead><tbody>{ppiReferenceDataset.rows.map((row) => <tr key={row.label}><td>{row.label}</td><td>{row.widthPixels} × {row.heightPixels}</td><td>{row.diagonalInches} in</td><td>{row.ppi}</td></tr>)}</tbody></table></div>
    <h2>How are the values calculated?</h2><p>{ppiReferenceDataset.formula}. The table assumes the listed resolution is native, the advertised diagonal is visible and pixels are square. {ppiReferenceDataset.precision}</p>
    <h2>Why can a product specification differ?</h2><p>Manufacturers can round diagonal size, list a product family, or report a different usable panel area. Use the exact model specification for purchasing, calibration and installation decisions.</p>
    <p><a href={dataUrl}>Download the JSON dataset</a> or <Link href="/tools/screen-ppi-calculator">calculate another resolution and diagonal</Link>.</p>
  </main>;
}
