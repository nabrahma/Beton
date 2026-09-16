"use client";

import { Button, ScrambleText, type ScrambleTextProps } from "@beton-ui/react";
import { useState } from "react";

export default function ScrambleTextPlayground(props: Partial<ScrambleTextProps>) {
  const [run, setRun] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <ScrambleText {...props} runKey={run}>
        BÉTON
      </ScrambleText>
      <Button variant="secondary" size="sm" onClick={() => setRun((n) => n + 1)}>
        Scramble again
      </Button>
    </div>
  );
}
