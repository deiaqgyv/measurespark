type Guide = {
  answer: string;
  workedExample: string;
  assumptions: string[];
  sections: Array<{ heading: string; body: string }>;
  source: { label: string; href: string };
};

const guides: Record<string, Guide> = {
  "paint-calculator": {
    answer: "To estimate paint, calculate the wall area, subtract doors and windows, add the ceiling if needed, multiply by the number of coats, then divide by the coverage printed on the paint can. Round the final amount up to a package size you can buy.",
    workedExample: "A 12 × 10 ft room with 8 ft walls, 40 ft² of openings, two coats, and 350 ft²/gal coverage needs ((44 × 8 − 40) × 2) ÷ 350 = 1.78 gallons, before rounding to purchasable cans.",
    assumptions: ["Dimensions describe a rectangular room.", "Coverage is 350 ft² per gallon unless replaced with the product label value.", "Primer and application loss are not included."],
    sections: [
      { heading: "How many gallons of paint do I need?", body: "Start with the room perimeter: twice the length plus twice the width. Multiply that perimeter by wall height. This calculator subtracts 21 square feet for each door and 15 square feet for each window, then applies the number of coats. The default coverage is 350 square feet per gallon, but the product label should replace that default whenever you know it." },
      { heading: "Should I include the ceiling?", body: "Turn on the ceiling option only when the ceiling will use the same paint estimate. Its area is room length multiplied by room width. If the ceiling uses a different product or color, run a separate estimate so the shopping quantities stay clear." },
      { heading: "Why can the actual amount change?", body: "Bare drywall, porous masonry, textured walls, a major color change, and application losses can all reduce effective coverage. Primer is a separate product and is not included here. Keep the exact-gallon result for comparison, but buy based on available can sizes and the paint maker's instructions." },
    ],
    source: { label: "EPA guidance on estimating paint and reducing leftover paint", href: "https://www.epa.gov/saferchoice/paint-and-coating-products" },
  },
  "flooring-calculator": {
    answer: "To estimate flooring boxes, multiply room length by width, add closets, subtract areas that will not be covered, add a cutting allowance, then divide by the square-foot coverage printed on one box. Always round up to a whole box.",
    workedExample: "A 14 × 12 ft room is 168 ft². With 10% waste, the shopping area is 184.8 ft²; cartons covering 23.5 ft² require 8 whole boxes.",
    assumptions: ["The measured floor is rectangular or has been split into rectangles.", "Waste is set to 10% for a straightforward layout.", "Carton coverage comes from the product label."],
    sections: [
      { heading: "How many boxes of flooring do I need?", body: "Measure each rectangular area and add the square footage. Enter the coverage listed on the carton, not the dimensions of one plank. The calculator adds your chosen waste percentage and rounds the result up because retailers sell full cartons." },
      { heading: "How much extra flooring should I order?", body: "Ten percent is a practical starting point for a straightforward installation in a rectangular room. Diagonal layouts, herringbone, many doorways, irregular walls, and boards with visible defects can need more. The cutting allowance is editable so you can match the installation plan rather than accepting a fixed guess." },
      { heading: "What should I measure separately?", body: "Add closets, bay areas, and connected spaces that use the same material. Subtract fixed islands, cabinets, or other areas only when flooring will definitely not run beneath them. Keep an unopened spare carton when possible because matching the same color batch later can be difficult." },
    ],
    source: { label: "National Wood Flooring Association consumer resources", href: "https://woodfloors.org/" },
  },
  "tile-calculator": {
    answer: "To estimate tile, divide the surface area by the installed area of one tile plus its grout joint, then add an allowance for cuts and breakage. Convert the tile count to whole boxes using the quantity printed on the carton.",
    workedExample: "A 12 × 10 ft surface is 17,280 in². With 12-inch square tiles, the base count is 120; a 10% allowance produces 132 tiles before converting to whole boxes.",
    assumptions: ["The surface is flat and measured as rectangles.", "The entered tile dimensions are nominal face dimensions.", "The default 10% allowance suits a simple straight layout."],
    sections: [
      { heading: "How many tiles do I need?", body: "Measure the full floor or wall in feet, then enter tile dimensions in inches. The calculator treats the tile and grout joint as one installed module. It rounds the base count up, applies the cutting allowance, and finally rounds again to whole boxes." },
      { heading: "Does grout spacing change the tile count?", body: "Yes, although the difference is often small for large tiles. A joint adds to each installed module, so the same surface can use slightly fewer tiles. Enter the planned joint from the tile or setting-material instructions instead of assuming every installation uses the default one-eighth inch gap." },
      { heading: "How much tile waste should I allow?", body: "Ten percent is a useful starting point for a simple straight layout. Diagonal patterns, mosaics, large-format tiles, many corners, and tiles that must be centered on a focal point can create more offcuts. Order all visible tile from the same production lot and keep a few replacements for future repairs." },
    ],
    source: { label: "Tile Council of North America homeowner resources", href: "https://tcnatile.com/resource-center/faq/" },
  },
  "concrete-calculator": {
    answer: "For a rectangular slab, multiply length by width by depth, convert cubic feet to cubic yards, then add the selected ordering allowance. Measure depth in several places if the base is uneven.",
    workedExample: "A 12 × 10 ft slab at 4 inches deep has 40 ft³ of concrete, or 1.48 yd³. The calculator's 10% allowance produces an order estimate of 1.63 yd³.",
    assumptions: ["The slab is rectangular with a uniform finished depth.", "One cubic yard equals 27 cubic feet.", "The default result includes 10% for base variation, spillage, and waste."],
    sections: [
      { heading: "How is slab volume calculated?", body: "Convert depth from inches to feet, multiply it by slab length and width, then divide cubic feet by 27. The displayed quantity includes the ordering allowance; it does not calculate reinforcement, subbase, forms, or structural capacity." },
      { heading: "Where can the estimate be wrong?", body: "An unlevel excavation, thickened edges, footings, ramps, steps, or material left in the chute can increase volume. Measure distinct shapes separately and ask the ready-mix supplier how it handles order increments and short loads." },
      { heading: "What should be confirmed before ordering?", body: "Confirm slab thickness, mix specification, reinforcement, joints, drainage, permits, and site access with the plans or a qualified local professional. A volume result is not a structural design." },
    ],
    source: { label: "National Ready Mixed Concrete Association concrete resources", href: "https://www.nrmca.org/association-resources/" },
  },
  "gravel-calculator": {
    answer: "Estimate gravel by finding compacted volume in cubic yards, multiplying by the supplier's tons-per-yard figure, and adding an allowance. The built-in estimate uses 1.4 tons per cubic yard and 10% extra.",
    workedExample: "A 20 × 4 ft path at 3 inches deep is 20 ft³, or 0.74 yd³. At 1.4 tons/yd³ plus 10%, the estimate is 1.14 tons.",
    assumptions: ["The area is rectangular and the entered depth is the compacted depth.", "Density is 1.4 tons per cubic yard.", "A 10% allowance covers ordinary variation, not major settlement."],
    sections: [
      { heading: "Why does gravel density matter?", body: "Crushed stone, pea gravel, and quarry products do not weigh the same, and moisture changes delivered weight. Replace the general density assumption with the supplier's conversion whenever it is available." },
      { heading: "Should depth be measured before or after compaction?", body: "Plan from the finished compacted depth. Loose material settles under compaction, so the delivery quantity may need a compaction factor supplied by the quarry or contractor." },
      { heading: "How should irregular areas be handled?", body: "Split curves and wider sections into simple rectangles, calculate each, then add them. Keep excavation, geotextile, drainage, and base-course requirements separate from the material quantity." },
    ],
    source: { label: "USGS crushed stone statistics and information", href: "https://www.usgs.gov/centers/national-minerals-information-center/crushed-stone-statistics-and-information" },
  },
  "mulch-calculator": {
    answer: "To calculate how much mulch you need, multiply bed area by mulch depth, convert the volume to cubic yards, and add a small allowance. The calculator also converts the result to cubic feet and 2 cu ft bags.",
    workedExample: "A 20 × 5 ft bed at 3 inches deep is 25 ft³, or 0.93 yd³. With the calculator's 8% allowance, the estimate is 1.00 yd³.",
    assumptions: ["The bed is represented as a rectangle.", "Depth is the final total layer depth.", "The result adds 8% for settling and measurement variation."],
    sections: [
      { heading: "How deep should mulch be?", body: "Depth depends on mulch type, soil, weeds, and what is already present. Extension guidance commonly recommends a moderate layer rather than piling material against plants; measure the current layer and follow local horticultural advice." },
      { heading: "How many bags of mulch do I need?", body: "One cubic yard equals 27 cubic feet. Divide the total cubic feet by the volume printed on one bag and round up. The result panel shows 2 cu ft bags automatically; for another bag size, divide the displayed cubic feet by that package size." },
      { heading: "Where should mulch not be placed?", body: "Keep mulch pulled back from tree trunks, plant crowns, siding, and other moisture-sensitive surfaces. The calculator estimates volume only and cannot evaluate plant health or building clearance." },
    ],
    source: { label: "University of Minnesota Extension guidance on mulching", href: "https://extension.umn.edu/planting-and-growing-guides/mulching-landscape-trees" },
  },
  "online-ruler": {
    answer: "An on-screen ruler is only physically accurate after calibration. Keep browser zoom at 100%, match the card guide to a real bank card, then place the object at zero and move the marker to its far edge.",
    workedExample: "If the 85.60 mm card guide matches a standard payment card and the marker reaches 42.8 mm, the object is approximately half a card-width long.",
    assumptions: ["The reference card is the standard 85.60 mm wide ID-1 format.", "Browser zoom remains at 100% after calibration.", "The browser window stays on the calibrated display."],
    sections: [
      { heading: "Why is calibration necessary?", body: "CSS pixels are a display convention, not a guaranteed physical size. Screen pixel density, operating-system scaling, browser zoom, and external monitors can all change the apparent ruler." },
      { heading: "How does card calibration work?", body: "The tool stores a scale factor after you resize the guide to the width of a standard ID-1 card. That factor converts screen pixels to inches or millimeters for this browser and display setup." },
      { heading: "When should a physical ruler be used?", body: "Use a traceable physical measuring tool for fabrication tolerances, medicine, safety checks, legal dimensions, or any decision where a screen mismatch could cause harm or cost." },
    ],
    source: { label: "ISO/IEC 7810 identification card dimensions", href: "https://www.iso.org/standard/70483.html" },
  },
  "screen-ppi-calculator": {
    answer: "Screen PPI equals the diagonal pixel count divided by the screen diagonal in inches. Use the panel's native pixel resolution and the advertised viewable diagonal.",
    workedExample: "For a 1920 × 1080 display, the diagonal is 2,202.9 pixels. Dividing by a 24-inch diagonal gives about 91.8 PPI.",
    assumptions: ["Horizontal and vertical values are the panel's native resolution.", "The diagonal measurement is the viewable screen size in inches.", "Pixels are square, as on typical modern displays."],
    sections: [
      { heading: "How is diagonal resolution found?", body: "Apply the Pythagorean theorem to horizontal and vertical pixels: square both values, add them, then take the square root. Divide that diagonal pixel count by physical diagonal inches." },
      { heading: "Why can calculated PPI differ from a specification?", body: "Manufacturers may round the nominal diagonal, and a product listing can describe a family of panels. For installation or calibration, prefer the exact model's technical sheet." },
      { heading: "Is PPI the same as CSS pixels?", body: "No. PPI describes physical panel density. CSS pixels are logical units affected by device pixel ratio, operating-system scaling, and browser zoom." },
    ],
    source: { label: "W3C CSS Values definition of reference pixels", href: "https://www.w3.org/TR/css-values-4/#reference-pixel" },
  },
  "pixels-to-inches": {
    answer: "Convert pixels to inches by dividing the pixel length by pixels per inch. A pixel count alone has no single physical size, so use the target display or print density rather than assuming 96 PPI.",
    workedExample: "At 300 PPI, a 2400-pixel image is 2400 ÷ 300 = 8 inches wide. At 96 PPI, the same pixel count would represent 25 inches.",
    assumptions: ["The entered PPI is known and applies in the same direction as the pixel length.", "Pixels are not being resampled during output.", "The result is a physical-size estimate, not a CSS layout size."],
    sections: [
      { heading: "Which PPI should I use?", body: "For a display, calculate or obtain the panel's physical PPI. For print, use the effective image resolution at the final placed size or the production requirement supplied by the printer." },
      { heading: "Why is 96 PPI not universal?", body: "Ninety-six pixels per inch is commonly used in CSS and software conversions, but real screens and print workflows vary. It should be treated as a convention unless the target specifically defines it." },
      { heading: "Does changing PPI add detail?", body: "Changing only a metadata value does not create pixels. Resampling changes pixel dimensions and may affect quality; this calculator only relates existing pixels, density, and physical length." },
    ],
    source: { label: "W3C CSS Values definition of absolute lengths", href: "https://www.w3.org/TR/css-values-4/#absolute-lengths" },
  },
};

export function ProjectGuide({ slug }: { slug: string }) {
  const guide = guides[slug];
  if (!guide) return null;
  return <section className="project-guide" aria-label="Calculator guide">
    <div className="quick-answer"><h2>Quick answer</h2><p>{guide.answer}</p></div>
    <div className="guide-sections">
      <section><h2>Worked example</h2><p>{guide.workedExample}</p></section>
      <section><h2>Assumptions</h2><ul>{guide.assumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}</ul></section>
      {guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
    </div>
    <p className="source-note">Last reviewed August 24, 2026. Source: <a href={guide.source.href} rel="noreferrer" target="_blank">{guide.source.label}</a>. Product instructions take priority over a general estimate.</p>
  </section>;
}
