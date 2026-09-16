import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "counter",
  title: "Counter",
  description: "A number that counts up in hard steps and lands on its value.",
  category: "motion",
  status: "stable",
  exports: ["Counter"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "A counter takes no focus." }],
    aria: ["The final number is given to screen readers straight away, formatted the same way."],
    notes: [
      "Counts through twenty stops, so it ticks rather than glides.",
      "Reduced motion lands on the number at once.",
      "Pass format and locale to write the number properly: currency, percent, or plain.",
    ],
  },
  related: ["stat", "typewriter"],
  playground: { recipe: "textEffect", controls: ["size"] },
};
