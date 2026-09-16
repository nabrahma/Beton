"use client";

import { Button, CtaBand, type CtaBandProps } from "@beton-ui/react";

export default function CtaBandPlayground(props: CtaBandProps) {
  return (
    <CtaBand
      {...props}
      headingLevel={2}
      title="Start with one component"
      description="Install a button and see whether you like the way it presses."
      actions={
        <>
          <Button variant="secondary">Read the docs</Button>
          <Button>Install</Button>
        </>
      }
    />
  );
}
