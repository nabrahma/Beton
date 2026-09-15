/**
 * Variants
 * The checked fill follows the variant. The tick is always ink.
 */
import { Checkbox } from "@beton-ui/react";

export default function CheckboxVariants() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <label className="flex items-center gap-3 font-medium">
        <Checkbox defaultChecked /> Primary
      </label>
      <label className="flex items-center gap-3 font-medium">
        <Checkbox variant="secondary" defaultChecked /> Secondary
      </label>
      <label className="flex items-center gap-3 font-medium">
        <Checkbox variant="danger" defaultChecked /> Danger
      </label>
      <label className="flex items-center gap-3 font-medium">
        <Checkbox disabled defaultChecked /> Disabled
      </label>
    </div>
  );
}
