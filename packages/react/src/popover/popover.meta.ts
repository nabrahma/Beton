import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "popover",
  title: "Popover",
  description: "A non-modal panel anchored to its trigger, for secondary detail and small forms.",
  category: "overlays",
  status: "stable",
  exports: ["Popover"],
  accessibility: {
    keyboard: [
      { keys: "Enter or Space", action: "Opens the popover from its trigger." },
      { keys: "Tab", action: "Moves through the content inside." },
      { keys: "Escape", action: "Closes it and returns focus to the trigger." },
    ],
    aria: [
      "The trigger exposes aria-expanded and aria-controls.",
      'The popup is role="dialog", named by Popover.Title when present.',
    ],
    notes: [
      "The page behind stays usable, unlike Dialog.",
      "Use a Popover, not a Tooltip, whenever the content matters or contains controls.",
    ],
  },
  related: ["tooltip", "dialog", "dropdown-menu"],
};
