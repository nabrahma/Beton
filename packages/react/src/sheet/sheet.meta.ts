import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "sheet",
  title: "Sheet",
  description: "A panel anchored to an edge of the screen. A dialog, parked at the side.",
  category: "overlays",
  status: "stable",
  exports: ["Sheet"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Cycles through the controls inside." },
      { keys: "Escape", action: "Closes the panel." },
    ],
    aria: ['role="dialog" with aria-modal, named by Sheet.Title.', "The page behind is inert."],
    notes: [
      "Pick a side with the side prop: right, left, top or bottom.",
      "Use it for filters, navigation and secondary forms; use Dialog for short confirmations.",
    ],
  },
  related: ["dialog", "dropdown-menu"],
};
