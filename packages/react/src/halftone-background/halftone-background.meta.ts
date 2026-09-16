import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "halftone-background",
  title: "Halftone Background",
  description: "A field of printed dots, as though the section came off a press.",
  category: "motion",
  status: "stable",
  exports: ["HalftoneBackground"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "A background takes no focus." }],
    aria: ["Decoration: hidden from screen readers and never in the way of a pointer."],
    notes: [
      "Give the section relative and isolate: the dots sit behind the content but above the section's own background, which needs a stacking context.",
      "Keep text off the heaviest weights, or contrast suffers.",
    ],
  },
  related: ["grid-background", "noise-overlay"],
  playground: { recipe: "halftoneBackground", controls: ["weight"] },
};
