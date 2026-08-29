"use client";

import { useMemo, useState } from "react";

import { calculateFlooring, calculatePaint, calculateTile } from "@/lib/project-calculators";

type Kind = "paint" | "flooring" | "tile";
type Values = Record<string, number | boolean>;

const configs = {
  paint: {
    title: "Plan your paint purchase",
    defaults: { length: 14, width: 12, height: 8, doors: 1, windows: 2, coats: 2, coverage: 350, includeCeiling: false, pricePerGallon: 42 },
    fields: [
      ["length", "Room length", "ft", 0.1], ["width", "Room width", "ft", 0.1], ["height", "Wall height", "ft", 0.1],
      ["doors", "Doors not painted", "doors", 1], ["windows", "Windows", "windows", 1], ["coats", "Coats", "coats", 1],
      ["coverage", "Paint coverage", "ft²/gal", 10], ["pricePerGallon", "Price per gallon", "$", 1],
    ] as const,
  },
  flooring: {
    title: "Plan your flooring purchase",
    defaults: { length: 14, width: 12, extraArea: 0, subtractArea: 0, wastePercent: 10, boxCoverage: 22.5, pricePerBox: 48 },
    fields: [
      ["length", "Room length", "ft", 0.1], ["width", "Room width", "ft", 0.1], ["extraArea", "Closets or extra areas", "ft²", 1],
      ["subtractArea", "Areas not covered", "ft²", 1], ["wastePercent", "Cutting allowance", "%", 1], ["boxCoverage", "Coverage per box", "ft²", 0.1],
      ["pricePerBox", "Price per box", "$", 1],
    ] as const,
  },
  tile: {
    title: "Plan your tile purchase",
    defaults: { length: 12, width: 10, tileLength: 12, tileWidth: 12, groutGap: 0.125, wastePercent: 10, tilesPerBox: 12, pricePerBox: 34 },
    fields: [
      ["length", "Surface length", "ft", 0.1], ["width", "Surface width", "ft", 0.1], ["tileLength", "Tile length", "in", 0.1],
      ["tileWidth", "Tile width", "in", 0.1], ["groutGap", "Grout joint", "in", 0.0625], ["wastePercent", "Cutting allowance", "%", 1],
      ["tilesPerBox", "Tiles per box", "tiles", 1], ["pricePerBox", "Price per box", "$", 1],
    ] as const,
  },
};

const number = (values: Values, key: string) => Number(values[key]) || 0;
const format = (value: number, digits = 1) => value.toLocaleString("en-US", { maximumFractionDigits: digits });

export function ProjectCalculator({ kind }: { kind: Kind }) {
  const config = configs[kind];
  const [values, setValues] = useState<Values>(config.defaults);
  const result = useMemo(() => {
    if (kind === "paint") return calculatePaint({
      length: number(values, "length"), width: number(values, "width"), height: number(values, "height"), doors: number(values, "doors"),
      windows: number(values, "windows"), coats: number(values, "coats"), coverage: number(values, "coverage"),
      includeCeiling: Boolean(values.includeCeiling), pricePerGallon: number(values, "pricePerGallon"),
    });
    if (kind === "flooring") return calculateFlooring({
      length: number(values, "length"), width: number(values, "width"), extraArea: number(values, "extraArea"), subtractArea: number(values, "subtractArea"),
      wastePercent: number(values, "wastePercent"), boxCoverage: number(values, "boxCoverage"), pricePerBox: number(values, "pricePerBox"),
    });
    return calculateTile({
      length: number(values, "length"), width: number(values, "width"), tileLength: number(values, "tileLength"), tileWidth: number(values, "tileWidth"),
      groutGap: number(values, "groutGap"), wastePercent: number(values, "wastePercent"), tilesPerBox: number(values, "tilesPerBox"), pricePerBox: number(values, "pricePerBox"),
    });
  }, [kind, values]);

  const reset = () => setValues(config.defaults);
  const update = (key: string, value: number | boolean) => setValues((current) => ({ ...current, [key]: value }));

  return (
    <section className="tool-mat project-calculator" aria-labelledby={`${kind}-calculator-title`}>
      <div className="mat-ticks" aria-hidden="true" />
      <div className="calculator-heading">
        <div><h2 id={`${kind}-calculator-title`}>{config.title}</h2><p>Change any measurement. Your estimate updates instantly.</p></div>
        <button className="text-button" type="button" onClick={reset}>Reset values</button>
      </div>
      <div className="field-stack">
        {config.fields.map(([key, label, unit, step]) => (
          <label className="field" key={key}><span>{label}</span><span className="input-wrap">
            {unit === "$" && <span className="prefix">$</span>}
            <input aria-label={label} min="0" inputMode="decimal" step={step} type="number" value={number(values, key)} onChange={(event) => update(key, event.target.valueAsNumber)} />
            {unit !== "$" && <span>{unit}</span>}
          </span></label>
        ))}
      </div>
      {kind === "paint" && <label className="check-field"><input type="checkbox" checked={Boolean(values.includeCeiling)} onChange={(event) => update("includeCeiling", event.target.checked)} /><span>Include the ceiling in this estimate</span></label>}
      <Results kind={kind} result={result} />
      <p className="privacy-note">Calculated in your browser. Measurements are not uploaded or saved.</p>
    </section>
  );
}

function Results({ kind, result }: { kind: Kind; result: ReturnType<typeof calculatePaint> | ReturnType<typeof calculateFlooring> | ReturnType<typeof calculateTile> }) {
  if (kind === "paint" && "gallonsToBuy" in result) return <div className="purchase-result" aria-live="polite">
    <div className="purchase-primary"><span>Buy this much paint</span><strong>{result.gallonsToBuy} <small>gal</small></strong><p>{format(result.exactGallons, 2)} gallons calculated before rounding</p></div>
    <dl><div><dt>Paintable area</dt><dd>{format(result.paintableArea)} ft²</dd></div><div><dt>Area with coats</dt><dd>{format(result.coatedArea)} ft²</dd></div><div><dt>Estimated paint cost</dt><dd>${format(result.estimatedCost, 0)}</dd></div></dl>
  </div>;
  if (kind === "flooring" && "boxes" in result && "coveredArea" in result) return <div className="purchase-result" aria-live="polite">
    <div className="purchase-primary"><span>Buy this many boxes</span><strong>{result.boxes} <small>boxes</small></strong><p>Covers {format(result.coveredArea)} ft² after full-box rounding</p></div>
    <dl><div><dt>Measured floor</dt><dd>{format(result.netArea)} ft²</dd></div><div><dt>With allowance</dt><dd>{format(result.purchaseArea)} ft²</dd></div><div><dt>Estimated material cost</dt><dd>${format(result.estimatedCost, 0)}</dd></div></dl>
  </div>;
  if ("tilesToBuy" in result) return <div className="purchase-result" aria-live="polite">
    <div className="purchase-primary"><span>Buy this many boxes</span><strong>{result.boxes} <small>boxes</small></strong><p>{result.tilesToBuy} tiles needed, {result.purchasedTiles} tiles purchased</p></div>
    <dl><div><dt>Surface area</dt><dd>{format(result.surfaceArea)} ft²</dd></div><div><dt>Tiles before waste</dt><dd>{result.baseTiles}</dd></div><div><dt>Estimated material cost</dt><dd>${format(result.estimatedCost, 0)}</dd></div></dl>
  </div>;
  return null;
}
