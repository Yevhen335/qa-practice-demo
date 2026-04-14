import { expect, type Locator, type Page } from '@playwright/test';
import { APP_MESSAGES, ROUTES } from '../constants/routes.ts';
import type { ILoginPage } from '../interfaces/login-page.interface.ts';
import type { LoginCredentials } from '../models/auth.models.ts';
import { BasePage } from './base.page.ts';

export class LoginPage extends BasePage implements ILoginPage {
  private readonly heading: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly shoppingCartHeading: Locator;
  private readonly logoutLink: Locator;

  public constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Login - Shop' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.shoppingCartHeading = page.getByRole('heading', { name: 'SHOPPING CART' });
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
  }

  public async open(): Promise<void> {
    await this.goto(ROUTES.login);
    await expect(this.heading).toBeVisible();
  }

  public async loginAs(credentials: LoginCredentials): Promise<void> {
    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
    await this.submitButton.click();
  }

  public async expectUserIsLoggedIn(): Promise<void> {
    await expect(this.shoppingCartHeading).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
  }

  public async expectInvalidCredentialsAlert(): Promise<void> {
    await expect(this.alertByText(APP_MESSAGES.invalidCredentials)).toBeVisible();
    await expect(this.heading).toBeVisible();
  }
}
