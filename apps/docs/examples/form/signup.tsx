/**
 * Sign-up form
 * Submit with errors to see focus move to the first invalid field.
 */
"use client";

import { Button, Checkbox, Field, Form } from "@beton-ui/react";
import { useState } from "react";

export default function FormSignup() {
  const [submitted, setSubmitted] = useState<Record<string, unknown> | null>(null);

  return (
    <Form
      aria-label="Create an account"
      className="max-w-sm"
      onFormSubmit={(values) => setSubmitted(values)}
    >
      <Field name="email">
        <Field.Label>Email</Field.Label>
        <Field.Control type="email" required autoComplete="email" />
        <Field.Error />
      </Field>
      <Field name="password">
        <Field.Label>Password</Field.Label>
        <Field.Control type="password" required minLength={8} autoComplete="new-password" />
        <Field.Description>At least 8 characters.</Field.Description>
        <Field.Error />
      </Field>
      <Field name="terms">
        <label className="flex items-center gap-3 font-medium">
          <Checkbox required />I accept the terms
        </label>
        <Field.Error />
      </Field>
      <Button type="submit">Create account</Button>
      <p aria-live="polite" className="font-mono text-sm font-bold">
        {submitted ? `Submitted ${String(submitted.email)}` : ""}
      </p>
    </Form>
  );
}
