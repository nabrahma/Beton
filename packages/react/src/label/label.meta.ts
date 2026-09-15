import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "label",
  title: "Label",
  description: "Names a form control, with optional required marker.",
  category: "foundation",
  status: "stable",
  exports: ["Label"],
  accessibility: {
    keyboard: [{ keys: "Click", action: "Clicking the label focuses or toggles its control." }],
    aria: ["Renders a native <label>. The required marker is aria-hidden."],
    notes: [
      "Associate with htmlFor, or wrap the control.",
      "The required marker is visual only; set required on the control itself.",
    ],
  },
  related: ["input"],
};
