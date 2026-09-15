import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  CONFIG_FILE,
  CSS_CANDIDATES,
  detectConfig,
  loadConfig,
  registerShadcnNamespace,
  resolveAliasPath,
  writeConfig,
} from "../config.ts";
import { toPosix } from "../fs-utils.ts";
import { CliError, color, log } from "../logger.ts";
import { tailwindMajor } from "../packages.ts";
import { add } from "./add.ts";

export interface InitOptions {
  cwd: string;
  css?: string;
  registry?: string;
  force: boolean;
  install: boolean;
}

export async function init(options: InitOptions): Promise<void> {
  const { cwd } = options;
  if (!existsSync(join(cwd, "package.json"))) {
    throw new CliError(
      `No package.json in ${cwd}.`,
      "Run this inside your project, or pass --cwd.",
    );
  }

  const major = tailwindMajor(cwd);
  if (major === undefined) {
    log.warn("Tailwind CSS was not found in package.json. Béton requires Tailwind CSS v4.");
  } else if (major < 4) {
    throw new CliError(
      `Tailwind CSS v${major} detected. Béton requires Tailwind CSS v4.`,
      "Upgrade with: npx @tailwindcss/upgrade",
    );
  }

  const existing = loadConfig(cwd);
  if (existing && !options.force) {
    log.info(`${CONFIG_FILE} already exists. Re-run with --force to regenerate it.`);
  }

  const config =
    existing && !options.force
      ? existing
      : detectConfig(cwd, { css: options.css, registry: options.registry });

  if (!config.css) {
    throw new CliError(
      "Could not find your global stylesheet.",
      `Pass it with --css, e.g. --css src/index.css. Looked for: ${CSS_CANDIDATES.join(", ")}`,
    );
  }
  if (!existsSync(join(cwd, config.css))) {
    throw new CliError(`Stylesheet not found: ${config.css}`);
  }

  if (!existing || options.force) {
    writeConfig(cwd, config);
    log.success(`Wrote ${CONFIG_FILE}`);
  }
  log.step(
    `Components  ${color.bold(config.aliases.ui)} → ${toPosix(resolveAliasPath(cwd, config.aliases.ui))}`,
  );
  log.step(
    `Library     ${color.bold(config.aliases.lib)} → ${toPosix(resolveAliasPath(cwd, config.aliases.lib))}`,
  );
  log.step(`Stylesheet  ${color.bold(config.css)}`);

  if (registerShadcnNamespace(cwd, config.registry)) {
    log.step("Registered @beton in components.json, so `shadcn add @beton/<name>` works too.");
  }

  await add(["core"], {
    cwd,
    config,
    overwrite: options.force,
    install: options.install,
    dryRun: false,
    registry: options.registry,
  });

  log.info(
    [
      "",
      color.bold("Next steps"),
      `  1. Load the fonts: Archivo, Public Sans and JetBrains Mono ${color.dim("(next/font or @fontsource)")}.`,
      `  2. Add components: ${color.bold("npx beton-ui add button card")}`,
      "",
    ].join("\n"),
  );
}
