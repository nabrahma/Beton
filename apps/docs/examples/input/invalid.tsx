/**
 * Invalid
 * aria-invalid tints the field and tells assistive technology the value needs attention.
 */
import { Input, Label, Text } from "@beton-ui/react";

export default function InputInvalid() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="slug">Slug</Label>
      <Input
        id="slug"
        defaultValue="Hello World"
        aria-invalid="true"
        aria-describedby="slug-error"
      />
      <Text id="slug-error" size="sm" weight="bold">
        Use lowercase letters and hyphens only.
      </Text>
    </div>
  );
}
