/**
 * With a label
 * Every input needs a label. Placeholder text disappears as soon as someone types.
 */
import { Input, Label } from "@beton-ui/react";

export default function InputWithLabel() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="project-name" required>
        Project name
      </Label>
      <Input id="project-name" required autoComplete="off" />
    </div>
  );
}
