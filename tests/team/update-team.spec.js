import { test, expect } from '@playwright/test';
import { login } from '../utils/login';
import { createTeam } from '../utils/teamHelpers';

test.describe('Team update flow', () => {
  test('user can update a team by adding a Pokémon', async ({ page }) => {
    await login(page);

    const teamName = `update team test ${Date.now()}`;
    const pokemons = ["geodude", "vulpix"];
    const newPokemon = 'charmander';

    await createTeam(page, pokemons, teamName)

    await expect(page.getByRole('heading', { name: 'Saved Teams' })).toBeVisible();

    await page.reload();

    await page.getByRole('button', { name: 'Load Teams' }).click();
    const teamListItem = page.locator('li', { hasText: teamName });
    await teamListItem.getByRole('button', { name: /edit/i }).click();

    const updateButton = page.getByRole('button', { name: 'Update' });
    await expect(updateButton).toBeVisible();


    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill(newPokemon);
    await page.getByText(newPokemon, { exact: true }).click();

    await expect(page.getByRole('heading', { name: /charmander/i })).toBeVisible();  

    await page.waitForTimeout(500);
    await updateButton.click();


    await page.reload();
    await page.getByRole('button', { name: 'Load Teams' }).click();
    const updatedTeamItem = page.locator('li', { hasText: teamName });
    await updatedTeamItem.getByRole('button', { name: /load/i }).click();

 
    await expect(page.getByRole('heading', { name: /blaziken/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /charmander/i })).toBeVisible();    

    const loadedCards = page.getByTestId('pokemon-card');
    await expect(loadedCards).toHaveCount(2);
  });
});
