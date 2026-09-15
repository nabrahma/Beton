/**
 * Percentage
 * Small steps with a percent format.
 */
"use client";

import { NumberInput } from "@beton-ui/react";

export default function NumberInputPercent() {
  return (
    <NumberInput
      label="Discount"
      defaultValue={0.15}
      step={0.05}
      min={0}
      max={1}
      format={{ style: "percent" }}
      size="sm"
      className="max-w-48"
    />
  );
}
