/**
 * Icon buttons
 * The tooltip repeats the button label. It never replaces it.
 */
"use client";

import { Button, Tooltip, TooltipProvider } from "@beton-ui/react";

const actions = [
  { label: "Bold", glyph: "B" },
  { label: "Italic", glyph: "I" },
  { label: "Underline", glyph: "U" },
];

export default function TooltipIconButtons() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-3">
        {actions.map((action) => (
          <Tooltip key={action.label} content={action.label}>
            <Button variant="secondary" iconOnly aria-label={action.label}>
              <span aria-hidden="true">{action.glyph}</span>
            </Button>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
