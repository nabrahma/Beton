import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Avatar, initials } from "./avatar.tsx";

describe("Avatar", () => {
  it("[axe] has no violations with and without an image", async () => {
    const { container } = render(
      <div>
        <Avatar alt="Ada Lovelace" />
        <Avatar alt="Grace Hopper" src="/does-not-load.png" variant="primary" size="lg" />
        <Avatar alt="Béton" fallback="B" variant="ghost" size="sm" />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] the fallback is announced as an image named by alt", () => {
    render(<Avatar alt="Ada Lovelace" />);
    const img = screen.getByRole("img", { name: "Ada Lovelace" });
    expect(img).toHaveTextContent("AL");
  });

  it("[name] custom fallback content does not replace the accessible name", () => {
    render(<Avatar alt="Nabaskar Brahma" fallback="🧱" />);
    expect(screen.getByRole("img", { name: "Nabaskar Brahma" })).toBeInTheDocument();
  });

  it("[keyboard] is not focusable", () => {
    render(<Avatar alt="Ada Lovelace" />);
    expect(screen.getByRole("img").closest("[tabindex]")).toBeNull();
  });

  it("derives initials from names", () => {
    expect(initials("ada lovelace")).toBe("AL");
    expect(initials("  Prince ")).toBe("P");
    expect(initials("Mary Ann Evans")).toBe("ME");
    expect(initials("")).toBe("");
  });
});
