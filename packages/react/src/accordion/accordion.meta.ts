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
      { keys: "Tab", action: "Moves to the next trigger, or into an open panel." },
      { keys: "Shift + Tab", action: "Moves back to the previous trigger." },
      { keys: "Enter or Space", action: "Opens or closes the section." },
    ],
    aria: [
      "Each trigger is a button inside a heading, with aria-expanded and aria-controls.",
      'Each panel is a role="region" named by its trigger.',
    ],
    notes: [
      "Pass multiple to let several sections stay open.",
      "Set headingLevel so the triggers fit the outline of the page.",
      "Panels animate their height on a linear curve, and hold still under reduced motion.",
      "Triggers are reached with Tab, not with the arrow keys: the ARIA authoring practices dropped roving focus for accordions.",
    ],
  },
  related: ["tabs", "card"],
  playground: { recipe: "accordion", controls: ["size"], toggles: ["multiple"] },
};
