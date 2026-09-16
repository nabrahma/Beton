import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "stat",
  title: "Stat",
  description: "A single number with its label, its change and a line of context.",
  category: "data-display",
  status: "stable",
  exports: ["Stat"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Stats take no focus unless you put a link inside one." }],
    aria: ["The direction of the change is written out, not left to the arrow alone."],
    notes: [
      "Colour and an arrow are not enough on their own: the trend is also said in words.",
      "Numbers are set in tabular figures, so a row of stats lines up.",
    ],
  },
  related: ["card", "description-list", "progress"],
  playground: { recipe: "stat", controls: ["size"] },
};
