import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "checkbox",
  title: "Checkbox",
  description: "A square toggle for independent choices, with an indeterminate state.",
  category: "forms",
  status: "stable",
  exports: ["Checkbox"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves focus to the checkbox." },
      { keys: "Space", action: "Toggles the checkbox." },
    ],
    aria: [
      'role="checkbox" with aria-checked true, false or mixed.',
      "A hidden native input keeps the value in form submissions.",
    ],
    notes: [
      "Name it by wrapping it in a <label> with text, or pass aria-label.",
      "Group related checkboxes in a Fieldset with a legend.",
      "Every size reaches a 44px target through an invisible hit area.",
    ],
  },
  related: ["fieldset", "switch", "radio-group"],
  playground: {
    recipe: "checkbox",
    controls: ["variant", "size"],
    toggles: ["defaultChecked", "indeterminate", "disabled"],
  },
};
