/**
 * Controlled
 * Hold the value yourself when the page needs to know which view is showing,
 * for instance to keep it in the address bar.
 */
"use client";

import { Tabs, Text } from "@beton-ui/react";
import { useState } from "react";

export default function TabsControlled() {
  const [value, setValue] = useState("code");

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Tabs value={value} onValueChange={(next) => setValue(String(next))}>
        <Tabs.List>
          <Tabs.Tab value="code">Code</Tabs.Tab>
          <Tabs.Tab value="preview">Preview</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="code">The source, as installed.</Tabs.Panel>
        <Tabs.Panel value="preview">The component, running.</Tabs.Panel>
      </Tabs>
      <Text size="sm">Showing: {value}</Text>
    </div>
  );
}
