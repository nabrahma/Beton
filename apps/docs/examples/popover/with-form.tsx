/**
 * With a small form
 * Popovers can hold controls. Focus moves inside and returns to the trigger.
 */
"use client";

import { Field, Popover } from "@beton-ui/react";

export default function PopoverWithForm() {
  return (
    <Popover size="lg">
      <Popover.Trigger>Rename</Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Rename project</Popover.Title>
        <Field>
          <Field.Label>Name</Field.Label>
          <Field.Control defaultValue="Béton" />
        </Field>
        <div className="flex justify-end gap-3 pt-1">
          <Popover.Close>Cancel</Popover.Close>
          <Popover.Close variant="primary">Save</Popover.Close>
        </div>
      </Popover.Content>
    </Popover>
  );
}
