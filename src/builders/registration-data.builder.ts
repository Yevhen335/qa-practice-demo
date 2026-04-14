import type { RegistrationData } from '../models/auth.models.ts';

export class RegistrationDataBuilder {
  private registrationData: RegistrationData = {
    firstName: 'Jane',
    lastName: 'Tester',
    phoneNumber: '1234567890',
    country: 'Ukraine',
    email: `jane.tester+${Date.now()}@example.com`,
    password: 'Secret123!',
    acceptTerms: true
  };

  public withFirstName(firstName: string): this {
    this.registrationData.firstName = firstName;
    return this;
  }

  public withLastName(lastName: string): this {
    this.registrationData.lastName = lastName;
    return this;
  }

  public withPhoneNumber(phoneNumber: string): this {
    this.registrationData.phoneNumber = phoneNumber;
    return this;
  }

  public withCountry(country: string): this {
    this.registrationData.country = country;
    return this;
  }

  public withEmail(email: string): this {
    this.registrationData.email = email;
    return this;
  }

  public withPassword(password: string): this {
    this.registrationData.password = password;
    return this;
  }

  public withAcceptedTerms(acceptTerms: boolean): this {
    this.registrationData.acceptTerms = acceptTerms;
    return this;
  }

  public build(): RegistrationData {
    return { ...this.registrationData };
  }
}
