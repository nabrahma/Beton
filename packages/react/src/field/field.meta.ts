import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "field",
  title: "Field",
  description: "Label, control, description and error message, wired together with validation.",
  category: "forms",
  status: "stable",
  exports: ["Field"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Moves focus to the field's control." }],
    aria: [
      "Field.Label is associated with the control.",
      "Field.Description and Field.Error are referenced by aria-describedby.",
      "Invalid controls get aria-invalid and data-invalid.",
    ],
    notes: [
      'Validation runs on submit by default. Use validationMode="onBlur" or "onChange" to validate earlier.',
      "Untouched fields are not flagged on blur, so tabbing past a field never shows an error.",
    ],
  },
  related: ["form", "input", "fieldset"],
};
