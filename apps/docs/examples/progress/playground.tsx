"use client";

import { Progress, type ProgressProps } from "@beton-ui/react";

export default function ProgressPlayground(props: ProgressProps) {
  return <Progress {...props} value={62} label="Cured" className="max-w-md" />;
}
