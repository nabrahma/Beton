"use client";

import { Button, SplitFlap, type SplitFlapProps } from "@beton-ui/react";
import { useState } from "react";

const boards = ["POURED", "CURING", "STRUCK"];

export default function SplitFlapPlayground(props: Partial<SplitFlapProps>) {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <SplitFlap {...props} cells={6}>
        {boards[index % boards.length] ?? ""}
      </SplitFlap>
      <Button variant="secondary" size="sm" onClick={() => setIndex((n) => n + 1)}>
        Next board
      </Button>
    </div>
  );
}
