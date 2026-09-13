import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { categoryDefinitions, tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, lastModified: siteConfig.contentUpdatedAt },
    ...categoryDefinitions.map((category) => ({ url: `${siteConfig.url}/categories/${category.slug}`, lastModified: siteConfig.contentUpdatedAt })),
    ...tools.map((tool) => ({ url: `${siteConfig.url}/tools/${tool.slug}`, lastModified: siteConfig.contentUpdatedAt })),
    { url: `${siteConfig.url}/reference/screen-size-chart`, lastModified: siteConfig.contentUpdatedAt },
    { url: `${siteConfig.url}/reference/ppi-chart`, lastModified: siteConfig.contentUpdatedAt },
    { url: `${siteConfig.url}/about`, lastModified: siteConfig.contentUpdatedAt },
    { url: `${siteConfig.url}/privacy`, lastModified: siteConfig.contentUpdatedAt },
  ];
}
