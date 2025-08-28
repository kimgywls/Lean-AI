// tests/pages/LoginPage.ts
import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly togglePassword: Locator;
  readonly rememberToggle: Locator;
  readonly errorBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId("input-username");
    this.passwordInput = page.getByTestId("input-password");
    this.loginButton = page.getByTestId("login-button");
    this.togglePassword = page.getByTestId("toggle-password");
    this.rememberToggle = page.getByTestId("toggle-remember");
    this.errorBox = page.getByTestId("error-message");
  }

  async goto() {
    await this.page.goto("/admin/login");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async toggleShowPassword() {
    await this.togglePassword.click();
  }

  async toggleRememberMe() {
    await this.rememberToggle.click();
  }

  async expectLoginError() {
    await expect(this.errorBox).toBeVisible();
  }
}
