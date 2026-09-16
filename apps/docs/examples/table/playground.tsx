"use client";

import { Badge, Button, Table, type TableProps } from "@beton-ui/react";

const rows = [
  { site: "Wharf Road", grade: "C30/37", volume: "18 m³", state: "Poured" },
  { site: "Kiln Street", grade: "C25/30", volume: "12 m³", state: "Booked" },
  { site: "Bridge Yard", grade: "C35/45", volume: "24 m³", state: "Curing" },
];

export default function TablePlayground(props: Partial<TableProps>) {
  return (
    <Table {...props} caption="Recent pours">
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Site</Table.HeaderCell>
          <Table.HeaderCell>Grade</Table.HeaderCell>
          <Table.HeaderCell>Volume</Table.HeaderCell>
          <Table.HeaderCell>State</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.site}>
            <Table.Cell>{row.site}</Table.Cell>
            <Table.Cell>{row.grade}</Table.Cell>
            <Table.Cell>{row.volume}</Table.Cell>
            <Table.Cell>
              <Badge size="sm">{row.state}</Badge>
            </Table.Cell>
            <Table.Cell>
              <Table.Actions>
                <Button size="sm" variant="secondary">
                  Edit
                </Button>
              </Table.Actions>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
