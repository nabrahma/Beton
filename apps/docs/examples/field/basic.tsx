/**
 * Label, description and error
 * The description and error are announced with the control.
 */
"use client";

import { Field } from "@beton-ui/react";

export default function FieldBasic() {
  return (
    <Field className="max-w-sm" validationMode="onBlur">
      <Field.Label>Username</Field.Label>
      <Field.Control required pattern="[a-z0-9-]+" placeholder="beton-fan" />
      <Field.Description>Lowercase letters, numbers and hyphens.</Field.Description>
      <Field.Error match="valueMissing">Choose a username.</Field.Error>
      <Field.Error match="patternMismatch">
        Only lowercase letters, numbers and hyphens.
      </Field.Error>
    </Field>
  );
}
