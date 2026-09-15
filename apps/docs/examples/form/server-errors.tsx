/**
 * Server errors
 * Pass errors from your API through errors, keyed by field name.
 */
"use client";

import { Button, Field, Form } from "@beton-ui/react";
import { useState } from "react";

export default function FormServerErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  return (
    <Form
      aria-label="Claim a subdomain"
      className="max-w-sm"
      errors={errors}
      onFormSubmit={async (values) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setLoading(false);
        setErrors(values.subdomain === "beton" ? { subdomain: "beton.dev is already taken." } : {});
      }}
    >
      <Field name="subdomain">
        <Field.Label>Subdomain</Field.Label>
        <Field.Control required defaultValue="beton" />
        <Field.Error />
      </Field>
      <Button type="submit" loading={loading} className="w-fit">
        Claim
      </Button>
    </Form>
  );
}
