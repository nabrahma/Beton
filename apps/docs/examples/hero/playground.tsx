"use client";

import { Button, GridBackground, Hero, type HeroProps } from "@beton-ui/react";

export default function HeroPlayground(props: HeroProps) {
  return (
    <Hero
      {...props}
      headingLevel={2}
      eyebrow="v1.0"
      title="Concrete for the web"
      description="Components that look like they were poured, not designed. Readable source, WCAG 2.2 AA underneath."
      actions={
        <>
          <Button>Get started</Button>
          <Button variant="secondary">Browse components</Button>
        </>
      }
      note="MIT with Commons Clause · React 19 · Tailwind v4"
      background={<GridBackground weight="light" />}
      aside={
        <div className="w-full border-3 border-border bg-raised p-6 shadow-lg">
          <p className="font-mono text-sm font-bold">npx beton-ui add button</p>
        </div>
      }
    />
  );
}
