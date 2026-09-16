/**
 * Nothing here
 * The number is decoration. The heading says what happened, and there is at
 * least one way back.
 */
"use client";

import { Button, GridBackground, NotFoundPage } from "@beton-ui/react";

export default function NotFoundPageBasic() {
  return (
    <NotFoundPage
      headingLevel={2}
      background={<GridBackground weight="light" />}
      actions={
        <>
          <Button>Back to the docs</Button>
          <Button variant="secondary">Search</Button>
        </>
      }
      className="min-h-0 border-3 border-border bg-raised"
    />
  );
}
