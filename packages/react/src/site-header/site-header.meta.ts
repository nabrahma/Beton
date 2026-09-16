import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "site-header",
  title: "Site Header",
  description: "The bar across the top of a site, with the same links in a sheet on phones.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["SiteHeader"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves through the mark, the links and the actions." },
      { keys: "Enter or Space", action: "Opens the menu sheet on small screens." },
      { keys: "Escape", action: "Closes the sheet and returns focus to the button." },
    ],
    aria: [
      "A banner holding a named navigation landmark.",
      'The link for the page you are on carries aria-current="page".',
      "The sheet repeats the same links, so nothing is only reachable on one screen size.",
    ],
    notes: [
      "The links are hidden below the md breakpoint and the menu button appears in their place.",
      "Pass mobileMenu false if your own navigation already covers small screens.",
    ],
  },
  related: ["navbar", "sheet", "footer"],
  playground: { recipe: "navbar", controls: ["size"], toggles: ["sticky"] },
};
