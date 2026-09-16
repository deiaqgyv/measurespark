import { describe, expect, it } from "vitest";

import { bagsForVolume, materialAllowanceDataset, materialAllowanceRows } from "../material-allowance-data";

describe("material allowance dataset", () => {
  it("copies the published 80 lb bag yield", () => {
    expect(materialAllowanceRows.find((row) => row.id === "quikrete-80lb-yield")?.value).toContain("0.60 ft³");
  });

  it("keeps manufacturer yields separate from calculator defaults", () => {
    const kinds = new Set(materialAllowanceRows.map((row) => row.kind));
    expect(kinds.has("manufacturer-yield")).toBe(true);
    expect(kinds.has("calculator-default")).toBe(true);
    expect(kinds.has("owner-extra-stock")).toBe(true);
    expect(materialAllowanceDataset.limitations[0]).toContain("No category-level");
  });

  it("converts a 12 by 10 by 4 inch slab to 80 lb bags with the 10% default", () => {
    expect(bagsForVolume(40, 0.6, 10)).toBe(74);
  });
});
