/**
 * In a Field
 * Field adds a description and required validation.
 */
"use client";

import { Button, Field, Form, Select } from "@beton-ui/react";

const plans = [
  { label: "Free", value: "free" },
  { label: "Team", value: "team" },
  { label: "Studio", value: "studio" },
];

export default function SelectInField() {
  return (
    <Form className="max-w-xs" onFormSubmit={() => {}}>
      <Field name="plan">
        <Select items={plans} required>
          <Field.Label>Plan</Field.Label>
          <Select.Trigger placeholder="Pick a plan" />
          <Select.Content>
            {plans.map((plan) => (
              <Select.Item key={plan.value} value={plan.value}>
                {plan.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
        <Field.Description>You can change it later.</Field.Description>
        <Field.Error />
      </Field>
      <Button type="submit" className="w-fit">
        Continue
      </Button>
    </Form>
  );
}
