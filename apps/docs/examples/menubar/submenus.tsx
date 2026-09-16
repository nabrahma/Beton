/**
 * Submenus
 * A menu in the bar takes the same items as a dropdown menu, submenus
 * included. ArrowRight opens one, ArrowLeft closes it again.
 */
"use client";

import { Menubar } from "@beton-ui/react";

export default function MenubarSubmenus() {
  return (
    <Menubar>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>New</Menubar.Item>
          <Menubar.Submenu>
            <Menubar.SubmenuTrigger>Export</Menubar.SubmenuTrigger>
            <Menubar.Content>
              <Menubar.Item>PDF</Menubar.Item>
              <Menubar.Item>PNG</Menubar.Item>
              <Menubar.Item>SVG</Menubar.Item>
            </Menubar.Content>
          </Menubar.Submenu>
          <Menubar.Separator />
          <Menubar.Item danger>Delete project</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Help</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Documentation</Menubar.Item>
          <Menubar.Item>Keyboard shortcuts</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>
  );
}
