import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "alert",
  title: "Alert",
  description: "A message that stays on the page: a warning, a result, a piece of context.",
  category: "data-display",
  status: "stable",
  exports: ["Alert"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Moves to the actions, then to the dismiss button." }],
    aria: [
      'role="alert" with aria-live="assertive" for danger, role="status" and polite otherwise.',
      "The mark before the text is decoration and is hidden from screen readers.",
    ],
    notes: [
      "Use assertive only for something that has gone wrong right now; it interrupts whatever is being read.",
      "Pass live off for a banner that is always there, so it is not announced on every render.",
      "For something that should disappear on its own, use a Toast.",
    ],
  },
  related: ["toast", "empty-state", "alert-dialog"],
  playground: { recipe: "alert", controls: ["variant", "size"] },
};
