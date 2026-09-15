"use client";

import { Avatar, Badge, Button, Card, Input, Kbd, Label, Spinner } from "@beton-ui/react";
import { useState } from "react";

export function HeroPanel() {
  const [count, setCount] = useState(0);
  const [joined, setJoined] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -top-6 -right-3 z-10 rotate-6 border-3 border-border bg-danger px-3 py-1 font-display text-sm font-black uppercase shadow-sm"
      >
        Press me
      </div>
      <Card elevation="lg" className="relative">
        <Card.Header>
          <div className="flex items-center justify-between gap-3">
            <div className="flex -space-x-2">
              <Avatar alt="Ada Lovelace" size="sm" />
              <Avatar alt="Grace Hopper" size="sm" variant="primary" />
              <Avatar alt="Katherine Johnson" size="sm" variant="ghost" />
            </div>
            <Badge variant="success">Live</Badge>
          </div>
          <Card.Title render={<h2 />} className="pt-3 text-3xl">
            Pour the first slab
          </Card.Title>
          <Card.Description>
            Real components, not a screenshot. Press, type and tab through them.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              setJoined(true);
            }}
          >
            <Label htmlFor="hero-email">Email</Label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="hero-email"
                type="email"
                placeholder="you@studio.dev"
                autoComplete="email"
              />
              <Button type="submit" variant={joined ? "secondary" : "primary"} className="shrink-0">
                {joined ? "Joined" : "Join"}
              </Button>
            </div>
            <p aria-live="polite" className="min-h-6 font-mono text-sm font-bold">
              {joined ? "You are on the list. Nothing was sent anywhere." : ""}
            </p>
          </form>
        </Card.Body>
        <Card.Footer className="justify-between">
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => setCount((n) => n + 1)}>
              Pressed {count}×
            </Button>
            <Button
              variant="danger"
              size="sm"
              iconOnly
              aria-label="Reset counter"
              onClick={() => setCount(0)}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </Button>
          </div>
          <span className="flex items-center gap-2 font-mono text-xs font-bold">
            <Spinner size="sm" label="Waiting" /> <Kbd size="sm">Tab</Kbd>
          </span>
        </Card.Footer>
      </Card>
    </div>
  );
}
