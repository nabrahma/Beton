/**
 * Verify on completion
 * onValueComplete fires when the last slot is filled.
 */
"use client";

import { OtpInput, Spinner, Text } from "@beton-ui/react";
import { useState } from "react";

export default function OtpInputVerify() {
  const [status, setStatus] = useState<"idle" | "checking" | "done">("idle");

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="verify-otp" className="font-display text-sm font-bold uppercase">
        Enter the 6-digit code
      </label>
      <OtpInput
        id="verify-otp"
        onValueComplete={() => {
          setStatus("checking");
          setTimeout(() => setStatus("done"), 1200);
        }}
      />
      <div aria-live="polite" className="min-h-7">
        {status === "checking" ? <Spinner showLabel label="Checking code" size="sm" /> : null}
        {status === "done" ? <Text weight="bold">Code accepted.</Text> : null}
      </div>
    </div>
  );
}
