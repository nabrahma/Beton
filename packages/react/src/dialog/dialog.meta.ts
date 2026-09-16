import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "dialog",
  title: "Dialog",
  description: "A modal window for focused tasks, with trapped focus and a clear way out.",
  category: "overlays",
  status: "stable",
  exports: ["Dialog"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Cycles through the controls inside; focus never leaves the dialog." },
      { keys: "Escape", action: "Closes the dialog." },
    ],
    aria: [
      'role="dialog" with aria-modal, named by Dialog.Title and described by Dialog.Description.',
      "The rest of the page is inert while it is open.",
    ],
    notes: [
      "Focus moves into the dialog on open and returns to the trigger on close.",
      "Always include a title. Without one the dialog has no accessible name.",
      "Dialog is a client compound component: use it inside a client component.",
    ],
  },
  related: ["alert-dialog", "sheet", "popover"],
};
