import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "radio-group",
  title: "Radio Group",
  description: "Pick exactly one option from a short list.",
  category: "forms",
  status: "stable",
  exports: ["RadioGroup"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves focus into the group, onto the selected option." },
      {
        keys: "Arrow keys",
        action: "Move focus and selection to the next or previous option, skipping disabled ones.",
      },
      { keys: "Space", action: "Selects the focused option." },
    ],
    aria: ['role="radiogroup" containing role="radio" options.', "The group is a single tab stop."],
    notes: [
      "Label the group with aria-labelledby or a Fieldset legend.",
      "Prefer Select when there are more than about seven options.",
    ],
  },
  related: ["fieldset", "select", "checkbox"],
  playground: { recipe: "radioGroup", controls: ["variant", "size", "orientation"] },
};
