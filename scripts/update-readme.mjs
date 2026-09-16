#!/usr/bin/env node
// Fills the generated block in README.md from the registry and the test
// results, so the numbers on the front page are measured rather than claimed.
//
//   node scripts/update-readme.mjs          rewrite the block
//   node scripts/update-readme.mjs --check  fail if it is out of date
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { format } from "prettier";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const START = "<!-- generated:start -->";
const END = "<!-- generated:end -->";

const registry = JSON.parse(readFileSync(join(root, "registry/registry.json"), "utf8"));
const a11y = JSON.parse(readFileSync(join(root, "apps/docs/generated/a11y.json"), "utf8"));

const components = registry.items.filter((item) => item.type === "registry:ui").length;
const blocks = registry.items.filter((item) => item.type === "registry:block").length;

const results = Object.values(a11y.components);
const tests = results.reduce((total, result) => total + result.total, 0);
const passed = results.reduce((total, result) => total + result.passed, 0);
const axe = results.reduce((total, result) => total + (result.tags.axe?.total ?? 0), 0);

/** shields.io separates its fields with dashes, so everything else is encoded. */
const badge = (label, message, colour) =>
  `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(
    message,
  )}-${colour}?style=flat-square&labelColor=000000`;

const block = [
  START,
  "",
  `[![Components](${badge("components", String(components), "00c2cb")})](https://beton.dev/docs/components)`,
  `[![Blocks](${badge("blocks", String(blocks), "ffc700")})](https://beton.dev/docs/blocks)`,
  `[![Tests](${badge("tests", `${passed}/${tests} passing`, "3edba0")})](https://beton.dev/docs/accessibility)`,
  `[![Axe](${badge("axe checks", String(axe), "3edba0")})](https://beton.dev/docs/accessibility)`,
  "",
  `| | |`,
  `| --- | --- |`,
  `| Components | ${components} |`,
  `| Blocks | ${blocks} |`,
  `| Component tests | ${tests}, all passing |`,
  `| Axe checks in the component tests | ${axe} |`,
  "",
  END,
].join("\n");

const path = join(root, "README.md");
const readme = readFileSync(path, "utf8");
const start = readme.indexOf(START);
const end = readme.indexOf(END);
if (start === -1 || end === -1) {
  console.error(`README.md is missing the ${START} / ${END} markers.`);
  process.exit(1);
}

// Formatted here, so the result agrees with `pnpm format:check`.
const next = await format(readme.slice(0, start) + block + readme.slice(end + END.length), {
  filepath: path,
});

if (process.argv.includes("--check")) {
  if (next !== readme) {
    console.error("README badges are out of date. Run `pnpm readme:build` and commit the result.");
    process.exit(1);
  }
  console.log("README badges are up to date.");
} else {
  writeFileSync(path, next);
  console.log(`README badges updated: ${components} components, ${blocks} blocks, ${tests} tests.`);
}
