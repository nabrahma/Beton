/**
 * Required
 * The marker is visual. Put required on the control so it is announced.
 */
import { Input, Label } from "@beton-ui/react";

export default function LabelRequired() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="company" required>
        Company
      </Label>
      <Input id="company" required />
    </div>
  );
}
