#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { add } from "./commands/add.ts";
import { init } from "./commands/init.ts";
import { list } from "./commands/list.ts";
import { CliError, color, log } from "./logger.ts";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
  version: string;
};

const HELP = `
${color.bold("beton-ui")} ${color.dim(`v${pkg.version}`)}  Neobrutalist components for React.

${color.bold("Usage")}
  npx beton-ui init                 Set up the theme and shared utilities
  npx beton-ui add <names...>       Add components to your project
  npx beton-ui list                 Show every available component

${color.bold("Options")}
  --cwd <dir>        Project directory (default: current directory)
  --registry <url>   Registry URL or local directory
  --css <file>       Global stylesheet that imports Tailwind (init)
  --overwrite        Replace files you have already changed (add)
  --force            Regenerate beton.json and theme files (init)
  --no-install       Print the install command instead of running it
  --dry-run          Show what would change without writing (add)
  -v, --version      Print the version
  -h, --help         Show this help

${color.bold("Examples")}
  npx beton-ui init --css src/index.css
  npx beton-ui add button card input
  npx shadcn@latest add @beton/button   ${color.dim("# also works")}
`;

async function main(argv: string[]) {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      cwd: { type: "string" },
      registry: { type: "string" },
      css: { type: "string" },
      overwrite: { type: "boolean", default: false },
      force: { type: "boolean", default: false },
      "no-install": { type: "boolean", default: false },
      "dry-run": { type: "boolean", default: false },
      version: { type: "boolean", short: "v", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  });

  const [command, ...names] = positionals;
  const cwd = resolve(values.cwd ?? process.cwd());

  if (values.version) return log.info(pkg.version);
  if (values.help || !command) return log.info(HELP);

  switch (command) {
    case "init":
      return init({
        cwd,
        css: values.css,
        registry: values.registry,
        force: values.force,
        install: !values["no-install"],
      });
    case "add":
      await add(names, {
        cwd,
        registry: values.registry,
        overwrite: values.overwrite,
        install: !values["no-install"],
        dryRun: values["dry-run"],
      });
      return;
    case "list":
      return list({ cwd, registry: values.registry });
    default:
      throw new CliError(`Unknown command "${command}".`, "Run `npx beton-ui --help`.");
  }
}

main(process.argv.slice(2)).catch((error: unknown) => {
  if (error instanceof CliError) {
    log.error(error.message);
    if (error.hint) log.info(color.dim(`  ${error.hint}`));
  } else {
    log.error(error instanceof Error ? (error.stack ?? error.message) : String(error));
  }
  process.exit(1);
});
