import type {
  LoginCredentials,
  RecoverPasswordData,
  RegistrationData
} from '../models/auth.models.ts';

export interface ITestDataFactory {
  buildValidLoginCredentials(): LoginCredentials;
  buildInvalidLoginCredentials(): LoginCredentials;
  buildRegistrationData(overrides?: Partial<RegistrationData>): RegistrationData;
  buildRecoverPasswordData(overrides?: Partial<RecoverPasswordData>): RecoverPasswordData;
}
