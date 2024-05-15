import { expect, test } from '@playwright/test';
import { MainPage } from './pages/mainPage';

test.describe('<Accounts>', () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);

    // mainPage.fulfill();

    await mainPage.login();
  });

  test.afterEach(async () => {
    await mainPage.close();
  });

  test('should render page', async ({ page }) => {
    await page.getByRole('switch', { name: 'Show All Services' }).click();
    await page.getByText('Account Management').click();
    await page.getByText('- Main AB').click();
    await page.getByRole('link', { name: 'Groups' }).click();
    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder('Search...').fill('admins');
    await page.getByTestId('edit-group-button').getByRole('img').click();
    await page
      .locator('ifx-button')
      .filter({ hasText: 'Cancel' })
      .locator('a')
      .click();
    await page.getByPlaceholder('Search...').fill('user');
    await page.waitForTimeout(3000);
    await page.getByTestId('edit-group-button').getByRole('img').click();
    await page.getByRole('heading', { name: 'Update Group' }).click();
    await page
      .getByTestId('new-user-input')
      .getByPlaceholder('Enter User Email')
      .fill('user.test@test.com');
    await page
      .locator('ifx-button')
      .filter({ hasText: 'Add User' })
      .locator('a')
      .click();
    await expect(
      page.getByRole('cell', { name: 'user.test@test.com' })
    ).toBeVisible();
  });
});
