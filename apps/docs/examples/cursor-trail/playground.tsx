"use client";

import { CursorTrail, Text, type CursorTrailProps } from "@beton-ui/react";
import { useRef } from "react";

export default function CursorTrailPlayground(props: CursorTrailProps) {
  const area = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={area}
      className="grid min-h-48 w-full place-items-center border-3 border-border bg-raised p-8"
    >
      <Text>Move the pointer across this panel.</Text>
      <CursorTrail {...props} container={area} />
    </div>
  );
}
