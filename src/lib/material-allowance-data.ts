import { siteConfig } from "./site";

export type MaterialAllowanceKind = "manufacturer-yield" | "manufacturer-coverage" | "calculator-default" | "owner-extra-stock";

export type MaterialAllowanceRow = {
  id: string;
  material: string;
  kind: MaterialAllowanceKind;
  value: string;
  applicability: string;
  limitation: string;
  sourceName: string;
  sourceUrl: string;
};

export function bagsForVolume(cubicFeet: number, yieldCubicFeet: number, overagePercent: number): number {
  if (!(yieldCubicFeet > 0) || !(cubicFeet >= 0)) return 0;
  return Math.ceil((cubicFeet * (1 + Math.max(0, overagePercent) / 100)) / yieldCubicFeet);
}

export const materialAllowanceRows: MaterialAllowanceRow[] = [
  {
    id: "quikrete-40lb-yield",
    material: "Packaged concrete mix, 40 lb bag",
    kind: "manufacturer-yield",
    value: "Approximately 0.30 ft³ (8.5 L) mixed",
    applicability: "QUIKRETE Concrete Mix No. 1101 40 lb bags.",
    limitation: "Yield is approximate after mixing with water as directed. Other brands and mixes publish different yields.",
    sourceName: "QUIKRETE Concrete Mix No. 1101 data sheet",
    sourceUrl: "https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf",
  },
  {
    id: "quikrete-60lb-yield",
    material: "Packaged concrete mix, 60 lb bag",
    kind: "manufacturer-yield",
    value: "Approximately 0.45 ft³ (12.7 L) mixed",
    applicability: "QUIKRETE Concrete Mix No. 1101 60 lb bags.",
    limitation: "Confirm the bag size on the pallet. Regional 90 lb bags are listed separately on the same sheet.",
    sourceName: "QUIKRETE Concrete Mix No. 1101 data sheet",
    sourceUrl: "https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf",
  },
  {
    id: "quikrete-80lb-yield",
    material: "Packaged concrete mix, 80 lb bag",
    kind: "manufacturer-yield",
    value: "Approximately 0.60 ft³ (17 L) mixed",
    applicability: "QUIKRETE Concrete Mix No. 1101 80 lb bags.",
    limitation: "This is mixed volume, not a structural specification. Ready-mix orders use supplier increments, not bag yields.",
    sourceName: "QUIKRETE Concrete Mix No. 1101 data sheet",
    sourceUrl: "https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf",
  },
  {
    id: "sherwin-williams-gallon-coverage",
    material: "Interior architectural latex paint",
    kind: "manufacturer-coverage",
    value: "350–400 sq ft per gallon at 4 mils wet",
    applicability: "Sherwin-Williams SuperPaint Interior Latex product data, typical coverage range.",
    limitation: "Texture, porosity, color change, primer and film thickness change coverage. Use the can label for the product being bought.",
    sourceName: "Sherwin-Williams SuperPaint Interior Latex product data",
    sourceUrl: "https://www.sherwin-williams.com/document/PDS/en/035777316627/",
  },
  {
    id: "texas-state-tile-overage",
    material: "Ceramic tile extra stock",
    kind: "owner-extra-stock",
    value: "5% extra stock (2% when the job exceeds 10,000 sq ft)",
    applicability: "Texas State University construction standard 09 30 13, owner extra material for matching later repairs.",
    limitation: "This is maintenance stock after installation, not a cutting-waste factor for a DIY layout. Campus standards are not a national tile code.",
    sourceName: "Texas State University Division 09 ceramic tile standard",
    sourceUrl: "https://docs.gato.txst.edu/141404/09_30_13-Ceramic-Tile.pdf",
  },
  {
    id: "quikrete-long-narrow-10",
    material: "Grout or jointing sand, long narrow layouts",
    kind: "manufacturer-yield",
    value: "Long, narrow sections may require 10% more material",
    applicability: "QUIKRETE online calculator notes for grout joints and paver jointing sand over a square section.",
    limitation: "The note applies to those calculator modes, not to every concrete slab. It is not a compressive-strength or mix-design rule.",
    sourceName: "QUIKRETE concrete calculator",
    sourceUrl: "https://www.quikrete.com/calculator/main.asp",
  },
  {
    id: "measurespark-concrete-10",
    material: "Rectangular slab concrete, calculator default",
    kind: "calculator-default",
    value: "10% ordering allowance on geometric volume",
    applicability: "MeasureSpark concrete calculator default for an ordinary rectangular slab.",
    limitation: "Not a manufacturer requirement or building-code minimum. Uneven bases, thickened edges and footings can need more; well-formed small slabs may need less.",
    sourceName: "MeasureSpark concrete calculator methodology",
    sourceUrl: `${siteConfig.url}/tools/concrete-calculator`,
  },
  {
    id: "measurespark-tile-10",
    material: "Ceramic or porcelain tile, calculator default",
    kind: "calculator-default",
    value: "10% cutting allowance on the tile count",
    applicability: "MeasureSpark tile calculator default for a simple straight layout.",
    limitation: "Diagonal, herringbone, mosaics and large-format centering can need more. Extra stock for later repairs is a separate owner decision.",
    sourceName: "MeasureSpark tile calculator methodology",
    sourceUrl: `${siteConfig.url}/tools/tile-calculator`,
  },
  {
    id: "measurespark-flooring-10",
    material: "Flooring cartons, calculator default",
    kind: "calculator-default",
    value: "10% cutting allowance on net area",
    applicability: "MeasureSpark flooring calculator default for a rectangular room with a straightforward layout.",
    limitation: "Editable in the calculator. Product carton coverage and dye lots come from the label, not this table.",
    sourceName: "MeasureSpark flooring calculator methodology",
    sourceUrl: `${siteConfig.url}/tools/flooring-calculator`,
  },
];

export const materialAllowanceDataset = {
  name: "Home-project material yields and allowances",
  version: "2026-09-16",
  method: "Manufacturer yields and coverage are copied from the linked product data. Calculator defaults are the editable planning allowances used on MeasureSpark tool pages. Owner extra-stock figures are copied from the named construction standard and are not treated as cutting waste.",
  assumptions: [
    "A manufacturer yield is not a universal industry average.",
    "A calculator default is a disclosed starting point, not a code requirement.",
    "Owner extra stock is material held after installation and is separate from offcuts created during layout.",
  ],
  precision: "Bag yields are copied as published approximate mixed volumes. Coverage is a published range, not a single tested average.",
  limitations: [
    "No category-level savings, waste or coverage average is claimed from these rows.",
    "Site conditions, product substitutions and local requirements take priority over calculator defaults.",
  ],
  rows: materialAllowanceRows,
};
