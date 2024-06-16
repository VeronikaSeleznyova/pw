import { Page } from '@playwright/test';


export class UserManagementPage {
    constructor(private readonly page: Page) {
      this.page = page;
    }

  async goToUserProfileManagement() {
    await this.page.getByTestId('show-all-switch').locator('div').nth(2).click();
    await this.page.getByText('User Profile Management').click();
  }

  async navigateToPreferences() {
    await this.page.getByRole('link', { name: 'Preferences' }).click();
  }

  async navigateToGroups() {
    await this.page.getByRole('link', { name: 'Groups' }).click();
  }

  async navigateToApiKeys() {
    await this.page.getByRole('link', { name: 'API Keys' }).click();
  }

  async goToHome() {
    await this.page.getByRole('link', { name: 'Home' }).first().click();
  }
}


module.exports = { UserManagementPage };
