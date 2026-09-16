/**
 * Controlled
 * Drive the dialog from your own state to open it after an action.
 */
"use client";

import { Button, Dialog, Text } from "@beton-ui/react";
import { useState } from "react";

export default function DialogControlled() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => setOpen(true)}>Open from code</Button>
      <Text size="sm" mono>
        open: {String(open)}
      </Text>
      <Dialog open={open} onOpenChange={setOpen} size="sm">
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Opened from state</Dialog.Title>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close>Done</Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
