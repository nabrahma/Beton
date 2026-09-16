import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "typewriter",
  title: "Typewriter",
  description: "Words typed out one character at a time, with a blinking block.",
  category: "motion",
  status: "stable",
  exports: ["Typewriter"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Typed text takes no focus." }],
    aria: ["The whole text is available from the first frame, however far the typing has got."],
    notes: [
      "Pass an array to cycle through several lines.",
      "Reduced motion shows the line at once and drops the caret.",
      "The caret blinks in hard steps, never fading.",
    ],
  },
  related: ["scramble-text", "counter"],
  playground: { recipe: "typewriter", controls: ["size"] },
};
