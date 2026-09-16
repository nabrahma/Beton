import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { SiteHeader } from "./site-header.tsx";

const links = [
  { label: "Docs", href: "/docs", active: true },
  { label: "Components", href: "/docs/components" },
  { label: "Showcase", href: "/showcase" },
];

describe("SiteHeader", () => {
  it("[axe] has no violations", async () => {
    const { container } = render(
      <SiteHeader mark="Béton" links={links} actions={<Button size="sm">Install</Button>} />,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is a banner holding a named navigation landmark", () => {
    render(<SiteHeader mark="Béton" links={links} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("[aria] marks the page you are on", () => {
    render(<SiteHeader mark="Béton" links={links} />);
    expect(screen.getAllByRole("link", { name: "Docs" })[0]).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("[mobile] the same links open in a sheet, and Escape closes it", async () => {
    const user = userEvent.setup();
    render(<SiteHeader mark="Béton" links={links} />);

    await user.click(screen.getByRole("button", { name: "Menu" }));
    const sheet = screen.getByRole("dialog", { name: "Menu" });
    expect(sheet).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Menu" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Menu" })).toBeNull();
    expect(screen.getByRole("button", { name: "Menu" })).toHaveFocus();
  });

  it("[mobile] the sheet can be left out", () => {
    render(<SiteHeader mark="Béton" links={links} mobileMenu={false} />);
    expect(screen.queryByRole("button", { name: "Menu" })).toBeNull();
  });
});
