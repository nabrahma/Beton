import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "list",
  title: "List",
  description: "A vertical list of records: a mark, a title, a line of detail and row actions.",
  category: "data-display",
  status: "stable",
  exports: ["List"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves through the rows that are links, then their actions." },
      { keys: "Enter", action: "Follows the focused row." },
    ],
    aria: [
      "A real list, so screen readers announce how many rows there are.",
      "The row being shown carries aria-current, which is what a plain list supports.",
      "A row action stays a separate tab stop from the row itself.",
    ],
    notes: [
      "Pass href to make the whole row a link, or render to hand it to a router.",
      "Rows are at least 56px tall, so they can be tapped.",
      "For columns of data, use a Table.",
    ],
  },
  related: ["table", "avatar", "badge"],
  playground: { recipe: "list", controls: ["size"] },
};
