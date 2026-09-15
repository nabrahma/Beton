/**
 * Body text
 * Three body sizes and a monospace option for technical detail.
 */
import { Text } from "@beton-ui/react";

export default function TextBody() {
  return (
    <div className="flex max-w-prose flex-col gap-3">
      <Text size="lg">
        Béton is the French word for concrete. Béton brut gave brutalism its name.
      </Text>
      <Text>
        Components install as source you own, styled with tokens you can change in one place.
      </Text>
      <Text size="sm" mono>
        npx beton-ui add button
      </Text>
    </div>
  );
}
