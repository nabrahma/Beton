/**
 * Currency
 * format uses Intl.NumberFormat options, so values display in the user's locale.
 */
"use client";

import { NumberInput } from "@beton-ui/react";

export default function NumberInputCurrency() {
  return (
    <NumberInput
      label="Budget"
      defaultValue={1500}
      step={50}
      min={0}
      format={{ style: "currency", currency: "EUR" }}
      className="max-w-60"
    />
  );
}
