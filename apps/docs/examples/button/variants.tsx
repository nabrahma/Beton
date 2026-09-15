/**
 * Variants
 * Primary is the one filled action per view. Secondary and ghost support it; danger confirms destruction.
 */
import { Button } from "@beton-ui/react";

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Publish</Button>
      <Button variant="secondary">Save draft</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </div>
  );
}
