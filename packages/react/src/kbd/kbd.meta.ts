import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "kbd",
  title: "Kbd",
  description: "Displays a keyboard key or shortcut.",
  category: "foundation",
  status: "stable",
  exports: ["Kbd"],
  accessibility: {
    keyboard: [],
    aria: ["Renders a semantic <kbd> element."],
    notes: ['Write key names in full where symbols are ambiguous ("Ctrl" rather than "^").'],
  },
  related: ["button"],
};
