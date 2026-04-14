import type { IBasePage } from './base-page.interface.ts';
import type { LoginCredentials } from '../models/auth.models.ts';

export interface ILoginPage extends IBasePage {
  open(): Promise<void>;
  loginAs(credentials: LoginCredentials): Promise<void>;
  expectUserIsLoggedIn(): Promise<void>;
  expectInvalidCredentialsAlert(): Promise<void>;
}
