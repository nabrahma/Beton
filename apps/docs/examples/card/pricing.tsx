/**
 * Pricing
 * Header, body and footer parts compose into a complete card.
 */
import { Badge, Button, Card } from "@beton-ui/react";

export default function CardPricing() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <Card>
        <Card.Header>
          <Card.Title>Free</Card.Title>
          <Card.Description>Every component, forever.</Card.Description>
        </Card.Header>
        <Card.Body>
          <p className="font-display text-4xl font-black">$0</p>
        </Card.Body>
        <Card.Footer>
          <Button variant="secondary" size="sm">
            Install
          </Button>
        </Card.Footer>
      </Card>
      <Card variant="secondary" elevation="lg">
        <Card.Header>
          <Card.Title className="flex items-center gap-2">
            Team <Badge variant="ghost">Popular</Badge>
          </Card.Title>
          <Card.Description>Blocks and templates for the whole team.</Card.Description>
        </Card.Header>
        <Card.Body>
          <p className="font-display text-4xl font-black">$199</p>
        </Card.Body>
        <Card.Footer>
          <Button size="sm">Get Team</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
