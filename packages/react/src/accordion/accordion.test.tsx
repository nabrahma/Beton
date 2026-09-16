import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Accordion } from "./accordion.tsx";

function Example(props: { multiple?: boolean }) {
  return (
    <Accordion {...props}>
      <Accordion.Item value="shipping">
        <Accordion.Trigger>Shipping</Accordion.Trigger>
        <Accordion.Panel>Sent within two days.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="returns">
        <Accordion.Trigger>Returns</Accordion.Trigger>
        <Accordion.Panel>Thirty days, no questions.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="archive" disabled>
        <Accordion.Trigger>Archive</Accordion.Trigger>
        <Accordion.Panel>Nothing here.</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("[axe] has no violations open or closed, in any size", async () => {
    const { container } = render(
      <div>
        <Example />
        {(["sm", "md", "lg"] as const).map((size) => (
          <Accordion key={size} size={size} defaultValue={["a"]}>
            <Accordion.Item value="a">
              <Accordion.Trigger>{size}</Accordion.Trigger>
              <Accordion.Panel>Open panel</Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] puts each trigger in a heading and links it to its panel", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Shipping" });
    expect(trigger.closest("h3")).not.toBeNull();
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const panel = screen.getByRole("region", { name: "Shipping" });
    expect(panel).toHaveTextContent("Sent within two days.");
  });

  it("[headingLevel] can sit under a different heading", () => {
    render(
      <Accordion>
        <Accordion.Item value="a">
          <Accordion.Trigger headingLevel={2}>Question</Accordion.Trigger>
          <Accordion.Panel>Answer</Accordion.Panel>
        </Accordion.Item>
      </Accordion>,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Question" })).toBeInTheDocument();
  });

  it("[keyboard] reaches every trigger with Tab and opens with Enter or Space", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.tab();
    expect(screen.getByRole("button", { name: "Shipping" })).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    await user.tab();
    expect(screen.getByRole("button", { name: "Returns" })).toHaveFocus();
    await user.keyboard(" ");
    expect(screen.getByRole("button", { name: "Returns" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("[single] closing happens on its own when another opens", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Shipping" }));
    await user.click(screen.getByRole("button", { name: "Returns" }));

    expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("[multiple] keeps several panels open at once", async () => {
    const user = userEvent.setup();
    render(<Example multiple />);

    await user.click(screen.getByRole("button", { name: "Shipping" }));
    await user.click(screen.getByRole("button", { name: "Returns" }));

    expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("button", { name: "Returns" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("[disabled] will not open a disabled item", async () => {
    const user = userEvent.setup();
    render(<Example />);

    const trigger = screen.getByRole("button", { name: "Archive" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    // Disabled triggers stay focusable so they can still be found and announced.
    expect(trigger).toHaveAttribute("aria-disabled", "true");
  });
});
