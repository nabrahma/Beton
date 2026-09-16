/**
 * Ruling dates out
 * Pass min, max or isDateDisabled. A ruled-out day stays focusable, so it can
 * still be found and announced rather than silently disappearing.
 */
"use client";

import { Calendar } from "@beton-ui/react";

const today = new Date();
const inTwoWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

export default function CalendarLimits() {
  return (
    <Calendar
      label="Delivery date"
      min={today}
      max={inTwoWeeks}
      isDateDisabled={(date) => date.getDay() === 0 || date.getDay() === 6}
    />
  );
}
