export const unitConversionRows = [
  { category: "Length", from: "inch", symbol: "in", baseUnit: "metre", baseSymbol: "m", factor: 0.0254, definition: "1 in = 0.0254 m exactly" },
  { category: "Length", from: "foot", symbol: "ft", baseUnit: "metre", baseSymbol: "m", factor: 0.3048, definition: "1 ft = 0.3048 m exactly" },
  { category: "Length", from: "yard", symbol: "yd", baseUnit: "metre", baseSymbol: "m", factor: 0.9144, definition: "1 yd = 0.9144 m exactly" },
  { category: "Length", from: "mile", symbol: "mi", baseUnit: "metre", baseSymbol: "m", factor: 1609.344, definition: "1 mi = 1609.344 m exactly" },
  { category: "Length", from: "centimetre", symbol: "cm", baseUnit: "metre", baseSymbol: "m", factor: 0.01, definition: "1 cm = 0.01 m exactly" },
  { category: "Area", from: "square foot", symbol: "ft²", baseUnit: "square metre", baseSymbol: "m²", factor: 0.09290304, definition: "1 ft² = 0.09290304 m² exactly" },
  { category: "Area", from: "square yard", symbol: "yd²", baseUnit: "square metre", baseSymbol: "m²", factor: 0.83612736, definition: "1 yd² = 0.83612736 m² exactly" },
  { category: "Area", from: "acre", symbol: "acre", baseUnit: "square metre", baseSymbol: "m²", factor: 4046.8564224, definition: "1 acre = 4046.8564224 m² exactly" },
  { category: "Area", from: "hectare", symbol: "ha", baseUnit: "square metre", baseSymbol: "m²", factor: 10000, definition: "1 ha = 10000 m² exactly" },
  { category: "Volume", from: "cubic foot", symbol: "ft³", baseUnit: "cubic metre", baseSymbol: "m³", factor: 0.028316846592, definition: "1 ft³ = 0.028316846592 m³ exactly" },
  { category: "Volume", from: "cubic yard", symbol: "yd³", baseUnit: "cubic metre", baseSymbol: "m³", factor: 0.764554857984, definition: "1 yd³ = 0.764554857984 m³ exactly" },
  { category: "Volume", from: "US liquid gallon", symbol: "US gal", baseUnit: "cubic metre", baseSymbol: "m³", factor: 0.003785411784, definition: "1 US gal = 0.003785411784 m³ exactly" },
] as const;

export const unitConversionDataset = {
  name: "Common exact unit conversion factors",
  version: "2026-09-13",
  method: "Multiply a value in the source unit by factor to obtain the listed SI base unit.",
  scope: ["length", "area", "volume"],
  limitations: ["US liquid gallon is not the imperial gallon.", "Area and volume factors reflect squared or cubed length definitions.", "Display rounding should not replace the published factor in calculations."],
  rows: unitConversionRows,
};
