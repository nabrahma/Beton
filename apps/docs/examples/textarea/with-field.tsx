/**
 * With Field
 * Field connects the label, description and validation message to the textarea.
 */
"use client";

import { Field, Textarea } from "@beton-ui/react";

export default function TextareaWithField() {
  return (
    <Field className="max-w-md" validationMode="onBlur">
      <Field.Label>Project brief</Field.Label>
      <Textarea required minLength={20} />
      <Field.Description>At least 20 characters.</Field.Description>
      <Field.Error match="tooShort">Tell us a little more.</Field.Error>
    </Field>
  );
}
