import type { IBasePage } from './base-page.interface.ts';
import type { RecoverPasswordData } from '../models/auth.models.ts';

export interface IRecoverPasswordPage extends IBasePage {
  open(): Promise<void>;
  recoverPasswordFor(data: RecoverPasswordData): Promise<void>;
  expectConfirmationFor(email: string): Promise<void>;
}
