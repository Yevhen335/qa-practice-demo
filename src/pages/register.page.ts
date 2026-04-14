import { expect, type Locator, type Page } from '@playwright/test';
import { APP_MESSAGES, ROUTES } from '../constants/routes.ts';
import type { IRegisterPage } from '../interfaces/register-page.interface.ts';
import type { RegistrationData } from '../models/auth.models.ts';
import { BasePage } from './base.page.ts';

export class RegisterPage extends BasePage implements IRegisterPage {
  private readonly heading: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly phoneInput: Locator;
  private readonly countrySelect: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly termsCheckbox: Locator;
  private readonly submitButton: Locator;

  public constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Register Form' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByPlaceholder('Enter last name');
    this.phoneInput = page.getByRole('textbox', { name: 'Enter phone number' });
    this.countrySelect = page.locator('#countries_dropdown_menu');
    this.emailInput = page.getByRole('textbox', { name: 'Enter email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.termsCheckbox = page.getByRole('checkbox', { name: /I agree with the terms/i });
    this.submitButton = page.getByRole('button', { name: 'Register' });
  }

  public async open(): Promise<void> {
    await this.goto(ROUTES.register);
    await expect(this.heading).toBeVisible();
  }

  public async registerWith(data: RegistrationData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.phoneInput.fill(data.phoneNumber);
    await this.countrySelect.selectOption({ label: data.country });
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);

    if (data.acceptTerms) {
      await this.termsCheckbox.check();
    }

    await this.submit();
  }

  public async submit(): Promise<void> {
    await this.submitButton.click();
  }

  public async getEmailValidationMessage(): Promise<string> {
    return this.emailInput.evaluate(
      (element) => (element as HTMLInputElement).validationMessage
    );
  }

  public async getPasswordValidationMessage(): Promise<string> {
    return this.passwordInput.evaluate(
      (element) => (element as HTMLInputElement).validationMessage
    );
  }

  public async expectRegistrationSucceeded(): Promise<void> {
    await expect(this.alertByText(APP_MESSAGES.registrationSuccess)).toBeVisible();
  }

  public async expectRegistrationSuccessAlertHidden(): Promise<void> {
    await expect(this.alertByText(APP_MESSAGES.registrationSuccess)).toHaveCount(0);
  }
}
