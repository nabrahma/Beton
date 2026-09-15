import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Parses JSON with comments and trailing commas, as found in tsconfig.json. */
export function parseJsonc<T = unknown>(text: string): T {
  let out = "";
  let inString = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (inString) {
      out += ch;
      if (ch === "\\") out += text[++i] ?? "";
      else if (ch === '"') inString = false;
    } else if (ch === '"') {
      inString = true;
      out += ch;
    } else if (ch === "/" && next === "/") {
      while (i < text.length && text[i] !== "\n") i++;
      out += "\n";
    } else if (ch === "/" && next === "*") {
      i += 2;
      while (i < text.length && !(text[i] === "*" && text[i + 1] === "/")) i++;
      i++;
    } else {
      out += ch;
    }
  }
  return JSON.parse(out.replace(/,(\s*[}\]])/g, "$1")) as T;
}

export function readJson<T = unknown>(path: string): T | undefined {
  if (!existsSync(path)) return undefined;
  return parseJsonc<T>(readFileSync(path, "utf8"));
}

export function firstExisting(cwd: string, candidates: string[]): string | undefined {
  return candidates.find((candidate) => existsSync(join(cwd, candidate)));
}

export const toPosix = (path: string) => path.split("\\").join("/");
