import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "confetti",
  title: "Confetti",
  description: "A burst of hard paper squares when something goes right.",
  category: "motion",
  status: "stable",
  exports: ["Confetti"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Confetti takes no focus and never blocks a click." }],
    aria: ["Decoration: hidden from screen readers."],
    notes: [
      "Raise fire to throw a burst. It clears itself up and calls onDone.",
      "Throws nothing at all under reduced motion.",
      "Say what happened in words as well: confetti is not a message.",
    ],
  },
  related: ["toast", "cursor-trail"],
};
