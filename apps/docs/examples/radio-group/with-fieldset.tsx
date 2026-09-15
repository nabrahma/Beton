/**
 * With a fieldset
 * Render the group as a Fieldset to name it with a legend.
 */
"use client";

import { Fieldset, RadioGroup } from "@beton-ui/react";

export default function RadioGroupWithFieldset() {
  return (
    <Fieldset render={<RadioGroup defaultValue="concrete" />}>
      <Fieldset.Legend>Material</Fieldset.Legend>
      <RadioGroup.Item value="concrete">Concrete</RadioGroup.Item>
      <RadioGroup.Item value="steel">Steel</RadioGroup.Item>
      <RadioGroup.Item value="glass" disabled>
        Glass (out of stock)
      </RadioGroup.Item>
    </Fieldset>
  );
}
