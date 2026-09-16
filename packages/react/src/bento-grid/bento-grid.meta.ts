import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "bento-grid",
  title: "Bento Grid",
  description: "A grid of boxes of different sizes: the one that gets screenshotted.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["BentoGrid"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Reaches the cells that are links, and anything live inside them." },
    ],
    aria: ["A list of cells, each with a heading one level below the section."],
    notes: [
      "Give a cell span 2 or 3, or tall, to break the rhythm.",
      "Put a real component in media: a working one beats a screenshot.",
      "Accent a cell sparingly. Two loud cells is one too many.",
    ],
  },
  related: ["feature-grid", "card"],
};
