/**
 * Link styled as a button
 * Navigation should stay a link. Apply the button recipe to an anchor instead of rendering Button as one.
 */
import { button } from "@beton-ui/recipes";

export default function ButtonAsLink() {
  return (
    <a href="#installation" className={button({ variant: "secondary" })}>
      Read the docs
    </a>
  );
}
