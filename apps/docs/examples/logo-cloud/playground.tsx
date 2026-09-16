"use client";

import { LogoCloud, type LogoCloudProps } from "@beton-ui/react";

const names = ["Wharf Road", "Kiln Street", "Bridge Yard", "Old Foundry", "Dock Nine"];

export default function LogoCloudPlayground(props: Partial<LogoCloudProps>) {
  return (
    <LogoCloud
      {...props}
      headingLevel={2}
      title="Poured for"
      description="Names set in the display face, rather than grey pictures of logos."
      logos={names}
    />
  );
}
