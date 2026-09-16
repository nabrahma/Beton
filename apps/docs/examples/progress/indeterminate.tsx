/**
 * When you do not know
 * Pass null and the bar marches without claiming a number. Screen readers hear
 * a progressbar with no value, which is how an unknown amount is announced.
 */
"use client";

import { Progress } from "@beton-ui/react";

export default function ProgressIndeterminate() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress value={40} label="Known" />
      <Progress value={null} label="Unknown" />
    </div>
  );
}
