/**
 * As a link
 * Render a badge as an anchor to make it interactive.
 */
import { Badge } from "@beton-ui/react";

export default function BadgeAsLink() {
  return (
    <Badge variant="success" size="lg" render={<a href="#changelog" />}>
      v0.1.0 changelog
    </Badge>
  );
}
