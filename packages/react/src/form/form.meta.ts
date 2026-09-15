import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "form",
  title: "Form",
  description: "A form that validates its fields together and focuses the first error.",
  category: "forms",
  status: "stable",
  exports: ["Form"],
  accessibility: {
    keyboard: [{ keys: "Enter", action: "Submits the form from any text field." }],
    aria: [
      "Renders a native <form>. Give it aria-label to expose it as a landmark.",
      "On a failed submit, focus moves to the first invalid field.",
    ],
    notes: [
      "Pass server-side errors through errors, keyed by field name.",
      "onFormSubmit receives the values as an object once every field is valid.",
    ],
  },
  related: ["field", "fieldset", "button"],
};
