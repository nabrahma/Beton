import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { FileUpload, formatBytes, matchesAccept } from "./file-upload.tsx";

const png = new File(["x".repeat(2048)], "slab.png", { type: "image/png" });
const pdf = new File(["%PDF"], "plan.pdf", { type: "application/pdf" });

describe("FileUpload", () => {
  it("[axe] has no violations empty, with files, and disabled", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <div>
        <FileUpload title="Upload a logo" hint="PNG or SVG, up to 2 MB" accept="image/*" />
        <FileUpload title="Disabled" disabled size="sm" />
      </div>,
    );
    await expectNoAxeViolations(container);
    await user.upload(screen.getByLabelText(/Upload a logo/), png);
    await expectNoAxeViolations(container);
  });

  it("[name] the native input is named by the drop zone and described by the hint", () => {
    render(<FileUpload title="Upload a logo" hint="PNG or SVG" />);
    const input = screen.getByLabelText(/Upload a logo/);
    expect(input).toHaveAttribute("type", "file");
    expect(input).toHaveAccessibleDescription("PNG or SVG");
  });

  it("[keyboard] the input is reachable with Tab and selected files can be removed", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    render(<FileUpload title="Attachments" multiple onFilesChange={onFilesChange} />);

    await user.tab();
    const input = screen.getByLabelText(/Attachments/);
    expect(input).toHaveFocus();

    await user.upload(input, [png, pdf]);
    expect(onFilesChange).toHaveBeenLastCalledWith([png, pdf]);
    expect(screen.getByRole("status")).toHaveTextContent("2 files selected");
    expect(screen.getByRole("list", { name: "Selected files" })).toBeInTheDocument();

    await user.tab();
    expect(screen.getByRole("button", { name: "Remove slab.png" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onFilesChange).toHaveBeenLastCalledWith([pdf]);
    expect(screen.queryByText("slab.png")).not.toBeInTheDocument();
  });

  it("[keyboard] dropped files respect accept", () => {
    const onFilesChange = vi.fn();
    render(
      <FileUpload title="Images only" accept="image/*" multiple onFilesChange={onFilesChange} />,
    );
    const zone = screen.getByText("Images only").closest("label") as HTMLElement;

    fireEvent.dragOver(zone, { dataTransfer: { files: [png, pdf] } });
    expect(zone).toHaveAttribute("data-dragging");
    fireEvent.drop(zone, { dataTransfer: { files: [png, pdf] } });

    expect(zone).not.toHaveAttribute("data-dragging");
    expect(onFilesChange).toHaveBeenLastCalledWith([png]);
  });

  it("[focus] the drop zone shows the focus ring when its input is focused", () => {
    render(<FileUpload title="Ring" />);
    const zone = screen.getByText("Ring").closest("label");
    expect(zone?.className).toContain("has-focus-visible:ring-focus-gap");
  });

  it("formats sizes and matches accept rules", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(2048)).toBe("2.0 KB");
    expect(formatBytes(5 * 1024 * 1024)).toBe("5.0 MB");
    expect(matchesAccept(png, "image/*")).toBe(true);
    expect(matchesAccept(pdf, "image/*,.pdf")).toBe(true);
    expect(matchesAccept(pdf, "image/png")).toBe(false);
    expect(matchesAccept(pdf, undefined)).toBe(true);
  });
});
