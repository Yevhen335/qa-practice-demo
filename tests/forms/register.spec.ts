import { expect, test } from '../fixtures/test.fixture.ts';

test.describe('Forms - Register', () => {
  test('should create an account with valid registration data @smoke @regression', async ({
    registerPage,
    testDataFactory
  }) => {
    const registrationData = testDataFactory.buildRegistrationData();

    await registerPage.open();
    await registerPage.registerWith(registrationData);

    await registerPage.expectRegistrationSucceeded();
  });

  test('should prevent registration when required credentials are missing @regression', async ({
    registerPage,
    testDataFactory
  }) => {
    const registrationData = testDataFactory.buildRegistrationData({
      email: '',
      password: ''
    });

    await registerPage.open();
    await registerPage.registerWith(registrationData);

    await expect.poll(async () => registerPage.getEmailValidationMessage()).not.toBe('');
    await expect.poll(async () => registerPage.getPasswordValidationMessage()).not.toBe('');
    await registerPage.expectRegistrationSuccessAlertHidden();
  });
});
