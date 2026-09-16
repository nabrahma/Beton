import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "glitch-text",
  title: "Glitch Text",
  description: "Text with two coloured copies jittering behind it.",
  category: "motion",
  status: "stable",
  exports: ["GlitchText"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Glitched text takes no focus." }],
    aria: ["The coloured copies are hidden, so the words are read once."],
    notes: [
      "The jitter is a two-step cut, never a smooth wobble.",
      "The copies disappear entirely under reduced motion, leaving plain text.",
      "The real text sits on top in ink, so it stays legible while the copies move.",
    ],
  },
  related: ["scramble-text", "split-flap"],
  playground: { recipe: "glitchText", controls: ["size"] },
};
