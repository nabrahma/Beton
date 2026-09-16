import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "changelog-entry",
  title: "Changelog Entry",
  description: "One release: its version, its date and what changed.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["ChangelogEntry"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Reaches any links inside the entry." }],
    aria: [
      "An article named by its heading, so each release can be jumped to.",
      "The date is a time element with a machine-readable value.",
      "Each change says its kind in words, not only by colour.",
    ],
    notes: [
      "Kinds are added, changed, fixed and removed.",
      "Stack entries newest first; the component draws the rule between them.",
    ],
  },
  related: ["timeline", "code-block"],
};
