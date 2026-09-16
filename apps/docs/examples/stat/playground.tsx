"use client";

import { Stat, type StatProps } from "@beton-ui/react";

export default function StatPlayground(props: Partial<StatProps>) {
  return (
    <Stat
      {...props}
      label="Volume poured"
      value="1,284"
      delta="+12%"
      trend="up"
      description="Cubic metres, compared with last quarter"
      className="w-full max-w-sm"
    />
  );
}
