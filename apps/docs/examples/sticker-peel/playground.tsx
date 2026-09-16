"use client";

import { Heading, StickerPeel, Text, type StickerPeelProps } from "@beton-ui/react";

export default function StickerPeelPlayground(props: StickerPeelProps) {
  return (
    <StickerPeel {...props} className="max-w-xs">
      <Heading level={3}>Half price</Heading>
      <Text size="sm">Point at me and I lift off the page.</Text>
    </StickerPeel>
  );
}
