/**
 * Questions and answers
 * One answer opens at a time. Put the awkward questions in: a missing answer
 * is still an answer.
 */
"use client";

import { Button, Faq, Text } from "@beton-ui/react";

const items = [
  { question: "Is it really free?", answer: "Every component and every block, yes." },
  {
    question: "Can I sell what I build with it?",
    answer: "Yes. The licence stops you selling the library itself, nothing else.",
  },
  {
    question: "Does it work without Tailwind?",
    answer: "No. The recipes are Tailwind classes, and the tokens are a Tailwind theme.",
  },
];

export default function FaqBasic() {
  return (
    <Faq
      headingLevel={2}
      title="Questions"
      items={items}
      aside={
        <>
          <Text>Something not covered here?</Text>
          <Button variant="secondary">Open an issue</Button>
        </>
      }
    />
  );
}
