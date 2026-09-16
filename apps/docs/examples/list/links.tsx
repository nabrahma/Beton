/**
 * Rows that lead somewhere
 * Pass href and the row becomes a link. Actions inside stay a separate tab
 * stop, so the row and its buttons never fight over the click.
 */
"use client";

import { Badge, Button, List } from "@beton-ui/react";

export default function ListLinks() {
  return (
    <List className="max-w-lg">
      <List.Item
        href="#wharf"
        title="Wharf Road"
        description="C30/37 · 18 m³"
        meta={<Badge size="sm">Poured</Badge>}
        actions={
          <Button size="sm" variant="ghost">
            Copy
          </Button>
        }
      />
      <List.Item href="#kiln" title="Kiln Street" description="C25/30 · 12 m³" />
      <List.Item href="#bridge" title="Bridge Yard" description="C35/45 · 24 m³" selected />
    </List>
  );
}
