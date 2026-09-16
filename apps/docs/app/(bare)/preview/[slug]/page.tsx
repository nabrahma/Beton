import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { exampleLoaders } from "@/generated/example-loaders";
import { getBlocks, getComponent } from "@/lib/components";

export function generateStaticParams() {
  return getBlocks()
    .filter((meta) => meta.name in exampleLoaders)
    .map((meta) => ({ slug: meta.name }));
}

export const dynamicParams = false;

/**
 * One block, drawn on its own. The docs embed this in an iframe so the block
 * sees the width of the frame, which is what its breakpoints are written for.
 */
export default async function BlockPreview({ params }: PageProps<"/preview/[slug]">) {
  const { slug } = await params;
  const meta = getComponent(slug);
  if (!meta || meta.kind !== "block") notFound();

  if (!(slug in exampleLoaders)) notFound();
  const loader = exampleLoaders[slug as keyof typeof exampleLoaders];
  const examples = (await loader()).examples as Record<string, ComponentType>;
  const [first] = Object.keys(examples);
  const Example = examples.playground ?? (first ? examples[first] : undefined);
  if (!Example) notFound();

  return <Example />;
}
