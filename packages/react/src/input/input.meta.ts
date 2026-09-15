import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "input",
  title: "Input",
  description: "A single-line text field with a thick stroke and hard shadow.",
  category: "foundation",
  status: "stable",
  exports: ["Input"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves focus to the input." },
      { keys: "Type", action: "Enters text." },
    ],
    aria: [
      "Renders a native <input>.",
      'Set aria-invalid="true" to show the invalid state; the Field component manages this automatically.',
    ],
    notes: [
      "Every input needs a label: a Label with htmlFor, aria-label, or aria-labelledby.",
      "Placeholder text is not a label.",
      "All sizes are at least 44px tall.",
    ],
  },
  related: ["label", "button"],
  playground: { recipe: "input", controls: ["size"], toggles: ["disabled"] },
};
