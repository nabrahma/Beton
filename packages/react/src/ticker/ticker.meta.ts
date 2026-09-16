import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "ticker",
  title: "Ticker",
  description: "A strip of headlines scrolling past a fixed label.",
  category: "motion",
  status: "stable",
  exports: ["Ticker"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Reaches anything interactive inside the first pass." }],
    aria: ["The headlines are read once; the repeated pass and the separators are hidden."],
    notes: [
      "Pauses on hover.",
      "Holds still for anyone who has asked for less motion.",
      "Give the same headlines a home elsewhere on the page.",
    ],
  },
  related: ["marquee", "alert"],
  playground: { recipe: "ticker", controls: ["size"] },
};
