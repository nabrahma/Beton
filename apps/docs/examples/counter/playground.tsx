"use client";

import { Counter, type CounterProps } from "@beton-ui/react";

export default function CounterPlayground(props: Partial<CounterProps>) {
  return <Counter {...props} value={1284} suffix=" m³" />;
}
