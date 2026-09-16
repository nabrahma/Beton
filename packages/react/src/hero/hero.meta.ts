import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "hero",
  title: "Hero",
  description: "The top of a page: what this is, why it matters, and the way in.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["Hero"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Reaches the actions, then whatever is in the panel beside them." },
    ],
    aria: ["A region named by the page heading, which is an h1 by default."],
    notes: [
      "Three layouts: stacked, split and poster. The panel only appears in split.",
      "Pass background a grid or a halftone; it is drawn behind everything.",
      "Use headingLevel 2 when a page somehow has two heroes.",
    ],
  },
  related: ["section", "cta-band", "grid-background"],
  playground: { recipe: "hero", controls: ["variant", "surface"] },
};
