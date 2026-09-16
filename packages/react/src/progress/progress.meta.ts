import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "progress",
  title: "Progress",
  description: "How far along a task is, from zero to done.",
  category: "data-display",
  status: "stable",
  exports: ["Progress"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Progress takes no focus; it is read where it stands." }],
    aria: [
      'role="progressbar" with aria-valuenow, aria-valuemin and aria-valuemax.',
      "A null value drops aria-valuenow, which is how an unknown amount is announced.",
    ],
    notes: [
      "Pass label, or aria-label when the bar is beside text that already names it.",
      "Pass null as the value when you do not know how long it will take.",
      "The bar marches in steps, and holds still under reduced motion.",
    ],
  },
  related: ["spinner", "skeleton", "stepper"],
  playground: { recipe: "progress", controls: ["variant", "size"] },
};
