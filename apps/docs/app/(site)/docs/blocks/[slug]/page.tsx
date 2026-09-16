import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { getBlocks, getComponent } from "@/lib/components";

export function generateStaticParams() {
  return getBlocks().map((meta) => ({ slug: meta.name }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/docs/blocks/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const meta = getComponent(slug);
  if (!meta) return {};
  return {
    title: `${meta.title} block`,
    description: meta.description,
    alternates: { canonical: `/docs/blocks/${slug}` },
  };
}

export default async function BlockPage({ params }: PageProps<"/docs/blocks/[slug]">) {
  const { slug } = await params;
  return <DocPage slug={slug} />;
}
