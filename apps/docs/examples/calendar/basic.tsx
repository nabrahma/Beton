/**
 * Choosing a date
 * One day at a time. The grid keeps a single tab stop and the arrow keys roam
 * it, so a keyboard reaches any date without thirty presses of Tab.
 */
"use client";

import { Calendar, Text } from "@beton-ui/react";
import { useState } from "react";

export default function CalendarBasic() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar value={date} onValueChange={setDate} label="Pour date" />
      <Text size="sm">{date ? date.toDateString() : "No date chosen"}</Text>
    </div>
  );
}
