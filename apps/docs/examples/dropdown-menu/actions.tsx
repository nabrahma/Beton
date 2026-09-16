/**
 * Actions
 * Arrow keys move between items, Enter runs one, Escape closes the menu.
 */
"use client";

import { DropdownMenu } from "@beton-ui/react";

export default function DropdownMenuActions() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>Actions</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item shortcut="Ctrl D">Duplicate</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="Ctrl R">Rename</DropdownMenu.Item>
        <DropdownMenu.Item disabled>Move to archive</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item danger shortcut="Del">
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
