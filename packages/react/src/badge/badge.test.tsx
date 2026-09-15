import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Badge } from "./badge.tsx";

const variants = ["primary", "secondary", "ghost", "danger", "success"] as const;

describe("Badge", () => {
  it("[axe] has no violations in every variant", async () => {
    const { container } = render(
      <p>
        {variants.map((variant) => (
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
      </p>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] renders its text content", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("[keyboard] is not focusable unless rendered as an interactive element", async () => {
    const { container } = render(
      <Badge render={<a href="/changelog" />} variant="success">
        v0.1
      </Badge>,
    );
    expect(container.querySelector("span")).toBeNull();
    const link = screen.getByRole("link", { name: "v0.1" });
    link.focus();
    expect(link).toHaveFocus();
    expect(link).toHaveAttribute("data-variant", "success");
  });

  it("merges className from the render element", () => {
    render(<Badge render={<strong className="bg-secondary" />}>Merged</Badge>);
    const el = screen.getByText("Merged");
    expect(el.tagName).toBe("STRONG");
    expect(el.className).toContain("bg-secondary");
    expect(el.className).not.toMatch(/(^|\s)bg-primary(\s|$)/);
  });

  it("supports a render function", () => {
    render(<Badge render={(props) => <mark {...props} />}>Marked</Badge>);
    expect(screen.getByText("Marked").tagName).toBe("MARK");
  });
});
