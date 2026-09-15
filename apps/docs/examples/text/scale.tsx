/**
 * Type scale
 * Heading sizes follow the poster scale and shrink on small screens.
 */
import { Heading } from "@beton-ui/react";

export default function TextScale() {
  return (
    <div className="flex flex-col gap-4">
      <Heading level={2} size="xl">
        Béton
      </Heading>
      <Heading level={3} size="lg">
        Brutal
      </Heading>
      <Heading level={4} size="md">
        Honest
      </Heading>
      <Heading level={5} size="sm">
        Accessible
      </Heading>
    </div>
  );
}
