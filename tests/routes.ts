import { readFileSync } from "node:fs";
import { join } from "node:path";

const registry = JSON.parse(
  readFileSync(join(import.meta.dirname, "../registry/registry.json"), "utf8"),
) as { items: { name: string; type: string }[] };

/** Component slugs, read from the generated registry so new components are tested automatically. */
export const componentSlugs = registry.items
  .filter((item) => item.type === "registry:ui")
  .map((item) => item.name);

export const pageRoutes = [
  "/",
  "/docs/introduction",
  "/docs/installation",
  "/docs/cli",
  "/docs/theming",
  "/docs/accessibility",
  "/docs/agents",
  "/docs/components",
  "/showcase",
  "/changelog",
  "/this-page-does-not-exist",
  ...componentSlugs.map((slug) => `/docs/components/${slug}`),
];
