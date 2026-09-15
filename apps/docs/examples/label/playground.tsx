"use client";

import { Input, Label, type LabelProps } from "@beton-ui/react";

export default function LabelPlayground(props: LabelProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label {...props} htmlFor="playground-name">
        Full name
      </Label>
      <Input id="playground-name" disabled={props.disabled} required={props.required} />
    </div>
  );
}
