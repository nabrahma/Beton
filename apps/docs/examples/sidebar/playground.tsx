"use client";

import { Badge, Sidebar, type SidebarProps } from "@beton-ui/react";

export default function SidebarPlayground(props: SidebarProps) {
  return (
    <Sidebar {...props} className="h-80 w-64">
      <Sidebar.Section title="Getting started">
        <Sidebar.Item href="#" active>
          Installation
        </Sidebar.Item>
        <Sidebar.Item href="#">Theming</Sidebar.Item>
      </Sidebar.Section>
      <Sidebar.Section title="Components">
        <Sidebar.Item href="#">Button</Sidebar.Item>
        <Sidebar.Item href="#" badge={<Badge size="sm">New</Badge>}>
          Stepper
        </Sidebar.Item>
      </Sidebar.Section>
    </Sidebar>
  );
}
