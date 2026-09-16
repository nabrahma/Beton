/**
 * Basic
 * Focus moves into the dialog, Tab cycles inside it, and Escape closes it.
 */
"use client";

import { Button, Dialog, Field } from "@beton-ui/react";

export default function DialogBasic() {
  return (
    <Dialog>
      <Dialog.Trigger>Invite people</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Invite people</Dialog.Title>
          <Dialog.Description>They will get an email with a join link.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <Field>
            <Field.Label>Email</Field.Label>
            <Field.Control type="email" placeholder="ada@example.com" />
          </Field>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close>Cancel</Dialog.Close>
          <Button>Send invite</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
