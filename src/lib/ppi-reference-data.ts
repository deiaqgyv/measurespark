const displays = [
  { label: "24-inch Full HD", diagonalInches: 24, widthPixels: 1920, heightPixels: 1080 },
  { label: "27-inch Full HD", diagonalInches: 27, widthPixels: 1920, heightPixels: 1080 },
  { label: "27-inch QHD", diagonalInches: 27, widthPixels: 2560, heightPixels: 1440 },
  { label: "27-inch 4K UHD", diagonalInches: 27, widthPixels: 3840, heightPixels: 2160 },
  { label: "32-inch QHD", diagonalInches: 32, widthPixels: 2560, heightPixels: 1440 },
  { label: "32-inch 4K UHD", diagonalInches: 32, widthPixels: 3840, heightPixels: 2160 },
  { label: "43-inch 4K UHD", diagonalInches: 43, widthPixels: 3840, heightPixels: 2160 },
  { label: "55-inch 4K UHD", diagonalInches: 55, widthPixels: 3840, heightPixels: 2160 },
  { label: "65-inch 4K UHD", diagonalInches: 65, widthPixels: 3840, heightPixels: 2160 },
] as const;

export const ppiReferenceRows = displays.map((display) => ({
  ...display,
  ppi: Number((Math.hypot(display.widthPixels, display.heightPixels) / display.diagonalInches).toFixed(1)),
}));

export const ppiReferenceDataset = {
  name: "Common display pixel density reference",
  version: "2026-09-13",
  formula: "PPI = sqrt(horizontal pixels² + vertical pixels²) / diagonal inches",
  assumptions: ["Resolution is the panel's native pixel grid.", "Advertised diagonal equals visible diagonal.", "Pixels are square."],
  precision: "PPI is rounded to one decimal place.",
  rows: ppiReferenceRows,
};
