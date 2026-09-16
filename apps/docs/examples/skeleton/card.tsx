/**
 * Standing in for a card
 * Match the shape of what is coming, so nothing jumps when it arrives. The
 * loading state itself belongs on the region, not on the placeholders.
 */
"use client";

import { Card, Skeleton } from "@beton-ui/react";

export default function SkeletonCard() {
  return (
    <Card role="status" aria-busy="true" aria-label="Loading site" className="w-full max-w-sm">
      <Card.Header>
        <Skeleton shape="title" />
      </Card.Header>
      <Card.Body>
        <div className="flex flex-col gap-3">
          <Skeleton />
          <Skeleton className="w-4/5" />
          <Skeleton className="w-3/5" />
        </div>
      </Card.Body>
      <Card.Footer>
        <Skeleton shape="button" />
      </Card.Footer>
    </Card>
  );
}
