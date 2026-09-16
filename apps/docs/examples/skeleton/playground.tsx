"use client";

import { Skeleton, type SkeletonProps } from "@beton-ui/react";

export default function SkeletonPlayground(props: SkeletonProps) {
  return (
    <div className="w-full max-w-sm">
      <Skeleton {...props} />
    </div>
  );
}
