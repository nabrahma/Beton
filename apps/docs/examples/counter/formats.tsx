/**
 * Currency and percent
 * The number is written by Intl, so it counts in the reader's own notation and
 * screen readers get exactly the same string.
 */
"use client";

import { Counter } from "@beton-ui/react";

export default function CounterFormats() {
  return (
    <div className="flex flex-wrap items-baseline gap-8">
      <Counter value={48250} format={{ style: "currency", currency: "GBP" }} locale="en-GB" />
      <Counter value={0.92} format={{ style: "percent" }} />
      <Counter value={42} suffix=" sites" />
    </div>
  );
}
