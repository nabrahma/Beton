"use client";

import { Heading, type HeadingProps } from "@beton-ui/react";

export default function TextPlayground(props: HeadingProps) {
  return (
    <Heading {...props} level={2}>
      Raw concrete
    </Heading>
  );
}
