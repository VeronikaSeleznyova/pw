import { Page } from '@playwright/test';
import { MOCKED_ENDPOINTS } from './mockedEndpoints';
import { ACCOUNT_TOKEN, USER_TOKEN } from './mockedToken';

export class MainPage {
  constructor(private readonly page: Page) {
    this.page = page;
  }

  async fulfill() {
    await this.page.route(MOCKED_ENDPOINTS.account.path, (route) => {
      route.fulfill(MOCKED_ENDPOINTS.account.response);
    });
    await this.page.route(MOCKED_ENDPOINTS.user.path, (route) => {
      route.fulfill(MOCKED_ENDPOINTS.user.response);
    });
    await this.page.route(MOCKED_ENDPOINTS.users.path, (route) => {
      route.fulfill(MOCKED_ENDPOINTS.users.response);
    });
    await this.page.route(MOCKED_ENDPOINTS.group.path, (route) => {
      route.fulfill(MOCKED_ENDPOINTS.group.response);
    });
  }

  async gotoAccount() {
    await this.page.goto('https://api.users.stage.osts-apps.com/accounts');
  }

  async goto() {
    await this.page.goto('http://127.0.0.1:3001/accounts');
  }

  async login() {
    await this.page.goto(
      'https://api.users.stage.osts-apps.com/sso/login?code=testuser'
    );
  }

  async setAccountToken() {
    await this.page.evaluate(
      `sessionStorage.setItem('ACCOUNT_TOKEN', '${ACCOUNT_TOKEN}')`
    );
  }

  async setUserToken() {
    await this.page.evaluate(
      `localStorage.setItem('USER_TOKEN', '${USER_TOKEN}')`
    );
  }

  async close() {
    await this.page.close();
  }

  async clickButton(selector) {
    await this.page.click(selector);
  }
}
