/**
 * Grouped
 * groupSize adds a separator, making long codes easier to read back.
 */
"use client";

import { OtpInput } from "@beton-ui/react";

export default function OtpInputGrouped() {
  return (
    <OtpInput aria-label="Recovery code" length={8} groupSize={4} validationType="alphanumeric" />
  );
}
