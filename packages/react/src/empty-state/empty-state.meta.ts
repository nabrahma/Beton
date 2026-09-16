import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "empty-state",
  title: "Empty State",
  description: "What to show where there is nothing yet: no results, no records, no files.",
  category: "data-display",
  status: "stable",
  exports: ["EmptyState"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Moves to the actions under the text." }],
    aria: [
      "The title is a heading, at the level you choose.",
      "The mark above it is decoration and is hidden from screen readers.",
    ],
    notes: [
      "Say what is missing and what to do about it. An empty box helps nobody.",
      "Set headingLevel so the title fits the outline of the page.",
    ],
  },
  related: ["skeleton", "alert", "card"],
  playground: { recipe: "emptyState", controls: ["size"] },
};
