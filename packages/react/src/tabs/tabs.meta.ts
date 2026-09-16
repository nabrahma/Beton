import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "tabs",
  title: "Tabs",
  description: "Switch between views that sit at the same level of a page.",
  category: "navigation",
  status: "stable",
  exports: ["Tabs"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves to the tab list, then on to the panel." },
      { keys: "ArrowLeft and ArrowRight", action: "Move between tabs in a horizontal list." },
      { keys: "ArrowUp and ArrowDown", action: "Move between tabs in a vertical list." },
      { keys: "Enter or Space", action: "Shows the panel of the focused tab." },
      { keys: "Home and End", action: "Jump to the first or last tab." },
    ],
    aria: [
      'role="tablist" holding role="tab" buttons, each pointing at its role="tabpanel".',
      "The list reports its orientation, and the selected tab reports aria-selected.",
    ],
    notes: [
      "Tabs activate on Enter or Space, not on focus, so arrowing through them does not load every panel.",
      "Disabled tabs stay focusable so they can be found and announced.",
      "Use tabs for alternative views of one thing, never as a substitute for separate pages.",
    ],
  },
  related: ["accordion", "card"],
  playground: { recipe: "tabs", controls: ["size", "orientation"] },
};
