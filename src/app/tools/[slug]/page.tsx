import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPage } from "@/components/tool-page";
import { getTool, tools } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const path = `/tools/${tool.slug}`;
  return {
    title: tool.seoTitle,
    description: tool.description,
    alternates: { canonical: path },
    openGraph: { title: `${tool.seoTitle} | MeasureSpark`, description: tool.description, url: `${siteConfig.url}${path}`, type: "website" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  return <ToolPage tool={tool} />;
}
