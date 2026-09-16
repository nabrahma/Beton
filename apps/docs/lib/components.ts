import "server-only";

import type { ComponentCategory, ComponentMeta } from "../../../packages/react/src/meta.types.ts";
import a11yData from "@/generated/a11y.json";
import { componentMetas } from "@/generated/components";
import examplesData from "@/generated/examples.json";
import propsData from "@/generated/props.json";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type { ComponentMeta };

export interface ExampleInfo {
  id: string;
  title: string;
  description: string;
  source: string;
}

export interface PropInfo {
  name: string;
  type: string;
  default: string | null;
  required: boolean;
  description: string;
  inherited: boolean;
}

export interface A11yResult {
  total: number;
  passed: number;
  tags: Partial<
    Record<"axe" | "keyboard" | "name" | "focus" | "motion", { total: number; passed: number }>
  >;
  tests: { title: string; tags: string[]; passed: boolean }[];
}

export interface RegistryFile {
  path: string;
  type: string;
  target: string;
  content: string;
}

export interface RegistryItem {
  name: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
  meta?: { client?: boolean; status?: string; source?: string };
}

export const categories: { id: ComponentCategory; title: string; blurb: string }[] = [
  { id: "foundation", title: "Foundation", blurb: "Presentational building blocks." },
  { id: "forms", title: "Forms", blurb: "Inputs with real keyboard and screen reader support." },
  {
    id: "overlays",
    title: "Overlays",
    blurb: "Dialogs, menus and popovers that trap and restore focus.",
  },
  { id: "navigation", title: "Navigation", blurb: "Tabs, menus and wayfinding." },
  { id: "data-display", title: "Data display", blurb: "Tables, lists, progress and status." },
  { id: "motion", title: "Motion", blurb: "Stepped, cut, never eased. All honour reduced motion." },
  {
    id: "marketing",
    title: "Marketing",
    blurb: "Whole sections of a page, composed from the components above.",
  },
];

function byTitle(a: ComponentMeta, b: ComponentMeta) {
  return a.title.localeCompare(b.title);
}

/** Components only. Blocks live under /docs/blocks and are listed separately. */
export function getComponents(): ComponentMeta[] {
  return componentMetas.filter((meta) => meta.kind !== "block").sort(byTitle);
}

/** Whole sections of a page, composed from components. */
export function getBlocks(): ComponentMeta[] {
  return componentMetas.filter((meta) => meta.kind === "block").sort(byTitle);
}

export function getComponent(slug: string): ComponentMeta | undefined {
  return componentMetas.find((meta) => meta.name === slug);
}

/** Where a component or block is documented. */
export function docHref(meta: ComponentMeta): string {
  return meta.kind === "block" ? `/docs/blocks/${meta.name}` : `/docs/components/${meta.name}`;
}

export function getExamples(slug: string): {
  playground: ExampleInfo | null;
  examples: ExampleInfo[];
} {
  return (
    (examplesData as Record<string, { playground: ExampleInfo | null; examples: ExampleInfo[] }>)[
      slug
    ] ?? {
      playground: null,
      examples: [],
    }
  );
}

export function getProps(exportName: string): PropInfo[] | undefined {
  return (propsData as Record<string, PropInfo[]>)[exportName];
}

export function getPropTables(meta: ComponentMeta): { name: string; props: PropInfo[] }[] {
  const names = Object.keys(propsData).filter((name) =>
    meta.exports.some((exported) => name === exported || name.startsWith(`${exported}.`)),
  );
  return names.map((name) => ({ name, props: getProps(name) ?? [] }));
}

export function getA11y(slug: string): A11yResult | undefined {
  return (a11yData.components as Record<string, A11yResult>)[slug];
}

export function getA11ySummary() {
  const components = Object.entries(a11yData.components as Record<string, A11yResult>);
  const total = components.reduce((n, [, c]) => n + c.total, 0);
  const passed = components.reduce((n, [, c]) => n + c.passed, 0);
  const axe = components.reduce((n, [, c]) => n + (c.tags.axe?.passed ?? 0), 0);
  return { generatedAt: a11yData.generatedAt, components, total, passed, axe };
}

export async function getRegistryItem(slug: string): Promise<RegistryItem> {
  const file = join(process.cwd(), "public", "r", `${slug}.json`);
  return JSON.parse(await readFile(file, "utf8")) as RegistryItem;
}
