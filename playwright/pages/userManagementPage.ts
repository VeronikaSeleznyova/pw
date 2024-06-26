import { Page, expect } from '@playwright/test';

export class UserManagementPage {
    constructor(private readonly page: Page) {
      this.page = page;
    }

  async goToUserProfileManagement() {
    await this.page.goto('https://api.users.stage.osts-apps.com/sso/login?code=testuser');
    await this.page.getByTestId('show-all-switch').locator('div').nth(2).click();
    await this.page.getByText('User Profile Management').click();
  }
  async goToPreferences() {
    await this.page.getByRole('link', { name: 'Preferences' }).click();
  }

  async goToApiKeys() {
    await this.page.getByRole('link', { name: 'API Keys' }).click();
  }

  async goToApiKeysFromText() {
    await this.page.getByText('Api keys:').click();
  }

  async goToHomeFromNavigation() {
    await this.page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
  }

  async goToPreferencesFromText() {
    await this.page.getByText('Preferences:').click();
  }

  async goToHomeFromList() {
    await this.page.getByRole('list').getByRole('link', { name: 'Home' }).click();
  }
  
  async goToHome() {
    await this.page.getByRole('link', { name: 'Home' }).first().click();
  }

  async clearAllPreferences() {
    await this.page.locator('ifx-button').filter({ hasText: 'Clear All Preferences' }).locator('a').click();
  }

  async addApiKey() {
    await this.page.locator('ifx-button a').click();
    await this.page.getByText('Home/API Keys/Add API KeyCreate New API keyAPI Key DetailsExpiration Date:').click();
  }
  
  async fillApiKeyDetails() {
   
  }
  
  async createApiKey() {
    await this.page.locator('ifx-button').filter({ hasText: 'Create API key' }).locator('a').click();
  }
  
  async copyKeys() {
    await this.page.locator('.tooltip-container > .hydrated > .inline-svg').first().click();
    await this.page.locator('div:nth-child(5) > .api-key-box-copy > .tooltip-container > .hydrated > .inline-svg').click();
  }
  
  async cancelApiKeyDeletion() {
    await this.page.locator('ifx-button').filter({ hasText: 'Cancel' }).locator('a').click();
  }
  
  async confirmApiKeyDeletion() {
    await this.page.getByTestId('confirmation-input').getByPlaceholder('Confirm deleting').click();
    await this.page.getByTestId('confirmation-input').getByPlaceholder('Confirm deleting').fill('DELETE');
    await this.page.getByTestId('delete').locator('a').click();
  }
  
  async deleteApiKey() {
    await this.page.getByTestId('delete-api-key').click();
    await this.confirmApiKeyDeletion();
  }
  
  async checkButtonNotClickable() {
    // check the button is unclicable 
    const createApiKeyButton = this.page.locator('ifx-button').filter({ hasText: 'Create API key' }).locator('a');
  
    const isDisabled = await createApiKeyButton.isDisabled();
    if (isDisabled) {
      console.log('Create API key is disabled.');
    } else {
      console.log('Create API key doesnt have disabled.');
    }
  
    await expect(createApiKeyButton).toBeDisabled();
  }

}


export class AccountManagementPage {
    constructor(private readonly page: Page) {
      this.page = page;
    }
  
    async goToAccountManagement() {
      await this.page.goto('https://api.users.stage.osts-apps.com/sso/login?code=testuser');
      await this.page.getByTestId('show-all-switch').locator('div').nth(2).click();
      await this.page.getByText('Account ManagementAdd users').click();
    }
  
    async pinAccount(accountId) {
      await this.page.getByTestId(`pin-account-icon-${accountId}`).getByRole('img').click();
    }
  
    async goToHome() {
      await this.page.getByRole('link', { name: 'Home' }).click();
    }
  }
  
  

module.exports = { UserManagementPage, AccountManagementPage };