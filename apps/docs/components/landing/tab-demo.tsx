"use client";

import { Button, Input, Label } from "@beton-ui/react";
import { useState } from "react";

export function TabDemo() {
  const [focused, setFocused] = useState<string>("nothing yet");

  return (
    <div
      className="flex flex-col gap-6 border-3 border-border bg-raised p-6 shadow-lg sm:p-8"
      onFocusCapture={(event) => {
        const el = event.target as HTMLElement;
        setFocused(
          el.getAttribute("aria-label") ?? el.textContent?.trim() ?? el.tagName.toLowerCase(),
        );
      }}
    >
      <p className="font-display text-lg font-extrabold">
        Click here, then press{" "}
        <kbd className="border-2 border-b-4 border-border px-1.5 font-mono text-sm">Tab</kbd>.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="demo-name">Name</Label>
          <Input id="demo-name" placeholder="Focus ring on paper" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="demo-city">City</Label>
          <Input id="demo-city" placeholder="Visible on white" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button>On teal</Button>
        <Button variant="danger">On magenta</Button>
        <Button variant="secondary">On white</Button>
        <Button variant="ghost">On paper</Button>
      </div>
      <p className="border-t-3 border-border pt-4 font-mono text-sm" aria-live="polite">
        Focused: <strong>{focused}</strong>
      </p>
    </div>
  );
}
