import { describe, expect, it } from "vitest";
import { unitConversionDataset, unitConversionRows } from "../unit-conversion-data";

describe("unit conversion dataset", () => {
  it("publishes the exact foot definition", () => {
    expect(unitConversionRows.find((row) => row.symbol === "ft")?.factor).toBe(0.3048);
  });

  it("publishes the exact cubic-yard factor", () => {
    expect(unitConversionRows.find((row) => row.symbol === "yd³")?.factor).toBe(0.764554857984);
  });

  it("distinguishes the US liquid gallon", () => {
    expect(unitConversionDataset.limitations[0]).toContain("not the imperial gallon");
  });
});
