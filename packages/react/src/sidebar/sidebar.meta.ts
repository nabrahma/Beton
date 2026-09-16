import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "sidebar",
  title: "Sidebar",
  description: "The column of links down the side of an application.",
  category: "navigation",
  status: "stable",
  exports: ["Sidebar"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Moves through every link in order." }],
    aria: [
      'Renders a navigation landmark named "Sidebar", holding a list per section.',
      'The link for the page you are on carries aria-current="page".',
    ],
    notes: [
      "Give the landmark a name of its own when a page has more than one.",
      "Rows are 44px tall so they can be tapped.",
      "On small screens, put the same markup inside a Sheet.",
    ],
  },
  related: ["navbar", "sheet", "scroll-area"],
  playground: { recipe: "sidebar", controls: ["size"], toggles: ["bordered"] },
};
