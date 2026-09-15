/**
 * Heading level
 * Titles are h3 by default. Render another level to fit your page outline.
 */
import { Card } from "@beton-ui/react";

export default function CardHeadingLevel() {
  return (
    <Card elevation="none" className="max-w-sm">
      <Card.Header>
        <Card.Title render={<h2 />}>Section card</Card.Title>
        <Card.Description>This title is an h2.</Card.Description>
      </Card.Header>
      <Card.Body>Use the level that matches the surrounding document.</Card.Body>
    </Card>
  );
}
