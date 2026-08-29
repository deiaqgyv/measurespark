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

## Tools

${toolLinks}

## Site information

- [About](${siteConfig.url}/about)
- [Privacy](${siteConfig.url}/privacy)
- [Sitemap](${siteConfig.url}/sitemap.xml)
- Contact: ${siteConfig.contactEmail}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
