export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export interface RecoverPasswordData {
  email: string;
}
