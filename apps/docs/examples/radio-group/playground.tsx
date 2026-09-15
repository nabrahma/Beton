"use client";

import { RadioGroup, type RadioGroupProps } from "@beton-ui/react";

export default function RadioGroupPlayground(props: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      <p id="playground-shipping" className="font-display text-sm font-bold uppercase">
        Shipping
      </p>
      <RadioGroup {...props} aria-labelledby="playground-shipping" defaultValue="standard">
        <RadioGroup.Item value="standard">Standard</RadioGroup.Item>
        <RadioGroup.Item value="express">Express</RadioGroup.Item>
        <RadioGroup.Item value="pickup">Pickup</RadioGroup.Item>
      </RadioGroup>
    </div>
  );
}
