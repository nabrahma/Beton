/**
 * Group
 * Overlap avatars with negative spacing. Each keeps its own accessible name.
 */
import { Avatar } from "@beton-ui/react";

const people = [
  { name: "Ada Lovelace", variant: "secondary" },
  { name: "Grace Hopper", variant: "primary" },
  { name: "Katherine Johnson", variant: "ghost" },
  { name: "Margaret Hamilton", variant: "danger" },
] as const;

export default function AvatarGroup() {
  return (
    <div className="flex -space-x-3">
      {people.map((person) => (
        <Avatar key={person.name} alt={person.name} variant={person.variant} />
      ))}
    </div>
  );
}
