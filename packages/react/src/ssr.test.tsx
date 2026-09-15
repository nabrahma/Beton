import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Kbd } from "./kbd/kbd.tsx";
import { Label } from "./label/label.tsx";
import { Separator } from "./separator/separator.tsx";
import { Spinner } from "./spinner/spinner.tsx";
import { Heading, Text } from "./text/text.tsx";

describe("Server rendering", () => {
  it("presentational components render to a string without a DOM", () => {
    const html = renderToString(
      <div>
        <Heading level={1}>Title</Heading>
        <Text>Body</Text>
        <Kbd>K</Kbd>
        <Separator />
        <Spinner />
        <Label htmlFor="x">Label</Label>
      </div>,
    );
    expect(html).toContain("<h1");
    expect(html).toContain("<kbd");
  });
});
