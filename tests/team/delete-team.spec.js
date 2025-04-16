import { test, expect } from '@playwright/test';
import { login } from '../utils/login';
import { createTeam } from '../utils/teamHelpers';

test.describe('Team deletion flow', () => {
  test('user can create and delete a Pokémon team', async ({ page }) => {
    await login(page);

    const teamName = `delete team test ${Date.now()}`;
    const pokemons = ["geodude", "vulpix"];

    await createTeam(page, pokemons, teamName)

    await expect(page.getByRole('heading', { name: 'Saved Teams' })).toBeVisible();

    const teamListItem = page.locator('li', { hasText: teamName });
    const deleteButton = teamListItem.getByRole('button', { name: /delete/i });
    await expect(deleteButton).toBeVisible();
    
    page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });
    await deleteButton.click();

    await expect(page.locator('li', { hasText: teamName })).toHaveCount(0);
  });
});
