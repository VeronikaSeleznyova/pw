const { expect, test } = require('@playwright/test');
const { MainPage } = require('../pages/mainPage');
const { UserManagementPage } = require('../pages/userManagementPage');

test.describe('<Accounts>', () => {
  let mainPage;
  let userManagementPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    userManagementPage = new UserManagementPage(page);

    await mainPage.login();
  });

  test.afterEach(async () => {
    await mainPage.close();
  });

  test('go to User Management page', async ({ page }) => {
    await userManagementPage.goToUserProfileManagement();
    await userManagementPage.navigateToPreferences();
    await userManagementPage.navigateToGroups();
    await userManagementPage.navigateToApiKeys();
    await userManagementPage.goToHome();
  });
});
