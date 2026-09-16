/**
 * Nothing to show
 * A table with no rows still needs to say so, inside the table rather than
 * instead of it, so the headers stay put.
 */
"use client";

import { Table } from "@beton-ui/react";

export default function TableEmpty() {
  return (
    <Table caption="Pours this week">
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Site</Table.HeaderCell>
          <Table.HeaderCell>Grade</Table.HeaderCell>
          <Table.HeaderCell>Volume</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Empty colSpan={3}>No pours booked this week.</Table.Empty>
      </Table.Body>
    </Table>
  );
}
