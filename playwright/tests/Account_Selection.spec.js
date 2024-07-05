const { expect, test } = require('@playwright/test');
const { MainPage } = require('../pages/mainPage');
const { UserManagementPage, AccountManagementPage } = require('../pages/userManagementPage');
const { AccountPage, InviteAccountPage } = require('../pages/accountPage');


test.describe('<Accounts>', () => {
  let mainPage;
  let accountPage;
  let inviteAccountPage;
  let accountManagementPage;
  let userManagementPage

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    accountPage = new AccountPage(page);
    inviteAccountPage = new InviteAccountPage(page);
    accountManagementPage = new AccountManagementPage(page);
    userManagementPage = new UserManagementPage(page);

    await mainPage.login();
    });

  test.afterEach(async () => {
    await mainPage.close();
  });



test('check the limit of the pinned accounts', async ({ page }) => {
  await accountManagementPage.goToAccountManagement();
  await accountPage.searchAccount('2');
  await accountManagementPage.pinAccount(2);
  await accountPage.searchAccount('42');;
  await accountManagementPage.pinAccount(42);
  await accountPage.searchAccount('40');
  await accountManagementPage.pinAccount(40);
  await accountPage.searchAccount('178');
  await accountManagementPage.pinAccount(178);
  await accountManagementPage.goToHome();
  await userManagementPage.goToUserProfileManagement();
  const userElement = page.getByRole('heading', { name: 'User Profile' });
  await expect(userElement).toBeVisible();
  await userManagementPage.goToPreferences();
  const element4 = page.getByText('- 123 test 32');
  await expect(element4).not.toBeVisible();
  await userManagementPage.clearAllPreferences();
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
    await page.getByTestId('edit-button').getByRole('button').click();
    await accountPage.enterAccountName('Test');
    await accountPage.clickUpdateButton();
    await page.waitForTimeout(2000);
    const errorLocator1 = page.locator('//*[@id="app-div"]/div/div/div[2]/div/ifx-alert'); 
    await expect(errorLocator1).toHaveText(' Error occurred while attempting to update account details. body/name must NOT have fewer than 5 characters');
    const accName = page.locator('//*[@id="app-div"]/div/div/div[2]/div/div[2]/div[2]/div/span[2]');
    await expect(accName).toBeVisible();
    await page.locator('ifx-alert div').nth(2).click();
    await page.getByTestId('edit-button').getByRole('button').click();
    await accountPage.enterAccountName('123 test 32');
    await accountPage.clickUpdateButton();
    await expect(accName).toBeVisible();
    await page.waitForTimeout(2000);
    const errorLocator2 = page.locator('//*[@id="app-div"]/div/div/div[2]/div/ifx-alert'); 
    await expect(errorLocator2).toHaveText('Error occurred while attempting to update account details. name already exists');
    await page.getByTestId('edit-button').getByRole('button').click();
    await accountPage.enterAccountName('Test A122');
    await accountPage.clickCancelButton();
    await expect(accName).toBeVisible();
    await page.getByTestId('edit-button').getByRole('button').click();
    await accountPage.enterAccountName('Test A122');
    await accountPage.clickUpdateButton();
    const changedName = page.locator('//*[@id="app-div"]/div/div/div[2]/div/div[2]/div[2]/div/span[2]');
    await expect(changedName).toBeVisible();
    await page.getByTestId('edit-button').getByRole('button').click();
    await accountPage.enterAccountName('Test A12');
    await accountPage.clickUpdateButton();
    await expect(accName).toBeVisible();
   });
});




});