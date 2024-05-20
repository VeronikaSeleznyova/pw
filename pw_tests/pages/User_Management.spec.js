import { expect, test } from '@playwright/test';
import { MainPage } from '../__mock__/mainPage';

test.describe('<Accounts>', () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);


    await mainPage.login();
    });

  test.afterEach(async () => {
    await mainPage.close();
  });


  test('go to User Management page', async ({ page }) => {
    await page.getByTestId('show-all-switch').locator('div').nth(2).click();
    await page.getByText('User Profile Management').click();
    await page.getByRole('link', { name: 'Preferences' }).click();
    await page.getByRole('link', { name: 'Groups' }).click();
    await page.getByRole('link', { name: 'API Keys' }).click();
    await page.getByRole('link', { name: 'Home' }).first().click();
  });
});
