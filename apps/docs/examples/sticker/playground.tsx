"use client";

import { Sticker, type StickerProps } from "@beton-ui/react";

export default function StickerPlayground(props: Partial<StickerProps>) {
  return (
    <Sticker {...props} text="New release">
      <span className="text-h3">↗</span>
    </Sticker>
  );
}
