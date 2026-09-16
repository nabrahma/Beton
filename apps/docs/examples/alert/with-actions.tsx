/**
 * With actions
 * A banner can carry buttons and a way out. Dismissing is yours to wire up, so
 * the choice can be remembered.
 */
"use client";

import { Alert, Button } from "@beton-ui/react";
import { useState } from "react";

export default function AlertWithActions() {
  const [shown, setShown] = useState(true);
  if (!shown) {
    return (
      <Button variant="secondary" onClick={() => setShown(true)}>
        Show the banner again
      </Button>
    );
  }
  return (
    <Alert
      variant="warning"
      title="Update available"
      className="max-w-lg"
      actions={<Button size="sm">Reload</Button>}
      onClose={
        <Button size="sm" variant="ghost" aria-label="Dismiss" onClick={() => setShown(false)}>
          ✕
        </Button>
      }
    >
      A new version of the plan is ready.
    </Alert>
  );
}
