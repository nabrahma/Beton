"use client";

import { Button, EmptyState, type EmptyStateProps } from "@beton-ui/react";

export default function EmptyStatePlayground(props: Partial<EmptyStateProps>) {
  return (
    <EmptyState
      {...props}
      title="No pours yet"
      description="Book a delivery and it will show up here, with its grade and volume."
      actions={<Button>Book a pour</Button>}
      className="max-w-lg"
    />
  );
}
