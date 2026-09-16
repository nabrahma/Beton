/**
 * Checkboxes, radios and submenus
 * Selection items stay open so several can be toggled at once.
 */
"use client";

import { DropdownMenu } from "@beton-ui/react";

export default function DropdownMenuSelection() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>View</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.GroupLabel>Show</DropdownMenu.GroupLabel>
        <DropdownMenu.CheckboxItem defaultChecked>Grid</DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem>Rulers</DropdownMenu.CheckboxItem>
        <DropdownMenu.Separator />
        <DropdownMenu.GroupLabel>Density</DropdownMenu.GroupLabel>
        <DropdownMenu.RadioGroup defaultValue="comfortable">
          <DropdownMenu.RadioItem value="compact">Compact</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="comfortable">Comfortable</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
        <DropdownMenu.Separator />
        <DropdownMenu.Submenu>
          <DropdownMenu.SubmenuTrigger>Export as</DropdownMenu.SubmenuTrigger>
          <DropdownMenu.Content side="right" align="start">
            <DropdownMenu.Item>PNG</DropdownMenu.Item>
            <DropdownMenu.Item>SVG</DropdownMenu.Item>
            <DropdownMenu.Item>PDF</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Submenu>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
