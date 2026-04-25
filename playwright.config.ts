import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env.ts';

const reporters: NonNullable<ReturnType<typeof defineConfig>['reporter']> = [
  ['list'],
  ['html', { open: 'never' }]
];

if (process.env.CI) {
  reporters.push([
    'playwright-ctrf-json-reporter',
    {
      outputDir: 'ctrf',
      outputFile: 'ctrf-report.json',
      testType: 'e2e',
      appName: 'qa-practice-demo'
    }
  ]);
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: {
    timeout: 7_000
  },
  reporter: reporters,
  use: {
    baseURL: env.baseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1440, height: 900 },
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    headless: env.headless,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
