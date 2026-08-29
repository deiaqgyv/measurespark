export const MILLIMETERS_PER_INCH = 25.4;

export function pixelsToInches(pixels: number, ppi: number) {
  if (!Number.isFinite(pixels) || !Number.isFinite(ppi) || ppi <= 0) return 0;
  return Math.max(0, pixels) / ppi;
}

export function pixelsToMillimeters(pixels: number, ppi: number) {
  return pixelsToInches(pixels, ppi) * MILLIMETERS_PER_INCH;
}

export function clampMeasurement(pixels: number, width: number) {
  if (!Number.isFinite(pixels) || !Number.isFinite(width) || width <= 0) return 0;
  return Math.min(Math.max(0, pixels), width);
}

export function pointerToRulerPosition(clientPosition: number, rulerStart: number, borderWidth: number, rulerLength: number) {
  return clampMeasurement(clientPosition - rulerStart - borderWidth, rulerLength);
}

export function nudgeMeasurement(currentPixels: number | null, deltaPixels: number, rulerLength: number) {
  const startingPoint = currentPixels ?? 0;
  return clampMeasurement(startingPoint + deltaPixels, rulerLength);
}

export function calibratedPpi(referencePixels: number, referenceMillimeters: number) {
  if (!Number.isFinite(referencePixels) || !Number.isFinite(referenceMillimeters) || referencePixels <= 0 || referenceMillimeters <= 0) return 0;
  return referencePixels / (referenceMillimeters / MILLIMETERS_PER_INCH);
}

function greatestCommonDivisor(left: number, right: number): number {
  return right === 0 ? left : greatestCommonDivisor(right, left % right);
}

export function formatFractionalInches(inches: number, denominator: 8 | 16 | 32) {
  if (!Number.isFinite(inches) || inches <= 0) return "0″";

  const roundedParts = Math.round(inches * denominator);
  const whole = Math.floor(roundedParts / denominator);
  const numerator = roundedParts % denominator;
  if (numerator === 0) return `${whole}″`;

  const divisor = greatestCommonDivisor(numerator, denominator);
  const fraction = `${numerator / divisor}/${denominator / divisor}`;
  return whole > 0 ? `${whole} ${fraction}″` : `${fraction}″`;
}
