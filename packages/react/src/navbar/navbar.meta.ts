import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "navbar",
  title: "Navbar",
  description: "The bar across the top of a page: a mark, the main links and a few actions.",
  category: "navigation",
  status: "stable",
  exports: ["Navbar"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves through the mark, the links and the actions in order." },
    ],
    aria: [
      "Renders a banner landmark holding a named navigation landmark.",
      'The link for the page you are on carries aria-current="page".',
    ],
    notes: [
      "Only one banner belongs on a page.",
      "Pass render on the mark and the links to hand them to a router.",
      "The links are hidden below the md breakpoint: pair the bar with a Sheet on small screens.",
    ],
  },
  related: ["sidebar", "menubar", "sheet"],
  playground: { recipe: "navbar", controls: ["size"], toggles: ["sticky"] },
};
