/**
 * A row of names
 * Point at it and it stops, so the names can be read. Anything worth reading
 * belongs on the page as well.
 */
"use client";

import { Marquee } from "@beton-ui/react";

const sites = ["WHARF ROAD", "KILN STREET", "BRIDGE YARD", "OLD FOUNDRY", "DOCK NINE"];

export default function MarqueeLogos() {
  return (
    <Marquee bordered duration={16} className="w-full">
      {sites.map((site) => (
        <span
          key={site}
          className="border-3 border-border bg-secondary px-4 py-2 font-display font-black uppercase"
        >
          {site}
        </span>
      ))}
    </Marquee>
  );
}
