import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveTitle(/Admin/);
});
