#!/usr/bin/env node
// Asserts every colour pairing the design system allows meets WCAG 2.2 AA,
// and that recipes never use an accent colour as text (accents fail on paper).
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(root, "packages/tokens/src/theme.css"), "utf8");

const raw = {};
for (const [, name, value] of css.matchAll(/--color-([a-z-]+):\s*([^;]+);/g))
  raw[name] = value.trim();

function resolve(name, seen = new Set()) {
  const value = raw[name];
  if (!value) throw new Error(`Unknown colour token: ${name}`);
  const ref = value.match(/^var\(--color-([a-z-]+)\)$/);
  if (!ref) return value;
  if (seen.has(name)) throw new Error(`Circular token: ${name}`);
  seen.add(name);
  return resolve(ref[1], seen);
}

function luminance(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(full.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// [foreground, background, minimum ratio, reason]
const TEXT = 4.5;
const NON_TEXT = 3;
const pairs = [
  ["foreground", "surface", TEXT, "body text on paper"],
  ["foreground", "raised", TEXT, "text on raised surfaces"],
  ["foreground", "primary", TEXT, "ink on primary fill"],
  ["foreground", "secondary", TEXT, "ink on secondary fill"],
  ["foreground", "danger", TEXT, "ink on danger fill"],
  ["foreground", "success", TEXT, "ink on success fill"],
  ["foreground", "warning", TEXT, "ink on warning fill"],
  ["disabled-foreground", "disabled", TEXT, "disabled label on disabled fill"],
  ["border", "surface", NON_TEXT, "strokes on paper"],
  ["border", "raised", NON_TEXT, "strokes on raised surfaces"],
  ["focus", "focus-gap", NON_TEXT, "focus ring against its gap"],
];

let failures = 0;
const rows = pairs.map(([fg, bg, min, reason]) => {
  const ratio = contrast(resolve(fg), resolve(bg));
  const pass = ratio >= min;
  if (!pass) failures++;
  return { pair: `${fg} on ${bg}`, ratio: ratio.toFixed(2), min, pass, reason };
});

// Accents are forbidden as text colour in recipes.
const accentText =
  /(?<![\w-])(?:[a-z-]+:)*text-(teal|magenta|yellow|mint|primary|secondary|danger|success|warning)(?![\w-])/g;
const recipesDir = join(root, "packages/recipes/src");
const violations = [];
if (existsSync(recipesDir)) {
  for (const file of readdirSync(recipesDir, { recursive: true })) {
    if (!/\.ts$/.test(file) || /\.test\.ts$/.test(file)) continue;
    const source = readFileSync(join(recipesDir, file), "utf8");
    for (const m of source.matchAll(accentText)) violations.push(`${file}: ${m[0]}`);
  }
}

console.log("\nBéton contrast check (WCAG 2.2 AA)\n");
for (const r of rows) {
  console.log(
    `${r.pass ? "PASS" : "FAIL"}  ${r.ratio.padStart(5)}:1  (min ${r.min}:1)  ${r.pair.padEnd(34)} ${r.reason}`,
  );
}
for (const accent of ["primary", "secondary", "danger", "success"]) {
  const ratio = contrast(resolve(accent), resolve("surface"));
  console.log(`INFO  ${ratio.toFixed(2).padStart(5)}:1  ${accent} as text on paper: not allowed`);
}
if (violations.length) {
  console.log("\nAccent colours used as text in recipes:");
  for (const v of violations) console.log(`FAIL  ${v}`);
}

const total = failures + violations.length;
console.log(total ? `\n${total} contrast problem(s).` : "\nAll pairs pass.");
process.exit(total ? 1 : 0);
