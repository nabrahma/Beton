import {
  Avatar,
  Badge,
  Button,
  Card,
  Heading,
  Input,
  Kbd,
  Label,
  Separator,
  Spinner,
} from "@beton-ui/react";
import { focusRingWithin } from "@beton-ui/recipes";
import Link from "next/link";
import type { ReactNode } from "react";

const tiles: { slug: string; title: string; span?: string; tone: string; demo: ReactNode }[] = [
  {
    slug: "button",
    title: "Button",
    span: "sm:col-span-2",
    tone: "bg-primary",
    demo: (
      <div className="flex flex-wrap gap-3">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="secondary">
          Secondary
        </Button>
        <Button size="sm" variant="danger">
          Danger
        </Button>
      </div>
    ),
  },
  {
    slug: "badge",
    title: "Badge",
    tone: "bg-raised",
    demo: (
      <div className="flex flex-wrap gap-2">
        <Badge>New</Badge>
        <Badge variant="secondary">Beta</Badge>
        <Badge variant="success">Stable</Badge>
      </div>
    ),
  },
  {
    slug: "avatar",
    title: "Avatar",
    tone: "bg-secondary",
    demo: (
      <div className="flex -space-x-3">
        <Avatar alt="Ada Lovelace" />
        <Avatar alt="Grace Hopper" variant="primary" />
        <Avatar alt="Alan Turing" variant="ghost" />
      </div>
    ),
  },
  {
    slug: "input",
    title: "Input",
    span: "sm:col-span-2",
    tone: "bg-raised",
    demo: (
      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="wall-input">Project</Label>
        <Input id="wall-input" placeholder="béton-landing" />
      </div>
    ),
  },
  {
    slug: "card",
    title: "Card",
    tone: "bg-success",
    demo: (
      <Card elevation="sm" className="w-full">
        <Card.Body className="p-4 font-display font-extrabold">Slab №1</Card.Body>
      </Card>
    ),
  },
  {
    slug: "spinner",
    title: "Spinner",
    tone: "bg-raised",
    demo: <Spinner size="lg" label="Loading preview" />,
  },
  {
    slug: "kbd",
    title: "Kbd",
    tone: "bg-danger",
    demo: (
      <span className="flex items-center gap-2 font-mono font-bold">
        <Kbd size="lg">Ctrl</Kbd>+<Kbd size="lg">K</Kbd>
      </span>
    ),
  },
  {
    slug: "text",
    title: "Text & Heading",
    tone: "bg-raised",
    demo: (
      <Heading level={3} size="lg" className="leading-none">
        Aa
      </Heading>
    ),
  },
  {
    slug: "separator",
    title: "Separator",
    tone: "bg-secondary",
    demo: (
      <div className="flex w-full flex-col gap-3">
        <Separator size="sm" />
        <Separator size="md" />
        <Separator size="lg" />
      </div>
    ),
  },
  {
    slug: "label",
    title: "Label",
    tone: "bg-raised",
    demo: (
      <Label htmlFor="wall-label" required>
        Required field
      </Label>
    ),
  },
];

export function ComponentWall() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((tile) => (
        <li
          key={tile.slug}
          className={`group relative flex flex-col border-3 border-border bg-raised shadow-sm transition-[translate,box-shadow] duration-70 ease-linear has-active:translate-x-1 has-active:translate-y-1 has-active:shadow-none motion-reduce:transition-none ${focusRingWithin} ${tile.span ?? ""}`}
        >
          <div
            inert
            className={`flex min-h-36 flex-1 items-center justify-center border-b-3 border-border p-6 ${tile.tone}`}
          >
            {tile.demo}
          </div>
          <Link
            href={`/docs/components/${tile.slug}`}
            className="flex items-center justify-between px-4 py-3 font-display font-extrabold uppercase after:absolute after:inset-0 after:content-[''] focus-visible:shadow-none focus-visible:outline-none"
          >
            {tile.title}
            <span aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
