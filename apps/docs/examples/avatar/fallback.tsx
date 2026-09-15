/**
 * Fallback
 * Without an image, or when it fails to load, initials are derived from alt.
 */
import { Avatar } from "@beton-ui/react";

export default function AvatarFallback() {
  return (
    <div className="flex items-center gap-4">
      <Avatar alt="Ada Lovelace" />
      <Avatar alt="Grace Hopper" variant="primary" />
      <Avatar alt="Alan Turing" variant="danger" src="/missing.png" />
    </div>
  );
}
