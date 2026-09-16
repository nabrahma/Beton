/**
 * Vertical scrolling
 * The region is focusable and named, so it can be scrolled with the keyboard
 * alone. The scrollbar appears only when there is something to scroll.
 */
"use client";

import { ScrollArea, Text } from "@beton-ui/react";

export default function ScrollAreaBasic() {
  return (
    <ScrollArea label="Specification" className="h-56 w-full max-w-md border-3 border-border">
      <div className="flex flex-col gap-3 p-4">
        {Array.from({ length: 12 }, (_, i) => (
          <Text key={i}>
            Clause {i + 1}. Concrete shall be placed within ninety minutes of batching and compacted
            before the initial set.
          </Text>
        ))}
      </div>
    </ScrollArea>
  );
}
