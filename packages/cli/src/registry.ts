import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";
import { DEFAULT_REGISTRY } from "./config.ts";
import { CliError } from "./logger.ts";

export interface RegistryFile {
  path: string;
  type: string;
  target?: string;
  content: string;
}

export interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
  cssVars?: { theme?: Record<string, string>; light?: Record<string, string> };
  css?: Record<string, never>;
  docs?: string;
  categories?: string[];
  meta?: Record<string, unknown>;
}

export interface RegistryIndex {
  name: string;
  homepage: string;
  items: Omit<RegistryItem, "files">[];
}

const isUrl = (value: string) => /^https?:\/\//.test(value);
const trim = (value: string) => value.replace(/\/$/, "");

export class Registry {
  private readonly base: string;
  private readonly cache = new Map<string, RegistryItem>();

  constructor(
    base: string,
    private readonly cwd: string = process.cwd(),
  ) {
    this.base = isUrl(base) ? trim(base) : resolve(cwd, base);
  }

  /** Maps a registry dependency to a source, pointing Béton items at the configured base. */
  locate(reference: string): string {
    if (isUrl(reference)) {
      const own = reference.match(/^(.*)\/([\w-]+)\.json$/);
      if (own && (trim(own[1] ?? "") === DEFAULT_REGISTRY || trim(own[1] ?? "") === this.base)) {
        return this.itemLocation(own[2] ?? "");
      }
      return reference;
    }
    if (reference.startsWith("@beton/"))
      return this.itemLocation(reference.slice("@beton/".length));
    if (/^[\w-]+$/.test(reference)) return this.itemLocation(reference);
    throw new CliError(
      `Unsupported registry dependency "${reference}".`,
      "Béton items depend only on other Béton items or on full registry URLs.",
    );
  }

  private itemLocation(name: string): string {
    return isUrl(this.base) ? `${this.base}/${name}.json` : join(this.base, `${name}.json`);
  }

  private async read(location: string): Promise<string> {
    if (isUrl(location)) {
      let response: Response;
      try {
        response = await fetch(location, { headers: { accept: "application/json" } });
      } catch (error) {
        throw new CliError(`Could not reach ${location}.`, (error as Error).message);
      }
      if (response.status === 404) throw new CliError(`Not found in the registry: ${location}`);
      if (!response.ok)
        throw new CliError(`Registry request failed (${response.status}): ${location}`);
      return response.text();
    }
    const path = isAbsolute(location) ? location : resolve(this.cwd, location);
    if (!existsSync(path)) throw new CliError(`Not found in the registry: ${path}`);
    return readFileSync(path, "utf8");
  }

  async item(reference: string): Promise<RegistryItem> {
    const location = this.locate(reference);
    const cached = this.cache.get(location);
    if (cached) return cached;
    const item = JSON.parse(await this.read(location)) as RegistryItem;
    this.cache.set(location, item);
    return item;
  }

  async index(): Promise<RegistryIndex> {
    const location = isUrl(this.base)
      ? `${this.base}/registry.json`
      : join(this.base, "..", "registry.json");
    const fallback = isUrl(this.base)
      ? `${this.base}/index.json`
      : join(this.base, "registry.json");
    try {
      return JSON.parse(await this.read(location)) as RegistryIndex;
    } catch {
      return JSON.parse(await this.read(fallback)) as RegistryIndex;
    }
  }

  /** Resolves items and all their dependencies, dependencies first, without duplicates. */
  async resolveTree(references: string[]): Promise<RegistryItem[]> {
    const ordered: RegistryItem[] = [];
    const visiting = new Set<string>();
    const done = new Set<string>();

    const visit = async (reference: string, chain: string[]) => {
      const key = this.locate(reference);
      if (done.has(key)) return;
      if (visiting.has(key)) {
        throw new CliError(`Circular registry dependency: ${[...chain, reference].join(" → ")}`);
      }
      visiting.add(key);
      const item = await this.item(reference);
      for (const dependency of item.registryDependencies ?? []) {
        await visit(dependency, [...chain, item.name]);
      }
      visiting.delete(key);
      done.add(key);
      ordered.push(item);
    };

    for (const reference of references) await visit(reference, []);
    return ordered;
  }
}
