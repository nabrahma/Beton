import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as recipes from "./index.ts";
import { cn } from "./tv.ts";

type AnyRecipe = ((props?: Record<string, unknown>) => unknown) & {
  variantKeys?: string[];
  variants?: Record<string, Record<string, unknown>>;
};

const recipeNames = [
  "accordion",
  "alert",
  "avatar",
  "backToTop",
  "badge",
  "breadcrumbs",
  "button",
  "calendar",
  "card",
  "checkbox",
  "codeBlock",
  "commandPalette",
  "descriptionList",
  "dialog",
  "emptyState",
  "field",
  "fileUpload",
  "form",
  "heading",
  "hoverCard",
  "input",
  "kbd",
  "label",
  "list",
  "menu",
  "menubar",
  "navbar",
  "numberInput",
  "otpInput",
  "pagination",
  "popover",
  "progress",
  "radioGroup",
  "scrollArea",
  "searchInput",
  "select",
  "separator",
  "sheet",
  "sidebar",
  "skeleton",
  "slider",
  "spinner",
  "stat",
  "stepper",
  "switchStyles",
  "table",
  "tabs",
  "text",
  "textarea",
  "timeline",
  "toast",
  "tooltip",
] as const;

function combinations(variants: Record<string, Record<string, unknown>>) {
  let combos: Record<string, string | boolean>[] = [{}];
  for (const [key, options] of Object.entries(variants)) {
    const values = Object.keys(options).map((v) =>
      v === "true" ? true : v === "false" ? false : v,
    );
    combos = combos.flatMap((combo) => values.map((value) => ({ ...combo, [key]: value })));
  }
  return combos;
}

function render(output: unknown): unknown {
  if (typeof output === "string") return output;
  // Slot recipes return an object of slot functions.
  return Object.fromEntries(
    Object.entries(output as Record<string, () => string>).map(([slot, fn]) => [slot, fn()]),
  );
}

describe("recipe snapshots", () => {
  for (const name of recipeNames) {
    it(`${name} output is stable for every variant combination`, () => {
      const recipe = recipes[name] as unknown as AnyRecipe;
      const output = combinations(recipe.variants ?? {}).map((props) => ({
        props,
        classes: render(recipe(props)),
      }));
      expect(output).toMatchSnapshot();
    });
  }
});

describe("class merging", () => {
  it("lets className override recipe classes", () => {
    expect(recipes.button({ class: "bg-secondary" })).toContain("bg-secondary");
    expect(recipes.button({ class: "bg-secondary" })).not.toMatch(/(^|\s)bg-primary(\s|$)/);
  });

  it("understands Béton type tokens as font sizes, not colours", () => {
    expect(cn("text-h4 text-foreground", "text-h1")).toBe("text-foreground text-h1");
  });

  it("understands Béton shadows and radii", () => {
    expect(cn("shadow-sm rounded-md", "shadow-lg rounded-lg")).toBe("shadow-lg rounded-lg");
  });
});

describe("design law", () => {
  const allClasses = recipeNames
    .flatMap((name) => {
      const recipe = recipes[name] as unknown as AnyRecipe;
      return combinations(recipe.variants ?? {}).map((props) =>
        JSON.stringify(render(recipe(props))),
      );
    })
    .join(" ");

  it("uses only the three permitted radii", () => {
    const radii = allClasses.match(/rounded(-[a-z]+)*-?(\w+)?/g) ?? [];
    for (const r of radii)
      expect(r).toMatch(/^rounded(-(t|b|l|r|s|e|tl|tr|bl|br))?(-(none|md|lg))?$/);
  });

  it("never uses blurred shadows or opacity-based disabled states", () => {
    expect(allClasses).not.toMatch(/shadow-(xs|md|xl|2xl|inner)\b/);
    expect(allClasses).not.toMatch(/disabled:opacity-/);
  });

  it("writes every class in full so Tailwind's scanner can find it", () => {
    const dir = new URL(".", import.meta.url);
    for (const file of readdirSync(dir).filter(
      (f) => f.endsWith(".ts") && !f.endsWith(".test.ts"),
    )) {
      const source = readFileSync(new URL(file, dir), "utf8");
      expect(source, `${file} builds class names with template interpolation`).not.toMatch(
        /`[^`]*\$\{/,
      );
    }
  });

  it("never uses easing curves other than linear", () => {
    expect(allClasses).not.toMatch(/\bease-(in|out|in-out)\b/);
  });
});
