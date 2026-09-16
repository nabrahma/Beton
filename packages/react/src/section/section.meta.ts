import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "section",
  title: "Section",
  description: "The frame every block sits in: a named landmark, a heading and a measure.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["Section"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Moves through whatever the section holds." }],
    aria: [
      "A region landmark named by its own heading, so it can be jumped to.",
      "A section with no heading is not a landmark at all, which is correct: an unnamed one is noise.",
    ],
    notes: [
      "Set headingLevel so the heading fits the outline of the page.",
      "Every other block in this tier is built on it, so they all agree about padding and measure.",
    ],
  },
  related: ["hero", "cta-band"],
  playground: { recipe: "section", controls: ["size", "align", "surface"], toggles: ["bordered"] },
};
