"use client";

import { Counter, StatsBand, type StatsBandProps } from "@beton-ui/react";

export default function StatsBandPlayground(props: Partial<StatsBandProps>) {
  return (
    <StatsBand
      {...props}
      headingLevel={2}
      title="By the numbers"
      stats={[
        { label: "Components", value: <Counter value={68} size="sm" /> },
        {
          label: "Tests",
          value: <Counter value={700} size="sm" />,
          description: "On every commit",
        },
        { label: "Runtime dependencies", value: <Counter value={0} size="sm" /> },
        { label: "Radii", value: <Counter value={3} size="sm" />, description: "0, 12px, 24px" },
      ]}
    />
  );
}
