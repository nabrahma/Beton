import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["src/**/*.test.tsx"],
    reporters: process.env.CI ? ["default", "json"] : ["default"],
    outputFile: { json: "./reports/vitest.json" },
  },
});
