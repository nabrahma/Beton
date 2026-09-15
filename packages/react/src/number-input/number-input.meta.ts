import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "number-input",
  title: "Number Input",
  description: "A numeric field with stepper buttons, limits and locale formatting.",
  category: "forms",
  status: "stable",
  exports: ["NumberInput"],
  accessibility: {
    keyboard: [
      { keys: "ArrowUp / ArrowDown", action: "Steps the value." },
      { keys: "Shift + Arrow keys", action: "Takes a large step." },
      { keys: "Home / End", action: "Jumps to the minimum or maximum when set." },
    ],
    aria: [
      'The input is a text field with aria-roledescription="Number field".',
      "Stepper buttons are named Decrease and Increase.",
    ],
    notes: ["Values are clamped to min and max.", "Use format for currency and percentages."],
  },
  related: ["slider", "input"],
  playground: { recipe: "numberInput", controls: ["size"], toggles: ["disabled"] },
};
