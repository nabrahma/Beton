"use client";

import { Ticker, type TickerProps } from "@beton-ui/react";

const headlines = [
  "Wharf Road poured at 10:30",
  "Kiln Street booked for Friday",
  "Bridge Yard curing, day three",
];

export default function TickerPlayground(props: Partial<TickerProps>) {
  return <Ticker {...props} label="Live" items={headlines} />;
}
