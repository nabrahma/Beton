import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { type BetonConfig, CONFIG_FILE, loadConfig, resolveAliasPath } from "../config.ts";
import { installTheme, themeFromItem } from "../css.ts";
import { toPosix } from "../fs-utils.ts";
import { CliError, color, log } from "../logger.ts";
import {
  detectPackageManager,
  installCommand,
  installPackages,
  missingPackages,
} from "../packages.ts";
import { Registry, type RegistryItem } from "../registry.ts";
import { rewriteImports, splitTarget } from "../transform.ts";

export interface AddOptions {
  cwd: string;
  overwrite: boolean;
  install: boolean;
  dryRun: boolean;
  registry?: string;
  config?: BetonConfig;
}

export interface AddResult {
  written: string[];
  skipped: string[];
  packages: string[];
  items: RegistryItem[];
}

function safeJoin(root: string, rest: string): string {
  const target = resolve(root, rest);
  if (target !== root && !target.startsWith(root + sep)) {
    throw new CliError(`Refusing to write outside ${root}: ${rest}`);
  }
  return target;
}

export async function add(names: string[], options: AddOptions): Promise<AddResult> {
  const { cwd } = options;
  const config = options.config ?? loadConfig(cwd);
  if (!config) {
    throw new CliError(`No ${CONFIG_FILE} found in ${cwd}.`, "Run `npx beton-ui init` first.");
  }
  if (!names.length) {
    throw new CliError("No components given.", "Example: npx beton-ui add button card");
  }

  const registry = new Registry(options.registry ?? config.registry, cwd);
  const items = await registry.resolveTree(names);
  const dirs = {
    ui: resolveAliasPath(cwd, config.aliases.ui),
    lib: resolveAliasPath(cwd, config.aliases.lib),
  };

  const result: AddResult = { written: [], skipped: [], packages: [], items };

  for (const item of items) {
    if (item.css || item.cssVars) {
      if (!config.css) {
        log.warn(`No stylesheet configured; skipping the theme. Set "css" in ${CONFIG_FILE}.`);
      } else if (!options.dryRun) {
        const theme = installTheme(cwd, config.css, themeFromItem(item), options.overwrite);
        const themeFile = toPosix(relative(cwd, theme.themePath));
        if (theme.theme === "written") result.written.push(themeFile);
        if (theme.theme === "kept") result.skipped.push(themeFile);
        if (theme.addedImport) log.step(`Imported ${themeFile} in ${config.css}`);
      }
    }

    for (const file of item.files ?? []) {
      if (!file.target) continue;
      const { alias, rest } = splitTarget(file.target);
      const destination = safeJoin(dirs[alias], rest);
      const display = toPosix(relative(cwd, destination));
      const content = rewriteImports(file.content, config.aliases);

      if (existsSync(destination) && !options.overwrite) {
        if (readFileSync(destination, "utf8") !== content) result.skipped.push(display);
        continue;
      }
      if (!options.dryRun) {
        mkdirSync(dirname(destination), { recursive: true });
        writeFileSync(destination, content);
      }
      result.written.push(display);
    }

    result.packages.push(...(item.dependencies ?? []));
  }

  result.packages = missingPackages(cwd, result.packages);

  const requested = items
    .filter((item) => names.some((n) => n.endsWith(item.name)))
    .map((i) => i.name);
  log.blank();
  for (const file of result.written)
    log.success(`${options.dryRun ? "Would write" : "Wrote"} ${file}`);
  for (const file of result.skipped) {
    log.warn(`Kept your changes to ${file} ${color.dim("(use --overwrite to replace)")}`);
  }

  if (result.packages.length) {
    const manager = detectPackageManager(cwd);
    if (options.install && !options.dryRun) {
      log.step(`Installing ${result.packages.join(", ")} with ${manager}`);
      await installPackages(cwd, manager, result.packages);
    } else {
      const [command, args] = installCommand(manager, result.packages);
      log.info(`\nInstall the dependencies: ${color.bold(`${command} ${args.join(" ")}`)}`);
    }
  }

  log.blank();
  log.success(`Added ${requested.join(", ") || names.join(", ")}.`);
  return result;
}
