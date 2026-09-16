import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "accordion",
  title: "Accordion",
  description: "Sections of content that open one at a time, or several at once.",
  category: "navigation",
  status: "stable",
  exports: ["Accordion"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves between triggers and into an open panel." },
      { keys: "Enter or Space", action: "Opens or closes the section." },
      { keys: "ArrowUp and ArrowDown", action: "Move between triggers." },
      { keys: "Home and End", action: "Jump to the first or last trigger." },
    ],
    aria: [
      "Each trigger is a button inside a heading, with aria-expanded and aria-controls.",
      'Each panel is a role="region" named by its trigger.',
    ],
    notes: [
      "Pass multiple to let several sections stay open.",
      "Set headingLevel so the triggers fit the outline of the page.",
      "Panels animate their height on a linear curve, and hold still under reduced motion.",
    ],
  },
  related: ["tabs", "card"],
  playground: { recipe: "accordion", controls: ["size"], toggles: ["multiple"] },
};
