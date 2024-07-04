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


test('check CSS variables on the Account mod', async ({ page }) => {
  const button = page.locator('//*[@id="framework-root"]/div/div/div/div[2]/div[1]');
  const reactPdfTextLayerValue = await button.evaluate(element =>
    window.getComputedStyle(element).getPropertyValue('--react-pdf-text-layer')
  );
  const highlightBgColorValue = await button.evaluate(element =>
    window.getComputedStyle(element).getPropertyValue('--highlight-bg-color')
  );
  expect(reactPdfTextLayerValue.trim()).toBe('1');
  expect(highlightBgColorValue.trim()).toBe('rgba(180, 0, 170, 1)');
});


test('check error - Error occurred while attempting to create account. body/name must NOT have fewer than 5 characters', async ({ page }) => {
  await page.getByRole('button', { name: 'test.user@platform.test' }).click();
  await page.getByText('Create New Account').click();
  const createAccountHeading = page.getByRole('heading', { name: 'Create Account' });
  await expect(createAccountHeading).toBeVisible();
  await page.getByLabel('*').click();
  await page.getByLabel('*').fill('test');
  await page.locator('ifx-button').filter({ hasText: 'Create' }).locator('a').click();
  const errorLocator = page.locator('//*[@id="framework-root"]/div/div/form/ifx-alert');
  await expect(errorLocator).toHaveText('Error occurred while attempting to create account. body/name must NOT have fewer than 5 characters');
});


test('check error - Error occurred while attempting to create account. duplicate account already exists', async ({ page }) => {
  await page.getByRole('button', { name: 'test.user@platform.test' }).click();
  await page.getByText('Create New Account').click();
  const createAccountHeading = page.getByRole('heading', { name: 'Create Account' });
  await expect(createAccountHeading).toBeVisible();
  await page.getByLabel('*').click();
  await page.getByLabel('*').fill('Test A12');
  await page.locator('ifx-button').filter({ hasText: 'Create' }).locator('a').click();
  const errorLocator = page.locator('//*[@id="framework-root"]/div/div/form/ifx-alert');
  await expect(errorLocator).toHaveText('Error occurred while attempting to create account. duplicate account already exists');
});


test('cancel create the account', async ({ page }) => {
  await page.getByRole('button', { name: 'test.user@platform.test' }).click();
  await page.getByText('Create New Account').click();
  const createAccountHeading = page.getByRole('heading', { name: 'Create Account' });
  await expect(createAccountHeading).toBeVisible();
  await page.getByLabel('*').click();
  await page.getByLabel('*').fill('Test A12');
  await page.locator('ifx-button').filter({ hasText: 'Cancel' }).locator('a')
  const expectedElement = page.locator('#framework-root > div > header > ifx-navbar > div:nth-child(3) > div > div > span');
  await expect(expectedElement).toBeVisible();
});

test('expect the "Create" button to be disabled (via CSS)', async ({ page }) => {
  await page.getByRole('button', { name: 'test.user@platform.test' }).click();
  await page.getByText('Create New Account').click();
  const createAccountHeading = page.getByRole('heading', { name: 'Create Account' });
  await expect(createAccountHeading).toBeVisible();
  const createButton = page.locator('ifx-button:disabled');
  await expect(createButton).not.toBeVisible(); 
});


test('create a new account with a unique account', async ({ page }) => {
  const timestamp = Date.now().toString();
  let accountName = `test${timestamp}`;
  if (accountName.length < 5) {
    accountName = accountName.padEnd(5, '0');
  await page.getByRole('button', { name: 'test.user@platform.test' }).click();
  await page.getByText('Create New Account').click();
  const createAccountHeading = page.getByRole('heading', { name: 'Create Account' });
  await expect(createAccountHeading).toBeVisible();
  await page.getByLabel('*').fill('#text-field');
  await page.locator('ifx-button').filter({ hasText: 'Create' }).locator('a').click();
  const expectedElement = page.locator('#framework-root > div > header > ifx-navbar > div:nth-child(3) > div > div > span');
  await expect(expectedElement).toBeVisible();
  }
});

});
