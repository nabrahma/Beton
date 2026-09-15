/**
 * Address
 * A legend names a group of related fields.
 */
"use client";

import { Field, Fieldset } from "@beton-ui/react";

export default function FieldsetBasic() {
  return (
    <Fieldset className="max-w-md">
      <Fieldset.Legend>Billing address</Fieldset.Legend>
      <Field>
        <Field.Label>Street</Field.Label>
        <Field.Control autoComplete="street-address" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <Field.Label>City</Field.Label>
          <Field.Control autoComplete="address-level2" />
        </Field>
        <Field>
          <Field.Label>Postcode</Field.Label>
          <Field.Control autoComplete="postal-code" />
        </Field>
      </div>
    </Fieldset>
  );
}
