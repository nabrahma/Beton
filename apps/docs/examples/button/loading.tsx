/**
 * Loading
 * The button stays focusable and sits pressed while work runs, so keyboard users never lose their place.
 */
"use client";

import { Button } from "@beton-ui/react";
import { useState } from "react";

export default function ButtonLoading() {
  const [saving, setSaving] = useState(false);

  function save() {
    setSaving(true);
    setTimeout(() => setSaving(false), 2000);
  }

  return (
    <Button loading={saving} loadingLabel="Saving" onClick={save}>
      Save changes
    </Button>
  );
}
