"use client";

import { Avatar, Button, List, type ListProps } from "@beton-ui/react";

const people = [
  { name: "Ada Mbeki", role: "Site engineer", when: "2h ago" },
  { name: "Tom Reyes", role: "Foreman", when: "Yesterday" },
  { name: "Mira Sol", role: "Quantity surveyor", when: "Monday" },
];

export default function ListPlayground(props: ListProps) {
  return (
    <List {...props} className="max-w-lg">
      {people.map((person) => (
        <List.Item
          key={person.name}
          media={<Avatar alt={person.name} size="sm" />}
          title={person.name}
          description={person.role}
          meta={person.when}
          actions={
            <Button size="sm" variant="secondary">
              Message
            </Button>
          }
        />
      ))}
    </List>
  );
}
