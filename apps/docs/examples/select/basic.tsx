/**
 * Basic
 * Pass items to show the label of the selected value in the trigger.
 */
"use client";

import { Select } from "@beton-ui/react";

const typefaces = [
  { label: "Archivo", value: "archivo" },
  { label: "Public Sans", value: "public-sans" },
  { label: "JetBrains Mono", value: "jetbrains-mono" },
  { label: "Space Grotesk", value: "space-grotesk" },
];

export default function SelectBasic() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select items={typefaces}>
        <Select.Label>Typeface</Select.Label>
        <Select.Trigger placeholder="Choose a typeface" />
        <Select.Content>
          {typefaces.map((typeface) => (
            <Select.Item key={typeface.value} value={typeface.value}>
              {typeface.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
}
