import Link from "next/link";

import { Calculator } from "@/components/calculator";
import { OnlineRuler } from "@/components/online-ruler";
import { ProjectGuide } from "@/components/project-guide";
import { getCategoryByName, getTool, type ToolDefinition } from "@/lib/tools";
import { siteConfig, siteIds } from "@/lib/site";

export function ToolPage({ tool }: { tool: ToolDefinition }) {
  const isOnlineRuler = tool.slug === "online-ruler";
  const category = getCategoryByName(tool.category);
  const path = `/tools/${tool.slug}`;
  const pageUrl = `${siteConfig.url}${path}`;
  const pageId = `${pageUrl}#webpage`;
  const appId = `${pageUrl}#application`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "All tools", item: siteConfig.url },
          ...(category ? [{ "@type": "ListItem", position: 2, name: category.title, item: `${siteConfig.url}/categories/${category.slug}` }] : []),
          { "@type": "ListItem", position: category ? 3 : 2, name: tool.name, item: `${siteConfig.url}${path}` },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": appId,
        name: tool.name,
        description: tool.description,
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern web browser",
        provider: { "@id": siteIds.organization },
        featureList: [tool.description, tool.intro, tool.formula, "Runs locally in the browser", "No account required"],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      { "@type": "WebPage", "@id": pageId, name: tool.name, url: pageUrl, description: tool.description, isPartOf: { "@id": siteIds.website }, breadcrumb: { "@id": `${pageUrl}#breadcrumb` }, mainEntity: { "@id": appId }, dateModified: siteConfig.contentUpdatedAt.toISOString() },
      { "@type": "WebSite", "@id": siteIds.website, name: siteConfig.name, url: siteConfig.url, publisher: { "@id": siteIds.organization } },
      { "@type": "Organization", "@id": siteIds.organization, name: siteConfig.name, url: siteConfig.url },
    ],
  };

  return (
    <main className={`shell tool-page${isOnlineRuler ? " ruler-page" : ""}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">All tools</Link><span aria-hidden="true">/</span>
        {category ? <Link href={`/categories/${category.slug}`}>{tool.category}</Link> : <span>{tool.category}</span>}
      </nav>
      <header className="tool-intro">
        <p>{tool.category}</p>
        <h1>{tool.name}</h1>
        <span>{tool.intro}</span>
      </header>
      <div className={`tool-layout${isOnlineRuler ? " ruler-page-layout" : ""}`}>
        <div>{isOnlineRuler ? <OnlineRuler /> : <Calculator slug={tool.slug} />}</div>
        <aside className="tool-aside">
          <section>
            <h2>Before you start</h2>
            <ul>{tool.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
          </section>
        </aside>
      </div>
      <section className="method-section">
        <div>
          <h2>How this estimate works</h2>
          <p>{tool.formula}</p>
        </div>
        <p>Measure twice and use the same unit throughout. Product coverage, material density, installation patterns, and local requirements can change the quantity you need.</p>
      </section>
      <ProjectGuide slug={tool.slug} />
      <section className="related-section">
        <h2>Related tools</h2>
        <div className="related-links">
          {tool.related.map((slug) => {
            const related = getTool(slug);
            return related ? <Link href={`/tools/${slug}`} key={slug}><strong>{related.shortName}</strong><span>{related.description}</span></Link> : null;
          })}
        </div>
      </section>
    </main>
  );
}
