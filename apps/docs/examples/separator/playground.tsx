"use client";

import { Separator, type SeparatorProps } from "@beton-ui/react";

export default function SeparatorPlayground(props: SeparatorProps) {
  const vertical = props.orientation === "vertical";
  return (
    <div
      className={vertical ? "flex h-24 items-stretch gap-6" : "flex w-full max-w-sm flex-col gap-6"}
    >
      <span className="font-display font-bold">{vertical ? "Left" : "Above"}</span>
      <Separator {...props} />
      <span className="font-display font-bold">{vertical ? "Right" : "Below"}</span>
    </div>
  );
}
