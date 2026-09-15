/**
 * Horizontal
 * Short options can sit in a row. Arrow keys still move between them.
 */
"use client";

import { RadioGroup } from "@beton-ui/react";

export default function RadioGroupHorizontal() {
  return (
    <div className="flex flex-col gap-3">
      <p id="size-label" className="font-display text-sm font-bold uppercase">
        Size
      </p>
      <RadioGroup
        aria-labelledby="size-label"
        orientation="horizontal"
        variant="secondary"
        defaultValue="m"
      >
        <RadioGroup.Item value="s">S</RadioGroup.Item>
        <RadioGroup.Item value="m">M</RadioGroup.Item>
        <RadioGroup.Item value="l">L</RadioGroup.Item>
        <RadioGroup.Item value="xl">XL</RadioGroup.Item>
      </RadioGroup>
    </div>
  );
}
