import { defineConfig, devices } from "@playwright/test"
import { TestOptions } from "./tests/base"

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    // override the default user
    user: { email: "stefan@checklyhq.com", password: "..." },
  },

  projects: [
    {
      name: "user-a",
      use: {
        ...devices["Desktop Chrome"],
        // override the default user
        user: { email: "stefan@checklyhq.com", password: "..." },
      },
    },
    {
      name: "user-b",
      use: {
        ...devices["Desktop Chrome"],
        // override the default user
        user: { email: "raccoon@checklyhq.com", password: "..." },
      },
    },
  ],
})
