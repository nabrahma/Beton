import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "marquee",
  title: "Marquee",
  description: "Content that slides past, forever, and pauses when you point at it.",
  category: "motion",
  status: "stable",
  exports: ["Marquee"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Reaches anything interactive inside the first pass." }],
    aria: ["Only the first pass is read out; the repeats are hidden."],
    notes: [
      "Pauses on hover, so text can be read.",
      "Holds still for anyone who has asked for less motion.",
      "Put nothing important in here alone: it is moving, and it repeats.",
    ],
    limitations: ["Moving text is hard to read. Keep it short and keep it decorative."],
  },
  related: ["ticker", "logo-cloud"],
  playground: { recipe: "marquee", controls: ["direction", "gap"], toggles: ["bordered"] },
};
