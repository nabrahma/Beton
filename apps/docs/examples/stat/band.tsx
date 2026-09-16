/**
 * A row of numbers
 * Figures are set in tabular numerals, so a row of stats lines up however the
 * numbers change.
 */
"use client";

import { Stat } from "@beton-ui/react";

export default function StatBand() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <Stat label="Pours" value="42" delta="+6" trend="up" />
      <Stat label="Rejected loads" value="3" delta="-2" trend="down" />
      <Stat label="Average slump" value="148mm" delta="0" trend="flat" />
    </div>
  );
}
