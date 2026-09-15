// Single source of truth for where the registry is served.
// Override for previews or local testing: BETON_REGISTRY_URL=http://localhost:3000/r
export const SITE_URL = (process.env.BETON_SITE_URL ?? "https://beton.dev").replace(/\/$/, "");
export const REGISTRY_URL = (process.env.BETON_REGISTRY_URL ?? `${SITE_URL}/r`).replace(/\/$/, "");
export const REGISTRY_NAME = "beton";
export const REGISTRY_HOMEPAGE = SITE_URL;

/** Where installed files land, relative to the user's configured aliases. */
export const TARGETS = {
  ui: "@ui/beton",
  lib: "@lib/beton",
};

/** Import specifiers written into installed files. shadcn and beton-ui rewrite these to the project's aliases. */
export const IMPORTS = {
  ui: "@/components/ui/beton",
  lib: "@/lib/beton",
};
