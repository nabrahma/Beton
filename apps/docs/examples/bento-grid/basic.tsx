/**
 * A wall of boxes
 * Give one cell two columns and another two rows, and the grid stops looking
 * like a table. Put a real component in a cell rather than a picture of one.
 */
"use client";

import { BentoGrid, Button, Kbd } from "@beton-ui/react";

export default function BentoGridBasic() {
  return (
    <BentoGrid
      headingLevel={2}
      title="The set"
      cells={[
        {
          title: "Press physics",
          description: "Buttons move by exactly their shadow offset and drop it.",
          span: 2,
          media: <Button>Press me</Button>,
        },
        { title: "Two-tone focus", description: "Visible on every fill, including cyan." },
        {
          title: "44px targets",
          description: "Measured in a real browser, including the invisible extensions.",
          accent: "secondary",
        },
        {
          title: "Keyboard first",
          description: "Every overlay traps focus and gives it back.",
          media: <Kbd>Tab</Kbd>,
          span: 2,
        },
      ]}
    />
  );
}
