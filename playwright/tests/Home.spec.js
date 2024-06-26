import { expect, test } from '@playwright/test';
import { MainPage } from '../pages/mainPage';

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


  test('switch on Infineon website', async ({ page }) => {
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Infineon Website').click();
    const page1 = await page1Promise;
  });


test('swich through Privacy Police and Glossary', async ({ page }) => {
  await page.getByText('© 1999 - 2024 Infineon').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Terms' }).click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Imprint' }).click();
  const page2 = await page2Promise;
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Privacy Policy' }).click();
  const page3 = await page3Promise;
  const page4Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Glossary' }).click();
  const page4 = await page4Promise;
});

});
