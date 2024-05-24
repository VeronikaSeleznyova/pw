import { expect, test, Page } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { AccountPage, InviteAccountPage } from '../pages/AccountPage';


test.describe('Invite Account Tests', () => {
  let mainPage;
  let accountPage;
  let inviteAccountPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    accountPage = new AccountPage(page);
    inviteAccountPage = new InviteAccountPage(page);

    await mainPage.login();
    await page.getByTestId('show-all-switch').locator('div').nth(2).click();
    await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
    await accountPage.searchAccount('Test A12');
    await page.getByText('- Test A12').click();
  });

  test.afterEach(async () => {
    await mainPage.close();
  });


  test('invite account', async ({ page }) => {
    await page.getByRole('link', { name: 'Invites' }).click();
    await page.getByRole('link', { name: 'Users' }).click();
    await page.getByRole('link', { name: 'Groups' }).click();
    await page.locator('a').filter({ hasText: /^Home$/ }).click();
    await page.getByLabel('a navigation navbar').getByRole('link').click();
    await inviteAccountPage.goToInvites();
    await inviteAccountPage.clickInviteNewUser();
    await inviteAccountPage.enterEmail('test.user@platform.test');
    
    await inviteAccountPage.selectCheckbox('checkbox-b9ec5634-a1d6-401b-b39d-6953520b89b1');
    await inviteAccountPage.selectCheckbox('checkbox-0eaee48e-676c-41fe-b963-86471bab4ac5');
    await inviteAccountPage.selectLegacyCloudId();
    await inviteAccountPage.selectCheckbox('checkbox-7629c50f-71e1-4518-a1b9-91b23fa647a6');
    await inviteAccountPage.selectCheckbox('checkbox-13e1b87d-7d54-423b-b807-0bccdaaf4dc0');
    await inviteAccountPage.selectCheckbox('checkbox-311252a7-dfeb-42cd-922b-c7bb978c56b5');
    await inviteAccountPage.selectCheckbox('checkbox-e96259a7-417c-4946-bab9-98100f37566c');

    await inviteAccountPage.clickSubmitButton();
    await inviteAccountPage.clickNavbarLink();
    await inviteAccountPage.clickButtonByName('5');
    await inviteAccountPage.clickFirstButton();
    await inviteAccountPage.clickNotificationAction();
    await inviteAccountPage.clickFirstButton();
    await inviteAccountPage.clickNotificationAction();
    await inviteAccountPage.clickFirstButton();
    await inviteAccountPage.clickNotificationDropdown();
  });
});
