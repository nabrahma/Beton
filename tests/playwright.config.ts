import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORT ?? 3100);
const baseURL = process.env.BASE_URL ?? `http://localhost:${port}`;

export default defineConfig({
  testDir: ".",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [
        ["list"],
        ["json", { outputFile: "../reports/playwright.json" }],
        ["html", { open: "never" }],
      ]
    : [["list"]],
  // Baselines are per platform; CI renders them on the same OS they were recorded on.
  snapshotPathTemplate: "{testDir}/visual/__screenshots__/{platform}/{arg}{ext}",
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled", caret: "hide" },
  },
  use: {
    baseURL,
    trace: "retain-on-failure",
    reducedMotion: "reduce",
  },
  projects: [
    {
      name: "a11y",
      testMatch: ["a11y/**/*.spec.ts"],
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "visual",
      testMatch: ["visual/**/*.spec.ts"],
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
    },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `pnpm --filter docs exec next start --port ${port}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
