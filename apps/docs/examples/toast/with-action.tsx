/**
 * With an action
 * Keep the action optional: a toast disappears before some people reach it.
 */
"use client";

import { Button, ToastProvider, useToast } from "@beton-ui/react";
import { useState } from "react";

function DeleteButton() {
  const toast = useToast();
  const [deleted, setDeleted] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Button
        size="sm"
        variant="danger"
        onClick={() => {
          setDeleted(true);
          toast.add({
            title: "Component deleted",
            timeout: 8000,
            actionProps: { children: "Undo", onClick: () => setDeleted(false) },
          });
        }}
      >
        Delete component
      </Button>
      <span className="font-mono text-sm font-bold" aria-live="polite">
        {deleted ? "Deleted" : "Present"}
      </span>
    </div>
  );
}

export default function ToastWithAction() {
  return (
    <ToastProvider>
      <DeleteButton />
    </ToastProvider>
  );
}
