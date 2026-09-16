"use client";

import { Accordion, type AccordionProps } from "@beton-ui/react";

export default function AccordionPlayground(props: AccordionProps) {
  return (
    <Accordion {...props} className="w-full max-w-lg">
      <Accordion.Item value="delivery">
        <Accordion.Trigger>When does it arrive?</Accordion.Trigger>
        <Accordion.Panel>Within two working days, anywhere on the mainland.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="returns">
        <Accordion.Trigger>Can I send it back?</Accordion.Trigger>
        <Accordion.Panel>Thirty days, no questions, no restocking fee.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="support">
        <Accordion.Trigger>Who do I ask?</Accordion.Trigger>
        <Accordion.Panel>Anyone on the team. We all read the inbox.</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
