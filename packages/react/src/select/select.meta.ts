import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "select",
  title: "Select",
  description: "A custom listbox for choosing from a set of options.",
  category: "forms",
  status: "stable",
  exports: ["Select"],
  accessibility: {
    keyboard: [
      { keys: "Enter / Space / ArrowDown", action: "Opens the list from the trigger." },
      { keys: "ArrowUp / ArrowDown", action: "Moves the highlight." },
      { keys: "Enter", action: "Selects the highlighted option and closes the list." },
      { keys: "Escape", action: "Closes the list and returns focus to the trigger." },
      { keys: "Type a letter", action: "Jumps to the next option starting with it." },
    ],
    aria: [
      'The trigger is role="combobox" with aria-expanded and aria-controls.',
      'The list is role="listbox" with role="option" items and aria-selected.',
    ],
    notes: [
      "Label it with Select.Label or place it in a Field.",
      "Select is a client compound component: use it inside a client component.",
    ],
  },
  related: ["radio-group", "field"],
};
