import { expect, test, Page } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { AccountPage, InviteAccountPage, DeleteFromGroupPage } from '../pages/AccountPage';


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


  test('use the navigation panel in AM mode', async ({ page }) => {
    await deleteFromGroupPage.goToAccountManagement();
    await accountPage.navigateToAccountGroups();
    await accountPage.goToHome();
    await accountPage.navigateToAccountUsers();
    await accountPage.goToHome();
    await accountPage.navigateToPendingInvites();
    await accountPage.goToHome();
  });

  test('test cancel deletion group', async ({ page }) => {
    await page.getByRole('link', { name: 'Users' }).click();
    await page.getByTestId('edit-group-button').locator('path').click();
    await page.getByTestId('delete-group-button').getByRole('img').click();
    await page.locator('ifx-button').filter({ hasText: 'Cancel' }).locator('a').click();
  });

  test('test deletion the account from the group', async ({ page }) => {
    await deleteFromGroupPage.goToAccountManagement();
    await deleteFromGroupPage.navigateToGroups();
    await deleteFromGroupPage.addUserToGroup('test@gmail.com');
    await deleteFromGroupPage.deleteUserFromGroup('test@gmail.com');
    await deleteFromGroupPage.searchUser('test@gmail.com');
  });



});



