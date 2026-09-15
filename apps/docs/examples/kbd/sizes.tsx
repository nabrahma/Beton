/**
 * Sizes
 * Match the key to the text around it.
 */
import { Kbd } from "@beton-ui/react";

export default function KbdSizes() {
  return (
    <div className="flex items-center gap-3">
      <Kbd size="sm">Tab</Kbd>
      <Kbd size="md">Shift</Kbd>
      <Kbd size="lg">Enter</Kbd>
    </div>
  );
}
