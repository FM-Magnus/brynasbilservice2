import { defineConfig } from '@playwright/test'

const baseURL = 'http://localhost:5173'

export default defineConfig({
  testDir: './tests/browser',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL,
    browserName: 'chromium',
    colorScheme: 'light',
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-1440',
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'tablet-768',
      use: { viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'mobile-390',
      use: {
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
