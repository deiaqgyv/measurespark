import type { Metadata } from "next";
import Link from "next/link";

import { materialAllowanceDataset } from "@/lib/material-allowance-data";
import { siteConfig, siteIds } from "@/lib/site";

export const metadata: Metadata = {
  title: "Material Yields and Allowances — Concrete Bags, Paint Coverage, Tile Stock",
  description: "Versioned yields and planning allowances for concrete bags, paint coverage, tile extra stock and calculator waste defaults, with sources and downloadable JSON.",
  alternates: { canonical: "/reference/material-allowances" },
};

const kindLabel: Record<string, string> = {
  "manufacturer-yield": "Manufacturer yield",
  "manufacturer-coverage": "Manufacturer coverage",
  "calculator-default": "Calculator default",
  "owner-extra-stock": "Owner extra stock",
};

export default function MaterialAllowancesPage() {
  const pageUrl = `${siteConfig.url}/reference/material-allowances`;
  const dataUrl = `${siteConfig.url}/data/material-allowances.json`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${pageUrl}#dataset`,
    name: materialAllowanceDataset.name,
    description: metadata.description,
    url: pageUrl,
    creator: { "@id": siteIds.organization },
    dateModified: siteConfig.contentUpdatedAt.toISOString(),
    measurementTechnique: materialAllowanceDataset.method,
    distribution: { "@type": "DataDownload", contentUrl: dataUrl, encodingFormat: "application/json" },
  };

  return <main className="shell prose-page reference-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <p>Reference dataset · Version {materialAllowanceDataset.version}</p>
    <h1>Material yields and allowances</h1>
    <p><strong>Direct answer:</strong> An 80 lb bag of QUIKRETE Concrete Mix yields about 0.60 cubic feet mixed. A gallon of SuperPaint Interior Latex is published at 350–400 square feet at 4 mils wet. MeasureSpark’s 10% concrete, tile and flooring figures are calculator defaults, not code minimums, and a 5% campus extra-stock rule is later-repair stock rather than cutting waste.</p>
    <div className="reference-table-wrap"><table className="reference-table"><thead><tr><th>Material</th><th>Kind</th><th>Published value</th><th>Source</th></tr></thead><tbody>{materialAllowanceDataset.rows.map((row) => <tr key={row.id}><td>{row.material}</td><td>{kindLabel[row.kind]}</td><td>{row.value}</td><td><a href={row.sourceUrl} target="_blank" rel="noreferrer">{row.sourceName}</a></td></tr>)}</tbody></table></div>
    <h2>How should these values be used?</h2>
    <p>{materialAllowanceDataset.method} {materialAllowanceDataset.precision}</p>
    <h2>What this table does not claim</h2>
    <p>{materialAllowanceDataset.limitations.join(" ")} {materialAllowanceDataset.assumptions.join(" ")}</p>
    <p>Worked bag example: a 12 × 10 ft slab 4 inches thick is 40 ft³. Dividing 40 × 1.10 by 0.60 and rounding up is 74 bags of the published 80 lb mix, before confirming the actual product yield and site conditions.</p>
    <p><a href={dataUrl}>Download the versioned JSON dataset</a>. Related tools: <Link href="/tools/concrete-calculator">concrete</Link>, <Link href="/tools/paint-calculator">paint</Link>, <Link href="/tools/tile-calculator">tile</Link> and <Link href="/tools/flooring-calculator">flooring</Link>.</p>
  </main>;
}
