"use client";

import { OtpInput, type OtpInputProps } from "@beton-ui/react";

export default function OtpInputPlayground(props: OtpInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="playground-otp" className="font-display text-sm font-bold uppercase">
        Verification code
      </label>
      <OtpInput {...props} id="playground-otp" />
    </div>
  );
}
