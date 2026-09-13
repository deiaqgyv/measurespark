import { describe, expect, it } from "vitest";

import { screenSizeDataset, screenSizeRows } from "../screen-size-data";

describe("screen size reference dataset", () => {
  it("calculates a 65-inch 16:9 panel from geometry", () => {
    const row = screenSizeRows.find((item) => item.diagonalInches === 65);
    expect(row).toEqual(expect.objectContaining({ widthInches: 56.65, heightInches: 31.87 }));
  });

  it("keeps assumptions and formula machine readable", () => {
    expect(screenSizeDataset.formula).toContain("sqrt(16² + 9²)");
    expect(screenSizeDataset.assumptions).toHaveLength(3);
  });
});
