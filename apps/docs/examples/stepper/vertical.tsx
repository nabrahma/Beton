/**
 * Vertical
 * Turn the stepper on its side when the steps carry more than a line of
 * description, or when the column is narrow.
 */
"use client";

import { Stepper } from "@beton-ui/react";

export default function StepperVertical() {
  return (
    <Stepper activeStep={1} orientation="vertical" className="max-w-md">
      <Stepper.Step title="Pour" description="Two trucks, Tuesday morning." />
      <Stepper.Step title="Cure" description="Keep it damp for twenty-eight days." />
      <Stepper.Step title="Strike" description="Take the formwork down and sweep up." />
    </Stepper>
  );
}
