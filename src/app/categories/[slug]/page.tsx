import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { categoryDefinitions, getCategory, tools } from "@/lib/tools";
import { siteConfig, siteIds } from "@/lib/site";

export function generateStaticParams() {
  return categoryDefinitions.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const path = `/categories/${category.slug}`;
  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: path },
    openGraph: { title: `${category.title} | MeasureSpark`, description: category.description, url: `${siteConfig.url}${path}`, type: "website" },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const categoryTools = tools.filter((tool) => tool.category === category.name);
  const pageUrl = `${siteConfig.url}/categories/${category.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "CollectionPage", "@id": `${pageUrl}#webpage`,
      name: category.title, description: category.description, url: pageUrl,
      isPartOf: { "@id": siteIds.website }, dateModified: siteConfig.contentUpdatedAt.toISOString(),
      mainEntity: { "@id": `${pageUrl}#tool-list` },
    }, {
      "@type": "ItemList", "@id": `${pageUrl}#tool-list`,
      itemListElement: categoryTools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: `${siteConfig.url}/tools/${tool.slug}`,
      })),
    }, {
      "@type": "WebSite", "@id": siteIds.website, name: siteConfig.name, url: siteConfig.url, publisher: { "@id": siteIds.organization },
    }, {
      "@type": "Organization", "@id": siteIds.organization, name: siteConfig.name, url: siteConfig.url,
    }],
  };

  return (
    <main className="shell category-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">All tools</Link><span aria-hidden="true">/</span><span>{category.name}</span>
      </nav>
      <header className="category-hero">
        <p>{category.name}</p>
        <h1>{category.title}</h1>
        <span>{category.intro}</span>
      </header>
      <section className="category-tool-list" aria-labelledby="category-tools-heading">
        <div className="category-section-heading">
          <h2 id="category-tools-heading">Choose a calculator</h2>
          <p>Open a tool, enter your measurements, and get an answer without an account.</p>
        </div>
        <div className="tool-list">
          {categoryTools.map((tool) => (
            <Link className="tool-row" href={`/tools/${tool.slug}`} key={tool.slug}>
              <span><strong>{tool.name}</strong><small>{tool.description}</small></span>
              <span className="row-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="category-explainer">
        <h2>Built for quick planning</h2>
        <p>MeasureSpark tools run in your browser and keep the calculation close to the task. Results are planning estimates, so confirm product coverage, installation requirements, and safety-critical dimensions before purchasing or building.</p>
      </section>
    </main>
  );
}
