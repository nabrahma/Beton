"use client";

import { HalftoneBackground, Heading, Text, type HalftoneBackgroundProps } from "@beton-ui/react";

export default function HalftoneBackgroundPlayground(props: HalftoneBackgroundProps) {
  return (
    <div className="relative isolate w-full overflow-hidden border-3 border-border bg-raised p-10">
      <HalftoneBackground {...props} />
      {/* Text sits on a solid panel above the pattern, where it stays legible. */}
      <div className="relative max-w-sm border-3 border-border bg-raised p-6">
        <Heading level={3}>Off the press</Heading>
        <Text>Dots at print scale, generated rather than downloaded.</Text>
      </div>
    </div>
  );
}
