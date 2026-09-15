"use client";

import { NumberInput, type NumberInputProps } from "@beton-ui/react";

export default function NumberInputPlayground(props: NumberInputProps) {
  return (
    <NumberInput
      {...props}
      label="Quantity"
      defaultValue={1}
      min={1}
      max={99}
      className="max-w-48"
    />
  );
}
