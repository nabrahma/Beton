import { CodeBlock, InlineCommand } from "@/components/code-block";
import { Tabs } from "@/components/tabs";
import type { RegistryItem } from "@/lib/components";

export function InstallTabs({ item }: { item: RegistryItem }) {
  const files = item.files ?? [];
  const deps = ["tailwind-merge", "tailwind-variants", ...(item.dependencies ?? [])];
  const uniqueDeps = [...new Set(deps)];

  return (
    <Tabs
      label="Installation method"
      items={[
        {
          id: "cli",
          label: "CLI",
          content: (
            <div className="flex flex-col gap-3">
              <InlineCommand command={`npx beton-ui add ${item.name}`} />
              <p className="text-sm">
                First time? Run <code className="font-mono font-bold">npx beton-ui init</code> to
                add the theme.
              </p>
            </div>
          ),
        },
        {
          id: "shadcn",
          label: "shadcn",
          content: (
            <div className="flex flex-col gap-3">
              <InlineCommand command={`npx shadcn@latest add @beton/${item.name}`} />
              <p className="text-sm">
                Requires the <code className="font-mono font-bold">@beton</code> registry in your{" "}
                <code className="font-mono font-bold">components.json</code>. See{" "}
                <a href="/docs/installation#using-the-shadcn-cli" className="font-bold underline">
                  installation
                </a>
                .
              </p>
            </div>
          ),
        },
        {
          id: "manual",
          label: "Manual",
          content: (
            <ol className="flex flex-col gap-6">
              <li className="flex flex-col gap-2">
                <p className="font-display font-bold">1. Install the dependencies</p>
                <InlineCommand command={`npm install ${uniqueDeps.join(" ")}`} />
              </li>
              <li className="flex flex-col gap-2">
                <p className="font-display font-bold">
                  2. Add the{" "}
                  <a href="/docs/theming" className="underline">
                    theme
                  </a>{" "}
                  and{" "}
                  <a href="/r/core.json" className="underline">
                    core utilities
                  </a>
                  {item.registryDependencies && item.registryDependencies.length > 1
                    ? `, then ${item.registryDependencies
                        .slice(1)
                        .map((dep) => dep.match(/([\w-]+)\.json$/)?.[1])
                        .join(", ")}`
                    : ""}
                </p>
              </li>
              <li className="flex flex-col gap-3">
                <p className="font-display font-bold">3. Copy the source</p>
                {files.map((file) => (
                  <CodeBlock
                    key={file.target}
                    code={file.content}
                    lang="tsx"
                    title={file.target
                      .replace(/^@ui\//, "components/ui/")
                      .replace(/^@lib\//, "lib/")}
                  />
                ))}
              </li>
            </ol>
          ),
        },
      ]}
    />
  );
}
