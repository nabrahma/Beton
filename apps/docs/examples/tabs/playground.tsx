"use client";

import { Tabs, type TabsProps } from "@beton-ui/react";

export default function TabsPlayground(props: TabsProps) {
  return (
    <Tabs {...props} defaultValue="overview" className="w-full max-w-lg">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="specification">Specification</Tabs.Tab>
        <Tabs.Tab value="delivery">Delivery</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">Poured in place, cured for 28 days.</Tabs.Panel>
      <Tabs.Panel value="specification">C30/37, 150mm slump, no admixtures.</Tabs.Panel>
      <Tabs.Panel value="delivery">Two trucks, Tuesday morning.</Tabs.Panel>
    </Tabs>
  );
}
