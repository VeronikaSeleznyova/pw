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


  
  test('pin acc on Select Account page', async ({ page }) => {
       await page.getByTestId('show-all-switch').locator('div').nth(2).click();
       await page.getByText('Account Management').click();
       await page.getByPlaceholder('Search...').click();
       await page.getByPlaceholder('Search...').fill('8');
       await page.getByTestId('pin-account-icon-8').getByRole('img').click();
       await page.getByRole('link', { name: 'Home' }).click();
  });


  test('serch acc on Select Account page', async ({ page }) => {
    await page.getByTestId('show-all-switch').locator('div').nth(2).click();
    await page.getByText('Account ManagementAdd users').click();
    await page.getByLabel('a search field for user input').locator('div').click();
    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder('Search...').fill('Test A12');
    await page.getByText('- Test A12').click();
    await page.getByRole('link', { name: 'Invites' }).click();
    await page.getByRole('link', { name: 'Users' }).click();
    await page.getByRole('link', { name: 'Groups' }).click();
    await page.locator('a').filter({ hasText: /^Home$/ }).click();
  });
});

