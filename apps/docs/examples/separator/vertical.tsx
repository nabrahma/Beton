/**
 * Vertical
 * Divide inline groups of links or actions.
 */
import { Separator } from "@beton-ui/react";

export default function SeparatorVertical() {
  return (
    <nav aria-label="Example" className="flex items-center gap-4 font-display font-bold uppercase">
      <a href="#docs">Docs</a>
      <Separator orientation="vertical" className="h-6 self-center" />
      <a href="#github">GitHub</a>
      <Separator orientation="vertical" className="h-6 self-center" />
      <a href="#license">License</a>
    </nav>
  );
}
