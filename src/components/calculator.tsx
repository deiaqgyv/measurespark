"use client";

import { useMemo, useState } from "react";

import { formatResult, getTool, type ToolDefinition } from "@/lib/tools";
import { ProjectCalculator } from "@/components/project-calculator";

export function Calculator({ slug }: { slug: string }) {
  if (slug === "paint-calculator") return <ProjectCalculator kind="paint" />;
  if (slug === "flooring-calculator") return <ProjectCalculator kind="flooring" />;
  if (slug === "tile-calculator") return <ProjectCalculator kind="tile" />;
  const tool = getTool(slug);
  if (!tool) return null;
  return <CalculatorForm tool={tool} />;
}

function CalculatorForm({ tool }: { tool: ToolDefinition }) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(tool.fields.map((field) => [field.key, field.defaultValue])),
  );

  const result = useMemo(() => tool.calculate(values), [tool, values]);
  const mulchBreakdown = tool.slug === "mulch-calculator"
    ? {
        cubicFeet: result * 27,
        twoCubicFootBags: Math.ceil((result * 27) / 2),
      }
    : null;

  return (
    <section className="tool-mat" aria-labelledby="calculator-title">
      <div className="mat-ticks" aria-hidden="true" />
      <h2 id="calculator-title">Enter your measurements</h2>
      <div className="field-stack">
        {tool.fields.map((field) => (
          <label className="field" key={field.key}>
            <span>{field.label}</span>
            <span className="input-wrap">
              <input
                inputMode="decimal"
                min={field.min ?? 0}
                onChange={(event) => setValues((current) => ({ ...current, [field.key]: Number(event.target.value) }))}
                step={field.step ?? 1}
                type="number"
                value={values[field.key]}
              />
              {field.unit && <span>{field.unit}</span>}
            </span>
          </label>
        ))}
      </div>
      <output className="result" aria-live="polite">
        <span>{tool.resultLabel}</span>
        <strong>{formatResult(result, tool.resultUnit)} <small>{tool.resultUnit}</small></strong>
      </output>
      {mulchBreakdown && (
        <dl className="result-breakdown" aria-label="Mulch quantity breakdown">
          <div><dt>Cubic feet</dt><dd>{formatResult(mulchBreakdown.cubicFeet, "ft³")} ft³</dd></div>
          <div><dt>2 cu ft bags</dt><dd>{mulchBreakdown.twoCubicFootBags} bags</dd></div>
        </dl>
      )}
      <p className="formula-note">{tool.formula}</p>
    </section>
  );
}
