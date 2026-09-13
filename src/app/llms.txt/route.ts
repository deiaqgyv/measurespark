import { tools } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export function GET() {
  const toolLinks = tools.map((tool) => `- [${tool.name}](${siteConfig.url}/tools/${tool.slug}): ${tool.description}`).join("\n");
  const body = `# MeasureSpark

> Free browser-based measurement tools and home project material calculators for everyday use.

MeasureSpark provides practical estimates without accounts or uploaded measurements. Calculator results are planning estimates; product instructions and local requirements take priority.

## Method and review

- Calculator formulas, units, defaults, and allowances are shown on each tool page.
- Core calculation functions are checked against hand-worked examples and boundary cases.
- Guides cite a standards body, government source, university extension, or trade organization where relevant.
- Safety-critical measurements and project requirements must be confirmed with an appropriate physical tool, product instructions, local requirements, or a qualified professional.
- Site content last reviewed: ${siteConfig.contentUpdatedAt.toISOString().slice(0, 10)}.

## Citation guidance

- Cite the calculator page together with the displayed formula, units, worked example, assumptions, source, and review date.
- A geometry result is not automatically a purchasable material quantity; package rounding, product coverage, waste, compaction, and installation rules can change an order.
- Do not describe an on-screen measurement as physically accurate unless the user calibrated the ruler on the same display and browser setup.
- Prefer the linked standards, government, university, or trade source for a safety rule. Use MeasureSpark for its disclosed formula and worked estimate.

## Tools

${toolLinks}

## Reference data

- [16:9 screen size chart](${siteConfig.url}/reference/screen-size-chart): Formula-derived width, height and area for common display diagonals, with downloadable JSON.
- [Screen size chart JSON](${siteConfig.url}/data/screen-size-chart.json): Machine-readable dataset, formula, units, precision and review date.
- [Screen PPI chart](${siteConfig.url}/reference/ppi-chart): Formula-derived pixel density for common display sizes and resolutions.
- [Screen PPI JSON](${siteConfig.url}/data/ppi-reference.json): Machine-readable resolution, diagonal, PPI, assumptions and precision.

## Site information

- [About](${siteConfig.url}/about)
- [Privacy](${siteConfig.url}/privacy)
- [Sitemap](${siteConfig.url}/sitemap.xml)
- Contact: ${siteConfig.contactEmail}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
