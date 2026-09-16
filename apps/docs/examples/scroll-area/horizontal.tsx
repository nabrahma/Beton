/**
 * Both directions
 * Pass horizontal for content that is wider than the panel. A corner fills the
 * gap where the two scrollbars meet.
 */
"use client";

import { ScrollArea } from "@beton-ui/react";

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea label="Schedule" horizontal className="h-48 w-full max-w-md border-3 border-border">
      <div className="flex w-max gap-4 p-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="flex size-32 shrink-0 items-center justify-center border-3 border-border bg-raised font-display text-h3 font-black"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
