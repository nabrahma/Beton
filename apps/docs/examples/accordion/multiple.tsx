/**
 * Several at once
 * Pass multiple to let people open as many sections as they like, and
 * defaultValue to decide which start open.
 */
"use client";

import { Accordion } from "@beton-ui/react";

export default function AccordionMultiple() {
  return (
    <Accordion multiple defaultValue={["first"]} className="w-full max-w-lg">
      <Accordion.Item value="first">
        <Accordion.Trigger>Materials</Accordion.Trigger>
        <Accordion.Panel>Cement, aggregate, water.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="second">
        <Accordion.Trigger>Tools</Accordion.Trigger>
        <Accordion.Panel>A mixer, a float, a straight edge.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="third">
        <Accordion.Trigger>Time</Accordion.Trigger>
        <Accordion.Panel>An afternoon to pour, a month to cure.</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
