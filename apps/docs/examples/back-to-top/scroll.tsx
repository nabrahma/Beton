/**
 * Fixed to the corner
 * The real thing: out of sight and out of the tab order until the page has
 * scrolled past the threshold. Scroll this page and it appears bottom right.
 */
"use client";

import { BackToTop, Text } from "@beton-ui/react";

export default function BackToTopScroll() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Text>Scroll the page. The button appears in the corner after 400 pixels.</Text>
      <BackToTop threshold={400} data-demo="scroll" />
    </div>
  );
}
