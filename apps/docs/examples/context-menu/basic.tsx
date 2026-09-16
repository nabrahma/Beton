/**
 * On a canvas
 * Right-click the area, or focus it and press the Menu key.
 */
"use client";

import { ContextMenu } from "@beton-ui/react";

export default function ContextMenuBasic() {
  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <div
          tabIndex={0}
          className="bg-grid flex h-40 w-full max-w-md items-center justify-center border-3 border-dashed border-border font-display font-bold"
        >
          Right-click here
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item shortcut="Ctrl C">Copy</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl V">Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.CheckboxItem defaultChecked>Snap to grid</ContextMenu.CheckboxItem>
        <ContextMenu.Separator />
        <ContextMenu.Item danger>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
}
