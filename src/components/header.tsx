import Link from "next/link";

import { categoryDefinitions } from "@/lib/tools";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="MeasureSpark home">
          <img className="wordmark-mark" src="/icon.svg" alt="" width="30" height="30" aria-hidden="true" />
          MeasureSpark
        </Link>
        <nav aria-label="Primary navigation">
          {categoryDefinitions.map((category) => (
            <Link href={`/categories/${category.slug}`} key={category.slug}>{category.name}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
