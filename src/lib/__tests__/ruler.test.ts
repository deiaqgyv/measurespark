import { describe, expect, it } from "vitest";

import { calibratedPpi, clampMeasurement, formatFractionalInches, nudgeMeasurement, pixelsToInches, pixelsToMillimeters, pointerToRulerPosition } from "../ruler";

describe("online ruler measurements", () => {
  it("converts one inch of pixels to physical units", () => {
    expect(pixelsToInches(96, 96)).toBe(1);
    expect(pixelsToMillimeters(96, 96)).toBe(25.4);
  });

  it("uses the calibrated pixel density", () => {
    const calibratedPpi = 324 / (85.6 / 25.4);
    expect(pixelsToMillimeters(324, calibratedPpi)).toBeCloseTo(85.6, 5);
  });

  it("clamps a pointer position to the ruler", () => {
    expect(clampMeasurement(-12, 600)).toBe(0);
    expect(clampMeasurement(720, 600)).toBe(600);
    expect(clampMeasurement(245, 600)).toBe(245);
  });

  it("rounds and reduces fractional inch readings", () => {
    expect(formatFractionalInches(1.49, 16)).toBe("1 1/2″");
    expect(formatFractionalInches(0.26, 32)).toBe("1/4″");
    expect(formatFractionalInches(2, 8)).toBe("2″");
  });

  it("uses the ruler content edge as the pointer origin", () => {
    expect(pointerToRulerPosition(231, 130, 1, 600)).toBe(100);
    expect(pointerToRulerPosition(100, 130, 1, 600)).toBe(0);
    expect(pointerToRulerPosition(900, 130, 1, 600)).toBe(600);
  });

  it("nudges an empty or existing measurement within the ruler", () => {
    expect(nudgeMeasurement(null, 4, 300)).toBe(4);
    expect(nudgeMeasurement(100, -4, 300)).toBe(96);
    expect(nudgeMeasurement(298, 4, 300)).toBe(300);
  });

  it("calculates calibration density from a known object", () => {
    expect(calibratedPpi(324, 85.6)).toBeCloseTo(96.14, 2);
    expect(calibratedPpi(0, 85.6)).toBe(0);
  });
});
