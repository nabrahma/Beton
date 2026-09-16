import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "alert-dialog",
  title: "Alert Dialog",
  description: "Interrupts to confirm a consequential action. The choice has to be explicit.",
  category: "overlays",
  status: "stable",
  exports: ["AlertDialog"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Cycles through the actions." },
      { keys: "Escape", action: "Cancels and closes." },
    ],
    aria: ['role="alertdialog", named by the title and described by the description.'],
    notes: [
      "Clicking outside does not close it, unlike Dialog.",
      "Name the confirm button after the action (Delete), not Yes.",
      "Reserve it for destructive or irreversible actions.",
    ],
  },
  related: ["dialog"],
};
