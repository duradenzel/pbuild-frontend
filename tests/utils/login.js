export async function login(page) {
    await page.goto('http://localhost:5173/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('huijbers15@outlook.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Sign In' }).click();
  
    await page.getByRole('button', { name: 'Logout' }).waitFor();
  }