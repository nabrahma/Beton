import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Pagination, paginationRange } from "./pagination.tsx";

describe("paginationRange", () => {
  it("shows every page while they still fit", () => {
    expect(paginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("collapses the far side and keeps the ends", () => {
    expect(paginationRange(1, 20)).toEqual([1, 2, 3, 4, 5, null, 20]);
    expect(paginationRange(20, 20)).toEqual([1, null, 16, 17, 18, 19, 20]);
  });

  it("collapses both sides around the middle", () => {
    expect(paginationRange(10, 20)).toEqual([1, null, 9, 10, 11, null, 20]);
  });

  it("holds its width as the page moves", () => {
    for (let page = 1; page <= 20; page += 1) {
      expect(paginationRange(page, 20)).toHaveLength(7);
    }
  });

  it("copes with edges: no pages, one page, a page out of range", () => {
    expect(paginationRange(1, 0)).toEqual([]);
    expect(paginationRange(1, 1)).toEqual([1]);
    expect(paginationRange(99, 3)).toEqual([1, 2, 3]);
  });
});

describe("Pagination", () => {
  it("[axe] has no violations in any size, as buttons or as links", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg"] as const).map((size) => (
          <Pagination
            key={size}
            size={size}
            page={3}
            count={20}
            aria-label={`Pagination ${size}`}
            onPageChange={() => {}}
          />
        ))}
        <Pagination page={1} count={9} aria-label="Links" href={(p) => `?page=${p}`} />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is a named navigation landmark and marks the current page", () => {
    render(<Pagination page={3} count={10} onPageChange={() => {}} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Page 2" })).not.toHaveAttribute("aria-current");
  });

  it("[name] labels the arrows, which carry no text", () => {
    render(<Pagination page={3} count={10} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next page" })).toBeInTheDocument();
  });

  it("[state] disables the arrow that has nowhere to go", () => {
    const { rerender } = render(<Pagination page={1} count={10} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled();

    rerender(<Pagination page={10} count={10} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("[keyboard] reports the chosen page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={3} count={10} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "Page 4" }));
    expect(onPageChange).toHaveBeenLastCalledWith(4);

    await user.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onPageChange).toHaveBeenLastCalledWith(2);
  });

  it("[href] renders links that work without JavaScript", () => {
    render(<Pagination page={2} count={5} href={(page) => `/posts?page=${page}`} />);
    expect(screen.getByRole("link", { name: "Page 3" })).toHaveAttribute("href", "/posts?page=3");
    // The arrow with nowhere to go stays a disabled button, not a dead link.
    render(<Pagination page={1} count={5} aria-label="First" href={(p) => `/p/${p}`} />);
    expect(screen.getAllByRole("button", { name: "Previous page" })[0]).toBeDisabled();
  });

  it("[status] announces where you are, and can be turned off", () => {
    const { rerender } = render(<Pagination page={2} count={9} onPageChange={() => {}} />);
    expect(screen.getByText("Page 2 of 9")).toHaveAttribute("aria-live", "polite");

    rerender(<Pagination page={2} count={9} status={null} onPageChange={() => {}} />);
    expect(screen.queryByText("Page 2 of 9")).toBeNull();
  });

  it("[ellipsis] hides the gap marker from screen readers", () => {
    const { container } = render(<Pagination page={10} count={40} onPageChange={() => {}} />);
    expect(container.querySelectorAll("[aria-hidden='true']").length).toBeGreaterThan(0);
  });
});
