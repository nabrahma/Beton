import type { ComponentType } from "react";
import { CodeBlock } from "@/components/code-block";
import { Tabs } from "@/components/tabs";

export function ExamplePreview({
  id,
  title,
  description,
  source,
  component: Component,
}: {
  id: string;
  title: string;
  description: string;
  source: string;
  component: ComponentType;
}) {
  return (
    <section aria-labelledby={`example-${id}`} className="flex flex-col gap-3">
      <div>
        <h3 id={`example-${id}`} className="font-display text-xl font-extrabold">
          <a href={`#example-${id}`} className="hover:underline">
            {title}
          </a>
        </h3>
        {description ? <p className="mt-1 max-w-prose">{description}</p> : null}
      </div>
      <Tabs
        label={`${title} example`}
        items={[
          {
            id: "preview",
            label: "Preview",
            content: (
              <div className="bg-grid flex min-h-56 items-center justify-center overflow-x-auto border-3 border-border bg-raised p-8">
                <Component />
              </div>
            ),
          },
          { id: "code", label: "Code", content: <CodeBlock code={source} title={`${id}.tsx`} /> },
        ]}
      />
    </section>
  );
}
