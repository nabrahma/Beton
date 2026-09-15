import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "switch",
  title: "Switch",
  description: "An on/off toggle for settings that apply immediately.",
  category: "forms",
  status: "stable",
  exports: ["Switch"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves focus to the switch." },
      { keys: "Space", action: "Toggles the switch." },
      { keys: "Enter", action: "Toggles the switch." },
    ],
    aria: ['role="switch" with aria-checked.'],
    notes: [
      "Use a switch for instant effects. For choices submitted with a form, use a checkbox.",
      "The thumb moves linearly in 70ms and stops animating under reduced motion.",
    ],
  },
  related: ["checkbox"],
  playground: {
    recipe: "switchStyles",
    controls: ["variant", "size"],
    toggles: ["defaultChecked", "disabled"],
  },
};
