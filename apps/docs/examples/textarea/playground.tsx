"use client";

import { Field, Textarea, type TextareaProps } from "@beton-ui/react";

export default function TextareaPlayground(props: TextareaProps) {
  return (
    <Field className="max-w-md">
      <Field.Label>Message</Field.Label>
      <Textarea {...props} placeholder="Say something loud." />
    </Field>
  );
}
