/**
 * Driven by a form
 * Move activeStep as the task progresses. Everything before it reads as done,
 * everything after as still to come.
 */
"use client";

import { Button, Stepper } from "@beton-ui/react";
import { useState } from "react";

const steps = ["Details", "Delivery", "Payment"];

export default function StepperInteractive() {
  const [step, setStep] = useState(0);

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Stepper activeStep={step}>
        {steps.map((title) => (
          <Stepper.Step key={title} title={title} />
        ))}
      </Stepper>
      <div className="flex gap-3">
        <Button
          variant="secondary"
          disabled={step === 0}
          onClick={() => setStep((current) => current - 1)}
        >
          Back
        </Button>
        <Button
          disabled={step === steps.length - 1}
          onClick={() => setStep((current) => current + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
