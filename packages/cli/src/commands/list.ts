import { DEFAULT_REGISTRY, loadConfig } from "../config.ts";
import { color, log } from "../logger.ts";
import { Registry } from "../registry.ts";

const HIDDEN = new Set(["theme", "core", "all"]);

export async function list(options: { cwd: string; registry?: string }): Promise<void> {
  const base = options.registry ?? loadConfig(options.cwd)?.registry ?? DEFAULT_REGISTRY;
  const index = await new Registry(base, options.cwd).index();

  const byCategory = new Map<string, { name: string; description?: string }[]>();
  for (const item of index.items) {
    if (HIDDEN.has(item.name)) continue;
    const category = item.categories?.[0] ?? "other";
    byCategory.set(category, [...(byCategory.get(category) ?? []), item]);
  }

  for (const [category, items] of byCategory) {
    log.info(`\n${color.bold(category.replace(/-/g, " ").toUpperCase())}`);
    const width = Math.max(...items.map((i) => i.name.length));
    for (const item of items) {
      log.info(`  ${color.cyan(item.name.padEnd(width))}  ${color.dim(item.description ?? "")}`);
    }
  }
  log.info(`\nAdd one with: ${color.bold("npx beton-ui add <name>")}\n`);
}
