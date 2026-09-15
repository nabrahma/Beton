/**
 * Settings list
 * Switches apply immediately, so they suit settings without a save button.
 */
"use client";

import { Separator, Switch } from "@beton-ui/react";
import { useState } from "react";

export default function SwitchSettings() {
  const [settings, setSettings] = useState({ email: true, push: false, digest: true });
  const rows = [
    { key: "email", label: "Email notifications" },
    { key: "push", label: "Push notifications" },
    { key: "digest", label: "Weekly digest" },
  ] as const;

  return (
    <div className="flex w-full max-w-sm flex-col border-3 border-border bg-raised shadow-sm">
      {rows.map((row, index) => (
        <div key={row.key}>
          {index > 0 ? <Separator size="sm" /> : null}
          <label className="flex items-center justify-between gap-4 p-4 font-medium">
            {row.label}
            <Switch
              checked={settings[row.key]}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, [row.key]: checked }))
              }
            />
          </label>
        </div>
      ))}
    </div>
  );
}
