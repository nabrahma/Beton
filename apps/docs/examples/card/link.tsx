/**
 * Link card
 * An interactive card rendered as an anchor presses like a button. Keep other controls out of it.
 */
import { Card } from "@beton-ui/react";

export default function CardLink() {
  return (
    <Card interactive variant="primary" render={<a href="#accessibility" />} className="max-w-sm">
      <Card.Header>
        <Card.Title>Accessibility report</Card.Title>
      </Card.Header>
      <Card.Body>See how every component is tested.</Card.Body>
    </Card>
  );
}
