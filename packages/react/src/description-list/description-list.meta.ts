import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "description-list",
  title: "Description List",
  description: "Pairs of terms and their values: metadata, receipts, specifications.",
  category: "data-display",
  status: "stable",
  exports: ["DescriptionList"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Moves through any links inside the values." }],
    aria: ["A real description list, so each value is announced with its term."],
    notes: [
      "Use layout inline for two columns, stacked for narrow spaces.",
      "Set the layout on the list and on its items so they agree.",
    ],
  },
  related: ["table", "stat"],
  playground: { recipe: "descriptionList", controls: ["layout", "size"] },
};
