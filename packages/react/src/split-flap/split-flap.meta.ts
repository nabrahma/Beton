import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "split-flap",
  title: "Split Flap",
  description: "A departure board: each cell flaps through the alphabet to its letter.",
  category: "motion",
  status: "stable",
  exports: ["SplitFlap"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "A board takes no focus." }],
    aria: ["The cells are hidden and the words are given to screen readers at once."],
    notes: [
      "Letters outside the board's alphabet simply appear.",
      "Reduced motion shows the words without flapping.",
      "Pass cells to reserve a fixed width, so the board does not resize as words change.",
    ],
  },
  related: ["scramble-text", "counter"],
  playground: { recipe: "splitFlap", controls: ["size"] },
};
