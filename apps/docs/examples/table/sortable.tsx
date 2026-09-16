/**
 * Sorting
 * The header reports the direction it is sorted in and asks for the opposite
 * one. Doing the sorting is up to you, so it can happen on the server.
 */
"use client";

import { Table } from "@beton-ui/react";
import { useState } from "react";

const rows = [
  { site: "Wharf Road", volume: 18 },
  { site: "Kiln Street", volume: 12 },
  { site: "Bridge Yard", volume: 24 },
];

export default function TableSortable() {
  const [direction, setDirection] = useState<"ascending" | "descending">("ascending");
  const sorted = [...rows].sort((a, b) =>
    direction === "ascending" ? a.volume - b.volume : b.volume - a.volume,
  );

  return (
    <Table caption="Pours by volume">
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Site</Table.HeaderCell>
          <Table.HeaderCell sort={direction} onSort={setDirection}>
            Volume
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sorted.map((row) => (
          <Table.Row key={row.site}>
            <Table.Cell>{row.site}</Table.Cell>
            <Table.Cell>{row.volume} m³</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
