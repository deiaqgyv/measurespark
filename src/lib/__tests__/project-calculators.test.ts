import { describe, expect, it } from "vitest";

import { calculateFlooring, calculatePaint, calculateTile } from "../project-calculators";

describe("project purchase calculators", () => {
  it("calculates paint with openings, two coats, and whole-gallon purchase rounding", () => {
    const result = calculatePaint({ length: 14, width: 12, height: 8, doors: 1, windows: 2, coats: 2, coverage: 350, includeCeiling: false, pricePerGallon: 42 });
    expect(result.paintableArea).toBe(365);
    expect(result.exactGallons).toBeCloseTo(2.0857, 4);
    expect(result.gallonsToBuy).toBe(3);
    expect(result.estimatedCost).toBe(126);
  });

  it("adds ceiling area only when requested", () => {
    const result = calculatePaint({ length: 10, width: 10, height: 8, doors: 0, windows: 0, coats: 1, coverage: 400, includeCeiling: true, pricePerGallon: 0 });
    expect(result.paintableArea).toBe(420);
    expect(result.gallonsToBuy).toBe(2);
  });

  it("converts floor area and waste into whole boxes", () => {
    const result = calculateFlooring({ length: 14, width: 12, extraArea: 10, subtractArea: 4, wastePercent: 10, boxCoverage: 22.5, pricePerBox: 48 });
    expect(result.netArea).toBe(174);
    expect(result.purchaseArea).toBeCloseTo(191.4);
    expect(result.boxes).toBe(9);
    expect(result.estimatedCost).toBe(432);
  });

  it("includes grout joints, waste, and box rounding for tile", () => {
    const result = calculateTile({ length: 12, width: 10, tileLength: 12, tileWidth: 12, groutGap: 0.125, wastePercent: 10, tilesPerBox: 12, pricePerBox: 34 });
    expect(result.baseTiles).toBe(118);
    expect(result.tilesToBuy).toBe(130);
    expect(result.boxes).toBe(11);
    expect(result.purchasedTiles).toBe(132);
  });

  it("returns safe zero purchases for missing package coverage", () => {
    expect(calculateFlooring({ length: 10, width: 10, extraArea: 0, subtractArea: 0, wastePercent: 10, boxCoverage: 0, pricePerBox: 20 }).boxes).toBe(0);
    expect(calculateTile({ length: 10, width: 10, tileLength: 0, tileWidth: 12, groutGap: 0, wastePercent: 10, tilesPerBox: 0, pricePerBox: 20 }).boxes).toBe(0);
  });
});
