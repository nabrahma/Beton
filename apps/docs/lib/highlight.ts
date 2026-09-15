import "server-only";

import { createHighlighter, type Highlighter } from "shiki";

const LANGS = ["tsx", "ts", "bash", "json", "css"] as const;
export type CodeLanguage = (typeof LANGS)[number];

let highlighter: Promise<Highlighter> | undefined;

function getHighlighter() {
  highlighter ??= createHighlighter({ themes: ["github-dark-high-contrast"], langs: [...LANGS] });
  return highlighter;
}

export async function highlight(code: string, lang: string): Promise<string> {
  const resolved = (LANGS as readonly string[]).includes(lang) ? lang : "tsx";
  const instance = await getHighlighter();
  return instance.codeToHtml(code, {
    lang: resolved,
    theme: "github-dark-high-contrast",
    transformers: [
      {
        pre(node) {
          // The wrapper supplies tabindex, label and background.
          delete node.properties.tabindex;
          delete node.properties.style;
        },
      },
    ],
  });
}
