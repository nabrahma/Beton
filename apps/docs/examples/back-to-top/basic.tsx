/**
 * Back to top
 * The button appears once the page has scrolled past the threshold. Pressing
 * it scrolls to the top and moves focus with it, so the keyboard follows.
 */
"use client";

import { BackToTop, Text } from "@beton-ui/react";

export default function BackToTopBasic() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Text>Scroll the page. The button appears in the corner after 400 pixels.</Text>
      <BackToTop threshold={400} />
    </div>
  );
}
