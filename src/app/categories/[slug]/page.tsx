import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { categoryDefinitions, getCategory, tools } from "@/lib/tools";
import { siteConfig, siteIds } from "@/lib/site";

const categoryGuides: Record<string, { heading: string; paragraphs: string[]; links: Array<{ slug: string; label: string; use: string }> }> = {
  "screen-measurement-tools": {
    heading: "Choose the right screen measurement tool",
    paragraphs: [
      "Start with the online ruler when the job is to compare a small object directly against the display. Calibrate it on the same screen you will use, keep browser zoom at 100%, and switch to a physical measuring tool when accuracy affects safety, fit, or cost.",
      "Use a calculation instead when you know specifications rather than a physical length. Resolution plus diagonal size determines pixel density; diagonal plus aspect ratio determines viewable width; pixel count plus a known PPI determines physical output size.",
    ],
    links: [
      { slug: "online-ruler", label: "Online ruler", use: "Measure a small object against a calibrated display." },
      { slug: "screen-ppi-calculator", label: "Screen PPI calculator", use: "Find pixel density from native resolution and diagonal size." },
      { slug: "screen-size-calculator", label: "Screen size calculator", use: "Estimate viewable panel width before checking exact product dimensions." },
    ],
  },
  "home-project-calculators": {
    heading: "Turn room measurements into a shopping estimate",
    paragraphs: [
      "Choose the calculator for the material you will actually purchase. Paint depends on coats and coverage per gallon; flooring and tile depend on package coverage and whole-box rounding; concrete, gravel, and mulch depend on depth as well as surface area.",
      "Measure separate rectangles, add or subtract areas deliberately, and replace every default with the value on the product label or supplier quote. Waste allowances are planning inputs, not universal rules: patterns, uneven bases, stock lengths, and installation methods can change them.",
    ],
    links: [
      { slug: "paint-calculator", label: "Paint calculator", use: "Estimate walls, openings, coats, ceiling paint, and whole gallons." },
      { slug: "flooring-calculator", label: "Flooring calculator", use: "Convert room area and cutting allowance into whole boxes and cost." },
      { slug: "concrete-calculator", label: "Concrete calculator", use: "Convert slab dimensions and depth into cubic yards." },
    ],
  },
  "measurement-conversion-calculators": {
    heading: "Use dimensions with the correct unit",
    paragraphs: [
      "Use the area calculator for surfaces, the volume calculator for three-dimensional spaces, and pixels-to-inches only when a real PPI or print density is known. A pixel count by itself has no fixed physical length.",
      "Keep every input in the same unit before multiplying. The result is a geometric measurement; project materials may also require coverage, package rounding, density, compaction, coats, or cutting waste, so continue to a material-specific calculator when planning a purchase.",
    ],
    links: [
      { slug: "area-calculator", label: "Square footage calculator", use: "Multiply length by width for a rectangular surface." },
      { slug: "volume-calculator", label: "Cubic feet calculator", use: "Multiply three dimensions for a rectangular volume." },
      { slug: "pixels-to-inches", label: "Pixels to inches", use: "Convert a pixel length using the target display or print density." },
    ],
  },
};

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
  const guide = categoryGuides[category.slug];
  const pageUrl = `${siteConfig.url}/categories/${category.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "CollectionPage", "@id": `${pageUrl}#webpage`,
      name: category.title, description: category.description, url: pageUrl,
      isPartOf: { "@id": siteIds.website }, dateModified: siteConfig.contentUpdatedAt.toISOString(), breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": `${pageUrl}#tool-list` },
    }, {
      "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "All tools", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: category.title, item: pageUrl },
      ],
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
        <h2>{guide.heading}</h2>
        {guide.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="related-links">
          {guide.links.map((item) => <Link href={`/tools/${item.slug}`} key={item.slug}><strong>{item.label}</strong><span>{item.use}</span></Link>)}
        </div>
      </section>
    </main>
  );
}
