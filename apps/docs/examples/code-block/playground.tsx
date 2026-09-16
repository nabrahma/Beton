"use client";

import { CodeBlock, type CodeBlockProps } from "@beton-ui/react";

const source = [
  'import { Button } from "@/components/ui/button";',
  "",
  "export function Save() {",
  "  return <Button>Save</Button>;",
  "}",
].join("\n");

export default function CodeBlockPlayground(props: Partial<CodeBlockProps>) {
  return (
    <CodeBlock {...props} filename="save.tsx" language="tsx" className="max-w-lg">
      {source}
    </CodeBlock>
  );
}
