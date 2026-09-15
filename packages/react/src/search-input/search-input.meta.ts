import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "search-input",
  title: "Search Input",
  description: "A search field with an icon and a clear button.",
  category: "forms",
  status: "stable",
  exports: ["SearchInput"],
  accessibility: {
    keyboard: [
      { keys: "Type", action: "Updates the search." },
      { keys: "Escape", action: "Clears the field." },
      { keys: "Tab", action: "Moves to the clear button when there is a value." },
    ],
    aria: [
      'Renders <input type="search"> (role="searchbox").',
      'The clear button is named "Clear search".',
    ],
    notes: ['Give it an aria-label, or wrap it in a form with role="search".'],
  },
  related: ["input"],
  playground: { recipe: "searchInput", controls: ["size"], toggles: ["disabled"] },
};
