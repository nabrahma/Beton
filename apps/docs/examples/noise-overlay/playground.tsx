"use client";

import { Heading, NoiseOverlay, Text, type NoiseOverlayProps } from "@beton-ui/react";

export default function NoiseOverlayPlayground(props: NoiseOverlayProps) {
  return (
    <div className="relative isolate w-full overflow-hidden border-3 border-border bg-secondary p-10">
      <NoiseOverlay {...props} />
      <Heading level={3}>Grain</Heading>
      <Text>Keep the weight low over text, or the words start to fight the grain.</Text>
    </div>
  );
}
