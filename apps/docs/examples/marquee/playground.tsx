"use client";

import { Marquee, type MarqueeProps } from "@beton-ui/react";

const words = ["POURED IN PLACE", "NO BORDER RADIUS", "HARD SHADOWS", "44PX TARGETS"];

export default function MarqueePlayground(props: MarqueeProps) {
  return (
    <Marquee {...props} className="w-full">
      {words.map((word) => (
        <span key={word} className="font-display text-h3 font-black tracking-tight uppercase">
          {word}
        </span>
      ))}
    </Marquee>
  );
}
