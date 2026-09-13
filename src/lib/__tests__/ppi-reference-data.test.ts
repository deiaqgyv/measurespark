import { describe, expect, it } from "vitest";

import { ppiReferenceDataset, ppiReferenceRows } from "../ppi-reference-data";

describe("PPI reference dataset", () => {
  it("calculates 27-inch 4K density", () => {
    expect(ppiReferenceRows.find((row) => row.label === "27-inch 4K UHD")?.ppi).toBe(163.2);
  });

  it("publishes assumptions and precision", () => {
    expect(ppiReferenceDataset.assumptions).toHaveLength(3);
    expect(ppiReferenceDataset.precision).toContain("one decimal");
  });
});
