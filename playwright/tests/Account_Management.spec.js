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


  test('use the navigation panel in AM mode', async ({ page }) => {
    await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
    await page.waitForTimeout(2000);
    const detailsElement = page.getByRole('heading', { name: 'Account Details' });
    await expect(detailsElement).toBeVisible();
    await page.getByRole('link', { name: 'Invites' }).click();
    const inviteElement = page.getByRole('heading', { name: 'Account Invites' });
    await expect(inviteElement).toBeVisible();
    await page.getByRole('link', { name: 'Users' }).click();
    const usersElement = page.getByRole('heading', { name: 'Account Users' });
    await expect(usersElement).toBeVisible();
    await page.getByRole('link', { name: 'Groups' }).click();
    const groupsElement = page.getByRole('heading', { name: 'Account Groups' });
    await expect(groupsElement).toBeVisible();
    await page.locator('a').filter({ hasText: /^Home$/ }).click();
    await page.getByText('Account Groups:').click();
    await expect(groupsElement).toBeVisible();
    await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
    await page.getByText('Account Users:').click();
    await expect(usersElement).toBeVisible();
    await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
    await page.getByText('Pending Invites:').click();
    await expect(inviteElement).toBeVisible();
    await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
    await expect(detailsElement).toBeVisible();
  });
 

  test('test cancel deletion group', async ({ page }) => {
    await page.getByRole('link', { name: 'Users' }).click();
    await page.getByTestId('edit-group-button').locator('path').click();
    await page.getByTestId('delete-group-button').getByRole('img').click();
    await page.locator('ifx-button').filter({ hasText: 'Cancel' }).locator('a').click();
    const emailLocator = page.getByText('test.user@platform.test', { exact: true });
    await expect(emailLocator).toBeVisible();
  });


  test('test additing the account to the group', async ({ page }) => {  
    await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
    await page.getByRole('link', { name: 'Invites' }).click();
    await page.locator('ifx-button').filter({ hasText: 'Invite New User' }).locator('a').click();
    await page.getByTestId('checkbox-b9ec5634-a1d6-401b-b39d-6953520b89b1').getByRole('checkbox').click();
    await page.getByTestId('checkbox-0eaee48e-676c-41fe-b963-86471bab4ac5').getByRole('checkbox').click();
    await page.getByTestId('checkbox-8ea98471-9797-4a7e-a296-906710ac4261').getByRole('checkbox').click();
    await page.getByTestId('user-input').getByPlaceholder('Enter email').click();
    await page.getByTestId('user-input').getByPlaceholder('Enter email').fill('test.user@platform.test');
    await page.locator('ifx-button a').click();
    const emailLocator = page.locator('span:has-text("test.user@platform.test")');
    await expect(emailLocator).toBeVisible()
  });


  test('delete the acc from the group', async ({ page }) => {  
    await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
    await page.getByRole('link', { name: 'Invites' }).click();
    await page.getByRole('row', { name: 'test.user@platform.test' }).getByRole('img').click();
    await page.getByRole('row', { name: 'CLOUDID_cm_provisioner' }).getByRole('img').click();
    await page.locator('ifx-button').filter({ hasText: 'Delete User' }).locator('a').click();
    const emailLocator = page.locator('span:has-text("test.user@platform.test")');
    await expect(emailLocator).not.toBeVisible();
});


test('error checking test - An error occurred while deleting the user. The ACCT_admins group must always contain at least 1 member', async ({ page }) => {  
   await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
   await page.getByRole('link', { name: 'Users' }).click();
   await page.getByTestId('edit-group-button').getByRole('img').click();
   await page.getByTestId('delete-group-button').getByRole('img').click();
   await page.locator('ifx-button').filter({ hasText: 'Delete User' }).locator('a').click();
   const errorLocator = page.locator('#app-div > div > div > div.accounts-main-content > div > ifx-alert');
   await expect(errorLocator).toHaveText('Error occurred while deleting user. ACCT_admins group must always contain at least 1 member');
});


test('error checking test - Error occurred while inviting user. User already invited', async ({ page }) => {  
  await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
  await page.getByRole('link', { name: 'Invites' }).click();
  await page.locator('ifx-button a').click();
  await page.getByTestId('user-input').getByPlaceholder('Enter email').click();
  await page.getByTestId('user-input').getByPlaceholder('Enter email').fill('test@gmail.com');
  await page.getByTestId('checkbox-0eaee48e-676c-41fe-b963-86471bab4ac5').getByRole('checkbox').click();
  await page.locator('ifx-button a').click();
  await page.locator('ifx-button').filter({ hasText: 'Invite New User' }).locator('a').click();
  await page.getByTestId('user-input').getByPlaceholder('Enter email').click();
  await page.getByTestId('user-input').getByPlaceholder('Enter email').fill('test@gmail.com');
  await page.getByTestId('checkbox-0eaee48e-676c-41fe-b963-86471bab4ac5').getByRole('checkbox').click();
  await page.locator('ifx-button a').click();
  const errorLocator = page.locator('#app-div > div > div > div.accounts-main-content > div > ifx-alert');
  await expect(errorLocator).toHaveText('Error occurred while inviting user. user already invited');
  await page.getByRole('link', { name: 'Invites' }).click();
  await page.waitForTimeout(2000);
  await page.getByTestId('edit-group-button').locator('path').click();
  await page.getByTestId('delete-group-button').getByRole('img').click();
  await page.locator('ifx-button').filter({ hasText: 'Delete User' }).locator('a').click();
  await page.getByRole('link', { name: 'Account Invites' }).click();
  const accLocator = page.locator('//*[@id="app-div"]/div/div/div[2]/div/table/tbody/tr/td[1]');
  await expect(accLocator).toBeVisible();
});


test('adding a user on the Account Users page', async ({ page }) => {  
  await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
  await page.getByRole('link', { name: 'Users' }).click();
  await page.locator('ifx-button').filter({ hasText: 'Add User' }).locator('a').click();
  await page.getByTestId('user-input').getByPlaceholder('Enter email').click();
  await page.getByTestId('user-input').getByPlaceholder('Enter email').fill('test@gmail.com');
  await page.getByTestId('checkbox-8ea98471-9797-4a7e-a296-906710ac4261').getByRole('checkbox').click();
  await page.locator('ifx-button a').click();
  const accLocator = page.locator('//*[@id="app-div"]/div/div/div[2]/div/table/tbody/tr/td[1]');
  await expect(accLocator).toBeVisible();
});

test('daleting a user on the Account Users page', async ({ page }) => {  
  await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
  await page.getByRole('link', { name: 'Invites' }).click();
  await page.getByTestId('edit-group-button').locator('path').click();
  await page.getByTestId('delete-group-button').getByRole('img').click();
  await page.locator('ifx-button').filter({ hasText: 'Delete User' }).locator('a').click();
  const noDataHeading = page.getByRole('heading', { name: 'No Data', exact: true });
  await expect(noDataHeading).toBeVisible();
});



test('cancel updating the group on the Update Group page', async ({ page }) => {  
  await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
  await page.getByRole('link', { name: 'Groups' }).click();
  await page.getByRole('row', { name: 'ACCT_users' }).getByTestId('edit-group-button').click();
  await page.locator('ifx-button').filter({ hasText: 'Cancel' }).locator('a').click();
});




test('update the group jn the Edit Group: ACCT_users section', async ({ page }) => {  
  await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
  await page.getByRole('link', { name: 'Groups' }).click();
  await page.getByRole('row', { name: 'ACCT_users' }).getByRole('img').click();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.getByTestId('new-user-input').getByPlaceholder('Enter User Email').click();
  await page.getByTestId('new-user-input').getByPlaceholder('Enter User Email').fill('test@gmail.com');
  await page.locator('ifx-button').filter({ hasText: 'Add User' }).locator('a').click();
  const emailCell = page.locator('td:has-text("test@gmail.com")'); 
  await expect(emailCell).toBeVisible();
});


test('error checking test Edit Group: ACCT_users section - Error occurred while inviting user. User already invited', async ({ page }) => {  
  await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
  await page.getByRole('link', { name: 'Groups' }).click();
  await page.getByRole('row', { name: 'ACCT_users' }).getByRole('img').click();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const emailCell = page.locator('td:has-text("test@gmail.com")'); 
  await expect(emailCell).toBeVisible();
  await page.getByTestId('new-user-input').getByPlaceholder('Enter User Email').click();
  await page.getByTestId('new-user-input').getByPlaceholder('Enter User Email').fill('test@gmail.com');
  await page.locator('ifx-button').filter({ hasText: 'Add User' }).locator('a').click();
  const errorLocator = page.locator(' //*[@id="app-div"]/div/div/div[2]/div/div[3]/ifx-alert'); 
  await expect(errorLocator).toHaveText('Error occurred while inviting user. user already invited');
});


test('cancel deleting the account from the ACCT_users Group', async ({ page }) => {  
  await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
  await page.getByRole('link', { name: 'Groups' }).click();
  await page.getByRole('row', { name: 'ACCT_users' }).getByRole('img').click();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const emailCell = page.locator('td:has-text("test@gmail.com")'); 
  await expect(emailCell).toBeVisible();
  await page.getByTestId('delete-user-button').getByRole('img').click();
  await page.locator('ifx-button').filter({ hasText: 'Cancel' }).locator('a').click();
  await expect(emailCell).toBeVisible();
});


test('delete the account from the ACCT_users Group', async ({ page }) => {  
  await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
  await page.getByRole('link', { name: 'Groups' }).click();
  await page.getByRole('row', { name: 'ACCT_users' }).getByRole('img').click();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const emailCell = page.locator('td:has-text("test@gmail.com")'); 
  await expect(emailCell).toBeVisible();
  await page.getByTestId('delete-user-button').getByRole('img').click();
  await page.locator('ifx-button').filter({ hasText: 'Delete User' }).locator('a').click();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(emailCell).not.toBeVisible();
});


test('check the error of deleting the MEMBER acc from the group', async ({ page }) => {  
  await page.locator('div').filter({ hasText: /^Account Management$/ }).click();
  await page.getByRole('link', { name: 'Groups' }).click();
  await page.getByRole('row', { name: 'ACCT_admins' }).getByRole('img').click();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const emailCell = page.locator('td:has-text("test.user@platform.test")'); 
  await expect(emailCell).toBeVisible();
  const memberElement = page.getByText('MEMBER', { exact: true });
  await expect(memberElement).toBeVisible();
  await page.getByTestId('delete-user-button').getByRole('img').click();
  await page.locator('ifx-button').filter({ hasText: 'Delete User' }).locator('a').click();
  const errorLocator = page.locator('//*[@id="app-div"]/div/div/div[2]/div/ifx-alert'); 
  await expect(errorLocator).toHaveText('Error occurred while deleting user. ACCT_admins group must always contain at least 1 member');
  await page.getByRole('link', { name: 'Edit Group: ACCT_admins' }).click();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(emailCell).toBeVisible();
});


});


