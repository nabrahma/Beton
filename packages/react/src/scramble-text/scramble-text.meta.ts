import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "scramble-text",
  title: "Scramble Text",
  description: "Letters churn through junk and settle into the real words.",
  category: "motion",
  status: "stable",
  exports: ["ScrambleText"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Scrambled text takes no focus." }],
    aria: ["The churning copy is hidden; screen readers only ever get the real words."],
    notes: [
      "Change runKey to scramble again.",
      "Reduced motion skips the churn and shows the words at once.",
      "Use it on a headline, not on anything that has to be read quickly.",
    ],
  },
  related: ["typewriter", "glitch-text", "split-flap"],
  playground: { recipe: "textEffect", controls: ["size"] },
};
