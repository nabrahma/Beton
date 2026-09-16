import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "table",
  title: "Table",
  description: "Rows and columns of data, with sortable headers and row actions.",
  category: "data-display",
  status: "stable",
  exports: ["Table"],
  accessibility: {
    keyboard: [
      {
        keys: "Tab",
        action: "Moves to the table, which scrolls with the keyboard, then through its controls.",
      },
      { keys: "Enter or Space", action: "Sorts by the focused column, or runs a row action." },
    ],
    aria: [
      "A real table element, named by its caption.",
      "Column headers are scoped, and a sorted column reports aria-sort.",
      "Selected rows carry aria-selected.",
      "The element that scrolls is focusable and named, as a scrollable region must be.",
    ],
    notes: [
      "The caption is required. Pass hideCaption to keep it for screen readers only.",
      "Sorting is yours to do: the component reports the direction and asks for the next one.",
      "Table is for data. For layout, use a grid.",
    ],
  },
  related: ["list", "pagination", "scroll-area"],
  playground: { recipe: "table", controls: ["size"], toggles: ["striped", "hoverable"] },
};
