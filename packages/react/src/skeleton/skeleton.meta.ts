import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "skeleton",
  title: "Skeleton",
  description: "A placeholder for content that has not arrived.",
  category: "data-display",
  status: "stable",
  exports: ["Skeleton"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Skeletons take no focus." }],
    aria: ["Hidden from screen readers: it has nothing to say."],
    notes: [
      "Announce loading somewhere real: a live region, or aria-busy on the region being filled.",
      "Match the shape of what is coming, so nothing jumps when it arrives.",
      "The pulse is a hard two-step, and stops under reduced motion.",
    ],
  },
  related: ["spinner", "progress", "empty-state"],
  playground: { recipe: "skeleton", controls: ["shape"] },
};
