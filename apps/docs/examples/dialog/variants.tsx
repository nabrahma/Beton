/**
 * Variants and sizes
 * The variant colours the header; the size sets the width.
 */
"use client";

import { Dialog, Text } from "@beton-ui/react";

export default function DialogVariants() {
  return (
    <div className="flex flex-wrap gap-4">
      {(["primary", "secondary", "danger"] as const).map((variant) => (
        <Dialog key={variant} variant={variant} size={variant === "danger" ? "sm" : "md"}>
          <Dialog.Trigger variant="secondary">{variant}</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{variant} dialog</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>Everything else stays the same.</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close>Close</Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      ))}
    </div>
  );
}
