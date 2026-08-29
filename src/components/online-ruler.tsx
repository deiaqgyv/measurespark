"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";

import { calibratedPpi, clampMeasurement, formatFractionalInches, nudgeMeasurement, pixelsToInches, pixelsToMillimeters, pointerToRulerPosition } from "@/lib/ruler";

const CARD_WIDTH_MM = 85.6;
const DEFAULT_CARD_WIDTH = 324;
const MIN_CARD_WIDTH = 180;
const MAX_CARD_WIDTH = 560;
const MAX_MARKS = 480;
const CARD_STORAGE_KEY = "measurespark-card-width";
const DPR_STORAGE_KEY = "measurespark-calibration-dpr";

type RulerUnit = "cm" | "in";
type InchPrecision = 8 | 16 | 32;
type RulerOrientation = "horizontal" | "vertical";
type AccuracyState = "estimated" | "calibrated" | "recalibrate";

export function OnlineRuler() {
  const [cardWidth, setCardWidth] = useState(DEFAULT_CARD_WIDTH);
  const [cardWidthInput, setCardWidthInput] = useState(String(DEFAULT_CARD_WIDTH));
  const [accuracy, setAccuracy] = useState<AccuracyState>("estimated");
  const [unit, setUnit] = useState<RulerUnit>("cm");
  const [inchPrecision, setInchPrecision] = useState<InchPrecision>(16);
  const [orientation, setOrientation] = useState<RulerOrientation>("horizontal");
  const [measurementPixels, setMeasurementPixels] = useState<number | null>(null);
  const [notice, setNotice] = useState("Tap or drag anywhere on the ruler.");
  const [zoomWarning, setZoomWarning] = useState(false);
  const rulerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPointerPosition = useRef<number | null>(null);
  const userSelectedOrientation = useRef(false);

  useEffect(() => {
    const savedWidth = Number(window.localStorage.getItem(CARD_STORAGE_KEY));
    const savedDpr = Number(window.localStorage.getItem(DPR_STORAGE_KEY));
    if (!Number.isFinite(savedWidth) || savedWidth < MIN_CARD_WIDTH || savedWidth > MAX_CARD_WIDTH) return;

    const restore = window.setTimeout(() => {
      setCardWidth(savedWidth);
      setCardWidthInput(String(savedWidth));
      setAccuracy(savedDpr > 0 && Math.abs(savedDpr - window.devicePixelRatio) > 0.05 ? "recalibrate" : "calibrated");
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 680px)");
    const applyPreferredOrientation = () => {
      if (userSelectedOrientation.current) return;
      setOrientation(media.matches ? "vertical" : "horizontal");
      setMeasurementPixels(null);
    };
    const initialize = window.setTimeout(applyPreferredOrientation, 0);
    media.addEventListener("change", applyPreferredOrientation);
    return () => {
      window.clearTimeout(initialize);
      media.removeEventListener("change", applyPreferredOrientation);
    };
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    const checkScale = () => {
      const pinched = viewport ? Math.abs(viewport.scale - 1) > 0.01 : false;
      setZoomWarning(pinched);
      const savedWidth = window.localStorage.getItem(CARD_STORAGE_KEY);
      const savedDpr = Number(window.localStorage.getItem(DPR_STORAGE_KEY));
      if (savedWidth && savedDpr > 0 && Math.abs(savedDpr - window.devicePixelRatio) > 0.05) setAccuracy("recalibrate");
    };
    checkScale();
    viewport?.addEventListener("resize", checkScale);
    window.addEventListener("resize", checkScale);
    return () => {
      viewport?.removeEventListener("resize", checkScale);
      window.removeEventListener("resize", checkScale);
    };
  }, []);

  const ppi = useMemo(() => calibratedPpi(cardWidth, CARD_WIDTH_MM), [cardWidth]);
  const stepInPixels = unit === "cm" ? ppi / 25.4 : ppi / inchPrecision;
  const marks = useMemo(() => Array.from({ length: MAX_MARKS }, (_, index) => index), []);
  const rulerStyle = { "--ruler-step": `${stepInPixels}px` } as CSSProperties;
  const measurementMillimeters = pixelsToMillimeters(measurementPixels ?? 0, ppi);
  const measurementInches = pixelsToInches(measurementPixels ?? 0, ppi);
  const primaryReading = unit === "cm" ? (measurementMillimeters / 10).toFixed(2) : measurementInches.toFixed(2);
  const primaryUnit = unit === "cm" ? "cm" : "in";

  const rulerLength = () => {
    const ruler = rulerRef.current;
    if (!ruler) return 0;
    return orientation === "horizontal" ? ruler.clientWidth : ruler.clientHeight;
  };

  const setMeasuredPosition = (pixels: number) => {
    setMeasurementPixels(clampMeasurement(pixels, rulerLength()));
    setNotice("Measurement updated.");
  };

  const updateMeasurement = (event: ReactPointerEvent<HTMLDivElement>) => {
    const ruler = rulerRef.current;
    if (!ruler) return;

    const bounds = ruler.getBoundingClientRect();
    const clientPosition = orientation === "horizontal" ? event.clientX : event.clientY;
    const start = orientation === "horizontal" ? bounds.left : bounds.top;
    const border = orientation === "horizontal" ? ruler.clientLeft : ruler.clientTop;
    setMeasuredPosition(pointerToRulerPosition(clientPosition, start, border, rulerLength()));
  };

  const startMeasurement = (event: ReactPointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastPointerPosition.current = orientation === "horizontal" ? event.clientX : event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateMeasurement(event);
  };

  const moveMeasurement = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const currentPointerPosition = orientation === "horizontal" ? event.clientX : event.clientY;
    if (lastPointerPosition.current !== null && Math.abs(currentPointerPosition - lastPointerPosition.current) < 0.5) return;
    lastPointerPosition.current = currentPointerPosition;
    updateMeasurement(event);
  };

  const stopMeasurement = (event: ReactPointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    lastPointerPosition.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const nudge = (direction: -1 | 1, multiplier = 1) => {
    setMeasurementPixels((current) => nudgeMeasurement(current, direction * stepInPixels * multiplier, rulerLength()));
    setNotice(`Moved ${direction < 0 ? "back" : "forward"} one ${unit === "cm" ? "millimeter" : `1/${inchPrecision} inch`} step.`);
  };

  const handleRulerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const backward = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
    const forward = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
    if (event.key !== backward && event.key !== forward && event.key !== "Home" && event.key !== "End") return;

    event.preventDefault();
    if (event.key === "Home") return setMeasuredPosition(0);
    if (event.key === "End") return setMeasuredPosition(rulerLength());
    nudge(event.key === backward ? -1 : 1, event.shiftKey ? 10 : 1);
  };

  const changeOrientation = (next: RulerOrientation, automatic = false) => {
    if (!automatic) userSelectedOrientation.current = true;
    setOrientation(next);
    setMeasurementPixels(null);
    setNotice("Measurement cleared after changing ruler direction.");
  };

  const updateCalibration = (nextWidth: number) => {
    const safeWidth = Math.round(clampMeasurement(nextWidth, MAX_CARD_WIDTH));
    const boundedWidth = Math.max(MIN_CARD_WIDTH, safeWidth);
    setCardWidth(boundedWidth);
    setCardWidthInput(String(boundedWidth));
    setAccuracy("calibrated");
    setNotice("Calibration saved on this device.");
    window.localStorage.setItem(CARD_STORAGE_KEY, String(boundedWidth));
    window.localStorage.setItem(DPR_STORAGE_KEY, String(window.devicePixelRatio));
  };

  const resetCalibration = () => {
    setCardWidth(DEFAULT_CARD_WIDTH);
    setCardWidthInput(String(DEFAULT_CARD_WIDTH));
    setAccuracy("estimated");
    setNotice("Calibration reset to the estimate.");
    window.localStorage.removeItem(CARD_STORAGE_KEY);
    window.localStorage.removeItem(DPR_STORAGE_KEY);
  };

  const commitCalibrationInput = () => {
    const parsed = Number(cardWidthInput);
    if (!Number.isFinite(parsed) || cardWidthInput.trim() === "") {
      setCardWidthInput(String(cardWidth));
      return;
    }
    updateCalibration(parsed);
  };

  const accuracyLabel = accuracy === "calibrated" ? "Calibrated" : accuracy === "recalibrate" ? "Recalibrate" : "Estimated";

  return (
    <section className="ruler-workspace" aria-labelledby="ruler-title">
      <div className="ruler-controlbar">
        <div>
          <h2 id="ruler-title">Measure now</h2>
          <p>Place one edge of your object at zero, then tap or drag the marker to the other edge.</p>
        </div>
        <div className="ruler-controls">
          <div className="segmented" aria-label="Ruler direction">
            <button aria-pressed={orientation === "horizontal"} className={orientation === "horizontal" ? "active" : ""} onClick={() => changeOrientation("horizontal")} type="button">Horizontal</button>
            <button aria-pressed={orientation === "vertical"} className={orientation === "vertical" ? "active" : ""} onClick={() => changeOrientation("vertical")} type="button">Vertical</button>
          </div>
          <div className="segmented" aria-label="Ruler unit">
            <button aria-pressed={unit === "cm"} className={unit === "cm" ? "active" : ""} onClick={() => setUnit("cm")} type="button">cm / mm</button>
            <button aria-pressed={unit === "in"} className={unit === "in" ? "active" : ""} onClick={() => setUnit("in")} type="button">inches</button>
          </div>
        </div>
      </div>

      {unit === "in" ? (
        <label className="precision-control">
          <span>Tick precision</span>
          <select onChange={(event) => setInchPrecision(Number(event.target.value) as InchPrecision)} value={inchPrecision}>
            <option value="8">1/8 inch</option>
            <option value="16">1/16 inch</option>
            <option value="32">1/32 inch</option>
          </select>
        </label>
      ) : null}

      {zoomWarning ? <p className="ruler-warning" role="alert">Browser zoom is active. Return to 100% and recalibrate before measuring.</p> : null}

      <div
        aria-label={`${orientation === "horizontal" ? "Horizontal" : "Vertical"} actual-size ruler in ${unit === "cm" ? "centimeters and millimeters" : "inches"}. Tap, drag, or use arrow keys to measure.`}
        aria-orientation={orientation}
        aria-valuemax={10000}
        aria-valuemin={0}
        aria-valuenow={Math.round(measurementPixels ?? 0)}
        aria-valuetext={`${primaryReading} ${primaryUnit}`}
        className={`live-ruler ${orientation}`}
        onKeyDown={handleRulerKeyDown}
        onPointerCancel={stopMeasurement}
        onPointerDown={startMeasurement}
        onPointerMove={moveMeasurement}
        onPointerUp={stopMeasurement}
        ref={rulerRef}
        role="slider"
        style={rulerStyle}
        tabIndex={0}
      >
        <div className="ruler-zero" aria-hidden="true">0</div>
        <div className="ruler-marks" aria-hidden="true">
          {marks.map((index) => {
            const isMajor = unit === "cm" ? index % 10 === 0 : index % inchPrecision === 0;
            const isMiddle = unit === "cm" ? index % 5 === 0 : index % (inchPrecision / 2) === 0;
            const isQuarter = unit === "in" && index % (inchPrecision / 4) === 0;
            const label = unit === "cm" ? index / 10 : index / inchPrecision;
            return (
              <span className={`ruler-mark${isMajor ? " major" : isMiddle ? " middle" : isQuarter ? " quarter" : ""}`} key={index} style={{ "--mark-position": `calc(${index} * var(--ruler-step))` } as CSSProperties}>
                {isMajor && index > 0 ? <b>{label}</b> : null}
              </span>
            );
          })}
        </div>

        <div className="ruler-live-badge" aria-hidden="true">
          <span>{measurementPixels === null ? "Tap or drag to measure" : "Current length"}</span>
          <strong>{primaryReading} <small>{primaryUnit}</small></strong>
        </div>

        {measurementPixels !== null ? (
          <div className="measurement-marker" style={{ "--marker-position": `${measurementPixels}px` } as CSSProperties} aria-hidden="true">
            <i />
            <span>{primaryReading} {primaryUnit}</span>
          </div>
        ) : null}
        <span className="ruler-unit-label" aria-hidden="true">{unit === "cm" ? "CM · MM" : "INCHES"}</span>
      </div>

      <div className="measurement-readout" aria-live="polite">
        <div>
          <span>{measurementPixels === null ? "Ready to measure" : "Measured length"}</span>
          <p>{unit === "cm" ? `${measurementMillimeters.toFixed(1)} mm · ${measurementInches.toFixed(2)} in` : `${formatFractionalInches(measurementInches, inchPrecision)} · ${(measurementMillimeters / 10).toFixed(2)} cm`}</p>
        </div>
        <output><strong>{primaryReading}</strong><small>{primaryUnit}</small></output>
        <div className="measurement-actions" aria-label="Fine measurement controls">
          <button aria-label="Move marker back one tick" onClick={() => nudge(-1)} type="button">−</button>
          <button aria-label="Move marker forward one tick" onClick={() => nudge(1)} type="button">+</button>
          <button className="text-button" disabled={measurementPixels === null} onClick={() => { setMeasurementPixels(null); setNotice("Measurement cleared."); }} type="button">Clear</button>
        </div>
      </div>

      <div className="ruler-statusline">
        <span>Accuracy: <strong>{accuracyLabel}</strong> · {ppi.toFixed(1)} PPI</span>
        <span className="ruler-notice" role="status">{notice}</span>
      </div>

      <details className="calibration-panel">
        <summary><span>Calibrate ruler</span><small>{accuracy === "calibrated" ? "Saved on this device" : accuracy === "recalibrate" ? "Screen scale changed" : "Improve physical accuracy"}</small></summary>
        <div className="calibration-content">
          <div>
            <h3>Match a standard bank card</h3>
            <p>Place a physical card over this outline. Adjust until both long edges line up. Changes save automatically.</p>
          </div>
          <div className="card-guide-wrap"><div className="card-guide" style={{ width: cardWidth }} aria-label={`Bank card guide width ${cardWidth} pixels`}><span>85.60 mm</span></div></div>
          <label className="range-field">
            <span>Card outline width</span>
            <input aria-label="Adjust bank card outline width" max={MAX_CARD_WIDTH} min={MIN_CARD_WIDTH} onChange={(event) => updateCalibration(Number(event.target.value))} type="range" value={cardWidth} />
          </label>
          <div className="calibration-adjuster">
            <button aria-label="Decrease card outline by one pixel" onClick={() => updateCalibration(cardWidth - 1)} type="button">−</button>
            <label><span>Width in pixels</span><input aria-label="Card outline width in pixels" inputMode="numeric" max={MAX_CARD_WIDTH} min={MIN_CARD_WIDTH} onBlur={commitCalibrationInput} onChange={(event) => setCardWidthInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") event.currentTarget.blur(); }} type="number" value={cardWidthInput} /></label>
            <button aria-label="Increase card outline by one pixel" onClick={() => updateCalibration(cardWidth + 1)} type="button">+</button>
          </div>
          <div className="calibration-footer">
            <span>{ppi.toFixed(1)} PPI · {accuracy === "calibrated" ? "saved automatically" : "not yet calibrated"}</span>
            {accuracy !== "estimated" ? <button className="text-button" onClick={resetCalibration} type="button">Reset calibration</button> : null}
          </div>
        </div>
      </details>
    </section>
  );
}
