import {test, expect} from "@playwright/test";
import {login} from '../utils/login';
import { createTeam } from "../utils/teamHelpers";

test.describe('Team load flow', () => {
    test('user can load a team', async ({page}) => {
        await login(page)

        const teamName = `delete team test ${Date.now()}`;
        const pokemons = ["geodude", "vulpix"];
    
        await createTeam(page, pokemons, teamName)
        await page.reload();

        await page.getByRole('button', { name: 'Load Teams' }).click();
        const teamListItem = page.locator('li', { hasText: teamName });
        await teamListItem.getByRole('button', { name: /load/i }).click();
        
        const loadedCards = page.getByTestId('pokemon-card');
        await expect(loadedCards).toHaveCount(2);



     })

 })