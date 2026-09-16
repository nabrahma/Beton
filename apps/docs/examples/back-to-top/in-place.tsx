/**
 * The button
 * Shown here in the flow of the page so you can see it. In practice it is
 * fixed to the corner, and stays hidden until the page has scrolled.
 */
"use client";

import { BackToTop } from "@beton-ui/react";

export default function BackToTopInPlace() {
  return <BackToTop threshold={0} wrapperClassName="static" />;
}
