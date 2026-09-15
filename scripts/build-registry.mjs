#!/usr/bin/env node
// Generates the shadcn-compatible registry from component source.
//
//   node scripts/build-registry.mjs          write registry/
//   node scripts/build-registry.mjs --check  fail if registry/ is out of date
//   node scripts/build-registry.mjs --out <dir>  write elsewhere (e.g. a preview build)
//
// Nothing in registry/ is written by hand. Dependencies between items and on
// npm packages are derived from the imports in the source files.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { cssToObject } from "./lib/css-object.mjs";
import {
  IMPORTS,
  REGISTRY_HOMEPAGE,
  REGISTRY_NAME,
  REGISTRY_URL,
  TARGETS,
} from "./registry.config.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const reactSrc = join(root, "packages/react/src");
const recipesSrc = join(root, "packages/recipes/src");
const tokensCss = join(root, "packages/tokens/src/theme.css");
const outFlag = process.argv.indexOf("--out");
const outDir = outFlag > -1 ? resolve(process.argv[outFlag + 1]) : join(root, "registry");
const checkOnly = process.argv.includes("--check");

const ITEM_SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";
const REGISTRY_SCHEMA = "https://ui.shadcn.com/schema/registry.json";
const AUTHOR = "Nabaskar Brahma (https://github.com/nabrahma)";
const PEERS = new Set(["react", "react-dom"]);
const CORE_RECIPE_MODULES = new Set(["tv", "shared"]);
const itemUrl = (name) => `${REGISTRY_URL}/${name}.json`;
const posix = (p) => p.split("\\").join("/");
const stripExt = (p) => p.replace(/\.(ts|tsx)$/, "");
// Installed recipe files get a ".recipe" suffix. shadcn resolves imports by
// matching file names within one install, so recipes/button.ts would otherwise
// be confused with ui/beton/button.tsx.
const recipeModule = (mod) => `${IMPORTS.lib}/recipes/${mod}.recipe`;

// ------------------------------------------------------------------ helpers

const recipeIndex = readFileSync(join(recipesSrc, "index.ts"), "utf8");
const symbolToRecipe = new Map();
for (const m of recipeIndex.matchAll(/export\s*\{([^}]*)\}\s*from\s*"\.\/([\w-]+)\.ts"/g)) {
  for (const raw of m[1].split(",")) {
    const name = raw.trim().replace(/^type\s+/, "");
    if (name) symbolToRecipe.set(name, m[2]);
  }
}

function npmPackage(spec) {
  const parts = spec.split("/");
  return spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

const IMPORT_RE = /import\s+(type\s+)?([\s\S]*?)\s+from\s+"([^"]+)";/g;

/** Rewrites monorepo imports into portable alias imports and records dependencies. */
function transform(source, deps, { inRecipes = false } = {}) {
  return source.replace(IMPORT_RE, (full, typeKeyword = "", clause, spec) => {
    if (spec === "@beton-ui/recipes") {
      const names = clause
        .replace(/^\{|\}$/g, "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const groups = new Map();
      for (const name of names) {
        const bare = name.replace(/^type\s+/, "").split(/\s+as\s+/)[0];
        const mod = symbolToRecipe.get(bare);
        if (!mod) throw new Error(`"${bare}" is not exported from @beton-ui/recipes`);
        const target = CORE_RECIPE_MODULES.has(mod) ? `${IMPORTS.lib}/${mod}` : recipeModule(mod);
        if (!CORE_RECIPE_MODULES.has(mod)) deps.recipes.add(mod);
        groups.set(target, [...(groups.get(target) ?? []), name]);
      }
      return [...groups]
        .map(([target, list]) => `import ${typeKeyword}{ ${list.join(", ")} } from "${target}";`)
        .join("\n");
    }

    if (inRecipes && spec.startsWith("./")) {
      const mod = stripExt(basename(spec));
      if (CORE_RECIPE_MODULES.has(mod)) return full.replace(spec, `${IMPORTS.lib}/${mod}`);
      deps.recipes.add(mod);
      return full.replace(spec, recipeModule(mod));
    }

    if (spec.startsWith("../utils/")) {
      return full.replace(spec, `${IMPORTS.lib}/${stripExt(basename(spec))}`);
    }

    if (spec.startsWith("../")) {
      deps.components.add(spec.split("/")[1]);
      return full.replace(spec, `${IMPORTS.ui}/${stripExt(basename(spec))}`);
    }

    if (spec.startsWith("./")) {
      return full.replace(spec, `${IMPORTS.ui}/${stripExt(basename(spec))}`);
    }

    const pkg = npmPackage(spec);
    if (!PEERS.has(pkg) && !spec.startsWith("node:")) deps.npm.add(pkg);
    return full;
  });
}

const newDeps = () => ({ npm: new Set(), recipes: new Set(), components: new Set() });

// Peer dependencies that source never imports directly but needs installed.
const IMPLIED = { "tailwind-variants": ["tailwind-merge"] };
const withImplied = (set) => {
  for (const pkg of [...set]) for (const extra of IMPLIED[pkg] ?? []) set.add(extra);
  return sorted(set);
};
const sorted = (set) => [...set].sort();

// ------------------------------------------------------------------- theme

// shadcn writes cssVars.theme into @theme and applies css (keyframes, base
// layer) separately, so the stylesheet is split along those lines.
const { "@theme": themeBlock = {}, ...themeRest } = cssToObject(readFileSync(tokensCss, "utf8"));
const themeVars = {};
const themeCss = {};
for (const [key, value] of Object.entries(themeBlock)) {
  if (key.startsWith("--")) themeVars[key.slice(2)] = value;
  else themeCss[key] = value;
}
Object.assign(themeCss, themeRest);
const themeItem = {
  $schema: ITEM_SCHEMA,
  name: "theme",
  type: "registry:theme",
  title: "Béton theme",
  description:
    "Design tokens: palette, semantic colours, type scale, radii, hard shadows and motion.",
  author: AUTHOR,
  cssVars: { theme: themeVars },
  css: themeCss,
  docs: "Load Archivo, Public Sans and JetBrains Mono, for example with next/font or Fontsource.",
  categories: ["theme"],
};

// -------------------------------------------------------------------- core

const coreDeps = newDeps();
const coreFiles = [
  { src: join(recipesSrc, "tv.ts"), target: `${TARGETS.lib}/tv.ts`, inRecipes: true },
  { src: join(recipesSrc, "shared.ts"), target: `${TARGETS.lib}/shared.ts`, inRecipes: true },
  {
    src: join(reactSrc, "utils/render-element.ts"),
    target: `${TARGETS.lib}/render-element.ts`,
  },
].map(({ src, target, inRecipes }) => ({
  path: `registry/${REGISTRY_NAME}/lib/${basename(src)}`,
  type: "registry:lib",
  target,
  content: transform(readFileSync(src, "utf8"), coreDeps, { inRecipes }),
}));

const coreItem = {
  $schema: ITEM_SCHEMA,
  name: "core",
  type: "registry:lib",
  title: "Béton core",
  description: "Class merging, shared interaction styles and the render prop helper.",
  author: AUTHOR,
  dependencies: withImplied(coreDeps.npm),
  registryDependencies: [itemUrl("theme")],
  files: coreFiles,
  categories: ["lib"],
};

// -------------------------------------------------------------- components

const componentDirs = readdirSync(reactSrc, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(reactSrc, d.name, `${d.name}.meta.ts`)))
  .map((d) => d.name)
  .sort();

const componentItems = [];
for (const name of componentDirs) {
  const dir = join(reactSrc, name);
  const { meta } = await import(pathToFileURL(join(dir, `${name}.meta.ts`)).href);
  const deps = newDeps();

  const sources = readdirSync(dir)
    .filter((f) => /\.tsx?$/.test(f) && !/\.(test|meta)\.tsx?$/.test(f) && f !== "index.ts")
    .sort();

  const uiFiles = sources.map((file) => ({
    path: `registry/${REGISTRY_NAME}/ui/${file}`,
    type: "registry:ui",
    target: `${TARGETS.ui}/${file}`,
    content: transform(readFileSync(join(dir, file), "utf8"), deps),
  }));

  // A recipe named after another component ships with that component, which
  // becomes a registry dependency. Every other recipe ships with this item.
  for (const recipe of deps.recipes) {
    if (recipe !== name && componentDirs.includes(recipe)) deps.components.add(recipe);
  }
  const ownRecipes = sorted(deps.recipes).filter(
    (recipe) => recipe === name || !componentDirs.includes(recipe),
  );
  const recipeFiles = ownRecipes.map((recipe) => {
    const recipeDeps = newDeps();
    const content = transform(readFileSync(join(recipesSrc, `${recipe}.ts`), "utf8"), recipeDeps, {
      inRecipes: true,
    });
    return {
      path: `registry/${REGISTRY_NAME}/recipes/${recipe}.recipe.ts`,
      type: "registry:lib",
      target: `${TARGETS.lib}/recipes/${recipe}.recipe.ts`,
      content,
    };
  });

  const client = sources.some((f) =>
    readFileSync(join(dir, f), "utf8").trimStart().startsWith('"use client"'),
  );

  componentItems.push({
    $schema: ITEM_SCHEMA,
    name,
    type: "registry:ui",
    title: meta.title,
    description: meta.description,
    author: AUTHOR,
    dependencies: withImplied(deps.npm),
    registryDependencies: [
      itemUrl("core"),
      ...sorted(deps.components)
        .filter((c) => c !== name)
        .map(itemUrl),
    ],
    files: [...recipeFiles, ...uiFiles],
    categories: [meta.category],
    meta: {
      status: meta.status,
      client,
      exports: meta.exports,
      source: `https://github.com/nabrahma/Beton/tree/main/${posix(relative(root, dir))}`,
    },
  });
}

const allItem = {
  $schema: ITEM_SCHEMA,
  name: "all",
  type: "registry:item",
  title: "Every Béton component",
  description: "Installs the theme, core and every component.",
  author: AUTHOR,
  registryDependencies: componentItems.map((item) => itemUrl(item.name)),
  categories: ["bundle"],
};

// --------------------------------------------------------------- validation

// shadcn resolves imports by file name within one install, so every file that
// can land in the same install must have a unique base name.
const byName = new Map([themeItem, coreItem, ...componentItems].map((item) => [item.name, item]));
const closure = (item, seen = new Set()) => {
  if (seen.has(item.name)) return seen;
  seen.add(item.name);
  for (const url of item.registryDependencies ?? []) {
    const dependency = byName.get(url.match(/([\w-]+)\.json$/)?.[1]);
    if (dependency) closure(dependency, seen);
  }
  return seen;
};
for (const item of componentItems) {
  const owners = new Map();
  for (const name of closure(item)) {
    for (const file of byName.get(name).files ?? []) {
      const base = basename(file.target).replace(/\.(tsx?|jsx?|css)$/, "");
      if (owners.has(base)) {
        throw new Error(
          `"${item.name}" installs two files named "${base}" (${owners.get(base)} and ${file.target}). ` +
            "shadcn would resolve imports between them incorrectly.",
        );
      }
      owners.set(base, file.target);
    }
  }
}

// ------------------------------------------------------------------ output

const items = [themeItem, coreItem, ...componentItems, allItem];
const registry = {
  $schema: REGISTRY_SCHEMA,
  name: REGISTRY_NAME,
  homepage: REGISTRY_HOMEPAGE,
  items: items.map(({ $schema: _schema, files, ...rest }) => ({
    ...rest,
    ...(files ? { files: files.map(({ content: _content, ...file }) => file) } : {}),
  })),
};

const outputs = new Map([
  [join(outDir, "registry.json"), registry],
  ...items.map((item) => [join(outDir, "r", `${item.name}.json`), item]),
]);

const serialize = (value) => `${JSON.stringify(value, null, 2)}\n`;

if (checkOnly) {
  const stale = [];
  for (const [file, value] of outputs) {
    if (!existsSync(file) || readFileSync(file, "utf8") !== serialize(value)) {
      stale.push(posix(relative(root, file)));
    }
  }
  const expected = new Set([...outputs.keys()].map((f) => posix(relative(root, f))));
  const rDir = join(outDir, "r");
  if (existsSync(rDir)) {
    for (const f of readdirSync(rDir)) {
      const p = posix(relative(root, join(rDir, f)));
      if (!expected.has(p)) stale.push(`${p} (orphaned)`);
    }
  }
  if (stale.length) {
    console.error("Registry is out of date. Run `pnpm registry:build` and commit the result:");
    for (const s of stale) console.error(`  ${s}`);
    process.exit(1);
  }
  console.log(`Registry is up to date (${items.length} items).`);
} else {
  rmSync(join(outDir, "r"), { recursive: true, force: true });
  for (const [file, value] of outputs) {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, serialize(value));
  }
  console.log(`Wrote ${items.length} registry items to ${posix(relative(root, outDir))}/`);
  for (const item of items) {
    const deps = item.dependencies?.length ? `  npm: ${item.dependencies.join(", ")}` : "";
    console.log(
      `  ${item.name.padEnd(10)} ${(item.files?.length ?? 0).toString().padStart(2)} files${deps}`,
    );
  }
}
