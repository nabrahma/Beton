/**
 * Basic
 * Press Ctrl/Cmd + K, or use the button for people who do not know the shortcut.
 */
"use client";

import { Button, CommandPalette, Text } from "@beton-ui/react";
import { useState } from "react";

export default function CommandPaletteBasic() {
  const [ran, setRan] = useState("");

  return (
    <div className="flex flex-col items-start gap-4">
      <Text size="sm" mono aria-live="polite">
        {ran ? "Ran: " + ran : "Nothing run yet"}
      </Text>
      <CommandPalette
        trigger={<Button variant="secondary">Open command palette</Button>}
        groups={[
          {
            label: "Pages",
            items: [
              {
                value: "docs",
                label: "Go to documentation",
                hint: "G D",
                onSelect: () => setRan("documentation"),
              },
              {
                value: "components",
                label: "Browse components",
                keywords: ["button", "dialog", "card"],
                onSelect: () => setRan("components"),
              },
            ],
          },
          {
            label: "Actions",
            items: [
              { value: "theme", label: "Copy theme tokens", onSelect: () => setRan("copy tokens") },
              { value: "issue", label: "Report an issue", onSelect: () => setRan("report issue") },
            ],
          },
        ]}
      />
    </div>
  );
}
