import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { BackToTop } from "./back-to-top.tsx";

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("BackToTop", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  });

  afterEach(() => {
    scrollTo(0);
    vi.restoreAllMocks();
  });

  it("[axe] has no violations hidden or shown", async () => {
    const { container } = render(<BackToTop />);
    await expectNoAxeViolations(container);

    scrollTo(900);
    await expectNoAxeViolations(container);
  });

  it("[name] is a labelled icon button", () => {
    render(<BackToTop />);
    expect(screen.getByRole("button", { name: "Back to top" })).toBeInTheDocument();
  });

  it("[state] stays out of the tab order until the page has scrolled", () => {
    render(<BackToTop threshold={400} />);
    const button = screen.getByRole("button", { name: "Back to top" });
    expect(button).toHaveAttribute("tabindex", "-1");

    scrollTo(500);
    expect(button).not.toHaveAttribute("tabindex", "-1");
  });

  it("[keyboard] scrolls up and moves focus with it", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <h1>Page</h1>
        <BackToTop />
      </div>,
    );
    scrollTo(900);

    await user.click(screen.getByRole("button", { name: "Back to top" }));
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
    // Scrolling alone would leave the keyboard at the bottom of the page.
    expect(screen.getByRole("heading", { name: "Page" })).toHaveFocus();
  });

  it("[targetId] can send focus somewhere else", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <h1>Page</h1>
        <div id="content">Main content</div>
        <BackToTop targetId="content" />
      </div>,
    );
    scrollTo(900);

    await user.click(screen.getByRole("button", { name: "Back to top" }));
    expect(document.getElementById("content")).toHaveFocus();
  });

  it("[label] can be renamed", () => {
    render(<BackToTop label="Return to the top of the page" />);
    expect(
      screen.getByRole("button", { name: "Return to the top of the page" }),
    ).toBeInTheDocument();
  });
});
