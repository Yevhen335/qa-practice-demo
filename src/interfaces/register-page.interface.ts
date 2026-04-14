import type { IBasePage } from './base-page.interface.ts';
import type { RegistrationData } from '../models/auth.models.ts';

export interface IRegisterPage extends IBasePage {
  open(): Promise<void>;
  registerWith(data: RegistrationData): Promise<void>;
  submit(): Promise<void>;
  getEmailValidationMessage(): Promise<string>;
  getPasswordValidationMessage(): Promise<string>;
  expectRegistrationSucceeded(): Promise<void>;
  expectRegistrationSuccessAlertHidden(): Promise<void>;
}
