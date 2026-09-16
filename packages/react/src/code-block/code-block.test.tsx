import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { CodeBlock } from "./code-block.tsx";

const source = "const a = 1;\nconst b = 2;\n";

/** jsdom exposes navigator.clipboard as a getter only, so define over it. */
function mockClipboard(writeText: ReturnType<typeof vi.fn>) {
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
  return writeText;
}

afterEach(() => {
  Reflect.deleteProperty(navigator, "clipboard");
});

describe("CodeBlock", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg"] as const).map((size) => (
          <CodeBlock key={size} size={size} filename={"example." + size + ".ts"} language="ts">
            {source}
          </CodeBlock>
        ))}
        <CodeBlock lineNumbers copyable={false}>
          {source}
        </CodeBlock>
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[keyboard] the code scrolls sideways, so it is focusable and named", async () => {
    const user = userEvent.setup();
    render(
      <CodeBlock copyable={false} filename="button.tsx">
        {source}
      </CodeBlock>,
    );

    await user.tab();
    expect(screen.getByRole("group", { name: "button.tsx" })).toHaveFocus();
  });

  it("[copy] puts the code on the clipboard and says so", async () => {
    // userEvent installs its own clipboard stub, so mock over it afterwards.
    const user = userEvent.setup();
    const writeText = mockClipboard(vi.fn().mockResolvedValue(undefined));
    render(<CodeBlock>{source}</CodeBlock>);

    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("const a = 1;\nconst b = 2;");
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();
  });

  it("[copy] stays quiet when the clipboard refuses", async () => {
    const user = userEvent.setup();
    mockClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    render(<CodeBlock>{source}</CodeBlock>);

    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });

  it("[language] writes the language for highlighters", () => {
    const { container } = render(
      <CodeBlock language="tsx" copyable={false}>
        {source}
      </CodeBlock>,
    );
    const code = container.querySelector("code");
    expect(code).toHaveAttribute("data-language", "tsx");
    expect(code?.className).toContain("language-tsx");
  });

  it("[lineNumbers] numbers are decoration and stay out of the copied text", async () => {
    // userEvent installs its own clipboard stub, so mock over it afterwards.
    const user = userEvent.setup();
    const writeText = mockClipboard(vi.fn().mockResolvedValue(undefined));
    const { container } = render(<CodeBlock lineNumbers>{source}</CodeBlock>);

    expect(container.querySelectorAll("span[aria-hidden='true']")).toHaveLength(2);
    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("const a = 1;\nconst b = 2;");
  });
});
