"use client";

import { Button, Card, type CardProps } from "@beton-ui/react";

export default function CardPlayground(props: CardProps) {
  return (
    <Card {...props} className="w-full max-w-sm">
      <Card.Header>
        <Card.Title>Concrete plan</Card.Title>
        <Card.Description>Everything poured, nothing polished.</Card.Description>
      </Card.Header>
      <Card.Body>Unlimited components, zero runtime dependencies.</Card.Body>
      <Card.Footer>
        <Button size="sm">Choose plan</Button>
      </Card.Footer>
    </Card>
  );
}
