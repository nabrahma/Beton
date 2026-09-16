import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Breadcrumbs } from "./breadcrumbs.tsx";

function Example() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/docs">Docs</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Breadcrumbs</Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

describe("Breadcrumbs", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg"] as const).map((size) => (
          <Breadcrumbs key={size} size={size} aria-label={`Breadcrumb ${size}`}>
            <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item current>Now</Breadcrumbs.Item>
          </Breadcrumbs>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is a named navigation landmark holding an ordered list", () => {
    render(<Example />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav.querySelector("ol")).not.toBeNull();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("[aria] marks the last crumb as the current page and does not link it", () => {
    render(<Example />);
    const current = screen.getByText("Breadcrumbs");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Breadcrumbs" })).toBeNull();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  it("[separator] hides separators from screen readers and skips the first crumb", () => {
    const { container } = render(<Example />);
    const separators = container.querySelectorAll("[aria-hidden='true']");
    expect(separators).toHaveLength(2);
    expect(separators[0]).toHaveTextContent("/");
  });

  it("[separator] accepts a different separator", () => {
    const { container } = render(
      <Breadcrumbs separator="›">
        <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item current>Now</Breadcrumbs.Item>
      </Breadcrumbs>,
    );
    expect(container.querySelector("[aria-hidden='true']")).toHaveTextContent("›");
  });

  it("[render] lets a crumb use a routing link", () => {
    render(
      <Breadcrumbs>
        <Breadcrumbs.Item render={<a data-router="" href="/home" />}>Home</Breadcrumbs.Item>
        <Breadcrumbs.Item current>Now</Breadcrumbs.Item>
      </Breadcrumbs>,
    );
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveAttribute("data-router");
    expect(link).toHaveAttribute("href", "/home");
  });
});
