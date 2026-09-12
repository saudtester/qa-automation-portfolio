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
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});