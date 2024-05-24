import { Page } from '@playwright/test';

export class AccountPage {
  constructor(private readonly page: Page) {
    this.page = page;
  }

  async searchAccount(accountName: string) {
    await this.page.getByPlaceholder('Search...').click();
    await this.page.getByPlaceholder('Search...').fill(accountName);
  }


  async clickEditButton() {
    await this.page.getByTestId('edit-button').getByRole('button').click();
  }

  async enterAccountName(accountName: string) {
    await this.page.getByTestId('name-input').getByPlaceholder('Enter Account Name').click();
    await this.page.getByTestId('name-input').getByPlaceholder('Enter Account Name').fill(accountName);
  }

  async clickCancelButton() {
    await this.page.getByTestId('cancel-button').locator('a').click();
  }

  async clickUpdateButton() {
    await this.page.getByTestId('update-button').locator('a').click();
  }

  async editAccount(newAccountName: string, cancel: boolean = false) {
    await this.clickEditButton();
    await this.enterAccountName(newAccountName);
    if (cancel) {
      await this.clickCancelButton();
    } else {
      await this.clickUpdateButton();
    }
  }

  async pinAccount(accountId) {
    await this.page.getByTestId(`pin-account-icon-${accountId}`).getByRole('img').click();
  }

  async switchToAccount(accountName) {
    await this.page.getByTestId('show-all-switch').locator('div').nth(2).click();
    await this.page.getByText('Account ManagementAdd users').click();
    await this.page.getByLabel('a search field for user input').locator('div').click();
    await this.page.getByPlaceholder('Search...').click();
    await this.page.getByPlaceholder('Search...').fill(accountName);
    await this.page.getByText(`- ${accountName}`).click();
  }
}


export class InviteAccountPage {
    constructor(private readonly page: Page) {
      this.page = page;
    }
  
    async goToInvites() {
        await this.page.waitForSelector('role=link[name="Invites"]', { state: 'attached' });
        await this.page.getByRole('link', { name: 'Invites' }).click();
      }
      
  
    async clickInviteNewUser() {
      await this.page.locator('ifx-button').filter({ hasText: 'Invite New User' }).locator('a').click();
    }
  
    async enterEmail(email) {
      await this.page.getByTestId('user-input').getByPlaceholder('Enter email').click();
      await this.page.getByTestId('user-input').getByPlaceholder('Enter email').fill(email);
    }
  
    async selectCheckbox(testId) {
      await this.page.getByTestId(testId).getByRole('checkbox').click();
    }
  
    async selectLegacyCloudId() {
      await this.page.getByRole('row', { name: 'LEGACY_cloudid' }).getByRole('cell').first().click();
    }
  
    async clickSubmitButton() {
      await this.page.locator('ifx-button a').click();
    }
  
    async clickNavbarLink() {
      await this.page.getByLabel('a navigation navbar').getByRole('link').click();
    }
  
    async clickButtonByName(name) {
      await this.page.getByRole('button', { name }).click();
    }
  
    async clickFirstButton() {
      await this.page.locator('.btn').first().click();
    }
  
    async clickNotificationAction() {
      await this.page.locator('div:nth-child(2) > .notification-content > .notification-action > ifx-button > .btn').first().click();
    }
  
    async clickNotificationDropdown() {
      await this.page.getByTestId('notification-dropdown').getByRole('button').click();
    }
  }

module.exports = { AccountPage, InviteAccountPage };

