import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { OtpInput } from "./otp-input.tsx";

describe("OtpInput", () => {
  it("[axe] has no violations with a label, with aria-label and grouped", async () => {
    const { container } = render(
      <div>
        <label htmlFor="code">Verification code</label>
        <OtpInput id="code" />
        <OtpInput aria-label="Backup code" length={8} groupSize={4} size="sm" />
        <OtpInput aria-label="Disabled code" length={4} disabled size="lg" />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] the first slot uses the field label and later slots are numbered", () => {
    render(
      <>
        <label htmlFor="code">Verification code</label>
        <OtpInput id="code" length={4} />
      </>,
    );
    const slots = screen.getAllByRole("textbox");
    expect(slots).toHaveLength(4);
    expect(slots[0]).toHaveAccessibleName("Verification code");
    expect(slots[1]).toHaveAccessibleName("Character 2 of 4");
  });

  it("[keyboard] typing fills slots and advances focus, Backspace goes back", async () => {
    const user = userEvent.setup();
    const onValueComplete = vi.fn();
    render(<OtpInput aria-label="Code" length={4} onValueComplete={onValueComplete} />);

    await user.tab();
    const slots = screen.getAllByRole("textbox");
    expect(slots[0]).toHaveFocus();

    await user.keyboard("12");
    expect(slots[2]).toHaveFocus();

    // Backspace in an empty slot deletes the previous character and moves back.
    await user.keyboard("{Backspace}");
    expect(slots[1]).toHaveFocus();
    expect(slots[1]).toHaveValue("");
    await user.keyboard("{Backspace}");
    expect(slots[0]).toHaveFocus();

    await user.keyboard("1234");
    expect(onValueComplete).toHaveBeenCalledWith("1234", expect.anything());
  });

  it("[keyboard] pasting a full code fills every slot", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<OtpInput aria-label="Code" length={6} onValueChange={onValueChange} />);
    await user.click(screen.getAllByRole("textbox")[0] as HTMLElement);
    await user.paste("482915");
    expect(onValueChange).toHaveBeenLastCalledWith("482915", expect.anything());
  });

  it("[focus] slots render the focus ring", () => {
    render(<OtpInput aria-label="Ring" length={2} />);
    expect(screen.getAllByRole("textbox")[0]?.className).toContain("focus-visible:ring-focus-gap");
  });
});
