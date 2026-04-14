import { env } from '../config/env.ts';
import type { LoginCredentials } from '../models/auth.models.ts';

export class LoginCredentialsBuilder {
  private readonly credentials: LoginCredentials = {
    email: env.adminEmail,
    password: env.adminPassword
  };

  public withEmail(email: string): this {
    this.credentials.email = email;
    return this;
  }

  public withPassword(password: string): this {
    this.credentials.password = password;
    return this;
  }

  public build(): LoginCredentials {
    return { ...this.credentials };
  }
}
