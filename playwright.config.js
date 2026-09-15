// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  // Run tests in parallel locally; use a single worker in CI for predictable execution.
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Generate an HTML report for reviewing test results locally and in CI.
  reporter: 'html',

  use: {
    // Capture a trace when a test fails and is retried.
    trace: 'on-first-retry',
  },

  // Run the UI suite across the three major browser engines.
  projects: [
    {
        name: 'setup',
        testMatch: /auth\.setup\.js/,
    },
    {
        name: 'api',
        testMatch: /api\/.*\.spec\.js/,
    },
    {
    name: 'chromium-authenticated',
    dependencies: ['setup'],
    testMatch: /ui\/authenticated\/.*\.spec\.js/,
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'playwright/.auth/user.json',
      },
    },
    {
    name: 'chromium-unauthenticated',
    testMatch: /ui\/unauthenticated\/.*\.spec\.js/,
    use: {
      ...devices['Desktop Chrome'],
    },
    },
    {
    name: 'firefox-authenticated',
    dependencies: ['setup'],
    testMatch: /ui\/authenticated\/.*\.spec\.js/,
    use: {
      ...devices['Desktop Firefox'],
      storageState: 'playwright/.auth/user.json',
    },
    },
    {
    name: 'firefox-unauthenticated',
    testMatch: /ui\/unauthenticated\/.*\.spec\.js/,
    use: {
      ...devices['Desktop Firefox'],
    },
    },
    {
    name: 'webkit-authenticated',
    dependencies: ['setup'],
    testMatch: /ui\/authenticated\/.*\.spec\.js/,
    use: {
      ...devices['Desktop Safari'],
      storageState: 'playwright/.auth/user.json',
    },
    },
    {
    name: 'webkit-unauthenticated',
    testMatch: /ui\/unauthenticated\/.*\.spec\.js/,
    use: {
      ...devices['Desktop Safari'],
    },
    },
  ],
});