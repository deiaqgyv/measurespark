# SEO Keyword Map

Last updated: 2026-08-28

This file is the source of truth for MeasureSpark target queries. The primary keywords use a material, unit, constraint, or task modifier instead of competing only for generic calculator terms. Review Google Search Console performance after 14–28 days.

| Page | Primary long-tail keyword | Search intent |
| --- | --- | --- |
| `/tools/online-ruler` | actual size online ruler inches cm mm | Measure an object on a calibrated screen |
| `/tools/screen-ppi-calculator` | monitor PPI calculator from resolution and size | Calculate display pixel density |
| `/tools/pixels-to-inches` | convert pixels to inches with custom PPI | Convert pixels using a known density |
| `/tools/screen-size-calculator` | screen width by diagonal and aspect ratio | Check monitor or TV fit |
| `/tools/concrete-calculator` | concrete slab cubic yards calculator with waste | Estimate concrete order quantity |
| `/tools/gravel-calculator` | gravel driveway tons calculator by depth | Estimate gravel purchase weight |
| `/tools/mulch-calculator` | how much mulch do I need in yards and bags | Estimate bulk and bagged mulch quantity |
| `/tools/tile-calculator` | tile box calculator with grout and waste | Estimate tile and box count |
| `/tools/flooring-calculator` | flooring measurement calculator with waste and cost | Plan flooring purchase |
| `/tools/paint-calculator` | room paint calculator for walls and ceilings | Estimate paint quantity |
| `/tools/wallpaper-calculator` | wallpaper roll calculator with pattern waste | Estimate wallpaper rolls |
| `/tools/decking-calculator` | deck board linear feet calculator with waste | Estimate decking material |
| `/tools/fence-calculator` | fence post calculator by length and spacing | Estimate post count |
| `/tools/area-calculator` | square footage calculator length times width | Calculate rectangular area |
| `/tools/volume-calculator` | cubic feet calculator length width height | Calculate rectangular volume |

## Guardrails

- `src/lib/tools.ts` remains the source of truth for page titles and tool content.
- Do not create multiple pages that differ only by swapping units.
- Use GSC impression queries to decide which calculator deserves deeper examples or a supporting guide.

## Search Console evidence — 2026-08-28

- `/tools/pixels-to-inches`: 55 impressions; queries include `convert pixels to inches`, `px to inches`, `how many inches is a pixel`, and numeric conversions such as `3840 pixels to inches`.
- `/tools/mulch-calculator`: 23 impressions; the leading query is `how do i calculate how much mulch i need`, with related `mulch coverage calculator` and `yards of mulch calculator` queries.
- `/tools/flooring-calculator`: 22 impressions; queries include `flooring measurement calculator`, `random width flooring calculator`, and `square footage flooring calculator`.
- `/tools/screen-size-calculator`: 22 impressions; queries include `screen calculator size`, `calculate monitor dimensions`, and `aspect ratio calculator screen size`.
