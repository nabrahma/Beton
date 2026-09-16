import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { AccessibilitySection } from "@/components/accessibility-section";
import { BlockFrame } from "@/components/block-frame";
import { CodeBlock } from "@/components/code-block";
import { ExamplePreview } from "@/components/example";
import { InstallTabs } from "@/components/install-tabs";
import { PageHeader, SectionHeading } from "@/components/page-header";
import { Playground } from "@/components/playground";
import { PropsTable } from "@/components/props-table";
import { exampleLoaders } from "@/generated/example-loaders";
import {
  categories,
  docHref,
  getA11y,
  getComponent,
  getExamples,
  getPropTables,
  getRegistryItem,
} from "@/lib/components";

export async function DocPage({ slug }: { slug: string }) {
  const meta = getComponent(slug);
  if (!meta) notFound();

  const loader = exampleLoaders[slug as keyof typeof exampleLoaders];
  const loaded = loader
    ? ((await loader()).examples as Record<string, ComponentType<Record<string, unknown>>>)
    : {};
  const { playground, examples } = getExamples(slug);
  const item = await getRegistryItem(slug);
  const category = categories.find((c) => c.id === meta.category);
  const related = meta.related.map(getComponent).filter((c) => c !== undefined);
  const usage = `import { ${meta.exports.join(", ")} } from "@/components/ui/beton/${
    item.files
      ?.find((f) => f.type === "registry:ui")
      ?.target.split("/")
      .pop()
      ?.replace(/\.tsx$/, "") ?? slug
  }";`;

  const toc = [
    ["installation", "Installation"],
    ["usage", "Usage"],
    ["examples", "Examples"],
    ["api", "API reference"],
    ["accessibility", "Accessibility"],
  ];

  return (
    <article>
      <PageHeader eyebrow={category?.title} title={meta.title} description={meta.description}>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase">
          <span className="border-2 border-border bg-raised px-2 py-0.5">
            {item.meta?.client ? "Client component" : "Server compatible"}
          </span>
          {item.dependencies?.map((dep) => (
            <span key={dep} className="border-2 border-border bg-raised px-2 py-0.5 normal-case">
              {dep}
            </span>
          ))}
          {item.meta?.source ? (
            <a
              href={item.meta.source}
              className="border-2 border-border bg-secondary px-2 py-0.5 hover:underline"
            >
              Source
            </a>
          ) : null}
        </div>
        <nav aria-label="On this page" className="flex flex-wrap gap-x-5 gap-y-1 pt-2">
          {toc.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="font-display text-sm font-bold underline decoration-2 underline-offset-4"
            >
              {label}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="flex flex-col gap-16">
        {meta.kind === "block" ? (
          <section aria-label="Live preview">
            <BlockFrame slug={slug} title={meta.title} />
          </section>
        ) : null}

        {meta.kind !== "block" && playground && meta.playground && loaded.playground ? (
          <section aria-label="Live playground">
            <Playground
              component={loaded.playground}
              exportName={
                meta.exports.find(
                  (name) => name.toLowerCase() === meta.playground?.recipe.toLowerCase(),
                ) ??
                meta.exports[0] ??
                meta.title
              }
              recipe={meta.playground.recipe}
              controls={meta.playground.controls}
              toggles={meta.playground.toggles}
            />
          </section>
        ) : null}

        <section>
          <SectionHeading id="installation">Installation</SectionHeading>
          <InstallTabs item={item} />
        </section>

        <section>
          <SectionHeading id="usage">Usage</SectionHeading>
          <CodeBlock code={usage} title="Import" />
        </section>

        {examples.length ? (
          <section className="flex flex-col gap-12">
            <SectionHeading id="examples">Examples</SectionHeading>
            {examples.map((example) => {
              const Example = loaded[example.id];
              return Example ? (
                <ExamplePreview
                  key={example.id}
                  {...example}
                  component={Example as ComponentType}
                />
              ) : null;
            })}
          </section>
        ) : null}

        <section className="flex flex-col gap-8">
          <SectionHeading id="api">API reference</SectionHeading>
          {getPropTables(meta).map((table) => (
            <PropsTable key={table.name} name={table.name} props={table.props} />
          ))}
          <p className="text-sm">
            Generated from the component&apos;s TypeScript types. Every component also accepts the
            props of the element it renders.
          </p>
        </section>

        <section>
          <SectionHeading id="accessibility">Accessibility</SectionHeading>
          <AccessibilitySection meta={meta} result={getA11y(slug)} />
        </section>

        {related.length ? (
          <section>
            <SectionHeading id="related">Related</SectionHeading>
            <ul className="grid gap-4 sm:grid-cols-2">
              {related.map((c) => (
                <li key={c.name}>
                  <Link
                    href={docHref(c)}
                    className="flex h-full flex-col gap-1 border-3 border-border bg-raised p-4 shadow-sm active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    <span className="font-display text-lg font-extrabold">{c.title}</span>
                    <span className="text-sm">{c.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
