/**
 * Stroke weights
 * The three sizes map to the 2, 3 and 5 pixel stroke tokens.
 */
import { Separator } from "@beton-ui/react";

export default function SeparatorWeights() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Separator size="sm" />
      <Separator size="md" />
      <Separator size="lg" />
    </div>
  );
}
