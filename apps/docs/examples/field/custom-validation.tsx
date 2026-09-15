/**
 * Custom validation
 * Return an error message from validate. It runs on change here.
 */
"use client";

import { Field } from "@beton-ui/react";

const taken = ["admin", "beton", "root"];

export default function FieldCustomValidation() {
  return (
    <Field
      className="max-w-sm"
      validationMode="onChange"
      validate={(value) =>
        taken.includes(String(value).toLowerCase()) ? "That name is taken." : null
      }
    >
      <Field.Label>Workspace name</Field.Label>
      <Field.Control placeholder="Try “beton”" />
      <Field.Error />
    </Field>
  );
}
