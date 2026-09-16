import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "cta-band",
  title: "CTA Band",
  description: "A loud strip across the page with one thing to do.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["CtaBand"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Reaches the actions." }],
    aria: ["A region named by its heading."],
    notes: [
      "One action, or one and a quiet second. Three is a menu, not a call.",
      "Text on every surface here is ink or paper, never an accent.",
    ],
  },
  related: ["hero", "newsletter-signup"],
  playground: { recipe: "ctaBand", controls: ["surface", "layout"] },
};
