import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Avatar } from "../avatar/avatar.tsx";
import { Text } from "../text/text.tsx";
import { HoverCard } from "./hover-card.tsx";

function Example() {
  return (
    <p>
      Built by{" "}
      <HoverCard>
        <HoverCard.Trigger href="https://github.com/nabrahma">@nabrahma</HoverCard.Trigger>
        <HoverCard.Content>
          <Avatar alt="Nabaskar Brahma" />
          <Text weight="bold">Nabaskar Brahma</Text>
          <Text size="sm">Maintainer of Beton.</Text>
        </HoverCard.Content>
      </HoverCard>
      .
    </p>
  );
}

describe("HoverCard", () => {
  it("[axe] has no violations closed or open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await expectNoAxeViolations(container);

    await user.hover(screen.getByRole("link", { name: "@nabrahma" }));
    await screen.findByText("Maintainer of Beton.");
    await expectNoAxeViolations(document.body);
  });

  it("[name] the trigger is a link that works without the card", () => {
    render(<Example />);
    expect(screen.getByRole("link", { name: "@nabrahma" })).toHaveAttribute(
      "href",
      "https://github.com/nabrahma",
    );
  });

  it("[keyboard] opens on focus and closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.tab();
    expect(screen.getByRole("link", { name: "@nabrahma" })).toHaveFocus();
    await screen.findByText("Maintainer of Beton.");

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByText("Maintainer of Beton.")).not.toBeInTheDocument());
  });

  it("closes when the pointer leaves the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("link", { name: "@nabrahma" });

    await user.hover(trigger);
    await screen.findByText("Maintainer of Beton.");
    await user.unhover(trigger);
    await waitFor(() => expect(screen.queryByText("Maintainer of Beton.")).not.toBeInTheDocument());
  });
});
