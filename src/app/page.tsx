import Link from "next/link";

import { ToolDirectory } from "@/components/tool-directory";
import { tools } from "@/lib/tools";
import { siteConfig, siteIds } from "@/lib/site";

export default function Home() {
  const featured = tools.filter((tool) => tool.featured);
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": siteIds.organization, name: siteConfig.name, url: siteConfig.url, email: siteConfig.contactEmail },
    { "@type": "WebSite", "@id": siteIds.website, name: siteConfig.name, url: siteConfig.url, description: siteConfig.description, publisher: { "@id": siteIds.organization } },
    { "@type": "WebPage", "@id": `${siteConfig.url}/#webpage`, name: "Free Measurement Tools and Home Project Calculators", url: siteConfig.url, description: siteConfig.description, isPartOf: { "@id": siteIds.website }, about: { "@id": siteIds.organization }, dateModified: siteConfig.contentUpdatedAt.toISOString(), mainEntity: { "@id": `${siteConfig.url}/#tool-list` } },
    { "@type": "ItemList", "@id": `${siteConfig.url}/#tool-list`, name: "MeasureSpark calculators", itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.name, url: `${siteConfig.url}/tools/${tool.slug}` })) },
  ] };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="hero shell">
        <div className="hero-copy">
          <h1>Free measurement tools.<br />Plan the job right.</h1>
          <p>Free rulers, screen tools, and home project calculators that give you the number without an account.</p>
          <Link className="primary-button" href="/tools/online-ruler">Open the online ruler</Link>
        </div>
        <div className="measure-board" aria-label="Featured measurement tools">
          <div className="board-scale" aria-hidden="true" />
          <span className="board-label">Quick start</span>
          {featured.map((tool) => (
            <Link href={`/tools/${tool.slug}`} key={tool.slug}>
              <strong>{tool.shortName}</strong>
              <span>{tool.description}</span>
              <b aria-hidden="true">→</b>
            </Link>
          ))}
        </div>
      </section>
      <section className="shell directory-wrap">
        <header>
          <h2>Choose the job in front of you</h2>
          <p>Each tool opens with useful defaults, plain-language assumptions, and no data upload.</p>
        </header>
        <ToolDirectory />
      </section>
      <section className="shell home-explainer">
        <h2>How MeasureSpark helps with everyday projects</h2>
        <p>Use the online ruler for a quick physical check on a calibrated screen, or choose a material calculator when you are planning a store run. Paint, flooring, and tile tools turn room dimensions into whole-package purchase estimates and show the assumptions behind the result.</p>
        <p>Every core calculation runs locally in your browser. Start with the supplied defaults, replace them with measurements from your room or product label, and confirm the final quantity against manufacturer instructions before buying.</p>
      </section>
      <section className="privacy-band">
        <div className="shell privacy-inner">
          <h2>Your measurements stay on your device.</h2>
          <p>Core calculations run in the browser. There is no account, project history, or measurement database.</p>
        </div>
      </section>
    </main>
  );
}
