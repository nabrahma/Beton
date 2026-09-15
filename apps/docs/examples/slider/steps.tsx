/**
 * Steps
 * Use step for coarse values and largeStep for Shift and Page keys.
 */
"use client";

import { Slider } from "@beton-ui/react";

export default function SliderSteps() {
  return (
    <Slider
      label="Border width (px)"
      min={0}
      max={10}
      step={1}
      largeStep={5}
      defaultValue={3}
      showValue
      className="max-w-sm"
    />
  );
}
