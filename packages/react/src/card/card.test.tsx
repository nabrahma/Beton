import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { Card } from "./card.tsx";

describe("Card", () => {
  it("[axe] has no violations in every variant", async () => {
    const { container } = render(
      <div>
        {(["primary", "secondary", "ghost", "danger"] as const).map((variant) => (
          <Card key={variant} variant={variant}>
            <Card.Header>
              <Card.Title>{variant} plan</Card.Title>
              <Card.Description>Everything you need to ship.</Card.Description>
            </Card.Header>
            <Card.Body>Body copy</Card.Body>
            <Card.Footer>
              <Button>Choose</Button>
            </Card.Footer>
          </Card>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] titles are headings, level 3 by default", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Pro</Card.Title>
        </Card.Header>
      </Card>,
    );
    expect(screen.getByRole("heading", { level: 3, name: "Pro" })).toBeInTheDocument();
  });

  it("[name] titles can render at another heading level", () => {
    render(
      <Card>
        <Card.Title render={<h2 />}>Overview</Card.Title>
      </Card>,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Overview" })).toBeInTheDocument();
  });

  it("[keyboard] interactive cards rendered as links are reachable and named", async () => {
    const user = userEvent.setup();
    render(
      <Card interactive render={<a href="/docs/components/card" />}>
        <Card.Body>Read about cards</Card.Body>
      </Card>,
    );
    await user.tab();
    expect(screen.getByRole("link", { name: "Read about cards" })).toHaveFocus();
  });

  it("[keyboard] contains no focusable elements of its own", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Card>
          <Card.Body>Static</Card.Body>
        </Card>
        <Button>After</Button>
      </>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
  });

  it("exposes parts through dot notation only", () => {
    expect(Object.keys(Card).sort()).toEqual(
      ["Body", "Description", "Footer", "Header", "Title"].sort(),
    );
  });
});
