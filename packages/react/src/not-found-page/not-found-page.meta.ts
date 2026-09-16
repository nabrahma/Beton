import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "not-found-page",
  title: "404 Page",
  description: "The page for an address that leads nowhere.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["NotFoundPage"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Reaches the way back." }],
    aria: [
      "The main landmark, named by its heading.",
      "The big number is decoration: the words carry the meaning.",
    ],
    notes: [
      "Say what happened in plain words and give at least one way back.",
      "Pass background a grid or a halftone to fill the space.",
      "Wire it to your framework's not-found file; it is a whole page, not a section.",
    ],
  },
  related: ["empty-state", "hero"],
};
