export type ToolCategory = "Screen & ruler" | "Home projects" | "Conversions";

export type ToolCategoryDefinition = {
  name: ToolCategory;
  slug: string;
  title: string;
  description: string;
  intro: string;
};

export type ToolField = {
  key: string;
  label: string;
  unit: string;
  defaultValue: number;
  min?: number;
  step?: number;
};

export type ToolDefinition = {
  slug: string;
  name: string;
  seoTitle: string;
  shortName: string;
  category: ToolCategory;
  description: string;
  intro: string;
  fields: ToolField[];
  resultLabel: string;
  resultUnit: string;
  calculate: (values: Record<string, number>) => number;
  formula: string;
  tips: string[];
  searchQuestions?: Array<{ question: string; answer: string }>;
  related: string[];
  featured?: boolean;
};

const positive = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);

const rectangleArea = (values: Record<string, number>) =>
  positive(values.length) * positive(values.width);

export const tools: ToolDefinition[] = [
  {
    slug: "online-ruler",
    name: "Actual Size Online Ruler",
    seoTitle: "Actual Size Online Ruler in Inches, CM & MM",
    shortName: "Online ruler",
    category: "Screen & ruler",
    description: "Calibrate your screen and use a real-size ruler in inches, centimeters, and millimeters.",
    intro: "Place an object at zero, then tap or drag the marker to read its length. Calibrate only when you need better physical accuracy.",
    fields: [],
    resultLabel: "Calibration",
    resultUnit: "pixels per inch",
    calculate: () => 96,
    formula: "A bank card is 85.60 mm wide. The matched pixel width determines your screen scale.",
    tips: ["Keep browser zoom at 100%.", "Recalibrate after moving the window to another display.", "Use a physical ruler for safety-critical measurements."],
    related: ["screen-ppi-calculator", "pixels-to-inches", "screen-size-calculator"],
    featured: true,
  },
  {
    slug: "screen-ppi-calculator",
    name: "Screen PPI Calculator",
    seoTitle: "Monitor PPI Calculator from Resolution & Size",
    shortName: "Screen PPI",
    category: "Screen & ruler",
    description: "Calculate screen pixel density from resolution and diagonal size.",
    intro: "Enter the horizontal and vertical resolution shown in your display settings, plus the advertised diagonal size.",
    fields: [
      { key: "horizontal", label: "Horizontal resolution", unit: "px", defaultValue: 1920, min: 1 },
      { key: "vertical", label: "Vertical resolution", unit: "px", defaultValue: 1080, min: 1 },
      { key: "diagonal", label: "Screen diagonal", unit: "in", defaultValue: 24, min: 1, step: 0.1 },
    ],
    resultLabel: "Pixel density",
    resultUnit: "PPI",
    calculate: ({ horizontal, vertical, diagonal }) => positive(diagonal) ? Math.hypot(positive(horizontal), positive(vertical)) / positive(diagonal) : 0,
    formula: "PPI = diagonal pixel count divided by diagonal size in inches.",
    tips: ["Use the panel resolution, not a scaled desktop resolution.", "Manufacturer diagonal sizes are rounded."],
    related: ["online-ruler", "pixels-to-inches", "screen-size-calculator"],
  },
  {
    slug: "pixels-to-inches",
    name: "Pixels to Inches Calculator",
    seoTitle: "Convert Pixels to Inches — Calculator with Custom PPI",
    shortName: "Pixels to inches",
    category: "Conversions",
    description: "Convert pixels to physical inches with a custom PPI or DPI value, including screen and print-size examples.",
    intro: "Pixel dimensions become a physical length only when the display or print density is known.",
    fields: [
      { key: "pixels", label: "Length", unit: "px", defaultValue: 1920, min: 0 },
      { key: "ppi", label: "Pixel density", unit: "PPI", defaultValue: 96, min: 1, step: 0.1 },
    ],
    resultLabel: "Physical length",
    resultUnit: "in",
    calculate: ({ pixels, ppi }) => positive(ppi) ? positive(pixels) / positive(ppi) : 0,
    formula: "Inches = pixels divided by pixels per inch.",
    tips: ["96 PPI is a CSS convention, not every screen's physical density.", "For printing, use the printer or document PPI."],
    searchQuestions: [
      { question: "How do I convert pixels to inches at 300 DPI?", answer: "Enter the pixel length and set PPI to 300. Divide pixels by 300; for example, 2400 pixels prints at 8 inches." },
      { question: "Why do pixel-to-inch results change with PPI?", answer: "Pixels have no fixed physical size. A higher PPI packs the same pixels into fewer inches, while a lower PPI produces a larger physical result." },
    ],
    related: ["screen-ppi-calculator", "online-ruler", "screen-size-calculator"],
  },
  {
    slug: "screen-size-calculator",
    name: "Screen Size Calculator",
    seoTitle: "Screen Size Calculator — Width by Diagonal & Aspect Ratio",
    shortName: "Screen dimensions",
    category: "Screen & ruler",
    description: "Find screen width from diagonal size and aspect ratio.",
    intro: "Use this to estimate whether a TV or monitor fits a wall, desk, cabinet, or bag.",
    fields: [
      { key: "diagonal", label: "Screen diagonal", unit: "in", defaultValue: 55, min: 1, step: 0.1 },
      { key: "ratioWidth", label: "Aspect ratio width", unit: "", defaultValue: 16, min: 1 },
      { key: "ratioHeight", label: "Aspect ratio height", unit: "", defaultValue: 9, min: 1 },
    ],
    resultLabel: "Screen width",
    resultUnit: "in",
    calculate: ({ diagonal, ratioWidth, ratioHeight }) => {
      const divisor = Math.hypot(positive(ratioWidth), positive(ratioHeight));
      return divisor ? positive(diagonal) * positive(ratioWidth) / divisor : 0;
    },
    formula: "Width = diagonal × aspect width divided by the aspect-ratio diagonal.",
    tips: ["This calculates the visible screen, not the outer frame.", "Check the manufacturer's full product dimensions before installation."],
    searchQuestions: [
      { question: "Can I calculate TV width from diagonal screen size?", answer: "Yes. Enter the advertised diagonal and aspect ratio to calculate the visible screen width. The bezel and stand are not included." },
      { question: "Is screen size the same as viewing distance?", answer: "No. This tool calculates physical screen dimensions. Comfortable TV or monitor viewing distance also depends on resolution, eyesight, room layout, and personal preference." },
    ],
    related: ["screen-ppi-calculator", "online-ruler", "pixels-to-inches"],
  },
  {
    slug: "concrete-calculator",
    name: "Concrete Calculator",
    seoTitle: "Concrete Slab Cubic Yards Calculator + Waste",
    shortName: "Concrete",
    category: "Home projects",
    description: "Estimate cubic yards of concrete for a rectangular slab.",
    intro: "Enter the finished slab dimensions. The result includes a 10% allowance for uneven ground and waste.",
    fields: [
      { key: "length", label: "Slab length", unit: "ft", defaultValue: 12, min: 0, step: 0.1 },
      { key: "width", label: "Slab width", unit: "ft", defaultValue: 10, min: 0, step: 0.1 },
      { key: "depth", label: "Slab depth", unit: "in", defaultValue: 4, min: 0, step: 0.25 },
    ],
    resultLabel: "Concrete to order",
    resultUnit: "yd³",
    calculate: ({ length, width, depth }) => positive(length) * positive(width) * (positive(depth) / 12) / 27 * 1.1,
    formula: "Length × width × depth, converted to cubic yards, plus 10% allowance.",
    tips: ["Confirm the required slab thickness for your project.", "Suppliers may set a minimum delivery quantity."],
    searchQuestions: [
      { question: "How much concrete do I need for a slab?", answer: "Enter slab length and width in feet and depth in inches. The result converts the volume to cubic yards and includes a 10% allowance." },
      { question: "Does this concrete calculator estimate cost or weight?", answer: "It estimates order volume. Multiply the cubic-yard result by your supplier's current price or material-specific weight because local mixes and delivery charges vary." },
    ],
    related: ["gravel-calculator", "decking-calculator", "area-calculator"],
    featured: true,
  },
  {
    slug: "gravel-calculator",
    name: "Gravel Calculator",
    seoTitle: "Gravel Driveway Tons Calculator by Depth",
    shortName: "Gravel",
    category: "Home projects",
    description: "Estimate tons of gravel for a driveway, path, or base layer.",
    intro: "This estimate uses a typical compacted gravel density of 1.4 tons per cubic yard.",
    fields: [
      { key: "length", label: "Area length", unit: "ft", defaultValue: 20, min: 0, step: 0.1 },
      { key: "width", label: "Area width", unit: "ft", defaultValue: 4, min: 0, step: 0.1 },
      { key: "depth", label: "Layer depth", unit: "in", defaultValue: 3, min: 0, step: 0.25 },
    ],
    resultLabel: "Estimated gravel",
    resultUnit: "tons",
    calculate: ({ length, width, depth }) => positive(length) * positive(width) * (positive(depth) / 12) / 27 * 1.4 * 1.1,
    formula: "Volume in cubic yards × 1.4 tons, plus 10% allowance.",
    tips: ["Stone density varies by material and moisture.", "Ask the supplier for its material-specific weight."],
    related: ["concrete-calculator", "mulch-calculator", "area-calculator"],
  },
  {
    slug: "mulch-calculator",
    name: "Mulch Calculator",
    seoTitle: "Mulch Calculator — Cubic Yards and 2 cu ft Bags",
    shortName: "Mulch",
    category: "Home projects",
    description: "Calculate how much mulch you need in cubic yards, cubic feet, and 2 cu ft bags for a rectangular garden bed.",
    intro: "Measure the bed at its widest points and choose the finished depth to estimate bulk yards and bag count.",
    fields: [
      { key: "length", label: "Bed length", unit: "ft", defaultValue: 20, min: 0, step: 0.1 },
      { key: "width", label: "Bed width", unit: "ft", defaultValue: 5, min: 0, step: 0.1 },
      { key: "depth", label: "Mulch depth", unit: "in", defaultValue: 3, min: 0, step: 0.25 },
    ],
    resultLabel: "Mulch needed",
    resultUnit: "yd³",
    calculate: ({ length, width, depth }) => positive(length) * positive(width) * (positive(depth) / 12) / 27 * 1.08,
    formula: "Bed volume converted to cubic yards, plus 8% allowance.",
    tips: ["Two to three inches is common for established beds.", "Keep mulch away from trunks and building siding."],
    searchQuestions: [
      { question: "How much mulch do I need by square feet?", answer: "Multiply bed length by width for square feet, then apply the selected depth. This calculator converts that volume into cubic yards." },
      { question: "How many 2 cu ft bags of mulch do I need?", answer: "The detailed result converts the same bed volume into 2 cubic-foot bags and rounds up so you can buy whole bags." },
    ],
    related: ["gravel-calculator", "area-calculator", "fence-calculator"],
  },
  {
    slug: "tile-calculator",
    name: "Tile Calculator",
    seoTitle: "Tile Box Calculator with Grout & Waste",
    shortName: "Tile",
    category: "Home projects",
    description: "Calculate tiles and boxes for a floor or wall, including grout spacing, cutting waste, and cost.",
    intro: "Enter the surface, tile, grout joint, and package details to get a whole-box shopping estimate.",
    fields: [
      { key: "length", label: "Surface length", unit: "ft", defaultValue: 12, min: 0, step: 0.1 },
      { key: "width", label: "Surface width", unit: "ft", defaultValue: 10, min: 0, step: 0.1 },
      { key: "tileLength", label: "Tile length", unit: "in", defaultValue: 12, min: 0.1, step: 0.1 },
      { key: "tileWidth", label: "Tile width", unit: "in", defaultValue: 12, min: 0.1, step: 0.1 },
    ],
    resultLabel: "Tiles to buy",
    resultUnit: "tiles",
    calculate: ({ length, width, tileLength, tileWidth }) => {
      const tileArea = positive(tileLength) * positive(tileWidth);
      return tileArea ? Math.ceil(rectangleArea({ length, width }) * 144 / tileArea * 1.1) : 0;
    },
    formula: "Surface area divided by tile area, plus 10% waste, rounded up.",
    tips: ["Complex layouts and diagonal patterns need more waste.", "Buy boxes from the same dye lot when appearance matters."],
    related: ["flooring-calculator", "paint-calculator", "area-calculator"],
    featured: true,
  },
  {
    slug: "flooring-calculator",
    name: "Flooring Calculator",
    seoTitle: "Flooring Measurement Calculator with Waste, Boxes & Cost",
    shortName: "Flooring",
    category: "Home projects",
    description: "Calculate flooring square footage, cutting waste, whole boxes, coverage, and material cost.",
    intro: "Measure the room, add closets, enter the carton coverage, and get the number of whole boxes to buy.",
    fields: [
      { key: "length", label: "Room length", unit: "ft", defaultValue: 14, min: 0, step: 0.1 },
      { key: "width", label: "Room width", unit: "ft", defaultValue: 12, min: 0, step: 0.1 },
    ],
    resultLabel: "Flooring to buy",
    resultUnit: "ft²",
    calculate: (values) => rectangleArea(values) * 1.1,
    formula: "Room area plus 10% cutting allowance.",
    tips: ["Measure alcoves and closets separately, then add them.", "Patterned installations may require a larger allowance."],
    searchQuestions: [
      { question: "How do I calculate room square footage for flooring?", answer: "Multiply room length by width, add closets or alcoves, subtract excluded areas, and then apply a cutting-waste percentage." },
      { question: "How many boxes of flooring should I buy?", answer: "Divide the purchase area, including waste, by the coverage printed on one carton and round up to a whole box." },
    ],
    related: ["tile-calculator", "paint-calculator", "area-calculator"],
  },
  {
    slug: "paint-calculator",
    name: "Paint Calculator",
    seoTitle: "Room Paint Calculator for Walls & Ceilings",
    shortName: "Paint",
    category: "Home projects",
    description: "Calculate paint gallons for walls and ceilings with doors, windows, coats, coverage, and cost.",
    intro: "Measure one room, subtract doors and windows, choose the number of coats, and get a whole-gallon shopping estimate.",
    fields: [
      { key: "length", label: "Room length", unit: "ft", defaultValue: 14, min: 0, step: 0.1 },
      { key: "width", label: "Room width", unit: "ft", defaultValue: 12, min: 0, step: 0.1 },
      { key: "height", label: "Wall height", unit: "ft", defaultValue: 8, min: 0, step: 0.1 },
      { key: "coats", label: "Number of coats", unit: "", defaultValue: 2, min: 1, step: 1 },
    ],
    resultLabel: "Paint needed",
    resultUnit: "gal",
    calculate: ({ length, width, height, coats }) => Math.max(0, ((positive(length) + positive(width)) * 2 * positive(height) - 40) * positive(coats) / 350),
    formula: "Wall area minus 40 ft² for openings, × coats, divided by 350 ft² per gallon.",
    tips: ["Coverage varies by paint, surface texture, and color change.", "Round up to the package size sold by your store."],
    searchQuestions: [
      { question: "How much paint do I need for walls and a ceiling?", answer: "Enter the room dimensions, enable the ceiling, subtract doors and windows, and select the number of coats and coverage per gallon." },
      { question: "Can I calculate ceiling paint from square feet?", answer: "Yes. Ceiling area is room length multiplied by width. The calculator adds that area before applying coats and paint coverage." },
    ],
    related: ["wallpaper-calculator", "flooring-calculator", "area-calculator"],
    featured: true,
  },
  {
    slug: "wallpaper-calculator",
    name: "Wallpaper Calculator",
    seoTitle: "Wallpaper Roll Calculator with Pattern Waste",
    shortName: "Wallpaper",
    category: "Home projects",
    description: "Estimate double rolls of wallpaper for a room.",
    intro: "The estimate uses about 56 usable square feet per double roll and includes 15% for matching and cuts.",
    fields: [
      { key: "length", label: "Room length", unit: "ft", defaultValue: 14, min: 0, step: 0.1 },
      { key: "width", label: "Room width", unit: "ft", defaultValue: 12, min: 0, step: 0.1 },
      { key: "height", label: "Wall height", unit: "ft", defaultValue: 8, min: 0, step: 0.1 },
    ],
    resultLabel: "Double rolls",
    resultUnit: "rolls",
    calculate: ({ length, width, height }) => Math.ceil((positive(length) + positive(width)) * 2 * positive(height) * 1.15 / 56),
    formula: "Wall area × 1.15 allowance divided by 56 usable ft² per double roll.",
    tips: ["Large repeats and complex patterns increase waste.", "Confirm usable coverage on the product label."],
    related: ["paint-calculator", "area-calculator", "flooring-calculator"],
  },
  {
    slug: "decking-calculator",
    name: "Decking Calculator",
    seoTitle: "Deck Board Linear Feet Calculator + Waste",
    shortName: "Decking",
    category: "Home projects",
    description: "Estimate linear feet of deck boards for a rectangular deck.",
    intro: "This assumes boards run along the deck length and adds 10% for cuts and waste.",
    fields: [
      { key: "length", label: "Deck length", unit: "ft", defaultValue: 16, min: 0, step: 0.1 },
      { key: "width", label: "Deck width", unit: "ft", defaultValue: 12, min: 0, step: 0.1 },
      { key: "boardWidth", label: "Installed board width", unit: "in", defaultValue: 5.5, min: 0.1, step: 0.1 },
    ],
    resultLabel: "Deck board length",
    resultUnit: "linear ft",
    calculate: ({ length, width, boardWidth }) => positive(boardWidth) ? positive(length) * (positive(width) * 12 / positive(boardWidth)) * 1.1 : 0,
    formula: "Board rows across the width × deck length, plus 10% allowance.",
    tips: ["Use the installed face width, including the planned gap.", "Structural design and fastener quantities require separate planning."],
    related: ["concrete-calculator", "fence-calculator", "area-calculator"],
  },
  {
    slug: "fence-calculator",
    name: "Fence Calculator",
    seoTitle: "Fence Post Calculator by Length & Spacing",
    shortName: "Fence posts",
    category: "Home projects",
    description: "Estimate fence posts from total run and spacing.",
    intro: "The result includes both end posts and rounds up so spacing never exceeds your target.",
    fields: [
      { key: "length", label: "Total fence length", unit: "ft", defaultValue: 100, min: 0, step: 0.1 },
      { key: "spacing", label: "Maximum post spacing", unit: "ft", defaultValue: 8, min: 0.1, step: 0.1 },
    ],
    resultLabel: "Posts needed",
    resultUnit: "posts",
    calculate: ({ length, spacing }) => positive(spacing) ? Math.ceil(positive(length) / positive(spacing)) + 1 : 0,
    formula: "Fence length divided by maximum spacing, rounded up, plus the final post.",
    tips: ["Add separate posts for gates and direction changes.", "Local codes may specify post depth and spacing."],
    related: ["decking-calculator", "concrete-calculator", "area-calculator"],
  },
  {
    slug: "area-calculator",
    name: "Rectangle Area Calculator",
    seoTitle: "Square Footage Calculator: Length × Width",
    shortName: "Area",
    category: "Conversions",
    description: "Calculate square feet from length and width.",
    intro: "Use the same unit for both dimensions. This version is set up for feet and square feet.",
    fields: [
      { key: "length", label: "Length", unit: "ft", defaultValue: 12, min: 0, step: 0.1 },
      { key: "width", label: "Width", unit: "ft", defaultValue: 10, min: 0, step: 0.1 },
    ],
    resultLabel: "Area",
    resultUnit: "ft²",
    calculate: rectangleArea,
    formula: "Area = length × width.",
    tips: ["Break irregular shapes into rectangles and add their areas.", "Keep all input dimensions in the same unit."],
    related: ["volume-calculator", "flooring-calculator", "paint-calculator"],
  },
  {
    slug: "volume-calculator",
    name: "Rectangular Volume Calculator",
    seoTitle: "Cubic Feet Calculator: Length × Width × Height",
    shortName: "Volume",
    category: "Conversions",
    description: "Calculate cubic feet from length, width, and height.",
    intro: "Use this for boxes, rooms, soil beds, storage spaces, and other rectangular volumes.",
    fields: [
      { key: "length", label: "Length", unit: "ft", defaultValue: 8, min: 0, step: 0.1 },
      { key: "width", label: "Width", unit: "ft", defaultValue: 4, min: 0, step: 0.1 },
      { key: "height", label: "Height", unit: "ft", defaultValue: 2, min: 0, step: 0.1 },
    ],
    resultLabel: "Volume",
    resultUnit: "ft³",
    calculate: ({ length, width, height }) => positive(length) * positive(width) * positive(height),
    formula: "Volume = length × width × height.",
    tips: ["Keep all dimensions in the same unit.", "Containers with sloped sides need a shape-specific formula."],
    related: ["area-calculator", "concrete-calculator", "mulch-calculator"],
  },
];

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);

export const categories: ToolCategory[] = ["Screen & ruler", "Home projects", "Conversions"];

export const categoryDefinitions: ToolCategoryDefinition[] = [
  {
    name: "Screen & ruler",
    slug: "screen-measurement-tools",
    title: "Screen Measurement Tools",
    description: "Free online ruler, screen size, and pixel density tools for measuring objects and displays.",
    intro: "Measure an object on your display, calculate screen density, or turn a diagonal size into usable width. These tools are designed for quick checks on phones, monitors, and TVs.",
  },
  {
    name: "Home projects",
    slug: "home-project-calculators",
    title: "Home Project Material Calculators",
    description: "Estimate concrete, gravel, mulch, tile, paint, flooring, decking, wallpaper, and fence materials.",
    intro: "Plan a store run with practical material estimates for common home and yard projects. Each calculator explains its allowance and the assumptions behind the result.",
  },
  {
    name: "Conversions",
    slug: "measurement-conversion-calculators",
    title: "Measurement Conversion Calculators",
    description: "Convert pixels and calculate rectangular area or volume with simple, free measurement tools.",
    intro: "Use these calculators when you need to turn dimensions into a physical length, square footage, or cubic volume without building a spreadsheet.",
  },
];

export const getCategory = (slug: string) =>
  categoryDefinitions.find((category) => category.slug === slug);

export const getCategoryByName = (name: ToolCategory) =>
  categoryDefinitions.find((category) => category.name === name);

export const formatResult = (value: number, unit: string) => {
  if (!Number.isFinite(value)) return "0";
  if (unit === "tiles" || unit === "rolls" || unit === "posts") return Math.ceil(value).toLocaleString("en-US");
  if (value >= 1000) return value.toLocaleString("en-US", { maximumFractionDigits: 1 });
  if (value >= 100) return value.toFixed(1);
  return value.toFixed(2).replace(/\.00$/, "");
};
