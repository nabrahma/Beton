/**
 * Range
 * An array value creates one thumb per value. Name each thumb.
 */
"use client";

import { Slider } from "@beton-ui/react";

export default function SliderRange() {
  return (
    <Slider
      label="Price"
      defaultValue={[20, 80]}
      thumbLabels={["Minimum price", "Maximum price"]}
      format={{ style: "currency", currency: "EUR", maximumFractionDigits: 0 }}
      showValue
      variant="secondary"
      className="max-w-sm"
    />
  );
}
