"use client";

import { Switch, type SwitchProps } from "@beton-ui/react";

export default function SwitchPlayground(props: SwitchProps) {
  return (
    <label className="flex items-center gap-4 font-display font-bold">
      <Switch {...props} />
      Reduce motion
    </label>
  );
}
