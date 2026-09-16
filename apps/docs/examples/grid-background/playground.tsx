"use client";

import { GridBackground, Heading, Text, type GridBackgroundProps } from "@beton-ui/react";

export default function GridBackgroundPlayground(props: GridBackgroundProps) {
  return (
    <div className="relative isolate w-full overflow-hidden border-3 border-border bg-raised p-10">
      <GridBackground {...props} />
      <Heading level={3}>Poured in place</Heading>
      <Text>The grid is drawn behind the words, never over them.</Text>
    </div>
  );
}
