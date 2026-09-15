"use client";

import { Input, Label, type InputProps } from "@beton-ui/react";

export default function InputPlayground(props: InputProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="playground-email">Email</Label>
      <Input {...props} id="playground-email" type="email" placeholder="you@example.com" />
    </div>
  );
}
