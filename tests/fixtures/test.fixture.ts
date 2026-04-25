import { test as base } from '@playwright/test';
import { LoginCredentialsBuilder } from '../../src/builders/login-credentials.builder.ts';
import { RecoverPasswordDataBuilder } from '../../src/builders/recover-password-data.builder.ts';
import { RegistrationDataBuilder } from '../../src/builders/registration-data.builder.ts';
import type { ITestDataFactory } from '../../src/interfaces/test-data-factory.interface.ts';
import { AlertsPage } from '../../src/pages/alerts.page.ts';
import { LoaderPage } from '../../src/pages/loader.page.ts';
import { LoginPage } from '../../src/pages/login.page.ts';
import { RecoverPasswordPage } from '../../src/pages/recover-password.page.ts';
import { RegisterPage } from '../../src/pages/register.page.ts';

interface PageFixtures {
  alertsPage: AlertsPage;
  loaderPage: LoaderPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  recoverPasswordPage: RecoverPasswordPage;
}

interface BuilderFixtures {
  testDataFactory: ITestDataFactory;
}

export const test = base.extend<PageFixtures & BuilderFixtures>({
  alertsPage: async ({ page }, use) => {
    await use(new AlertsPage(page));
  },
  loaderPage: async ({ page }, use) => {
    await use(new LoaderPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  recoverPasswordPage: async ({ page }, use) => {
    await use(new RecoverPasswordPage(page));
  },
  testDataFactory: async ({}, use) => {
    const factory: ITestDataFactory = {
      buildValidLoginCredentials: () => new LoginCredentialsBuilder().build(),
      buildInvalidLoginCredentials: () =>
        new LoginCredentialsBuilder()
          .withEmail('wrong@example.com')
          .withPassword('wrongpass')
          .build(),
      buildRegistrationData: (overrides = {}) => {
        const builder = new RegistrationDataBuilder();

        if (overrides.firstName !== undefined) {
          builder.withFirstName(overrides.firstName);
        }

        if (overrides.lastName !== undefined) {
          builder.withLastName(overrides.lastName);
        }

        if (overrides.phoneNumber !== undefined) {
          builder.withPhoneNumber(overrides.phoneNumber);
        }

        if (overrides.country !== undefined) {
          builder.withCountry(overrides.country);
        }

        if (overrides.email !== undefined) {
          builder.withEmail(overrides.email);
        }

        if (overrides.password !== undefined) {
          builder.withPassword(overrides.password);
        }

        if (typeof overrides.acceptTerms === 'boolean') {
          builder.withAcceptedTerms(overrides.acceptTerms);
        }

        return builder.build();
      },
      buildRecoverPasswordData: (overrides = {}) => {
        const builder = new RecoverPasswordDataBuilder();

        if (overrides.email !== undefined) {
          builder.withEmail(overrides.email);
        }

        return builder.build();
      }
    };

    await use(factory);
  }
});

export { expect } from '@playwright/test';
