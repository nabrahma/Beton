/**
 * A long list of links
 * Wrap the sections in a ScrollArea when there are more links than fit, so the
 * column scrolls rather than the page.
 */
"use client";

import { ScrollArea, Sidebar } from "@beton-ui/react";

const groups = {
  Forms: ["Button", "Checkbox", "Input", "Select", "Switch"],
  Overlays: ["Dialog", "Popover", "Toast", "Tooltip"],
  Navigation: ["Accordion", "Pagination", "Stepper", "Tabs"],
};

export default function SidebarWithScroll() {
  return (
    <ScrollArea label="Components" className="h-72 w-64 border-3 border-border">
      <Sidebar bordered={false} size="sm">
        {Object.entries(groups).map(([title, items]) => (
          <Sidebar.Section key={title} title={title}>
            {items.map((item) => (
              <Sidebar.Item key={item} href="#">
                {item}
              </Sidebar.Item>
            ))}
          </Sidebar.Section>
        ))}
      </Sidebar>
    </ScrollArea>
  );
}
