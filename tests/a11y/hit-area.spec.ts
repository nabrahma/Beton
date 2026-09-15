import { expect, test } from "@playwright/test";
import { componentSlugs } from "../routes.ts";

const MIN_TARGET = 44;

/**
 * Measures every interactive Béton control rendered in a component's examples,
 * including the invisible ::after extension used by small sizes.
 */
for (const slug of componentSlugs) {
  test(`${slug}: interactive targets are at least ${MIN_TARGET}px`, async ({ page }) => {
    await page.goto(`/docs/components/${slug}`);

    const targets = await page.evaluate(() => {
      const selector =
        "button[data-size], input[data-size], a[data-size], [role='button'][data-size]";
      return [...document.querySelectorAll<HTMLElement>(`main ${selector}`)]
        .filter((el) => el.offsetParent !== null && !el.closest("[inert]"))
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const after = getComputedStyle(el, "::after");
          const extends_ = after.position === "absolute" && after.content !== "none";
          const px = (value: string) => (extends_ ? Math.max(0, -parseFloat(value || "0")) : 0);
          return {
            label:
              el.getAttribute("aria-label") ?? el.textContent?.trim().slice(0, 30) ?? el.tagName,
            size: el.dataset.size,
            width: rect.width + px(after.left) + px(after.right),
            height: rect.height + px(after.top) + px(after.bottom),
          };
        });
    });

    const tooSmall = targets.filter(
      (t) => t.height < MIN_TARGET - 0.5 || t.width < MIN_TARGET - 0.5,
    );
    expect(tooSmall, JSON.stringify(tooSmall, null, 2)).toEqual([]);
  });
}
