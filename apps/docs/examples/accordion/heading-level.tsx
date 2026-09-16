/**
 * Heading level
 * The triggers sit inside headings, so set the level to match the outline of
 * the page around them.
 */
"use client";

import { Accordion, Heading } from "@beton-ui/react";

export default function AccordionHeadingLevel() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Heading level={2}>Frequently asked</Heading>
      <Accordion>
        <Accordion.Item value="one">
          <Accordion.Trigger headingLevel={3}>Is it accessible?</Accordion.Trigger>
          <Accordion.Panel>Every component is tested against axe and a keyboard.</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="two">
          <Accordion.Trigger headingLevel={3}>Is it themeable?</Accordion.Trigger>
          <Accordion.Panel>Change the tokens and everything follows.</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
