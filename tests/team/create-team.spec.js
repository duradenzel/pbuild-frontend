import { test, expect } from '@playwright/test';
import { login } from '../utils/login'; 
import { createTeam } from '../utils/teamHelpers';

test.describe('Team creation flow', () => {
  test('user can create a pokmon team', async ({ page }) => {
    await login(page);

    const teamName = `create team test ${Date.now()}`;
    const pokemons = ["geodude", "vulpix"];

    await createTeam(page, pokemons, teamName)
    
    await expect(page.getByText(teamName)).toBeVisible();
  });
});
