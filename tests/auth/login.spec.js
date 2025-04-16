import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('user can log in successfully', async ({ page }) => {
  await login(page);
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});
