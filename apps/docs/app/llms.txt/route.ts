import { categories, getComponents } from "@/lib/components";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const components = getComponents();
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description} Neobrutalist React components distributed as source through a shadcn-compatible registry.`,
    "",
    "## Install",
    "",
    "- CLI: `npx beton-ui init`, then `npx beton-ui add <name>`",
    `- shadcn: add \`"@beton": "${site.registry}/{name}.json"\` to components.json registries, then \`npx shadcn@latest add @beton/<name>\``,
    `- Direct: \`npx shadcn@latest add ${site.registry}/<name>.json\``,
    "",
    "## Conventions",
    "",
    "- Requires React 19 and Tailwind CSS v4.",
    "- Components install to components/ui/beton/, utilities and recipes to lib/beton/.",
    "- Styling lives in recipes (lib/beton/recipes/*.recipe.ts). Components contain no class strings.",
    "- Variants: primary, secondary, ghost, danger (status components add success). Sizes: sm, md, lg.",
    "- Composition uses the render prop. There is no asChild.",
    "- State is exposed as data attributes: data-disabled, data-loading, data-invalid, data-state.",
    "- To style a link as a button, apply the button() recipe to an <a>.",
    "",
    "## Docs",
    "",
    `- [Introduction](${site.url}/docs/introduction)`,
    `- [Installation](${site.url}/docs/installation)`,
    `- [CLI](${site.url}/docs/cli)`,
    `- [Theming](${site.url}/docs/theming)`,
    `- [Accessibility](${site.url}/docs/accessibility)`,
    `- [Registry index](${site.registry}/registry.json)`,
    "",
    ...categories.flatMap((category) => {
      const items = components.filter((c) => c.category === category.id);
      if (!items.length) return [];
      return [
        `## ${category.title}`,
        "",
        ...items.map(
          (c) =>
            `- [${c.title}](${site.url}/docs/components/${c.name}): ${c.description} Registry: ${site.registry}/${c.name}.json`,
        ),
        "",
      ];
    }),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
