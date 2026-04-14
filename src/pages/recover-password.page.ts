import { expect, type Locator, type Page } from '@playwright/test';
import { ROUTES } from '../constants/routes.ts';
import type { IRecoverPasswordPage } from '../interfaces/recover-password-page.interface.ts';
import type { RecoverPasswordData } from '../models/auth.models.ts';
import { BasePage } from './base.page.ts';

export class RecoverPasswordPage extends BasePage implements IRecoverPasswordPage {
  private readonly heading: Locator;
  private readonly emailInput: Locator;
  private readonly submitButton: Locator;

  public constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Recover Password' });
    this.emailInput = page.getByPlaceholder('Enter email');
    this.submitButton = page.getByRole('button', { name: 'Recover Password' });
  }

  public async open(): Promise<void> {
    await this.goto(ROUTES.recoverPassword);
    await expect(this.heading).toBeVisible();
  }

  public async recoverPasswordFor(data: RecoverPasswordData): Promise<void> {
    await this.emailInput.fill(data.email);
    await this.submitButton.click();
  }

  public async expectConfirmationFor(email: string): Promise<void> {
    await expect(
      this.page.getByRole('alert').filter({
        hasText: `An email with the new password has been sent to ${email}. Please verify your inbox!`
      })
    ).toBeVisible();
  }
}
