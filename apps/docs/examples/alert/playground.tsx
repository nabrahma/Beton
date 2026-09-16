"use client";

import { Alert, type AlertProps } from "@beton-ui/react";

export default function AlertPlayground(props: AlertProps) {
  return (
    <Alert {...props} title="Delivery delayed" className="max-w-lg">
      The 10:30 truck is running forty minutes late.
    </Alert>
  );
}
