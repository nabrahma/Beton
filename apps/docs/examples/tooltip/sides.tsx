/**
 * Sides
 * Place the tooltip where there is room. It flips when it would overflow.
 */
"use client";

import { Button, Tooltip } from "@beton-ui/react";

export default function TooltipSides() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} content={"Placed " + side} side={side}>
          <Button variant="secondary" aria-label={"Placed " + side}>
            {side}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
