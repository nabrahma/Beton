/**
 * Variants
 * Status badges add success to the standard vocabulary.
 */
import { Badge } from "@beton-ui/react";

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="primary">New</Badge>
      <Badge variant="secondary">Beta</Badge>
      <Badge variant="ghost">Draft</Badge>
      <Badge variant="danger">Deprecated</Badge>
      <Badge variant="success">Stable</Badge>
    </div>
  );
}
