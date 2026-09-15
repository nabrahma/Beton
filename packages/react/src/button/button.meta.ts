import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "button",
  title: "Button",
  description: "Triggers an action. Presses down by exactly its shadow offset.",
  category: "foundation",
  status: "stable",
  exports: ["Button"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves focus to the button." },
      { keys: "Enter", action: "Activates the button." },
      { keys: "Space", action: "Activates the button." },
    ],
    aria: [
      'Renders a native <button>, or role="button" when rendered as another element.',
      'aria-busy="true" while loading.',
      "aria-disabled when disabled but focusable (loading state).",
    ],
    notes: [
      "Loading buttons stay in the tab order so focus is not lost mid-action.",
      "Icon-only buttons require an aria-label.",
      "To style a link as a button, apply the button() recipe to an <a>. A link rendered through Button would be announced as a button.",
    ],
  },
  related: ["spinner", "kbd"],
};
