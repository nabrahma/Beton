/**
 * Sizes
 * Eight blocks step around the circle. Under reduced motion the spinner holds still.
 */
import { Spinner } from "@beton-ui/react";

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}
