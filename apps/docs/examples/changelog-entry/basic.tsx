/**
 * A release
 * Stack them newest first. Each entry is its own article, so a screen reader
 * can jump between releases.
 */
"use client";

import { ChangelogEntry } from "@beton-ui/react";

export default function ChangelogEntryBasic() {
  return (
    <div className="w-full max-w-3xl">
      <ChangelogEntry
        headingLevel={2}
        version="1.2.0"
        date="2 March 2026"
        dateTime="2026-03-02"
        title="Navigation"
        changes={[
          { kind: "added", summary: "Tabs, accordion, breadcrumbs, pagination and stepper." },
          { kind: "changed", summary: "Playground toggles start from the recipe default." },
          { kind: "fixed", summary: "Badges rendered as links now reach 44px." },
        ]}
      />
      <ChangelogEntry
        headingLevel={2}
        version="1.1.0"
        date="18 February 2026"
        dateTime="2026-02-18"
        title="Overlays"
        changes={[
          { kind: "added", summary: "Dialog, sheet, popover, tooltip and the menus." },
          { kind: "removed", summary: "The undocumented size prop on Kbd." },
        ]}
      />
    </div>
  );
}
