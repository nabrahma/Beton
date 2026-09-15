import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { firstExisting, readJson } from "./fs-utils.ts";
import { CliError } from "./logger.ts";

export const DEFAULT_REGISTRY = "https://beton.dev/r";
export const CONFIG_FILE = "beton.json";

export interface BetonConfig {
  /** Base URL or local directory of the registry. */
  registry: string;
  /** Global stylesheet that imports Tailwind. The theme is written next to it. */
  css?: string;
  aliases: {
    /** Import alias for UI components, e.g. "@/components/ui". */
    ui: string;
    /** Import alias for library code, e.g. "@/lib". */
    lib: string;
  };
}

interface TsConfig {
  compilerOptions?: { baseUrl?: string; paths?: Record<string, string[]> };
}

interface ComponentsJson {
  tailwind?: { css?: string };
  aliases?: { components?: string; ui?: string; lib?: string };
  registries?: Record<string, unknown>;
}

const TSCONFIGS = ["tsconfig.json", "tsconfig.app.json", "jsconfig.json"];

export const CSS_CANDIDATES = [
  "src/app/globals.css",
  "app/globals.css",
  "src/styles/globals.css",
  "styles/globals.css",
  "src/index.css",
  "src/main.css",
  "src/styles.css",
  "src/app.css",
  "app/app.css",
  "src/styles/global.css",
  "src/global.css",
];

export function loadConfig(cwd: string): BetonConfig | undefined {
  const config = readJson<Partial<BetonConfig>>(join(cwd, CONFIG_FILE));
  if (!config) return undefined;
  if (!config.aliases?.ui || !config.aliases?.lib) {
    throw new CliError(`${CONFIG_FILE} is missing "aliases.ui" or "aliases.lib".`);
  }
  return {
    registry: config.registry ?? DEFAULT_REGISTRY,
    css: config.css,
    aliases: config.aliases,
  };
}

export function writeConfig(cwd: string, config: BetonConfig): void {
  writeFileSync(join(cwd, CONFIG_FILE), `${JSON.stringify(config, null, 2)}\n`);
}

function pathMappings(cwd: string) {
  const mappings: { key: string; target: string; base: string }[] = [];
  for (const file of TSCONFIGS) {
    const tsconfig = readJson<TsConfig>(join(cwd, file));
    const paths = tsconfig?.compilerOptions?.paths;
    if (!paths) continue;
    const base = join(cwd, dirname(file), tsconfig?.compilerOptions?.baseUrl ?? ".");
    for (const [key, targets] of Object.entries(paths)) {
      if (targets[0]) mappings.push({ key, target: targets[0], base });
    }
  }
  return mappings;
}

/** The import prefix a project uses for its source root, e.g. "@/" or "~/". */
export function detectImportPrefix(cwd: string): string {
  const wildcard = pathMappings(cwd).find(({ key }) => key.endsWith("/*"));
  return wildcard ? wildcard.key.slice(0, -1) : "@/";
}

/** Resolves an import alias such as "@/components/ui" to a directory on disk. */
export function resolveAliasPath(cwd: string, alias: string): string {
  for (const { key, target, base } of pathMappings(cwd)) {
    if (key.endsWith("/*")) {
      const prefix = key.slice(0, -1);
      if (alias.startsWith(prefix)) {
        return join(base, target.replace("*", alias.slice(prefix.length)));
      }
    } else if (alias === key) {
      return join(base, target);
    }
  }
  const match = alias.match(/^[@~#]\/(.*)$/);
  if (!match) {
    throw new CliError(
      `Cannot resolve the import alias "${alias}" to a directory.`,
      `Add a "paths" entry to tsconfig.json, or edit "aliases" in ${CONFIG_FILE}.`,
    );
  }
  const sourceRoot = existsSync(join(cwd, "src")) ? "src" : ".";
  return join(cwd, sourceRoot, match[1] ?? "");
}

export function readComponentsJson(cwd: string): ComponentsJson | undefined {
  return readJson<ComponentsJson>(join(cwd, "components.json"));
}

/** Builds a config from the project's existing setup. */
export function detectConfig(cwd: string, overrides: { css?: string; registry?: string } = {}) {
  const components = readComponentsJson(cwd);
  const prefix = detectImportPrefix(cwd);
  const ui =
    components?.aliases?.ui ??
    (components?.aliases?.components
      ? `${components.aliases.components}/ui`
      : `${prefix}components/ui`);
  const lib = components?.aliases?.lib ?? `${prefix}lib`;
  const css = overrides.css ?? components?.tailwind?.css ?? firstExisting(cwd, CSS_CANDIDATES);

  const config: BetonConfig = {
    registry: overrides.registry ?? DEFAULT_REGISTRY,
    ...(css ? { css } : {}),
    aliases: { ui, lib },
  };
  return config;
}

/** Adds the @beton namespace to components.json so `shadcn add @beton/<name>` works too. */
export function registerShadcnNamespace(cwd: string, registry: string): boolean {
  const file = join(cwd, "components.json");
  if (!existsSync(file) || !/^https?:\/\//.test(registry)) return false;
  const json = JSON.parse(readFileSync(file, "utf8")) as ComponentsJson;
  const url = `${registry.replace(/\/$/, "")}/{name}.json`;
  if (json.registries?.["@beton"] === url) return false;
  json.registries = { ...json.registries, "@beton": url };
  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
  return true;
}
