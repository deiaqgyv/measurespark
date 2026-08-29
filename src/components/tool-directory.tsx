import Link from "next/link";

import { categories, getCategoryByName, tools } from "@/lib/tools";

const ids: Record<string, string> = {
  "Screen & ruler": "screen-tools",
  "Home projects": "home-projects",
  Conversions: "conversions",
};

export function ToolDirectory() {
  return (
    <div className="directory">
      {categories.map((category) => {
        const categoryTools = tools.filter((tool) => tool.category === category);
        const categoryDefinition = getCategoryByName(category);
        return (
          <section className="directory-section" id={ids[category]} key={category}>
            <div className="section-heading">
              <h2>{categoryDefinition ? <Link href={`/categories/${categoryDefinition.slug}`}>{category}</Link> : category}</h2>
              <p>{category === "Home projects" ? "Plan material quantities before the store run." : category === "Screen & ruler" ? "Measure what is on or beside your display." : "Move cleanly between common dimensions."}</p>
            </div>
            <div className="tool-list">
              {categoryTools.map((tool, index) => (
                <Link className={`tool-row ${index === 0 ? "tool-row-wide" : ""}`} href={`/tools/${tool.slug}`} key={tool.slug}>
                  <span>
                    <strong>{tool.shortName}</strong>
                    <small>{tool.description}</small>
                  </span>
                  <span className="row-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
