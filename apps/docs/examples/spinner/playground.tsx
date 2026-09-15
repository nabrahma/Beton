"use client";

import { Spinner, type SpinnerProps } from "@beton-ui/react";

export default function SpinnerPlayground(props: SpinnerProps) {
  return <Spinner {...props} label="Loading results" />;
}
