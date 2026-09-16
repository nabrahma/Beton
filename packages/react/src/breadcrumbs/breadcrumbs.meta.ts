import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "breadcrumbs",
  title: "Breadcrumbs",
  description: "The trail of pages above the one you are on.",
  category: "navigation",
  status: "stable",
  exports: ["Breadcrumbs"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Moves through the crumbs that are links." }],
    aria: [
      'A nav landmark named "Breadcrumb" holding an ordered list.',
      'The last crumb carries aria-current="page" and is not a link.',
      "Separators are hidden from screen readers.",
    ],
    notes: [
      "Mark the page you are on with current: it is the page itself, so it should not be a link.",
      "Pass render to hand a crumb to a routing link.",
      "Crumbs are 44px tall so they can be tapped.",
    ],
  },
  related: ["navbar", "pagination"],
  playground: { recipe: "breadcrumbs", controls: ["size"] },
};
