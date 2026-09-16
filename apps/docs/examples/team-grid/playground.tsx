"use client";

import { Avatar, TeamGrid, type TeamGridProps } from "@beton-ui/react";

const members = [
  {
    name: "Ada Mbeki",
    role: "Design",
    bio: "Decides where the shadows fall.",
    portrait: <Avatar alt="Ada Mbeki" />,
  },
  {
    name: "Tom Reyes",
    role: "Engineering",
    bio: "Writes the recipes and argues about focus rings.",
    portrait: <Avatar alt="Tom Reyes" variant="primary" />,
  },
  {
    name: "Mira Sol",
    role: "Accessibility",
    bio: "Reads everything with a screen reader before it ships.",
    portrait: <Avatar alt="Mira Sol" variant="danger" />,
  },
];

export default function TeamGridPlayground(props: Partial<TeamGridProps>) {
  return <TeamGrid {...props} headingLevel={2} title="Who made it" members={members} />;
}
