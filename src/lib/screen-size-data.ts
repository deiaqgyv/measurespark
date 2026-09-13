export const screenSizeDiagonals = [13.3, 15.6, 21.5, 24, 27, 32, 43, 50, 55, 65, 75, 85, 98] as const;

const aspectWidth = 16;
const aspectHeight = 9;
const aspectDiagonal = Math.hypot(aspectWidth, aspectHeight);

function round(value: number, digits = 2) {
  return Number(value.toFixed(digits));
}

export const screenSizeRows = screenSizeDiagonals.map((diagonalInches) => {
  const widthInches = diagonalInches * aspectWidth / aspectDiagonal;
  const heightInches = diagonalInches * aspectHeight / aspectDiagonal;
  return {
    diagonalInches,
    widthInches: round(widthInches),
    heightInches: round(heightInches),
    widthCentimeters: round(widthInches * 2.54, 1),
    heightCentimeters: round(heightInches * 2.54, 1),
    visibleAreaSquareInches: round(widthInches * heightInches),
  };
});

export const screenSizeDataset = {
  name: "Common 16:9 screen dimensions",
  version: "2026-09-13",
  formula: "width = diagonal × 16 / sqrt(16² + 9²); height = diagonal × 9 / sqrt(16² + 9²)",
  assumptions: ["The visible panel has an exact 16:9 aspect ratio.", "The advertised diagonal is the visible diagonal.", "Bezel, stand, curvature and chassis are excluded."],
  precision: "Inch values are rounded to two decimals; centimeter values to one decimal.",
  rows: screenSizeRows,
};
