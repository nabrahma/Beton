/**
 * Visible label
 * Show the status text when there is room. It is announced either way.
 */
import { Spinner } from "@beton-ui/react";

export default function SpinnerWithLabel() {
  return <Spinner size="lg" showLabel label="Pouring concrete" />;
}
