/**
 * Sizes
 * Every size reaches a 44px target. Small buttons extend their hit area invisibly.
 */
import { Button } from "@beton-ui/react";

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
