/**
 * Sizes
 * All three sizes are at least 44px tall.
 */
import { Input } from "@beton-ui/react";

export default function InputSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input size="sm" aria-label="Small" placeholder="Small" />
      <Input size="md" aria-label="Medium" placeholder="Medium" />
      <Input size="lg" aria-label="Large" placeholder="Large" />
    </div>
  );
}
