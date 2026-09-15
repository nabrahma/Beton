"use client";

import { Checkbox, type CheckboxProps } from "@beton-ui/react";

export default function CheckboxPlayground(props: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 font-medium">
      <Checkbox {...props} />
      Send me release notes
    </label>
  );
}
