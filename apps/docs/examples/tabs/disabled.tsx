/**
 * Disabled tab
 * A disabled tab stays in the keyboard order so it can still be found and
 * announced. It simply refuses to open.
 */
"use client";

import { Tabs } from "@beton-ui/react";

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="current" className="w-full max-w-lg">
      <Tabs.List>
        <Tabs.Tab value="current">Current</Tabs.Tab>
        <Tabs.Tab value="history">History</Tabs.Tab>
        <Tabs.Tab value="archive" disabled>
          Archive
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="current">Today, so far.</Tabs.Panel>
      <Tabs.Panel value="history">Everything before today.</Tabs.Panel>
      <Tabs.Panel value="archive">Nothing here yet.</Tabs.Panel>
    </Tabs>
  );
}
