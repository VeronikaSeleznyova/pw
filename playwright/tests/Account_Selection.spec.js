import { expect, test } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { AccountPage, InviteAccountPage } from '../pages/AccountPage';


test.describe('<Accounts>', () => {
  let mainPage;
  let accountPage;
  let inviteAccountPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    accountPage = new AccountPage(page);
    inviteAccountPage = new InviteAccountPage(page);

    await mainPage.login();
    });

  test.afterEach(async () => {
    await mainPage.close();
  });
  


test('pin acc on Select Account page', async ({ page }) => {
  await page.getByTestId('show-all-switch').locator('div').nth(2).click();
  await page.getByText('Account Management').click();
  await accountPage.searchAccount('8');
  await accountPage.pinAccount('8');
  await page.getByRole('link', { name: 'Home' }).click();
});


test('switch to acc on Select Account page', async ({ page }) => {
  await accountPage.switchToAccount('Test A12');
  await page.getByRole('link', { name: 'Invites' }).click();
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByRole('link', { name: 'Groups' }).click();
  await page.locator('a').filter({ hasText: /^Home$/ }).click();
  await page.getByLabel('a navigation navbar').getByRole('link').click();
});


test.describe('Edit Account Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTestId('show-all-switch').locator('div').nth(2).click();
    await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
    await accountPage.searchAccount('Test A12');
    await page.getByText('- Test A12').click();
  });

  test('edit account', async ({ page }) => {
    await accountPage.clickEditButton();
    await accountPage.enterAccountName('Test A122');
    await accountPage.clickCancelButton();

    await accountPage.clickEditButton();
    await accountPage.enterAccountName('Test A122');
    await accountPage.clickUpdateButton();

    await accountPage.clickEditButton();
    await accountPage.enterAccountName('Test A12');
    await accountPage.clickUpdateButton();
  });
});


});