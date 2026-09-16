"use client";

import { Typewriter, type TypewriterProps } from "@beton-ui/react";

export default function TypewriterPlayground(props: Partial<TypewriterProps>) {
  return (
    <Typewriter {...props}>{["Poured in place", "Cured for weeks", "Built to last"]}</Typewriter>
  );
}
