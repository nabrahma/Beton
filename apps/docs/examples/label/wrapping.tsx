/**
 * Wrapping a control
 * A label can wrap its control instead of pointing at it with htmlFor.
 */
import { Label } from "@beton-ui/react";

export default function LabelWrapping() {
  return (
    <Label className="gap-3">
      <input type="checkbox" className="size-5 accent-ink" defaultChecked />
      Subscribe to releases
    </Label>
  );
}
