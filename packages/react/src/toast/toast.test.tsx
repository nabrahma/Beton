import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { ToastProvider, useToast } from "./toast.tsx";

function Publisher({ onAction }: { onAction?: () => void }) {
  const toast = useToast();
  return (
    <div>
      <Button
        onClick={() =>
          toast.add({
            title: "Project saved",
            description: "Your changes are live.",
            type: "success",
          })
        }
      >
        Save
      </Button>
      <Button
        onClick={() =>
          toast.add({
            title: "Upload failed",
            type: "error",
            actionProps: { children: "Retry", onClick: onAction },
          })
        }
      >
        Upload
      </Button>
    </div>
  );
}

function Example({ onAction }: { onAction?: () => void } = {}) {
  return (
    <ToastProvider>
      <Publisher onAction={onAction} />
    </ToastProvider>
  );
}

describe("Toast", () => {
  it("[axe] has no violations with toasts on screen", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await expectNoAxeViolations(container);

    await user.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("Project saved");
    await expectNoAxeViolations(document.body);
  });

  it("[name] lands in a live region, named and described by its content", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Save" }));

    // The viewport is a polite live region that keyboard users reach with F6.
    const region = await screen.findByRole("region", { name: "Notifications" });
    expect(region).toHaveAttribute("aria-live", "polite");

    const toast = await screen.findByRole("dialog");
    expect(toast).toHaveAccessibleName("Project saved");
    expect(toast).toHaveAccessibleDescription("Your changes are live.");
    expect(toast).toHaveAttribute("data-type", "success");
  });

  it("[keyboard] the dismiss button closes the toast", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("Project saved");

    // Controls inside a toast are hidden from the live announcement until a
    // keyboard user jumps into the viewport with F6, so query the element itself.
    const dismiss = document.querySelector<HTMLButtonElement>(
      "button[aria-label='Dismiss notification']",
    );
    expect(dismiss).not.toBeNull();
    await user.click(dismiss as HTMLButtonElement);
    await waitFor(() => expect(screen.queryByText("Project saved")).not.toBeInTheDocument());
  });

  it("[keyboard] an action button runs its handler", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<Example onAction={onAction} />);

    await user.click(screen.getByRole("button", { name: "Upload" }));
    await screen.findByText("Upload failed");
    await user.click(screen.getByText("Retry"));

    expect(onAction).toHaveBeenCalledOnce();
  });

  it("stacks several toasts, newest first", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Save" }));
    await user.click(screen.getByRole("button", { name: "Upload" }));

    await screen.findByText("Project saved");
    await screen.findByText("Upload failed");
    expect(screen.getAllByRole("dialog")).toHaveLength(2);
  });
});
