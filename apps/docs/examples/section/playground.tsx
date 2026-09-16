"use client";

import { Button, Section, Text, type SectionProps } from "@beton-ui/react";

export default function SectionPlayground(props: SectionProps) {
  return (
    <Section
      {...props}
      eyebrow="Tier six"
      title="Poured, not designed"
      description="Every block in this tier sits in this frame, so they all agree about padding, measure and where the heading goes."
      actions={<Button>Read the docs</Button>}
    >
      <Text>Whatever the block draws goes here.</Text>
    </Section>
  );
}
