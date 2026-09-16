import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { Navbar } from "./navbar.tsx";

function Example() {
  return (
    <Navbar>
      <Navbar.Brand href="/">Béton</Navbar.Brand>
      <Navbar.Nav>
        <Navbar.Link href="/docs" active>
          Docs
        </Navbar.Link>
        <Navbar.Link href="/showcase">Showcase</Navbar.Link>
      </Navbar.Nav>
      <Navbar.Actions>
        <Button size="sm">Get started</Button>
      </Navbar.Actions>
    </Navbar>
  );
}

describe("Navbar", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        <Example />
        {/* A header inside main is not a second banner landmark. */}
        <main>
          {(["sm", "lg"] as const).map((size) => (
            <Navbar key={size} size={size}>
              <Navbar.Brand href="/">Mark</Navbar.Brand>
              <Navbar.Nav aria-label={`Main ${size}`}>
                <Navbar.Link href="/a">One</Navbar.Link>
              </Navbar.Nav>
            </Navbar>
          ))}
        </main>
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is a banner holding a named navigation landmark", () => {
    render(<Example />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("[aria] marks the page you are on", () => {
    render(<Example />);
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Showcase" })).not.toHaveAttribute("aria-current");
  });

  it("[keyboard] reaches the mark, the links and the actions in order", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.tab();
    expect(screen.getByRole("link", { name: "Béton" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "Docs" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "Showcase" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Get started" })).toHaveFocus();
  });

  it("[render] lets the links come from a router", () => {
    render(
      <Navbar>
        <Navbar.Brand render={<a data-router="" href="/" />}>Mark</Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link render={<a data-router="" href="/docs" />}>Docs</Navbar.Link>
        </Navbar.Nav>
      </Navbar>,
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("data-router");
  });
});
