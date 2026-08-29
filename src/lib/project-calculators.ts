export type PaintInputs = {
  length: number; width: number; height: number; doors: number; windows: number;
  coats: number; coverage: number; includeCeiling: boolean; pricePerGallon: number;
};

export type FlooringInputs = {
  length: number; width: number; extraArea: number; subtractArea: number;
  wastePercent: number; boxCoverage: number; pricePerBox: number;
};

export type TileInputs = {
  length: number; width: number; tileLength: number; tileWidth: number;
  groutGap: number; wastePercent: number; tilesPerBox: number; pricePerBox: number;
};

const safe = (value: number) => Number.isFinite(value) && value > 0 ? value : 0;

export function calculatePaint(input: PaintInputs) {
  const wallArea = 2 * (safe(input.length) + safe(input.width)) * safe(input.height);
  const openingsArea = safe(input.doors) * 21 + safe(input.windows) * 15;
  const ceilingArea = input.includeCeiling ? safe(input.length) * safe(input.width) : 0;
  const paintableArea = Math.max(0, wallArea - openingsArea + ceilingArea);
  const coatedArea = paintableArea * safe(input.coats);
  const exactGallons = safe(input.coverage) ? coatedArea / safe(input.coverage) : 0;
  const gallonsToBuy = Math.ceil(exactGallons);
  return { wallArea, openingsArea, ceilingArea, paintableArea, coatedArea, exactGallons, gallonsToBuy, estimatedCost: gallonsToBuy * safe(input.pricePerGallon) };
}

export function calculateFlooring(input: FlooringInputs) {
  const roomArea = safe(input.length) * safe(input.width);
  const netArea = Math.max(0, roomArea + safe(input.extraArea) - safe(input.subtractArea));
  const purchaseArea = netArea * (1 + safe(input.wastePercent) / 100);
  const boxes = safe(input.boxCoverage) ? Math.ceil(purchaseArea / safe(input.boxCoverage)) : 0;
  const coveredArea = boxes * safe(input.boxCoverage);
  return { roomArea, netArea, purchaseArea, boxes, coveredArea, estimatedCost: boxes * safe(input.pricePerBox) };
}

export function calculateTile(input: TileInputs) {
  const surfaceArea = safe(input.length) * safe(input.width);
  const moduleLength = safe(input.tileLength) + safe(input.groutGap);
  const moduleWidth = safe(input.tileWidth) + safe(input.groutGap);
  const moduleArea = moduleLength * moduleWidth;
  const baseTiles = moduleArea ? Math.ceil(surfaceArea * 144 / moduleArea) : 0;
  const tilesToBuy = Math.ceil(baseTiles * (1 + safe(input.wastePercent) / 100));
  const boxes = safe(input.tilesPerBox) ? Math.ceil(tilesToBuy / safe(input.tilesPerBox)) : 0;
  return { surfaceArea, baseTiles, tilesToBuy, boxes, purchasedTiles: boxes * safe(input.tilesPerBox), estimatedCost: boxes * safe(input.pricePerBox) };
}
