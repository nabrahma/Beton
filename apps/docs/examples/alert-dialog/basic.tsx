/**
 * Confirm a deletion
 * Clicking outside does nothing: the choice has to be explicit.
 */
"use client";

import { AlertDialog, Text } from "@beton-ui/react";
import { useState } from "react";

export default function AlertDialogBasic() {
  const [deleted, setDeleted] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <AlertDialog>
        <AlertDialog.Trigger>Delete project</AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Delete this project?</AlertDialog.Title>
            <AlertDialog.Description>
              The project and its 24 components will be removed. This cannot be undone.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Close>Keep project</AlertDialog.Close>
            <AlertDialog.Close variant="danger" onClick={() => setDeleted(true)}>
              Delete project
            </AlertDialog.Close>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Text size="sm" mono aria-live="polite">
        {deleted ? "Deleted." : ""}
      </Text>
    </div>
  );
}
