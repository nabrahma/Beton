import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "toast",
  title: "Toast",
  description: "Brief messages that stack in the corner and never steal focus.",
  category: "overlays",
  status: "stable",
  exports: ["ToastProvider", "useToast", "createToastManager"],
  accessibility: {
    keyboard: [
      {
        keys: "F6",
        action: "Jumps into the notification region to reach toasts with the keyboard.",
      },
      { keys: "Tab", action: "Moves through the actions of a toast once inside the region." },
      { keys: "Escape", action: "Leaves the notification region." },
    ],
    aria: [
      'The viewport is role="region" with aria-live="polite", named Notifications.',
      'Each toast is a role="dialog" named by its title and described by its description.',
    ],
    notes: [
      "Toasts never take focus, so they never interrupt what someone is typing.",
      "Set type to success, error, warning or info to colour the toast; the text still carries the meaning.",
      "Put anything the user must act on in the page, not in a toast that disappears.",
    ],
  },
  related: ["alert-dialog", "button"],
};
