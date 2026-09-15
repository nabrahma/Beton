import type { MetadataRoute } from "next";
import { getComponents } from "@/lib/components";
import { docsNav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/docs/components",
    "/showcase",
    "/changelog",
    ...docsNav.flatMap((section) => section.items.map((item) => item.href)),
    ...getComponents().map((c) => `/docs/components/${c.name}`),
  ];
  return [...new Set(pages)].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
