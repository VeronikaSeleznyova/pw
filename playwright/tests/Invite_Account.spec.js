import { expect, test, Page } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { AccountPage, InviteAccountPage,DeleteFromGroupPage } from '../pages/AccountPage';


test.describe('Invite Account Tests', () => {
  let mainPage;
  let accountPage;
  let inviteAccountPage;
  let deleteFromGroupPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    accountPage = new AccountPage(page);
    inviteAccountPage = new InviteAccountPage(page);
    deleteFromGroupPage = new DeleteFromGroupPage(page);


    await mainPage.login();
    await page.getByTestId('show-all-switch').locator('div').nth(2).click();
    await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
    await accountPage.searchAccount('Test A12');
    await page.getByText('- Test A12').click();
  });

  test.afterEach(async () => {
    await mainPage.close();
  });

  test('test cancel deletion group', async ({ page }) => {
    await page.getByRole('link', { name: 'Users' }).click();
    await page.getByTestId('edit-group-button').locator('path').click();
    await page.getByTestId('delete-group-button').getByRole('img').click();
    await page.locator('ifx-button').filter({ hasText: 'Cancel' }).locator('a').click();
  });


  test('test deletion the account to the group', async ({ page }) => {
    await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
    await page.getByRole('link', { name: 'Groups' }).click();
    await page.getByRole('row', { name: 'ACCT_admins' }).getByRole('img').click();
    await page.getByTestId('new-user-input').getByPlaceholder('Enter User Email').click();
    await page.getByTestId('new-user-input').getByPlaceholder('Enter User Email').fill('test@gmail.com');
    await page.locator('ifx-button').filter({ hasText: 'Add User' }).locator('a').click();
    await page.getByRole('row', { name: 'test@gmail.com PENDING' }).getByRole('img').click();
    await page.locator('ifx-button').filter({ hasText: 'Delete User' }).locator('a').click();
    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder('Search...').fill('test@gmail.com');
  });


  test('use the navigation panel in AM mode', async ({ page }) => {
  await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
  await page.getByText('Account Groups:').click();
  await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
  await page.getByText('Account Users:').click();
  await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
  await page.getByText('Pending Invites:').click();
  await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
  });
  
});
