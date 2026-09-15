/**
 * Group with a legend
 * A Fieldset names the group, so screen readers announce the question before each option.
 */
"use client";

import { Checkbox, Fieldset } from "@beton-ui/react";

const toppings = ["Basil", "Chilli", "Olives", "Anchovies"];

export default function CheckboxGroup() {
  return (
    <Fieldset>
      <Fieldset.Legend>Toppings</Fieldset.Legend>
      {toppings.map((topping) => (
        <label key={topping} className="flex items-center gap-3 font-medium">
          <Checkbox
            name="toppings"
            value={topping.toLowerCase()}
            defaultChecked={topping === "Basil"}
          />
          {topping}
        </label>
      ))}
    </Fieldset>
  );
}
