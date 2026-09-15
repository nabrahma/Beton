/**
 * Sizes
 * The thumb travels exactly the track width in every size.
 */
import { Switch } from "@beton-ui/react";

export default function SwitchSizes() {
  return (
    <div className="flex items-center gap-6">
      <Switch size="sm" aria-label="Small" defaultChecked />
      <Switch size="md" aria-label="Medium" defaultChecked variant="secondary" />
      <Switch size="lg" aria-label="Large" defaultChecked variant="danger" />
    </div>
  );
}
