import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { add } from "./commands/add.ts";
import { init } from "./commands/init.ts";
import { detectConfig, resolveAliasPath } from "./config.ts";
import { installTheme, objectToCss } from "./css.ts";
import { parseJsonc } from "./fs-utils.ts";
import { installCommand, isValidPackageSpec } from "./packages.ts";
import { Registry } from "./registry.ts";
import { rewriteImports } from "./transform.ts";

const REGISTRY = join(import.meta.dirname, "../../../registry/r");

let project: string;

function write(path: string, content: string) {
  const full = join(project, path);
  mkdirSync(join(full, ".."), { recursive: true });
  writeFileSync(full, content);
}

beforeEach(() => {
  project = mkdtempSync(join(tmpdir(), "beton-cli-"));
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  rmSync(project, { recursive: true, force: true });
  vi.restoreAllMocks();
});

describe("parseJsonc", () => {
  it("handles comments, trailing commas and slashes inside strings", () => {
    expect(
      parseJsonc(`{
        // comment
        "paths": { "@/*": ["./src/*"], }, /* block */
        "url": "https://example.com//x",
      }`),
    ).toEqual({ paths: { "@/*": ["./src/*"] }, url: "https://example.com//x" });
  });
});

describe("aliases", () => {
  it("resolves aliases through tsconfig paths", () => {
    write("tsconfig.json", `{ "compilerOptions": { "paths": { "~/*": ["./app/*"] } } }`);
    expect(resolveAliasPath(project, "~/components/ui")).toBe(join(project, "app/components/ui"));
  });

  it("reads paths from tsconfig.app.json in Vite projects", () => {
    write("tsconfig.json", `{ "files": [], "references": [{ "path": "./tsconfig.app.json" }] }`);
    write(
      "tsconfig.app.json",
      `{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./src/*"] } } }`,
    );
    expect(resolveAliasPath(project, "@/lib")).toBe(join(project, "src/lib"));
  });

  it("falls back to src/ when there are no paths", () => {
    mkdirSync(join(project, "src"));
    expect(resolveAliasPath(project, "@/lib")).toBe(join(project, "src/lib"));
  });

  it("uses shadcn aliases and stylesheet from components.json", () => {
    write(
      "components.json",
      JSON.stringify({
        tailwind: { css: "app/globals.css" },
        aliases: { components: "#/components", lib: "#/lib" },
      }),
    );
    expect(detectConfig(project)).toMatchObject({
      css: "app/globals.css",
      aliases: { ui: "#/components/ui", lib: "#/lib" },
    });
  });
});

describe("rewriteImports", () => {
  it("maps canonical registry imports to project aliases", () => {
    const source = [
      'import { Spinner } from "@/components/ui/beton/spinner";',
      'import { cn } from "@/lib/beton/tv";',
      'import { Button } from "@base-ui/react/button";',
      'const lazy = import("@/lib/beton/shared");',
    ].join("\n");
    const out = rewriteImports(source, { ui: "~/ui", lib: "~/utils" });
    expect(out).toContain('from "~/ui/beton/spinner"');
    expect(out).toContain('from "~/utils/beton/tv"');
    expect(out).toContain('from "@base-ui/react/button"');
    expect(out).toContain('import("~/utils/beton/shared")');
  });
});

describe("css", () => {
  it("serialises nested rules", () => {
    expect(
      objectToCss({
        "@theme": { "--color-ink": "#000", "@keyframes x": { to: { opacity: "1" } } },
      }),
    ).toBe(
      "@theme {\n  --color-ink: #000;\n  @keyframes x {\n    to {\n      opacity: 1;\n    }\n  }\n}",
    );
  });

  it("imports the theme right after tailwindcss, once", () => {
    write("src/index.css", '@import "tailwindcss";\n\nbody { margin: 0; }\n');
    installTheme(project, "src/index.css", { "@theme": { "--color-ink": "#000" } }, false);
    installTheme(project, "src/index.css", { "@theme": { "--color-ink": "#000" } }, false);
    const css = readFileSync(join(project, "src/index.css"), "utf8");
    expect(css).toBe('@import "tailwindcss";\n@import "./beton.css";\n\nbody { margin: 0; }\n');
    expect(readFileSync(join(project, "src/beton.css"), "utf8")).toContain("--color-ink: #000;");
  });
});

describe("package safety", () => {
  it("accepts real package names and rejects shell metacharacters", () => {
    expect(isValidPackageSpec("@base-ui/react")).toBe(true);
    expect(isValidPackageSpec("tailwind-merge@^3.7.0")).toBe(true);
    expect(isValidPackageSpec("left-pad && rm -rf /")).toBe(false);
    expect(isValidPackageSpec("x;calc")).toBe(false);
    expect(() => installCommand("npm", ["ok", "$(whoami)"])).toThrow(/invalid package/);
  });
});

describe("registry", () => {
  it("maps canonical Béton URLs to the configured registry", () => {
    const registry = new Registry(REGISTRY, project);
    expect(registry.locate("https://beton.dev/r/spinner.json")).toBe(
      join(REGISTRY, "spinner.json"),
    );
    expect(registry.locate("@beton/card")).toBe(join(REGISTRY, "card.json"));
    expect(registry.locate("https://other.dev/r/x.json")).toBe("https://other.dev/r/x.json");
  });

  it("resolves dependencies first, without duplicates", async () => {
    const items = await new Registry(REGISTRY, project).resolveTree(["button", "spinner"]);
    const names = items.map((item) => item.name);
    expect(names).toEqual(["theme", "core", "spinner", "button"]);
  });

  it("refuses targets that escape the project", async () => {
    const evil = join(project, "evil-registry");
    mkdirSync(evil);
    writeFileSync(
      join(evil, "evil.json"),
      JSON.stringify({
        name: "evil",
        type: "registry:ui",
        files: [
          { path: "x", type: "registry:ui", target: "@ui/../../../outside.tsx", content: "" },
        ],
      }),
    );
    write("package.json", "{}");
    write("tsconfig.json", `{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }`);
    await expect(
      add(["evil"], {
        cwd: project,
        registry: evil,
        overwrite: false,
        install: false,
        dryRun: false,
        config: { registry: evil, aliases: { ui: "@/components/ui", lib: "@/lib" } },
      }),
    ).rejects.toThrow(/outside/);
  });
});

describe("init and add, end to end", () => {
  beforeEach(() => {
    write(
      "package.json",
      JSON.stringify({
        dependencies: { react: "^19.0.0", tailwindcss: "^4.3.0", "@base-ui/react": "^1.8.0" },
      }),
    );
    write("tsconfig.json", `{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }`);
    write("src/app/globals.css", '@import "tailwindcss";\n');
  });

  it("sets up the theme, core utilities and config", async () => {
    await init({ cwd: project, registry: REGISTRY, force: false, install: false });

    expect(JSON.parse(readFileSync(join(project, "beton.json"), "utf8"))).toMatchObject({
      css: "src/app/globals.css",
      aliases: { ui: "@/components/ui", lib: "@/lib" },
    });
    expect(readFileSync(join(project, "src/app/globals.css"), "utf8")).toContain(
      '@import "./beton.css";',
    );
    expect(readFileSync(join(project, "src/app/beton.css"), "utf8")).toContain("--color-primary");
    for (const file of ["tv.ts", "shared.ts", "render-element.ts"]) {
      expect(existsSync(join(project, "src/lib/beton", file))).toBe(true);
    }
  });

  it("adds a component with its recipe, dependencies and rewritten imports", async () => {
    await init({ cwd: project, registry: REGISTRY, force: false, install: false });
    const result = await add(["button"], {
      cwd: project,
      overwrite: false,
      install: false,
      dryRun: false,
    });

    const button = readFileSync(join(project, "src/components/ui/beton/button.tsx"), "utf8");
    expect(button).toContain('from "@/lib/beton/recipes/button.recipe"');
    expect(button).toContain('from "@/components/ui/beton/spinner"');
    expect(button).not.toContain("@beton-ui/");
    expect(existsSync(join(project, "src/components/ui/beton/spinner.tsx"))).toBe(true);
    expect(existsSync(join(project, "src/lib/beton/recipes/spinner.recipe.ts"))).toBe(true);
    // Already declared in package.json, so nothing to install for Base UI.
    expect(result.packages).toEqual(["tailwind-merge", "tailwind-variants"]);
  });

  it("keeps local edits unless --overwrite is passed", async () => {
    await init({ cwd: project, registry: REGISTRY, force: false, install: false });
    await add(["badge"], { cwd: project, overwrite: false, install: false, dryRun: false });
    const file = join(project, "src/components/ui/beton/badge.tsx");
    writeFileSync(file, "// customised\n");

    const again = await add(["badge"], {
      cwd: project,
      overwrite: false,
      install: false,
      dryRun: false,
    });
    expect(readFileSync(file, "utf8")).toBe("// customised\n");
    // Only the edited file is reported; untouched files such as the theme are not.
    expect(again.skipped).toEqual(["src/components/ui/beton/badge.tsx"]);

    await add(["badge"], { cwd: project, overwrite: true, install: false, dryRun: false });
    expect(readFileSync(file, "utf8")).toContain("export function Badge");
  });

  it("registers the @beton namespace in an existing components.json", async () => {
    write("components.json", JSON.stringify({ aliases: { components: "@/components" } }));
    await init({
      cwd: project,
      registry: "https://beton.dev/r",
      force: false,
      install: false,
    }).catch(() => {
      // The remote registry is not reachable in tests; only the config step matters here.
    });
    const components = JSON.parse(readFileSync(join(project, "components.json"), "utf8"));
    expect(components.registries).toEqual({ "@beton": "https://beton.dev/r/{name}.json" });
  });
});
