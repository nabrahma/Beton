"use client";

import { Menubar, type MenubarProps } from "@beton-ui/react";

export default function MenubarPlayground(props: MenubarProps) {
  return (
    <Menubar {...props}>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item shortcut="Ctrl N">New</Menubar.Item>
          <Menubar.Item shortcut="Ctrl O">Open</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item shortcut="Ctrl S">Save</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item shortcut="Ctrl Z">Undo</Menubar.Item>
          <Menubar.Item shortcut="Ctrl Y">Redo</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item disabled>Paste</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.CheckboxItem defaultChecked>Grid</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Rulers</Menubar.CheckboxItem>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>
  );
}
