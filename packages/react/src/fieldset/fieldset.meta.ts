import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "fieldset",
  title: "Fieldset",
  description: "Groups related controls under a shared legend.",
  category: "forms",
  status: "stable",
  exports: ["Fieldset"],
  accessibility: {
    keyboard: [],
    aria: ["Renders a <fieldset>. The legend names the group for assistive technology."],
    notes: ["Use a fieldset for groups of checkboxes or radios that answer one question."],
  },
  related: ["checkbox", "radio-group", "field"],
};
