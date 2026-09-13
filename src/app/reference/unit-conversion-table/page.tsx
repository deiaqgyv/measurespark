import type { Metadata } from "next";

import { siteConfig, siteIds } from "@/lib/site";
import { unitConversionDataset } from "@/lib/unit-conversion-data";

export const metadata: Metadata = {
  title: "Unit Conversion Table — Exact Length, Area and Volume Factors",
  description: "Exact conversion factors for common length, area and volume units, with SI base units, method, limitations and downloadable JSON.",
  alternates: { canonical: "/reference/unit-conversion-table" },
};

export default function UnitConversionTablePage() {
  const pageUrl = `${siteConfig.url}/reference/unit-conversion-table`;
  const dataUrl = `${siteConfig.url}/data/unit-conversions.json`;
  const structuredData = { "@context": "https://schema.org", "@type": "Dataset", "@id": `${pageUrl}#dataset`, name: unitConversionDataset.name, description: metadata.description, url: pageUrl, creator: { "@id": siteIds.organization }, dateModified: siteConfig.contentUpdatedAt.toISOString(), measurementTechnique: unitConversionDataset.method, distribution: { "@type": "DataDownload", contentUrl: dataUrl, encodingFormat: "application/json" } };
  return <main className="shell prose-page reference-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <p>Reference dataset · Version {unitConversionDataset.version}</p>
    <h1>Exact unit conversion table</h1>
    <p><strong>Direct answer:</strong> Multiply a measurement by the listed factor to convert it to the corresponding SI base unit. For example, 10 feet × 0.3048 = 3.048 metres. These factors are definitions; rounding should happen only after the calculation.</p>
    <div className="reference-table-wrap"><table className="reference-table"><thead><tr><th>Category</th><th>Source unit</th><th>SI base unit</th><th>Factor</th><th>Exact definition</th></tr></thead><tbody>{unitConversionDataset.rows.map((row) => <tr key={`${row.category}-${row.symbol}`}><td>{row.category}</td><td>{row.from} ({row.symbol})</td><td>{row.baseUnit} ({row.baseSymbol})</td><td>{row.factor}</td><td>{row.definition}</td></tr>)}</tbody></table></div>
    <h2>How should these factors be used?</h2><p>{unitConversionDataset.method} Area factors are derived by squaring the underlying length conversion and volume factors by cubing it.</p>
    <h2>Important unit distinctions</h2><p>A US liquid gallon is different from an imperial gallon. Confirm the unit system before converting a product label, plan or specification. Keep the full published factor during calculation and round the final result to the precision your project supports.</p>
    <p><a href={dataUrl}>Download the versioned JSON dataset</a>.</p>
  </main>;
}
