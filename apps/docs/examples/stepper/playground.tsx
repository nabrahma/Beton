"use client";

import { Stepper, type StepperProps } from "@beton-ui/react";

export default function StepperPlayground(props: StepperProps) {
  return (
    <Stepper {...props} activeStep={1} className="w-full max-w-xl">
      <Stepper.Step title="Basket" description="What you are buying" />
      <Stepper.Step title="Delivery" description="Where it goes" />
      <Stepper.Step title="Payment" description="How you pay" />
    </Stepper>
  );
}
