import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "./button.tsx";

const variants = ["primary", "secondary", "ghost", "danger"] as const;
const sizes = ["sm", "md", "lg"] as const;

describe("Button", () => {
  it("[axe] has no violations in every variant and size", async () => {
    const { container } = render(
      <div>
        {variants.flatMap((variant) =>
          sizes.map((size) => (
            <Button key={`${variant}-${size}`} variant={variant} size={size}>
              {variant} {size}
            </Button>
          )),
        )}
        <Button disabled>Disabled</Button>
        <Button loading>Saving</Button>
        <Button iconOnly aria-label="Close">
          ×
        </Button>
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] exposes its text as the accessible name", () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument();
  });

  it("[name] icon-only buttons take their name from aria-label", () => {
    render(
      <Button iconOnly aria-label="Close dialog">
        <svg aria-hidden="true" />
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument();
  });

  it("[keyboard] is reachable with Tab and activates with Enter and Space", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);

    await user.tab();
    const button = screen.getByRole("button", { name: "Go" });
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("[keyboard] disabled buttons are skipped by Tab and cannot be activated", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <>
        <Button disabled onClick={onClick}>
          Disabled
        </Button>
        <Button>Next</Button>
      </>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Next" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Disabled" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("[keyboard] loading buttons stay focusable but cannot be activated", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    await user.tab();
    const button = screen.getByRole("button", { name: /save/i });
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-loading");
    await user.keyboard("{Enter}");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("exposes variant, size and state as data attributes", () => {
    render(
      <Button variant="danger" size="lg" disabled>
        Delete
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveAttribute("data-variant", "danger");
    expect(button).toHaveAttribute("data-size", "lg");
    expect(button).toHaveAttribute("data-disabled");
  });

  it("merges className last so it wins conflicts", () => {
    render(<Button className="bg-secondary">Merge</Button>);
    const button = screen.getByRole("button", { name: "Merge" });
    expect(button.className).toContain("bg-secondary");
    expect(button.className).not.toMatch(/(^|\s)bg-primary(\s|$)/);
  });

  it("forwards ref to the button element", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("[keyboard] composes with the render prop and keeps button semantics", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button nativeButton={false} render={<div />} onClick={onClick}>
        Custom element
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Custom element" });
    expect(button.tagName).toBe("DIV");
    expect(button.className).toContain("bg-primary");
    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("[motion] disables press transitions under reduced motion", () => {
    render(<Button>Motion</Button>);
    expect(screen.getByRole("button").className).toContain("motion-reduce:transition-none");
  });

  it("[focus] renders the two-tone focus ring classes", () => {
    render(<Button variant="primary">Focus</Button>);
    const { className } = screen.getByRole("button");
    expect(className).toContain("focus-visible:outline-3");
    expect(className).toContain("focus-visible:ring-focus-gap");
  });
});
