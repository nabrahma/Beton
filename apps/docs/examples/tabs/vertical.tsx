/**
 * Vertical
 * A vertical list suits long labels and narrow columns. Arrow keys follow the
 * orientation: up and down rather than left and right.
 */
"use client";

import { Tabs } from "@beton-ui/react";

export default function TabsVertical() {
  return (
    <Tabs defaultValue="mix" orientation="vertical" className="w-full max-w-xl">
      <Tabs.List>
        <Tabs.Tab value="mix">Mix design</Tabs.Tab>
        <Tabs.Tab value="formwork">Formwork</Tabs.Tab>
        <Tabs.Tab value="curing">Curing</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="mix">Cement, aggregate, water, in that order.</Tabs.Panel>
      <Tabs.Panel value="formwork">Plywood, braced every 600mm.</Tabs.Panel>
      <Tabs.Panel value="curing">Keep it damp for a week.</Tabs.Panel>
    </Tabs>
  );
}
