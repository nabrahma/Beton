import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "pagination",
  title: "Pagination",
  description: "Move through a list that is split across pages.",
  category: "navigation",
  status: "stable",
  exports: ["Pagination", "paginationRange"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves through the pages and the arrows." },
      { keys: "Enter or Space", action: "Goes to that page." },
    ],
    aria: [
      'A nav landmark named "Pagination" holding a list of pages.',
      'The page being shown carries aria-current="page".',
      "The arrows are labelled, and the one with nowhere to go is disabled.",
      'The count beside the pages is announced through aria-live="polite".',
    ],
    notes: [
      "Pass href to render links, which work before JavaScript loads and can be opened in a new tab.",
      "Pass onPageChange instead to render buttons for a list that updates in place.",
      "The row of pages keeps its width as you move through it, so nothing shifts under the pointer.",
    ],
  },
  related: ["breadcrumbs", "button"],
  playground: { recipe: "pagination", controls: ["size"] },
};
