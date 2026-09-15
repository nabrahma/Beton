/**
 * In a heading
 * Badges align with text, so they work inline with headings and body copy.
 */
import { Badge, Heading } from "@beton-ui/react";

export default function BadgeInContext() {
  return (
    <Heading level={3} size="sm" className="flex items-center gap-3">
      Command palette <Badge variant="secondary">Soon</Badge>
    </Heading>
  );
}
