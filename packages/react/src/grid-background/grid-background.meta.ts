import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "grid-background",
  title: "Grid Background",
  description: "Graph paper behind a section, drawn rather than downloaded.",
  category: "motion",
  status: "stable",
  exports: ["GridBackground"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "A background takes no focus." }],
    aria: ["Decoration: hidden from screen readers and never in the way of a pointer."],
    notes: [
      "Give the section relative and isolate: the grid sit behind the content but above the section's own background, which needs a stacking context.",
      "It takes its colour from the text colour around it, so it themes itself.",
      "Nothing moves, so there is nothing for reduced motion to switch off.",
    ],
  },
  related: ["halftone-background", "noise-overlay"],
  playground: { recipe: "gridBackground", controls: ["weight"] },
};
