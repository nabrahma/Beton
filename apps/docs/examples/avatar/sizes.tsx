/**
 * Sizes
 * Small avatars use a thinner stroke so the border does not swallow the initials.
 */
import { Avatar } from "@beton-ui/react";

export default function AvatarSizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar alt="Nabaskar Brahma" size="sm" />
      <Avatar alt="Nabaskar Brahma" size="md" />
      <Avatar alt="Nabaskar Brahma" size="lg" />
    </div>
  );
}
