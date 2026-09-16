import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Footer } from "./footer.tsx";

const columns = [
  {
    title: "Docs",
    links: [
      { label: "Installation", href: "/docs/installation" },
      { label: "Components", href: "/docs/components" },
    ],
  },
  {
    title: "Project",
    links: [{ label: "GitHub", href: "https://github.com/nabrahma/Beton" }],
  },
];

describe("Footer", () => {
  it("[axe] has no violations in either variant", async () => {
    const { container } = render(
      <div>
        <Footer
          mark="Béton"
          blurb="Components that look like they were poured."
          columns={columns}
          note="MIT with Commons Clause"
        />
        {/* A footer inside main is not a second contentinfo landmark. */}
        <main>
          <Footer variant="simple" mark="Béton" note="MIT with Commons Clause" />
        </main>
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is a contentinfo landmark with named groups of links", () => {
    render(<Footer mark="Béton" columns={columns} note="MIT" />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Docs" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Project" })).toBeInTheDocument();
  });

  it("[keyboard] every link is reachable in order", async () => {
    const user = userEvent.setup();
    render(<Footer mark="Béton" columns={columns} />);

    await user.tab();
    expect(screen.getByRole("link", { name: "Installation" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "Components" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveFocus();
  });
});
