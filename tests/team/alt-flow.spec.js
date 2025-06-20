// Login alternative flows
import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test.describe('Login alternative flows', () => {
  test('user cannot login with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('invalid@email.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    await expect(page.getByRole('button', { name: 'Logout' })).not.toBeVisible({ timeout: 3000 });
    await expect(page).toHaveURL(/.*login/);
  });

  test('user cannot login with empty email', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('button', { name: 'Logout' })).not.toBeVisible();
  });

  test('user cannot login with empty password', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('huijbers15@outlook.com');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('button', { name: 'Logout' })).not.toBeVisible();
  });
});


test.describe('Team creation alternative flows', () => {
  test('user cannot save team without name', async ({ page }) => {
    await login(page);
    
    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill('geodude');
    await page.getByText('geodude', { exact: true }).click();
    
    await page.getByRole('button', { name: 'Save' }).click();
    
    await expect(page.getByText('Please enter a team name')).toBeVisible();
  });

  test('user cannot save empty team', async ({ page }) => {
    await login(page);
    
    await page.getByRole('textbox', { name: 'Enter team name' }).fill('Empty Team');
    await page.getByRole('button', { name: 'Save' }).click();
    
    await expect(page.getByText('Your team is empty')).toBeVisible();
  });

  test('user gets feedback when searching for non-existent pokemon', async ({ page }) => {
    await login(page);
    
    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill('nonexistentpokemon');
    
    await expect(page.locator('ul')).toBeVisible();
    await expect(page.getByText('nonexistentpokemon', { exact: true })).not.toBeVisible();
  });

  //TODO: Fails when trying to select same pokemon the second time
  test('user cannot add duplicate pokemon to team', async ({ page }) => {
    await login(page);
    
    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill('geodude');
    await page.getByText('geodude', { exact: true }).click();
    
    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill('geodude');
    await page.getByRole('listitem', { name: 'geodude' }).click();
    
    const pokemonCards = page.getByTestId('pokemon-card');
    await expect(pokemonCards).toHaveCount(1);
  });

  test('user cannot add more than 6 pokemon to team', async ({ page }) => {
    await login(page);
    
    const pokemons = ["geodude", "vulpix", "pikachu", "charizard", "blastoise", "venusaur", "alakazam"];
    
    for (const pokemon of pokemons) {
      await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill(pokemon);
      await page.getByText(pokemon, { exact: true }).click();
    }
    
    const pokemonCards = page.getByTestId('pokemon-card');
    await expect(pokemonCards).toHaveCount(6);
  });


  test('user can remove pokemon from team', async ({ page }) => {
    await login(page);
    
    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill('geodude');
    await page.getByText('geodude', { exact: true }).click();
    
    await expect(page.getByTestId('pokemon-card')).toHaveCount(1);
    
    await page.getByTestId('pokemon-card').getByRole('button', { name: /remove/i }).first().click();
    
    await expect(page.getByTestId('pokemon-card')).toHaveCount(0);
  });
});

test.describe('Team deletion alternative flows', () => {
  test('user can cancel team deletion', async ({ page }) => {
    await login(page);
    
    const teamName = `cancel delete test ${Date.now()}`;
    const pokemons = ["geodude"];
  
    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill(pokemons[0]);
    await page.getByText(pokemons[0], { exact: true }).click();
    await page.getByRole('textbox', { name: 'Enter team name' }).fill(teamName);
    await page.getByRole('button', { name: 'Save' }).click();
    

    await page.getByRole('button', { name: 'Load Teams' }).click();
    
    const teamListItem = page.locator('li', { hasText: teamName });
    const deleteButton = teamListItem.getByRole('button', { name: 'Delete' });
    
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain(`Are you sure you want to delete the team "${teamName}"`);
      await dialog.dismiss(); 
    });
    await deleteButton.click();

    await expect(page.locator('li', { hasText: teamName })).toBeVisible();
  });

});

test.describe('Team loading alternative flows', () => {
  test('load team shows success message', async ({ page }) => {
    await login(page);
    
    const teamName = `load success test ${Date.now()}`;
    const pokemons = ["geodude"];
    
    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill(pokemons[0]);
    await page.getByText(pokemons[0], { exact: true }).click();
    await page.getByRole('textbox', { name: 'Enter team name' }).fill(teamName);
    await page.getByRole('button', { name: 'Save' }).click();
    
    await page.getByRole('button', { name: 'Load Teams' }).click();
    const teamListItem = page.locator('li', { hasText: teamName });
    await teamListItem.getByRole('button', { name: 'Load' }).click();
    
    await expect(page.getByText(`Team "${teamName}" loaded successfully`)).toBeVisible();
  });
});


test.describe('Search interaction flows', () => {
  test('search dropdown closes when clicking outside', async ({ page }) => {
    await login(page);
    
    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill('pika');
    await expect(page.locator('ul')).toBeVisible();
    
    await page.getByText('Team Management').click();
    
    await expect(page.locator('ul')).not.toBeVisible();
  });

  test('search clears when pokemon is selected', async ({ page }) => {
    await login(page);
    
    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill('geodude');
    await page.getByText('geodude', { exact: true }).click();
    
    await expect(page.getByRole('textbox', { name: 'Search Pokémon...' })).toHaveValue('');
  });

  test('handles pokemon API error gracefully', async ({ page }) => {
    await login(page);
    
    await page.route('**/pokeapi.co/**', route => route.abort());
    
    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill('geodude');
    await page.getByText('geodude', { exact: true }).click();
    
    const pokemonCards = page.getByTestId('pokemon-card');
    if (await pokemonCards.count() > 0) {
      await expect(pokemonCards.first()).toContainText('Loading');
    }
  });

});

test.describe('Session and state management', () => {
  test('user stays logged in after page refresh', async ({ page }) => {
    await login(page);
    
    await page.reload();
   
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  test('unsaved team data is lost on refresh', async ({ page }) => {
    await login(page);
  
    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill('geodude');
    await page.getByText('geodude', { exact: true }).click();
    
    await expect(page.getByTestId('pokemon-card')).toHaveCount(1);
    
    await page.reload();

    await expect(page.getByTestId('pokemon-card')).toHaveCount(0);
  });

  test('user can logout successfully', async ({ page }) => {
    await login(page);
    
    await page.getByRole('button', { name: 'Logout' }).click();

    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('state resets after logout', async ({ page }) => {
    await login(page);
  
    await page.getByRole('textbox', { name: 'Search Pokémon...' }).fill('geodude');
    await page.getByText('geodude', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Enter team name' }).fill('Test Team');
    
    await page.getByRole('button', { name: 'Logout' }).click();
    
    await login(page);

    await expect(page.getByTestId('pokemon-card')).toHaveCount(0);
    await expect(page.getByRole('textbox', { name: 'Enter team name' })).toHaveValue('');
  });
});