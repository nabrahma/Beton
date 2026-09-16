import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "stats-band",
  title: "Stats Band",
  description: "A strip of numbers that say how much, how many, how fast.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["StatsBand"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "A band of numbers takes no focus." }],
    aria: ["Each number is paired with its label in a description list."],
    notes: [
      "Put a Counter in value to have the numbers count up.",
      "Numbers are set in tabular figures, so the strip stays aligned.",
    ],
  },
  related: ["stat", "counter"],
  playground: { recipe: "statsBand", controls: ["columns", "size"] },
};
