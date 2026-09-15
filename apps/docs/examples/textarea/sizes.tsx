/**
 * Sizes
 * Minimum heights grow with size; users can resize vertically.
 */
import { Textarea } from "@beton-ui/react";

export default function TextareaSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Textarea size="sm" aria-label="Small" placeholder="Small" />
      <Textarea size="md" aria-label="Medium" placeholder="Medium" />
      <Textarea size="lg" aria-label="Large" placeholder="Large" />
    </div>
  );
}
