import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "footer",
  title: "Footer",
  description: "The end of the page: who made it, where everything is, and the licence.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["Footer"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Moves through every link, column by column." }],
    aria: [
      "A contentinfo landmark. Only one belongs on a page.",
      "Each column is its own navigation landmark, named by its title.",
      "Links are 44px tall, so they can be tapped.",
    ],
    notes: [
      "Two layouts: columns for a site with sections, simple for a page that has none.",
      "Put the licence in the note. People look for it here.",
    ],
  },
  related: ["site-header", "sidebar"],
  playground: { recipe: "footer", controls: ["variant"] },
};
