"use client";

import { Timeline, type TimelineProps } from "@beton-ui/react";

export default function TimelinePlayground(props: TimelineProps) {
  return (
    <Timeline {...props} className="max-w-md">
      <Timeline.Item title="Batched" time="09:00" dateTime="2026-03-02T09:00" state="done">
        Left the plant with a 150mm slump.
      </Timeline.Item>
      <Timeline.Item title="Poured" time="10:30" dateTime="2026-03-02T10:30" state="current">
        Two trucks, no delays.
      </Timeline.Item>
      <Timeline.Item title="Struck" time="Friday" state="upcoming" />
    </Timeline>
  );
}
