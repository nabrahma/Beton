import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "textarea",
  title: "Textarea",
  description: "A multi-line text field that resizes vertically.",
  category: "forms",
  status: "stable",
  exports: ["Textarea"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves focus to the textarea." },
      { keys: "Enter", action: "Inserts a new line." },
    ],
    aria: [
      "Renders a native <textarea>.",
      "Inside Field, it is labelled, described and validated automatically.",
    ],
    notes: [
      "Every textarea needs a label.",
      "Resizing is vertical only so layouts do not break sideways.",
    ],
  },
  related: ["field", "input"],
  playground: { recipe: "textarea", controls: ["size"], toggles: ["disabled"] },
};
