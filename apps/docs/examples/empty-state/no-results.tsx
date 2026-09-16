/**
 * No results
 * Say what was searched for and offer the way out, rather than leaving someone
 * staring at an empty box.
 */
"use client";

import { Button, EmptyState } from "@beton-ui/react";

export default function EmptyStateNoResults() {
  return (
    <EmptyState
      size="sm"
      title="Nothing matches “c40”"
      description="Try a wider grade range, or clear the filters."
      actions={
        <>
          <Button variant="secondary">Clear filters</Button>
          <Button variant="ghost">Browse all</Button>
        </>
      }
      className="max-w-lg"
    />
  );
}
