import type { BetonConfig } from "./config.ts";

// Registry files import from these canonical aliases (the same ones shadcn rewrites).
const CANONICAL_UI = "@/components/ui";
const CANONICAL_LIB = "@/lib";

const SPECIFIER = /(from\s+|import\s*\(\s*|import\s+)(["'])([^"']+)\2/g;

/** Rewrites canonical registry imports to the project's configured aliases. */
export function rewriteImports(source: string, aliases: BetonConfig["aliases"]): string {
  return source.replace(SPECIFIER, (full, lead: string, quote: string, spec: string) => {
    let next = spec;
    if (spec === CANONICAL_UI || spec.startsWith(`${CANONICAL_UI}/`)) {
      next = aliases.ui + spec.slice(CANONICAL_UI.length);
    } else if (spec === CANONICAL_LIB || spec.startsWith(`${CANONICAL_LIB}/`)) {
      next = aliases.lib + spec.slice(CANONICAL_LIB.length);
    }
    return next === spec ? full : `${lead}${quote}${next}${quote}`;
  });
}

/** Maps a registry target such as "@ui/beton/button.tsx" to a path relative to its alias. */
export function splitTarget(target: string): { alias: "ui" | "lib"; rest: string } {
  const match = target.match(/^@(ui|lib)\/(.+)$/);
  if (!match) throw new Error(`Unsupported registry target "${target}".`);
  return { alias: match[1] as "ui" | "lib", rest: match[2] ?? "" };
}
