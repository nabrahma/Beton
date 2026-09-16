import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "sticker-peel",
  title: "Sticker Peel",
  description: "A panel that lifts off the page as the pointer crosses it.",
  category: "motion",
  status: "stable",
  exports: ["StickerPeel"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Reaches whatever is inside, or the whole panel when it is a link." },
    ],
    aria: ["The peeling corner is decoration and is hidden."],
    notes: [
      "The lift is a single hard step, not a spring.",
      "Holds still for anyone who has asked for less motion.",
      "Pass render to make the whole panel a link.",
    ],
  },
  related: ["card", "sticker"],
  playground: { recipe: "stickerPeel", controls: ["size"] },
};
