# Design System

## Direction

- Register: product
- Build system: high-end restraint with product-register familiarity
- Physical scene: a homeowner checks measurements at a bright kitchen table before starting a weekend project.
- Voice objects: green tape measure, clean cutting mat, sharpened carpenter pencil.
- One distinctive move: the active tool sits on a pale green measurement mat with precise edge ticks.

## References

- Home Depot: task names use the language of the job, not internal taxonomy.
- Apple Measure: the live measurement is the strongest element on screen.
- Calculator.net: broad intent coverage, improved here with clearer hierarchy and fewer distractions.

## Color

All project colors use OKLCH tokens.

- Canvas: `oklch(98.3% 0.008 145)`
- Surface: `oklch(99.5% 0.003 145)`
- Soft surface: `oklch(95.5% 0.018 145)`
- Ink: `oklch(22% 0.025 145)`
- Muted ink: `oklch(48% 0.025 145)`
- Border: `oklch(88% 0.025 145)`
- Action: `oklch(48% 0.13 145)`
- Action hover: `oklch(41% 0.13 145)`
- Error: `oklch(50% 0.17 28)`

The action green is reserved for interactive controls, current selections, and meaningful results.

## Typography

- UI and display: Onest, with Avenir Next and Segoe UI fallbacks.
- Measurements: ui-monospace and SFMono-Regular.
- Display scale: 3.5:1 over body on wide screens, reduced responsively.
- Body copy stays below 68 characters per line.

## Layout

- Maximum content width: 1180px.
- Tool pages: 7/5 split on desktop, single column on mobile.
- Minimum page gutter: 20px mobile, 32px tablet, 48px desktop.
- Radius: 14px panels, 10px controls, full pill only for compact filters.
- Elevation is rare; structure relies on surface contrast and 1px dividers.

## Components

- Header: compact wordmark, three category links, no hidden desktop navigation.
- Tool mat: soft green surface, top-edge scale ticks, immediate result region.
- Inputs: persistent sentence-case labels, unit suffixes, 48px minimum height.
- Tool links: mixed-size list rows with category and plain-language outcome.
- Ad slots: reserved, labeled regions that never interrupt input and result.

## Motion

- 160-220ms transitions on color, opacity, and transform only.
- No scroll choreography.
- Reduced-motion disables nonessential transitions.

## Responsive and Accessibility

- Verify at 375px, 768px, and 1440px.
- Focus rings are always visible.
- Results use text labels in addition to color.
- Native controls and semantic HTML are preferred.
