import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "cursor-trail",
  title: "Cursor Trail",
  description: "Hard squares that follow the pointer.",
  category: "motion",
  status: "stable",
  exports: ["CursorTrail"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "A trail takes no focus and never blocks a click." }],
    aria: ["Decoration: hidden from screen readers and never in the way of a pointer."],
    notes: [
      "Draws nothing for touch users, who have no pointer to follow.",
      "Draws nothing at all under reduced motion.",
      "Pass a container ref to keep the trail inside one section.",
    ],
    limitations: ["Pointer only. Never attach meaning to it."],
  },
  related: ["confetti"],
  playground: { recipe: "cursorTrail", controls: ["variant"] },
};
