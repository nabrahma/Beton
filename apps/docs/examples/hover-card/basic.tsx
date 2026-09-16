/**
 * Profile preview
 * The link works on its own; the card only adds detail.
 */
"use client";

import { Avatar, HoverCard, Text } from "@beton-ui/react";

export default function HoverCardBasic() {
  return (
    <Text>
      Béton is built by{" "}
      <HoverCard>
        <HoverCard.Trigger
          href="https://github.com/nabrahma"
          className="font-bold underline decoration-3 underline-offset-4"
        >
          @nabrahma
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div className="flex items-center gap-3">
            <Avatar alt="Nabaskar Brahma" />
            <div>
              <Text weight="bold">Nabaskar Brahma</Text>
              <Text size="sm">Maintainer of Béton</Text>
            </div>
          </div>
          <Text size="sm">
            Neobrutalist components for React, with the accessibility work done.
          </Text>
        </HoverCard.Content>
      </HoverCard>
      .
    </Text>
  );
}
