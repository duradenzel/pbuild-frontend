import { expect } from '@playwright/test';

export async function searchPokemon(page, name) {
  await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill(name);
  await page.getByText(name, { exact: true }).click();
  await expect(page.getByRole('main')).toContainText(name);
}

export async function saveTeam(page, teamName) {
  await page.getByRole('textbox', { name: 'Enter team name' }).fill(teamName);
  const saveButton = page.getByRole('button', { name: 'Save' });
  await expect(saveButton).toBeVisible();
  await saveButton.click();
}

export async function createTeam(page, pokemonNames, teamName) {
  for (const name of pokemonNames) {
    await searchPokemon(page, name);
  }
  await saveTeam(page, teamName);
  await expect(page.getByText(teamName)).toBeVisible();
}
