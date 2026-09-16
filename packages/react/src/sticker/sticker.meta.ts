import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "sticker",
  title: "Sticker",
  description: "A round badge whose words run around the edge, turning slowly.",
  category: "motion",
  status: "stable",
  exports: ["Sticker"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Reaches whatever you put in the middle, if it is a control." },
    ],
    aria: [
      "The drawing is hidden and the words are repeated as plain text, so they are read once and read properly.",
    ],
    notes: [
      "The turn is a hard 24-step rotation, never a smooth one.",
      "Holds still for anyone who has asked for less motion.",
      "Keep the text short: it has a circle to fit into.",
    ],
  },
  related: ["badge", "sticker-peel"],
  playground: { recipe: "sticker", controls: ["variant", "size"], toggles: ["reverse"] },
};
