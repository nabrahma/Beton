/**
 * Sides
 * A sheet can enter from any edge. Filters usually sit on the right.
 */
"use client";

import { Checkbox, Sheet } from "@beton-ui/react";

export default function SheetSides() {
  return (
    <div className="flex flex-wrap gap-4">
      {(["right", "left", "top", "bottom"] as const).map((side) => (
        <Sheet key={side} side={side}>
          <Sheet.Trigger>{side}</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Header>
              <Sheet.Title>Filters</Sheet.Title>
              <Sheet.Description>Opens from the {side}.</Sheet.Description>
            </Sheet.Header>
            <Sheet.Body>
              {["In stock", "On sale", "New arrivals"].map((label) => (
                <label key={label} className="flex items-center gap-3 font-medium">
                  <Checkbox /> {label}
                </label>
              ))}
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>Apply</Sheet.Close>
            </Sheet.Footer>
          </Sheet.Content>
        </Sheet>
      ))}
    </div>
  );
}
