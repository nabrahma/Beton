/**
 * Basic
 * The page behind stays usable, unlike a dialog.
 */
"use client";

import { Popover, Text } from "@beton-ui/react";

export default function PopoverBasic() {
  return (
    <Popover>
      <Popover.Trigger>Share</Popover.Trigger>
      <Popover.Content showClose>
        <Popover.Title>Share this page</Popover.Title>
        <Popover.Description>Anyone with the link can view it.</Popover.Description>
        <Text size="sm" mono className="break-all">
          beton.dev/docs/components/popover
        </Text>
      </Popover.Content>
    </Popover>
  );
}
