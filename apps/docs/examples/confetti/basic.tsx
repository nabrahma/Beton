/**
 * A burst on success
 * Raise fire to throw a burst. It clears itself up afterwards. Say what
 * happened in words as well: confetti is decoration, not a message.
 */
"use client";

import { Alert, Button, Confetti } from "@beton-ui/react";
import { useState } from "react";

export default function ConfettiBasic() {
  const [fire, setFire] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setFire((n) => n + 1)}>Sign the contract</Button>
      {fire > 0 ? (
        <Alert variant="success" title="Signed">
          The contract is filed.
        </Alert>
      ) : null}
      <Confetti fire={fire} />
    </div>
  );
}
