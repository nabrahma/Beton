/**
 * Types
 * The colour follows the type; the wording still carries the meaning.
 */
"use client";

import { Button, ToastProvider, useToast } from "@beton-ui/react";

function Buttons() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        size="sm"
        onClick={() =>
          toast.add({
            title: "Project saved",
            description: "Your changes are live.",
            type: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => toast.add({ title: "Storage almost full", type: "warning" })}
      >
        Warning
      </Button>
      <Button
        size="sm"
        variant="danger"
        onClick={() =>
          toast.add({
            title: "Upload failed",
            description: "The file was larger than 10 MB.",
            type: "error",
          })
        }
      >
        Error
      </Button>
    </div>
  );
}

export default function ToastTypes() {
  return (
    <ToastProvider>
      <Buttons />
    </ToastProvider>
  );
}
