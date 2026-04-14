import { env } from '../config/env.ts';
import type { RecoverPasswordData } from '../models/auth.models.ts';

export class RecoverPasswordDataBuilder {
  private data: RecoverPasswordData = {
    email: env.adminEmail
  };

  public withEmail(email: string): this {
    this.data.email = email;
    return this;
  }

  public build(): RecoverPasswordData {
    return { ...this.data };
  }
}
